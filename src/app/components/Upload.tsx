'use client'
import Link from 'next/link';
import UploadFile from "@/app/components/UploadFile";
import {useState} from "react";
export default function Upload() {
    const [file, setFile] = useState<File|undefined>();
    function getData(newFile:File) {
        setFile(newFile);
    }

    return(
        <>
            <div className="w-full flex gap-2 mb-2">
                <UploadFile theme="dark" sendData={getData}/>
                <div className="w-[66%] text-center rounded border border-gray-950/[33%] px-6 py-4">
                    <p>If you don't have a dental scan right now, don't worry: you can still proceed with the checkout.<br/>You
                        can send your dental scan later at the following email address: <br/>
                        <span className="font-semibold">customercare.orders@darkai.com</span>
                    </p>
                </div>
            </div>
            <div className="w-full text-center rounded border border-red-500 bg-red-500/25 px-6 py-4">
                <p>Just remember that, in order for us to start creating your grillz, we need your dental scan.</p>
            </div>
        </>
    )
}