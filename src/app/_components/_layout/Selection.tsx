'use client'
import React from "react";
import ToothConfigOptions from "@/app/_components/_elements/ToothConfigOptions";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import ConfiguratorButton from "@/app/_components/_elements/_buttons/ConfiguratorButton";
import Tutorial from "@/app/_components/_elements/Tutorial";

export default function Selection({activeButton, changeActiveButton} : {activeButton: string|undefined, changeActiveButton:(value:string) => void }) {
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);

    return (
        <>
            <div className="flex-col flex w-[20vw] pl-[6vw] lg:pl-[5vw]">
                {innerWidth >= 1024 &&
                    <Tutorial activeButton={activeButton}/>
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