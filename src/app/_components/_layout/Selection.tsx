'use client'
import React, {useEffect, useState} from "react";
import {Tooltip} from "@mui/material";
import ToothConfigOptions from "@/app/_components/_elements/ToothConfigOptions";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Info} from "@/app/_components/_icons/Info";
import ConfiguratorButton from "@/app/_components/_elements/_buttons/ConfiguratorButton";

export default function Selection({activeButton, changeActiveButton} : {activeButton: string|undefined, changeActiveButton:(value:string) => void }) {
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const setActiveButton = useTeethStore((state: State) => state.setActiveButton);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);
    const [showManual, setShowManual] = useState<boolean>(false);
    const [videoStep, setVideoStep] = useState<number>(1);

    useEffect(() => {
        if(activeButton) {
            setShowManual(false);
        }
    }, [activeButton, activeTooth])

    return (
        <>
            <div className="flex-col flex w-[20vw] pl-[6vw] lg:pl-[5vw]">
                {innerWidth >= 1024 &&
                    <div className="relative flex gap-4">
                        <Tooltip title="Navigation info">
                            <button className="cursor-pointer">
                                <Info className="w-6 h-6" onClick={() => {
                                    setShowManual((prev) => !prev);
                                    setVideoStep(1);
                                    setActiveButton(undefined);
                                    setActiveSubButton(undefined);
                                }}/>
                            </button>
                        </Tooltip>
                        {showManual &&
                            <div
                                className="left-[15%] absolute flex flex-col border border-gray-950/[33%] top-[-150%] w-[500px] text-sm bg-gray-50 rounded z-50">
                                <button
                                    className="bg-gray-50 border rounded-full py-1 px-1.5 absolute top-[50%] right-[2%] z-60 cursor-pointer"
                                    onClick={() => {
                                        if (videoStep === 5) {
                                            setVideoStep(1)
                                        } else {
                                            setVideoStep((prev) => prev + 1)
                                        }
                                    }}>&rarr;
                                </button>
                                <video src={`/video/step${videoStep}.mp4`} className="rounded" autoPlay={true}
                                       loop={true}></video>
                                <button
                                    className="bg-gray-50 border rounded-full py-1 px-1.5 absolute top-[50%] left-[2%] z-60 cursor-pointer"
                                    onClick={() => {
                                        if (videoStep === 1) {
                                            setVideoStep(5)
                                        } else {
                                            setVideoStep((prev) => prev - 1)
                                        }
                                    }}>&larr;
                                </button>
                            </div>
                        }
                    </div>
                }
                <div
                    className="cursor-auto w-full relative lg:top-0 top-[40px] h-[calc(100dvh-40px)] lg:h-[calc(100dvh-108px)] flex flex-col justify-center">
                    <nav className="flex flex-col gap-4">
                        <ConfiguratorButton tooth="alwaysActive" inverse={true} value="1" active={activeButton}
                                            onclick={changeActiveButton} label="Signature Designs">
                            <img src="/config-menu-svgs/Vector.svg" alt="signature-logo"/>
                            <img className="ml-0.5" src="/config-menu-svgs/Vector-2.svg" alt="signature-logo"/>
                        </ConfiguratorButton>
                        <span aria-hidden={true} className="relative z-20 inline-block h-[2px] w-10 bg-slate-950"></span>
                        <ToothConfigOptions tooth={activeTooth} active={activeButton} onclick={changeActiveButton}/>
                        <span aria-hidden={true} className="relative z-20 inline-block h-[2px] w-10 bg-slate-950"></span>

                        {/*PACKAGING BUTTON*/}
                        <ConfiguratorButton tooth="alwaysActive" inverse={false} value="6" active={activeButton}
                                            onclick={changeActiveButton} label="Packaging (Opt.)">
                            <img className="p-0.5" src="/config-menu-svgs/packaging.webp" alt="packaging-option-logo"/>
                        </ConfiguratorButton>
                    </nav>
                </div>
            </div>
        </>
    )
}