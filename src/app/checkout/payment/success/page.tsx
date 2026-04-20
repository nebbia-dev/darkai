import Link from "next/link";
import React from "react";

export default function Success() {
    return (
        <>
            <div className="fixed w-full flex justify-center z-16">
                <img className="cursor-auto py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
            </div>
            <div
                className="relative top-[72px] lg:mt-0 w-[85vw] lg:w-[60vw] h-[calc(100dvh-(0.25rem*5)-60px-72px)] lg:h-[calc(100dvh-128px)] flex flex-col items-center justify-center gap-1 mx-auto text-center">
                <h2 className="font-bold text-2xl mb-6">Your order has been placed!</h2>
                <p>Check your inbox for the find the purchase receipt. We'll send you the tracking number once your
                    order is shipped.</p>
                <p>If you didn't uploaded the dental scan, don't forget to send it to: <span
                    className="font-semibold">customercare.orders@darkai.com</span></p>
                <p>If you have any inquiry, do not hesitate to contact us at: <span
                    className="font-semibold">customercare.info@darkai.com</span></p>
                <p className="w-full text-center rounded border border-red-500 bg-red-500/25 px-6 py-4 mt-4">
                    If you want to make changes or delete your order, contact us at:<br/> <span
                    className="font-semibold break-all">customercare.orders@darkai.com</span>
                </p>
                <div className="flex items-center justify-center mx-auto mt-6">
                    <Link
                        className="fixed lg:static bottom-5 cursor-pointer py-2 px-4 rounded-full border text-gray-950 mr-4"
                        href="/">&larr; Back to the configurator
                    </Link>
                </div>
            </div>
        </>
    )
}