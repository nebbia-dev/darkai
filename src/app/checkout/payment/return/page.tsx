import {redirect} from "next/navigation";
import {resolveCheckoutReturn} from "@/app/_helpers/_stripe/resolveCheckoutReturn";

type PaymentReturnPageProps = {
    searchParams: Promise<{
        session_id?: string,
    }>,
}

export default async function PaymentReturnPage({searchParams}: PaymentReturnPageProps) {
    const {session_id: sessionId} = await searchParams;

    const redirectTo = await resolveCheckoutReturn(sessionId);

    redirect(redirectTo);
}
