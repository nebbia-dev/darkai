import {headers} from "next/headers";
import Stripe from "stripe";
import {getStripe} from "@/app/_helpers/_stripe/stripe";
import {finalizeCheckout} from "@/app/_helpers/_stripe/finalizeCheckout";
import {isCheckoutSessionPaymentConfirmed} from "@/app/_helpers/_stripe/isCheckoutSessionPaymentConfirmed";
import {readRuntimeEnv} from "@/lib/server/readRuntimeEnv";

export async function POST(request: Request) {
    const webhookSecret = readRuntimeEnv(['NEXT', 'STRIPE', 'WEBHOOK', 'SECRET']);

    if (!webhookSecret) {
        return new Response('Missing STRIPE_WEBHOOK_SECRET', {status: 500});
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
            await finalizeCheckout(orderId, configId);
        }
    }

    return Response.json({received: true});
}
