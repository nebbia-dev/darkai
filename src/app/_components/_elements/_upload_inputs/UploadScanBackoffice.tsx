'use client'
import UploadFile from "@/app/_components/_elements/_upload_inputs/UploadFile";
import {useState} from "react";
import OrderInfo from "@/app/_types/OrderInfo";
import EditScanIcons from "@/app/_components/_elements/_buttons/EditScanIcons";
import updateCustomerScan from "@/app/_helpers/_db-interactions/updateCustomerScan";
import {uploadToStorage} from "@/app/_helpers/_uploads/uploadToStorage";

function buildScanUrl(scanPath: string) {
    return `https://aiuptuoijjmfcxutusbc.supabase.co/storage/v1/object/public/scans/${scanPath}`;
}

export default function UploadScanBackoffice ({userId, scanId}:{userId:OrderInfo['user_id']['id'], scanId:OrderInfo['user_id']['scan']}) {
    const [buffer, setBuffer] = useState<{ scan: ArrayBuffer|undefined, type: string|undefined }>({ scan: undefined, type: undefined });
    const [savedFile, setSavedFile] = useState<string|undefined>(undefined);
    const [file, setFile] = useState<File|undefined>();
    const currentScanPath = savedFile || scanId || undefined;

    async function upload() {
        if(buffer?.scan && file){
            const uploadedScan = await uploadToStorage('scans', file);

            await updateCustomerScan(userId, uploadedScan.path);
            setSavedFile(uploadedScan.path);
            setBuffer({ scan: undefined, type: undefined });
            setFile(undefined);
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

    function renderStoredScan(scanPath: string) {
        return (
            <div className="pt-4 px-4 w-full">
                <div className="rounded border border-gray-950/20 bg-gray-50 px-6 py-6">
                    <div className="flex flex-col items-center justify-center text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56px" height="56px" viewBox="0 0 24 24" className="mb-3">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                <path d="M7 3.5h6l4 4V20a.5.5 0 0 1-.5.5h-9A3.5 3.5 0 0 1 4 17V7A3.5 3.5 0 0 1 7.5 3.5"/>
                                <path d="M13 3.5V8h4"/>
                                <path d="M8 13h6m-6 3h4"/>
                            </g>
                        </svg>
                        <p className="font-semibold break-all">{scanPath.split('/').pop()}</p>
                        <p className="text-sm text-gray-700 mt-2">Dental scan uploaded as STL file</p>
                        <a
                            className="mt-4 inline-block cursor-pointer py-2 px-4 rounded-full border text-gray-950"
                            href={buildScanUrl(scanPath)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open file
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <>
            {scanId
                ?   <div className="relative">
                        <EditScanIcons sendData={getData} file={file}/>
                    {!buffer?.scan && currentScanPath && renderStoredScan(currentScanPath)}
                    {buffer?.scan &&
                        <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50 w-[calc(100%-2.5rem)] mt-2 ml-8 mr-2"
                                type="button" onClick={upload}>Save</button>
                    }
                    </div>
                : savedFile
                    ? <div className="relative">
                        <EditScanIcons sendData={getData} file={file}/>
                        {!buffer?.scan && renderStoredScan(savedFile)}
                        {buffer?.scan &&
                            <button
                                className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50 w-[calc(100%-2.5rem)] mt-2 ml-8 mr-2"
                                type="button" onClick={upload}>Save</button>
                        }
                      </div>
                    : <div className="pt-4 px-4 h-[30dvh] w-full flex items-center justify-center">
                        <div className="flex flex-col gap-2 h-full">
                            <UploadFile theme="light" sendData={getData}/>
                            {buffer.scan &&
                                <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                                        type="button" onClick={upload}>Save</button>
                            }
                        </div>
                    </div>
            }
        </>
    )
}
