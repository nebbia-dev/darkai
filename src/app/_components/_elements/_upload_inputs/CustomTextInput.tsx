'use client'
import {Edit} from "@/app/_components/_icons/Edit";
import {Confirm} from "@/app/_components/_icons/Confirm";
import React, {useState} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

type Text = {
    firstLine: string,
    secondLine: string
}

export default function CustomTextInput() {

    const customText:Text = useTeethStore((state: State) => state.packaging.text);
    const [firstReset, setFirstReset] = useState<boolean>(false);
    const [secondReset, setSecondReset] = useState<boolean>(false);
    const [backspace, setBackspace] = useState<boolean>(false);
    const setPackaging = useTeethStore((state: State) => state.setPackaging);

    function checkAndSetPackaging(type:string, e:any, lineNumber:number) {
        const line = lineNumber === 1 ? customText.firstLine : customText.secondLine
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const width = context!.measureText(line).width;
        canvas.remove();
        if((width <= 73 && !backspace) || backspace) {
            setPackaging(type, e, lineNumber)
        }
    }
    function checkBackKeydown(e:any) {
        if(e.code === 'Backspace' && !backspace) {
            setBackspace(true);
        } else if(e.code !== 'Backspace' && backspace) {
            setBackspace(false);
        } else {
            return;
        }
    }
    function updateCustomText(e:any, lineNumber:number) {
        e.preventDefault();
        e.stopPropagation();
        if(lineNumber === 1){
            setFirstReset(prev => !prev);
            if (firstReset) {
                setPackaging('text', '', 1);
            }
        } else if(lineNumber === 2) {
            setSecondReset(prev => !prev);
            if (secondReset) {
                setPackaging('text', '', 2);
            }
        }
    }

    function stop(e:any) {
        e.stopPropagation();
        e.preventDefault();
        document.getElementById('input_line_1')?.focus();
    }

    return (
        <div
            className="lg:static relative lg:right-[100%] z-100 w-full lg:w-[250px] lg:h-[120px] lg:pb-0 pb-6 pt-4 lg:mb-4 lg:pl-6 text-center lg:translate-y-[15%]">
            <div className="flex items-center lg:bg-gray-50 lg:rounded-3xl lg:p-2 lg:border-1 gap-0 max-w-[214px]">
                <div className="flex flex-col gap-2 items-center relative"
                >
                    <input id="input_line_1" value={customText.firstLine} onKeyDown={(e) => checkBackKeydown(e)}
                           onClick={(e) => stop(e)}
                           onChange={(e) => checkAndSetPackaging('text', e.currentTarget.value, 1)} type="text"
                           className="border bg-gray-200 rounded-full py-1 px-2 w-full"
                           placeholder="Line 1"
                    />

                    <div
                            onClick={(e) => updateCustomText(e,1)}
                            className={`${customText.firstLine.length > 0 ? 'block' : 'hidden'} 
                                ${firstReset ? 'border-gray-500 text-gray-500 bg-gray-200' : 'border-green-500 text-green-500 bg-green-200'} 
                                cursor-pointer absolute top-[2px] right-[2px] border font-bold rounded-full p-0.5`}>
                        {firstReset
                            ? <Edit className="w-6 h-6 p-1"/>
                            : <Confirm className="w-6 h-6"/>
                        }
                    </div>

                    <input value={customText.secondLine} onKeyDown={(e) => checkBackKeydown(e)}
                           onClick={(e) => stop(e)}
                           onChange={(e) => checkAndSetPackaging('text', e.currentTarget.value, 2)} type="text"
                           className="border bg-gray-200 rounded-full py-1 px-2 w-full"
                           placeholder="Line 2"
                    />

                    <div
                            onClick={(e) => updateCustomText(e, 2)}
                            className={`${customText.secondLine.length > 0 ? 'block' : 'hidden'} 
                                ${secondReset ? 'border-gray-500 text-gray-500 bg-gray-200' : 'border-green-500 text-green-500 bg-green-200'} 
                                cursor-pointer absolute top-[44px] right-[2px] border font-bold rounded-full p-0.5`}>
                        {secondReset
                            ? <Edit className="w-6 h-6 p-1"/>
                            : <Confirm className="w-6 h-6"/>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}