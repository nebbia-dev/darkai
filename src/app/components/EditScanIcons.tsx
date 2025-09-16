'use client'
import {useEffect, useState} from "react";
import {Edit} from "@/app/components/icons/Edit";
import {Close} from "@/app/components/icons/Close";

export default function EditScanIcons({file, sendData} : {file:File|undefined, sendData: (File) => void}) {
    const [selectedFile, setSelectedFile] = useState<File|undefined>();
    const [preview, setPreview] = useState<string|undefined>();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function handleChange(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return
        }
        setSelectedFile(e.target.files[0]);
        sendData(e.target.files[0]);
    }

    return (
        <>
            {
                selectedFile && file
                    ?
                    <div className="w-full pt-4 pl-8 pr-2">
                        <label
                            className="label w-full inline-block bg-gray-50 text-gray-950 rounded px-8 py-8 cursor-pointer border-[#171717] border-1 text-center">
                            <img className="mb-4 object-cover h-[128px] mx-auto" src={preview as string}
                                 alt="scan-preview"/>
                            Upload a dental scan{selectedFile && <span>: {selectedFile.name}</span>}
                            <input type="file" onChange={handleChange}/>
                        </label>
                    </div>
                    :
                    <div className="absolute top-5 right-2 flex gap-2 items-center">
                        <div className="w-8 h-8 bg-gray-50 text-black rounded-full flex items-center justify-center">
                            <label className="cursor-pointer">
                                <Edit/>
                                <input type="file" onChange={handleChange}/>
                            </label>
                        </div>
                        <button className="w-8 h-8 bg-gray-50 text-black rounded-full flex items-center justify-center cursor-pointer">
                            <Close/>
                        </button>
                    </div>
            }
        </>
    )
}