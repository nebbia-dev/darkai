import Stripe from "stripe";
import {getStripeSecretKey} from "@/lib/server/runtimeConfig";

let stripeInstance: Stripe | undefined;

export function getStripe() {
    if (!stripeInstance) {
        stripeInstance = new Stripe(getStripeSecretKey(), {
            apiVersion: "2025-12-15.clover",
        });
    }

    return stripeInstance;
}
