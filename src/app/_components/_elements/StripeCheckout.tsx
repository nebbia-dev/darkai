'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export const StripeCheckout = ({clientSecret}: {clientSecret: string}) => {
    const options = { clientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}
