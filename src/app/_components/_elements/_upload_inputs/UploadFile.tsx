'use client'
import {ChangeEvent, useEffect, useState} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function UploadFile({theme, sendData} : {theme:'dark' | 'light', sendData: (arg:File) => void}) {

    const innerWidth = useTeethStore((state:State) => state.innerWidth);
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

    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        sendData(e.target.files[0]);
    }

    return (
        <div className={`${theme === 'dark' ? 'w-[33%]' : 'w-full'} h-[100px] lg:h-[176px]`}>
            <label
                className={`flex flex-col justify-center label h-full w-full block ${theme === 'dark' ? 'bg-gray-950/[80%] text-gray-50' : 'bg-gray-50 text-gray-950'} rounded ${selectedFile || innerWidth  < 1024 ? 'p-2' : 'p-8'} cursor-pointer border-[#171717]`}>
                {
                    selectedFile
                        ?  <img className="rounded-xl w-[90%] h-[100%] lg:h-[122px] object-cover lg:mb-4 mx-auto" src={preview as string} alt="scan-preview"/>
                        :
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
                }
                <span className={`text-center ${innerWidth  < 1024 ? 'line-clamp-1' : 'line-clamp-2'}`}>
                    {selectedFile && innerWidth  < 1024
                        ? ''
                        : selectedFile && innerWidth  >= 1024
                            ? <>{selectedFile.name}</>
                            : "Upload a dental scan"
                    }
                </span>
                <input type="file" onChange={handleChange}/>
            </label>
        </div>
    )
}