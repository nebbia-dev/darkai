import PaymentReturnClient from "@/app/_components/_elements/PaymentReturnClient";

type PaymentReturnPageProps = {
    searchParams: Promise<{
        session_id?: string,
    }>,
}

export default async function PaymentReturnPage({searchParams}: PaymentReturnPageProps) {
    const {session_id: sessionId} = await searchParams;

    return <PaymentReturnClient sessionId={sessionId}/>;
}
