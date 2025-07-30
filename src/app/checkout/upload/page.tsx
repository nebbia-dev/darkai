'use client'
import Link from 'next/link';
export default function Upload() {
    return(
        <>
        <div className="max-w-[50vw] h-[calc(100vh-54px-15vh)] flex flex-col items-center justify-center gap-8 mx-auto">
            <div className="w-full">
                <label
                    className="label w-full inline-block bg-gray-950/[80%] text-gray-50 rounded px-8 py-8 cursor-pointer border-[#171717] border-1 text-center">
                    <div className="w-full flex justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                                <path
                                    d="M6.286 19C3.919 19 2 17.104 2 14.765s1.919-4.236 4.286-4.236q.427.001.83.08m7.265-2.582a5.8 5.8 0 0 1 1.905-.321c.654 0 1.283.109 1.87.309m-11.04 2.594a5.6 5.6 0 0 1-.354-1.962C6.762 5.528 9.32 3 12.476 3c2.94 0 5.361 2.194 5.68 5.015m-11.04 2.594a4.3 4.3 0 0 1 1.55.634m9.49-3.228C20.392 8.78 22 10.881 22 13.353c0 2.707-1.927 4.97-4.5 5.52"
                                ></path>
                                <path strokeLinejoin="round" d="M12 16v6m0-6l2 2m-2-2l-2 2"></path>
                            </g>
                        </svg>
                    </div>
                    Upload a dental scan
                    <input type="file"/>
                </label>
            </div>
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