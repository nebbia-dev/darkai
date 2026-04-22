import Stripe from "stripe";

let stripeClient: Stripe | undefined;

function readRuntimeEnv(name: string) {
    return process.env[name];
}

export function getStripe() {
    if (stripeClient) {
        return stripeClient;
    }

    const stripeSecretKey = readRuntimeEnv('NEXT_STRIPE_SECRET_KEY');

    if (!stripeSecretKey) {
        throw new Error('Stripe secret key is missing');
    }

    stripeClient = new Stripe(stripeSecretKey, {
        apiVersion: "2025-12-15.clover",
    });

    return stripeClient;
}
