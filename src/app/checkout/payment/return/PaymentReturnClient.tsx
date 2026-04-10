'use client'

import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

type PaymentReturnClientProps = {
    sessionId?: string,
}

type FinalizeCheckoutResponse = {
    redirectTo?: string,
    error?: string,
}

export default function PaymentReturnClient({sessionId}: PaymentReturnClientProps) {
    const router = useRouter();
    const hasStartedFinalization = useRef(false);
    const [statusMessage, setStatusMessage] = useState("Finalizing your order");
    const [helperMessage, setHelperMessage] = useState("Please wait while we confirm your payment and update your order.");

    useEffect(() => {
        if (!sessionId) {
            router.replace('/');
            return;
        }

        if (hasStartedFinalization.current) {
            return;
        }

        const currentSessionId = sessionId;
        hasStartedFinalization.current = true;
        let redirectTimeout: number | undefined;
        let isActive = true;

        async function finalizeOrder() {
            try {
                const response = await fetch(
                    `/checkout/payment/return/finalize?session_id=${encodeURIComponent(currentSessionId)}`,
                    {
                        method: 'GET',
                        cache: 'no-store',
                    },
                );

                const payload = await response.json().catch(() => null) as FinalizeCheckoutResponse | null;

                if (!payload?.redirectTo) {
                    throw new Error(payload?.error || 'Unable to finalize the order');
                }

                router.replace(payload.redirectTo);
            } catch {
                if (!isActive) {
                    return;
                }

                setStatusMessage('Something went wrong');
                setHelperMessage('We could not finalize your order automatically. Redirecting you to the payment error page...');

                redirectTimeout = window.setTimeout(() => {
                    router.replace('/checkout/payment/error');
                }, 1800);
            }
        }

        void finalizeOrder();

        return () => {
            isActive = false;

            if (redirectTimeout) {
                window.clearTimeout(redirectTimeout);
            }
        };
    }, [router, sessionId]);

    return (
        <>
            <div className="fixed w-full flex justify-center z-16">
                <img className="cursor-auto py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
            </div>
            <div
                className="relative top-[72px] lg:mt-0 w-[85vw] lg:w-[60vw] h-[calc(100dvh-(0.25rem*5)-60px-72px)] lg:h-[calc(100dvh-54px)] flex flex-col items-center justify-center mx-auto text-center">
                <span className="loader mb-8 inline-block"></span>
                <h2 className="font-bold text-2xl mb-3">{statusMessage}</h2>
                <p className="max-w-xl">{helperMessage}</p>
            </div>
        </>
    );
}
