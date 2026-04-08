import Link from "next/link";

export default function Error() {
    return (
        <>
            <div className="w-[60vw] h-[calc(100dvh-54px)] flex flex-col items-center justify-center gap-1 mx-auto text-center">
                <h2 className="font-bold text-2xl mb-6">Something went wrong...</h2>
                <p>The transaction was not completed and your order has not been placed.</p>
                <div className="flex items-center justify-between mx-auto mt-6">
                    <Link className="cursor-pointer py-2 px-4 rounded-full border text-gray-950 mr-4"
                          href="/public">&larr; Back to the configurator
                    </Link>
                    <Link className="cursor-pointer py-2 px-4 rounded-full border bg-gray-950 text-gray-50 mr-4"
                          href="/checkout/payment">Try again &rarr;
                    </Link>
                </div>
            </div>
        </>
)
}