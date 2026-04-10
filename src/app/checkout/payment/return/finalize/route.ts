import {NextRequest, NextResponse} from "next/server";
import {stripe} from "@/app/_stripe/stripe";
import {finalizeCheckout} from "@/app/_stripe/finalizeCheckout";

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    const {searchParams} = new URL(request.url);
    const stripeSessionId = searchParams.get('session_id');

    if (!stripeSessionId?.length) {
        return NextResponse.json(
            {redirectTo: '/'},
            {status: 400},
        );
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

        if (session.status === 'complete') {
            const orderId = Number(session.metadata?.orderId);
            const configId = Number(session.metadata?.configId);

            if (Number.isFinite(orderId) && Number.isFinite(configId)) {
                await finalizeCheckout(orderId, configId);
            }

            return NextResponse.json({redirectTo: '/checkout/payment/success'});
        }

        if (session.status === 'open') {
            return NextResponse.json({redirectTo: '/'});
        }

        return NextResponse.json({redirectTo: '/'});
    } catch {
        return NextResponse.json(
            {
                error: 'Unable to confirm the payment status',
                redirectTo: '/checkout/payment/error',
            },
            {status: 500},
        );
    }
};
