'use client'
import Link from 'next/link';
export default function Upload() {
    return(
        <div className="w-[75vw] h-[calc(100vh-54px)] flex flex-col items-center justify-center gap-8 mx-auto">
            <div className="w-full flex items-center justify-center gap-8">
                <div className="w-[50%] rounded border border-gray-950/[33%] px-6 py-4 h-[60vh]">
                    Billing information
                    Ship yes/no
                    Shipping info if different from billing
                </div>
                <div className="w-[50%] rounded border border-gray-950/[33%] px-6 py-4 h-[60vh]">
                    Card detes
                </div>
            </div>
            <div className="w-full flex justify-between">
                <Link className="cursor-pointer py-2 px-4 rounded border text-gray-950 mr-4"
                      href="/checkout/upload">&larr; Back
                </Link>
                <Link className="cursor-pointer py-2 px-4 rounded bg-gray-950 text-gray-50"
                      href="/checkout/payment"
                >Proceed to payment &rarr;
                </Link>
            </div>
        </div>
    )
}