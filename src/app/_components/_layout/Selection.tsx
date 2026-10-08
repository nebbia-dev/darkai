'use client'
import React, {useState} from "react";
import ToothConfigOptions from "@/app/_components/_elements/ToothConfigOptions";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import ConfiguratorButton from "@/app/_components/_elements/_buttons/ConfiguratorButton";
import Tutorial from "@/app/_components/_elements/Tutorial";
import Iubenda from "@/app/_components/_layout/Iubenda";
import presets from '@/lib/presets.json'
import {History} from "@/app/_types/TeethOptions";

export default function Selection({activeButton, changeActiveButton} : {activeButton: string|undefined, changeActiveButton:(value:string) => void }) {
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);
    const innerHeight = useTeethStore((state:State) => state.innerHeight);
    const setSavedConfig = useTeethStore((state: State) => state.setLocalSavedConfig);
    const [shownPresets, setShownPresets] = useState<number[]>([1, 2]);

    function getRandomPreset() {
        return Math.floor(Math.random() * (14 + 1));
    }

    function setRandomPreset() {
        const usedPresets = shownPresets.length === 15 ? [] : shownPresets;

        let random = getRandomPreset();

        while(usedPresets.indexOf(random) !== -1) {
            random = getRandomPreset();
        }

        setSavedConfig(presets[random] as History, undefined);
        setShownPresets([...usedPresets, random])
    }

    return (
        <>
            <div className="flex-col flex w-[20vw] pl-[6vw] lg:pl-[5vw] relative">
                {innerWidth >= 1024 &&
                    <Tutorial activeButton={activeButton}/>
                }
                <div
                    className="cursor-auto w-full relative lg:top-0 top-[40px] h-[calc(100dvh-40px)] lg:h-[calc(100dvh-108px)] flex flex-col justify-center">
                    <nav className="flex flex-col gap-4">
                        <ConfiguratorButton tooth="alwaysActive" inverse={true} value="1" active={activeButton}
                                            onclick={changeActiveButton} label="Signature Designs">
                            <img src="/config-menu-svgs/Vector.svg" alt="DARKAI configurator signature design icon with a capital D"/>
                            <img className="ml-0.5" src="/config-menu-svgs/Vector-2.svg" alt="DARKAI configurator signature design icon with a capital I"/>
                        </ConfiguratorButton>
                        <ConfiguratorButton tooth="alwaysActive" inverse={false} onclick={() => setRandomPreset()}
                                            value="1000" active="" label="Presets">
                            <img src="/config-menu-svgs/presets.svg"
                                 alt="DARKAI configurator presets design icon"/>
                        </ConfiguratorButton>
                        <span aria-hidden={true}
                              className="relative z-20 inline-block h-[2px] w-10 bg-slate-950"></span>
                        <ToothConfigOptions tooth={activeTooth} active={activeButton} onclick={changeActiveButton}/>
                        <span aria-hidden={true} className="relative z-20 inline-block h-[2px] w-10 bg-slate-950"></span>

                        {/*PACKAGING BUTTON*/}
                        <ConfiguratorButton tooth="alwaysActive" inverse={false} value="6" active={activeButton}
                                            onclick={changeActiveButton} label="Packaging (Opt.)">
                            <img className="p-0.5" src="/config-menu-svgs/packaging.webp" alt="DARKAI configurator packaging icon"/>
                        </ConfiguratorButton>
                    </nav>
                </div>
                {innerWidth >= 1024  &&
                    <div className={`absolute z-20 left-10 w-[20vw] ${innerHeight < 640 ? 'top-[-96px]' : 'bottom-6'}`}>
                        <Iubenda/>
                    </div>
                }
            </div>
        </>
    )
}