'use client'
import UploadFile from "@/app/_components/_elements/_upload_inputs/UploadFile";
import {useState} from "react";
import OrderInfo from "@/app/_types/OrderInfo";
import Image from "next/image";
import EditScanIcons from "@/app/_components/_elements/_buttons/EditScanIcons";
import uploadScan from "@/app/_helpers/_db-interactions/uploadScan";
export default function UploadScanBackoffice ({userId, scanId}:{userId:OrderInfo['user_id']['id'], scanId:OrderInfo['user_id']['scan']}) {
    const [buffer, setBuffer] = useState<{ scan: ArrayBuffer|undefined, type: string|undefined }|undefined>({ scan: undefined, type: undefined });
    const [savedFile, setSavedFile] = useState<string|undefined>();
    const [file, setFile] = useState<File|undefined>();
    async function upload() {
        if(buffer?.scan && buffer?.type){
            const number = Math.random() * 100 + Math.cos(Math.random() * 100);
            await uploadScan(buffer, number, userId);
            setSavedFile(number + '.' + buffer.type.split("/")[1]);
            setBuffer(undefined);
        }
    }

    function getData(newFile:File) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(newFile);
        reader.onload = () => {
            setBuffer({scan: reader.result as ArrayBuffer, type: newFile.type});
        };
        setFile(newFile);
    }

    return(
        <>
            {scanId
                ?   <div className="relative">
                        <EditScanIcons sendData={getData} file={file}/>
                    {!buffer && <Image alt="config"
                            className="object-cover h-[35dvh] w-full pt-4 pl-8"
                            src={`https://aiuptuoijjmfcxutusbc.supabase.co/storage/v1/object/public/scans/${savedFile? savedFile : scanId}`}
                            width={1000} height={1000} quality={70}
                    />}
                    {buffer &&
                        <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50 w-[calc(100%-2.5rem)] mt-2 ml-8 mr-2"
                                type="button" onClick={upload}>Save</button>
                    }
                    </div>
                : savedFile
                    ? <div className="relative">
                        <EditScanIcons sendData={getData} file={file}/>
                        {!buffer && <Image alt="config"
                                         className="object-cover h-[35dvh] w-full pt-4 pl-8"
                                         src={`https://aiuptuoijjmfcxutusbc.supabase.co/storage/v1/object/public/scans/${savedFile}`}
                                         width={1000} height={1000} quality={70}
                        />}
                        {buffer &&
                            <button
                                className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50 w-[calc(100%-2.5rem)] mt-2 ml-8 mr-2"
                                type="button" onClick={upload}>Save</button>
                        }
                      </div>
                    : <div className="pt-4 pl-8 pr-2 h-[30dvh] w-full flex items-center justify-center">
                        <div className="flex flex-col gap-2 h-full">
                            <UploadFile theme="light" sendData={getData}/>
                            {buffer &&
                                <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                                        type="button" onClick={upload}>Save</button>
                            }
                        </div>
                    </div>
            }
        </>
    )
}