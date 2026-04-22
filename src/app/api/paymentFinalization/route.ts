import {NextRequest, NextResponse} from "next/server";
import {resolveCheckoutReturn} from "@/app/_helpers/_stripe/resolveCheckoutReturn";

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    const {searchParams} = new URL(request.url);
    const stripeSessionId = searchParams.get('session_id');

    try {
        const redirectTo = await resolveCheckoutReturn(stripeSessionId || undefined);
        return NextResponse.json({redirectTo});
    } catch (error) {
        console.error('Unable to resolve checkout return', error);
        return NextResponse.json(
            {
                error: 'Unable to confirm the payment status',
                redirectTo: '/checkout/payment/error',
            },
            {status: 500},
        );
    }
};
