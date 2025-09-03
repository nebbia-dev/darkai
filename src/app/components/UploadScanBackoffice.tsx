'use client'
import {createClient} from "@/utils/supabase/client";
import UploadFile from "@/app/components/UploadFile";
import {useState} from "react";
import OrderInfo from "@/app/types/OrderInfo";
export default function UploadScanBackoffice ({userId}:{userId:OrderInfo['user_id']['id']}) {
    const [file, setFile] = useState<File|undefined>();
    async function uploadFile() {
        if(file){
            const path = 'public/'+ userId +'.jpg'
            console.log('file to save: ', file, '; path: ', path)
            // const supabase = await createClient();
            // const {data, error} = await supabase
            //     .storage
            //     .from('scans')
            //     .upload(path, file, {
            //         cacheControl: '3600',
            //         upsert: false
            //     })
        }
    }

    function getData(newFile:File) {
        setFile(newFile);
    }

    return(
        <div className="flex flex-col gap-2 h-full">
            <UploadFile theme="light" sendData={getData}/>
            {file &&
                <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                        type="button" onClick={uploadFile}>Save</button>
            }
        </div>
    )
}