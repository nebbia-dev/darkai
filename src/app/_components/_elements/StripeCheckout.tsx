'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey
    ? loadStripe(stripePublishableKey)
    : null;

export const StripeCheckout = ({clientSecret}: {clientSecret: string}) => {
    const options = { clientSecret };

    if (!stripePromise) {
        return (
            <div className="w-full rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Stripe is not configured correctly. Please contact support before retrying the payment.
            </div>
        );
    }

    return (
        <div id="checkout" className="w-full min-w-0 max-w-full">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}
