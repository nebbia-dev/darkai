import PaymentReturnClient from "@/app/checkout/payment/return/PaymentReturnClient";

type PaymentReturnPageProps = {
    searchParams: Promise<{
        session_id?: string,
    }>,
}

export default async function PaymentReturnPage({searchParams}: PaymentReturnPageProps) {
    const {session_id: sessionId} = await searchParams;

    return <PaymentReturnClient sessionId={sessionId}/>;
}
