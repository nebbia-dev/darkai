'use client'
import {Edit} from "@/app/_components/_icons/Edit";
import {Confirm} from "@/app/_components/_icons/Confirm";
import React, {useState} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function CustomTextInput() {

    const customText = useTeethStore((state: State) => state.packaging?.text);

    if(!customText) return null;

    const innerWidth = useTeethStore((state:State) => state.innerWidth);
    const [firstReset, setFirstReset] = useState<boolean>(false);
    const [secondReset, setSecondReset] = useState<boolean>(false);
    const [backspace, setBackspace] = useState<boolean>(false);
    const [caret, setCaret] = useState<{1:number, 2:number}>({1:0, 2:0});

    const setPackaging = useTeethStore((state: State) => state.setPackaging);

    function checkAndSetPackaging(type:string, e:any, lineNumber:number) {
        if(customText) {
            const line = lineNumber === 1 ? customText.firstLine : customText.secondLine
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const width = context!.measureText(line).width;
            canvas.remove();
            if((width <= 73 && !backspace) || backspace) {
                setPackaging(type, e, lineNumber)
            }
        }
    }
    function checkBackKeydown(e:any, lineNumber:number) {
        if(e.code === 'Space' && innerWidth < 1024) {
            e.preventDefault();
            if(lineNumber === 1){
                const partOne = customText!.firstLine.slice(0, caret[lineNumber]);
                const partTwo = customText!.firstLine.slice(caret[lineNumber], customText!.firstLine.length);
                checkAndSetPackaging('text', partOne + " " + partTwo, lineNumber)
            } else if(lineNumber === 2) {
                const partOne = customText!.secondLine.slice(0, caret[lineNumber]);
                const partTwo = customText!.secondLine.slice(caret[lineNumber], customText!.secondLine.length);
                checkAndSetPackaging('text', partOne + " " + partTwo, lineNumber)
            }
        }

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
            document.getElementById('input_line_1')?.focus();
            setFirstReset(prev => !prev);
            if (firstReset) {
                setPackaging('text', '', 1);
            }
        } else if(lineNumber === 2) {
            document.getElementById('input_line_2')?.focus();
            setSecondReset(prev => !prev);
            if (secondReset) {
                setPackaging('text', '', 2);
            }
        }
    }
    function setCaretPosition(e:any, lineNumber:number) {
        if(lineNumber === 1) {
            setCaret({...caret, 1: e.target.selectionStart});
        } else if(lineNumber === 2) {
            setCaret({...caret, 2: e.target.selectionStart});
        }
    }
    function stop(e:any, lineNumber:number) {
        e.stopPropagation();
        e.preventDefault();
        if(innerWidth < 1024){
            setCaretPosition(e, lineNumber);
            if (lineNumber === 1) {
                document.getElementById('input_line_1')?.focus();
            } else if (lineNumber === 2) {
                document.getElementById('input_line_2')?.focus();
            }
        }
    }

    return (
        <div
            className="lg:static lg:right-[100%] w-full lg:w-[250px] lg:h-[120px] lg:pb-0 pb-6 pt-4 lg:mb-4 lg:pl-6 text-center lg:translate-y-[15%]">
            <div className="flex items-center lg:bg-gray-50 lg:rounded-3xl lg:p-2 lg:border-1 gap-0">
                <div className="flex flex-col gap-2 items-center w-[95%] mx-auto relative"
                >
                    <input id="input_line_1" value={customText.firstLine}
                           onKeyDown={(e) => checkBackKeydown(e, 1)}
                           onKeyUp={(e) => setCaretPosition(e, 1)}
                           onClick={(e) => stop(e, 1)}
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

                    <input id="input_line_2" value={customText.secondLine}
                           onKeyDown={(e) => checkBackKeydown(e, 2)}
                           onClick={(e) => stop(e, 2)}
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