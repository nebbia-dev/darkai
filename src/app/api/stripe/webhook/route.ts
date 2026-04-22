import {headers} from "next/headers";
import Stripe from "stripe";
import {getStripe} from "@/app/_helpers/_stripe/stripe";
import {finalizeCheckout} from "@/app/_helpers/_stripe/finalizeCheckout";
import {isCheckoutSessionPaymentConfirmed} from "@/app/_helpers/_stripe/isCheckoutSessionPaymentConfirmed";
import {getStripeWebhookSecret} from "@/lib/server/runtimeConfig";

export async function POST(request: Request) {
    let webhookSecret: string;

    try {
        webhookSecret = getStripeWebhookSecret();
    } catch (error) {
        console.error('Stripe webhook is not configured correctly', error);
        return new Response('Stripe webhook is not configured', {status: 500});
    }

    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
        return new Response('Missing stripe-signature header', {status: 400});
    }

    const body = await request.text();

    let event: Stripe.Event;

    try {
        event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        return new Response(`Webhook signature verification failed: ${(error as Error).message}`, {status: 400});
    }

    if (
        event.type === 'checkout.session.completed'
        || event.type === 'checkout.session.async_payment_succeeded'
    ) {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = Number(session.metadata?.orderId);
        const configId = Number(session.metadata?.configId);

        if (
            isCheckoutSessionPaymentConfirmed(session)
            && Number.isFinite(orderId)
            && Number.isFinite(configId)
        ) {
            try {
                await finalizeCheckout(orderId, configId);
            } catch (error) {
                console.error('Unable to finalize the checkout after webhook confirmation', error);
                return new Response('Unable to finalize the confirmed checkout', {status: 500});
            }
        }
    }

    return Response.json({received: true});
}
