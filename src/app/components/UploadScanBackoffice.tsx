'use client'
import {createClient} from "@/utils/supabase/client";
import UploadFile from "@/app/components/UploadFile";
import {useEffect, useState} from "react";
import OrderInfo from "@/app/types/OrderInfo";
import Image from "next/image";
export default function UploadScanBackoffice ({userId, scanId}:{userId:OrderInfo['user_id']['id'], scanId:OrderInfo['user_id']['scan']}) {
    const [file, setFile] = useState<File|undefined>();
    const [savedFile, setSavedFile] = useState<boolean>();

    async function uploadFile() {
        if(file){
            const number = Math.random() * 100 + Math.cos(Math.random() * 100);
            const supabase = await createClient();
            const {data, error} = await supabase
                .storage
                .from('scans')
                .upload(number + '_' + file.name, file, {
                    cacheControl: '3600',
                    upsert: false
                })
            const { moreData, moreError } = await supabase
                .from('Customers')
                .update({ scan: number + '_' + file.name })
                .eq('id', userId)
            setSavedFile(true);
        }
    }

    function getData(newFile:File) {
        setFile(newFile);
    }

    return(
        <>
            {scanId
                ? <Image alt="config"
                         className="object-cover h-[35vh] w-full pt-4 pl-8"
                         src={`https://dggrbfhwlvvsxbhnobig.supabase.co/storage/v1/object/public/scans/${scanId}`}
                         width={1000} height={1000} quality={70}
                />
                : savedFile && file
                    ? <Image alt="config"
                             className="object-cover h-[35vh] w-full pt-4 pl-8"
                             src={`https://dggrbfhwlvvsxbhnobig.supabase.co/storage/v1/object/public/scans/${file.name}`}
                             width={1000} height={1000} quality={70}
                    />
                    : <div className="pt-4 pl-8 pr-2 h-[30vh] w-full flex items-center justify-center">
                        <div className="flex flex-col gap-2 h-full">
                            <UploadFile theme="light" sendData={getData}/>
                            {file &&
                                <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                                        type="button" onClick={uploadFile}>Save</button>
                            }
                        </div>
                    </div>
            }
        </>
    )
}