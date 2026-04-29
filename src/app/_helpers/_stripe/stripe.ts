import Stripe from "stripe";
import {readRuntimeEnv} from "@/lib/server/readRuntimeEnv";

let stripeClient: Stripe | undefined;

export function getStripe() {
    if (stripeClient) {
        return stripeClient;
    }

    const stripeSecretKey = readRuntimeEnv(['NEXT', 'STRIPE', 'SECRET', 'KEY']);

    if (!stripeSecretKey) {
        throw new Error('Stripe secret key is missing');
    }

    stripeClient = new Stripe(stripeSecretKey, {
        apiVersion: "2025-12-15.clover",
    });

    return stripeClient;
}
