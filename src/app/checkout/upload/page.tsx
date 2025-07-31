import Link from 'next/link';
import UploadFile from "@/app/components/UploadFile";
export default function Upload() {
    return(
        <>
        <div className="max-w-[50vw] h-[calc(100vh-54px-15vh)] flex flex-col items-center justify-center gap-8 mx-auto">
            <UploadFile/>
            <div className="w-full text-center rounded border border-gray-950/[33%] px-6 py-4">
                <p>If you don't have a dental scan right now, don't worry: you can still proceed with the checkout.<br/>You
                    can send your dental scan later at the following email address: <br/><span
                        className="font-semibold">customercare.orders@darkai.com</span></p>
            </div>
            <div className="w-full text-center rounded border border-red-500 bg-red-500/25 px-6 py-4">
                <p>Just remember that, in order for us to start creating your grillz, we need your dental scan.</p>
            </div>
        </div>
            <div className="max-w-[50vw] w-full flex justify-between h-[15vh] items-center mx-auto">
                <Link className="cursor-pointer py-2 px-4 rounded border text-gray-950 mr-4"
                      href="/">&larr; Back
                </Link>
                <Link className="cursor-pointer py-2 px-4 rounded bg-gray-950 text-gray-50"
                      href="/checkout/payment"
                        >Proceed to checkout &rarr;
                </Link>
            </div>
        </>
    )
}