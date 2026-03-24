'use client'
import {createClient} from "@/utils/supabase/client";
import UploadFile from "@/app/_components/_elements/_upload/UploadFile";
import {useState} from "react";
import OrderInfo from "@/app/_types/OrderInfo";
import Image from "next/image";
import EditScanIcons from "@/app/_components/_elements/_buttons/EditScanIcons";
export default function UploadScanBackoffice ({userId, scanId}:{userId:OrderInfo['user_id']['id'], scanId:OrderInfo['user_id']['scan']}) {
    const [file, setFile] = useState<File|undefined>();
    const [savedFile, setSavedFile] = useState<string|undefined>();

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
            const { data: moreData, error: moreError } = await supabase
                .from('Customers')
                .update({ scan: number + '_' + file.name })
                .eq('id', userId);
            setSavedFile(number + '_' + file.name);
            setFile(undefined);
        }
    }

    function getData(newFile:File) {
        setFile(newFile);
    }

    return(
        <>
            {scanId
                ?   <div className="relative">
                        <EditScanIcons sendData={getData} file={file}/>
                    {!file && <Image alt="config"
                            className="object-cover h-[35dvh] w-full pt-4 pl-8"
                            src={`https://aiuptuoijjmfcxutusbc.supabase.co/storage/v1/object/public/scans/${savedFile? savedFile : scanId}`}
                            width={1000} height={1000} quality={70}
                    />}
                    {file &&
                        <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50 w-[calc(100%-2.5rem)] mt-2 ml-8 mr-2"
                                type="button" onClick={uploadFile}>Save</button>
                    }
                    </div>
                : savedFile
                    ? <div className="relative">
                        <EditScanIcons sendData={getData} file={file}/>
                        {!file && <Image alt="config"
                                         className="object-cover h-[35dvh] w-full pt-4 pl-8"
                                         src={`https://aiuptuoijjmfcxutusbc.supabase.co/storage/v1/object/public/scans/${savedFile}`}
                                         width={1000} height={1000} quality={70}
                        />}
                        {file &&
                            <button
                                className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50 w-[calc(100%-2.5rem)] mt-2 ml-8 mr-2"
                                type="button" onClick={uploadFile}>Save</button>
                        }
                      </div>
                    : <div className="pt-4 pl-8 pr-2 h-[30dvh] w-full flex items-center justify-center">
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