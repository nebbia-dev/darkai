import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import {stripe} from "@/app/_stripe/stripe";
import {finalizeCheckout} from "@/app/_stripe/finalizeCheckout";

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const stripeSessionId = searchParams.get("session_id");


    if (!stripeSessionId?.length)
        return redirect("/");

    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    if (session.status === "complete") {
        const orderId = Number(session.metadata?.orderId);
        const configId = Number(session.metadata?.configId);

        if (Number.isFinite(orderId) && Number.isFinite(configId)) {
            await finalizeCheckout(orderId, configId);
        }

        // Go to a success page!
        return redirect(
            `/checkout/payment/success`,
        );
    }

    if (session.status === "open") {
        // Here you'll likely want to head back to some pre-payment page in your checkout
        // so the user can try again
        return redirect(
            `/`,
        );
    }

    return redirect("/");
};
