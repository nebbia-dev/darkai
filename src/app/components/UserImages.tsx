'use client'
import Image from "next/image";
import {useState} from "react";

export default function UserImages({configId}:{configId:string|number|undefined}) {
    const [showConfig, setShowConfig] = useState<boolean>(true);
    return(
        <div className="w-[90%] mx-auto h-full flex gap-3">
            <div className="h-full">
            {showConfig
                ? <div>
                    <Image alt="config"
                           className="object-cover h-[calc(80vh-20vh)] w-full"
                           src={`https://dggrbfhwlvvsxbhnobig.supabase.co/storage/v1/object/public/configs/${configId}.png`}
                           width={1000} height={1000}/>
                </div>
                : <div>
                    <Image alt="scan"
                           className="object-cover h-[calc(80vh-20vh)] w-full"
                           src={`https://dggrbfhwlvvsxbhnobig.supabase.co/storage/v1/object/public/scans/${configId}.jpg`}
                           width={1000} height={1000}/>
                </div>
            }
            </div>
            <div className="flex flex-col justify-center gap-4 h-fit">
                <button className={`cursor-pointer py-2 px-4 rounded-full ${showConfig ? 'bg-gray-950 text-gray-50' : 'bg-gray-50 text-gray-950'} border`}
                        type="button" onClick={() => setShowConfig(true)}>C
                </button>
                <button className={`cursor-pointer py-2 px-4 rounded-full ${!showConfig ? 'bg-gray-950 text-gray-50' : 'bg-gray-50 text-gray-950'} border`}
                        type="button" onClick={() => setShowConfig(false)}>S
                </button>
            </div>
        </div>
    )
}