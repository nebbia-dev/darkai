import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="w-[60vw] h-[calc(100vh-54px)] flex flex-col items-center justify-center gap-1 mx-auto text-center">
                <h2 className="font-bold text-2xl mb-6">Your order has been placed!</h2>
                <p>Check your inbox for the find the purchase receipt. We'll send you the tracking number once your order is shipped.</p>
                <p>If you didn't uploaded the dental scan, don't forget to send it to: <span
                    className="font-semibold">customercare.orders@darkai.com</span></p>
                <p>If you have any inquiry, do not hesitate to contact us at: <span
                    className="font-semibold">customercare.info@darkai.com</span></p>
                <div className="flex items-center justify-center mx-auto mt-6">
                <Link className="cursor-pointer py-2 px-4 rounded border text-gray-950 mr-4"
                          href="/">&larr; Back to the configurator
                    </Link>
                </div>
            </div>
        </>
)
}