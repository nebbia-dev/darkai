'use client'
import {useState} from "react";
import {Tooltip} from "@mui/material";
import ToothConfigOptions from "@/app/_components/_elements/ToothConfigOptions";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Packaging} from "@/app/_components/_icons/Packaging";
import {Info} from "@/app/_components/_icons/Info";
import {Close} from "@/app/_components/_icons/Close";
import ConfiguratorButton from "@/app/_components/_buttons/ConfiguratorButton";

export default function Selection({activeButton, changeActiveButton} : {activeButton: string|undefined, changeActiveButton:(value:string) => void }) {
    const activeTooth = useTeethStore((state: State) => state.currentTooth);

    const [showManual, setShowManual] = useState<boolean>(false);

    return (
        <>
            <div className="flex">
                <div className="w-full h-[calc(100vh-108px)] flex flex-col gap-[25%] ml-[5vw]">
                    <div
                        className="relative flex gap-4 top-10">
                        <Tooltip title="Navigation info">
                            <button className="cursor-pointer">
                                <Info className="w-6 h-6" onClick={() => setShowManual((prev) => !prev)}/>
                            </button>
                        </Tooltip>
                        {showManual &&
                            <div
                                className={`${activeButton ? 'left-[60%]' : 'left-[15%]' } absolute flex flex-col border border-gray-950/[33%] gap-1 top-[-100%] w-[300px] text-sm bg-gray-50 rounded py-2 px-4`}>
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">How to navigate the model</p>
                                    <Close className="cursor-pointer w-5"
                                           onClick={() => setShowManual((prev) => !prev)}/>
                                </div>
                                <ul className="mb-1 pr-2">
                                    <li><span className="font-semibold">Move</span>: click + drag</li>
                                    <li><span className="font-semibold">Zoom</span>: slide two fingers up/down or rotate the mouse wheel
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col gap-4">
                        <ConfiguratorButton tooth="alwaysActive" inverse={true} value="1" active={activeButton}
                                            onclick={changeActiveButton} label="Signature Designs">
                            <img src="/config-menu-svgs/Vector.svg" alt="signature-logo"/>
                            <img className="ml-0.5" src="/config-menu-svgs/Vector-2.svg" alt="signature-logo"/>
                        </ConfiguratorButton>
                        <span aria-hidden={true} className="relative z-20 inline-block h-[2px] w-8 bg-slate-950"></span>
                        <ToothConfigOptions tooth={activeTooth} active={activeButton} onclick={changeActiveButton}/>
                        <span aria-hidden={true} className="relative z-20 inline-block h-[2px] w-8 bg-slate-950"></span>
                        <ConfiguratorButton tooth="alwaysActive" inverse={true} value="6" active={activeButton} onclick={changeActiveButton} label="Packaging">
                            <Packaging className="w-5 h-5"/>
                        </ConfiguratorButton>
                    </div>
                </div>
            </div>
        </>
    )
}