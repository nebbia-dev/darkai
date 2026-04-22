import {getStripe} from "@/app/_helpers/_stripe/stripe";
import {finalizeCheckout} from "@/app/_helpers/_stripe/finalizeCheckout";
import {isCheckoutSessionPaymentConfirmed} from "@/app/_helpers/_stripe/isCheckoutSessionPaymentConfirmed";

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function resolveCheckoutReturn(sessionId?: string) {
    if (!sessionId?.length) {
        return '/';
    }

    for (let attempt = 0; attempt < 5; attempt++) {
        const session = await getStripe().checkout.sessions.retrieve(sessionId);

        if (isCheckoutSessionPaymentConfirmed(session)) {
            const orderId = Number(session.metadata?.orderId);
            const configId = Number(session.metadata?.configId);

            if (Number.isFinite(orderId) && Number.isFinite(configId)) {
                await finalizeCheckout(orderId, configId);
            }

            return '/checkout/payment/success';
        }

        if (session.status === 'complete') {
            return '/checkout/payment/success';
        }

        if (session.status === 'expired') {
            return '/checkout/payment/error';
        }

        if (attempt < 4) {
            await wait(800);
        }
    }

    return '/checkout/payment';
}
