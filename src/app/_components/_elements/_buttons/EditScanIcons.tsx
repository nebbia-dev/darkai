'use client'
import {ChangeEvent, useState} from "react";
import {Edit} from "@/app/_components/_icons/Edit";

export default function EditScanIcons({file, sendData} : {file:File|undefined, sendData: (arg:File) => void}) {
    const [selectedFile, setSelectedFile] = useState<File|undefined>();

    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        if (!e.target.files[0].name.toLowerCase().endsWith('.stl')) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
        sendData(e.target.files[0]);
    }

    return (
        <>
            {
                selectedFile && file
                    ?
                    <div className="w-full pt-4 px-4">
                        <label
                            className="label w-full inline-block bg-gray-50 text-gray-950 rounded px-8 py-8 cursor-pointer border-[#171717] border-1 text-center">
                            <div className="mb-4 h-[128px] mx-auto border border-gray-950/20 rounded flex flex-col items-center justify-center px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" className="mb-2">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                        <path d="M7 3.5h6l4 4V20a.5.5 0 0 1-.5.5h-9A3.5 3.5 0 0 1 4 17V7A3.5 3.5 0 0 1 7.5 3.5"/>
                                        <path d="M13 3.5V8h4"/>
                                        <path d="M8 13h6m-6 3h4"/>
                                    </g>
                                </svg>
                                <span className="font-medium">New STL file selected</span>
                            </div>
                            Replace dental scan (.stl){selectedFile && <span>: {selectedFile.name}</span>}
                            <input type="file" accept=".stl" onChange={handleChange}/>
                        </label>
                    </div>
                    :
                    <div className="absolute top-5 right-5 flex gap-2 items-center">
                        <div className="w-8 h-8 bg-gray-50 text-black rounded-full flex items-center justify-center">
                            <label className="cursor-pointer">
                                <Edit/>
                                <input type="file" accept=".stl" onChange={handleChange}/>
                            </label>
                        </div>
                    </div>
            }
        </>
    )
}
