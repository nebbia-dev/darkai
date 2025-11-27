import React, {useRef} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import ConfiguratorButton from "@/app/_components/_elements/_buttons/ConfiguratorButton";
import DesignOptions from "@/app/_components/_elements/_config-menu/DesignOptions";
import GoldOptions from "@/app/_components/_elements/_config-menu/GoldOptions";
import FinishOptions from "@/app/_components/_elements/_config-menu/FinishOptions";
import StoneOptions from "@/app/_components/_elements/_config-menu/StoneOptions";
import SignatureOptions from "@/app/_components/_elements/_config-menu/SignatureOptions";
import PackagingOptions from "@/app/_components/_elements/_config-menu/PackagingOptions";
import DesignSubOptions from "@/app/_components/_elements/_config-menu/DesignSubOptions";
import PackagingSubOptions from "@/app/_components/_elements/_config-menu/PackagingSubOptions";
import SignatureSubOptions from "@/app/_components/_elements/_config-menu/SignatureSubOptions";
import checkSignature from "@/app/_helpers/_checkers/checkSignature";
import checkMolar from "@/app/_helpers/_checkers/checkMolar";

export default function ToothConfigOptions({tooth, onclick, active} : {tooth: string | undefined, active:string|undefined, onclick: (value:string) => void}) {
    const pave = useTeethStore((state: State) => tooth ? state.teethPaves[tooth] : undefined);
    const jewelType = useTeethStore((state: State) => tooth ? state.teethJewelType[tooth] : undefined);
    const material = useTeethStore((state: State) => tooth ? state.teethMaterial[tooth] : undefined);
    const finish = useTeethStore((state: State) => tooth ? state.teethFinish[tooth] : undefined);
    const visibility = useTeethStore((state: State) => tooth ? state.teethVisibility[tooth] : undefined);
    const elementRef = useRef<HTMLDivElement|null>(null);
    const selectorRef = useRef<HTMLDivElement|null>(null);

    function renderOptions(active:string|undefined, tooth:string|undefined) {
        switch(active) {
            case "1":
                return <SignatureOptions/>
            case "2":
                return <DesignOptions tooth={tooth} />
            case "3":
                return <GoldOptions tooth={tooth} signature={checkSignature(jewelType)}/>
            case "4":
                return <FinishOptions tooth={tooth} jewelType={jewelType} visible={visibility} signature={checkSignature(jewelType)}/>
            case "5":
                return <StoneOptions tooth={tooth} bezel={jewelType === 'bezel'|| jewelType === 'bezelDiamond'} pave={!!pave?.shape} />
            case "6":
                return <PackagingOptions/>
            default:
                return (<div className="w-[95%] h-[120px] mx-auto rounded-3xl  mb-4 p-2 text-center">Choose a tooth first</div>)
        }
    }

    function renderSubOptions(active:string|undefined, tooth:string|undefined) {
        switch(active) {
            case "1":
                return <SignatureSubOptions/>
            case "2":
                return <DesignSubOptions tooth={tooth} type={jewelType}/>
            case "6":
                return <PackagingSubOptions/>
        }
    }

    function sync() {
        if(selectorRef.current && elementRef.current) {
            selectorRef.current.scrollTop = elementRef.current.scrollTop;
        }
    }

    return(

        <div className="relative flex flex-col gap-4">
            <ConfiguratorButton inverse={false} value="2" active={active} onclick={onclick} tooth={tooth}
                                label="Grillz Type">
                <img src="/config-menu-svgs/design.svg" alt="design-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="3" active={active} onclick={onclick} tooth={tooth}
                                label="Gold Color">
                <img src="/config-menu-svgs/gold.svg" alt="gold-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="4" active={active} onclick={onclick} tooth={tooth}
                                label="Finish">
                <img src="/config-menu-svgs/color.svg" alt="diamond-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="5" active={active} onclick={onclick} tooth={tooth}
                                label="Stone Color">
                <img src="/config-menu-svgs/finish.svg" alt="color-option-logo"/>
            </ConfiguratorButton>

            <div className={`absolute ${!active ? 'hidden' : 'block'} ${active === '1'
                ? 'top-[-30vh]'
                : (active === '2' && !checkMolar(tooth))
                    ? 'top-[-25vh]'
                    : (active === '2' && checkMolar(tooth))
                        ? 'top-[-10vh]'
                        : (active === '5' && (jewelType?.includes('Diamond') || jewelType?.includes('bezel')))
                            ? 'top-[-30vh]'
                            : active === '6'
                                ? 'top-[13.5vh]'
                                : 'top-[-20vh]'
            } left-[48px]`}>
                <div className={`${(active === '5' && (jewelType?.includes('Diamond') || jewelType?.includes('bezel'))) ? 'block' : 'hidden'} rounded-3xl bg-gray-50 border-1 py-4 px-8 text-sm w-[200px] mb-4`}>You're choosing the <strong>{jewelType?.includes('bezel') ? 'bezel' : 'pave'}</strong> stone color</div>
                <div
                    className={`pups text-center ${active === '6' ? 'h-[324px]' : (active === '2' && checkMolar(tooth)) ? 'h-[186px]' : 'h-[596px]'} w-[200px] bg-gray-50 rounded-3xl p-8 pr-4 border-1`}>
                    <div onScroll={sync} ref={elementRef} className="overflow-y-scroll h-full pl-[2px] pr-4">
                        {renderOptions(active, tooth)}
                    </div>
                </div>
            </div>


            <div
                className={`${!active ? 'hidden' : 'block'} pups text-center h-[596px] w-[64px] absolute left-[240px] 
                            ${active === '1'
                    ? 'top-[-30vh]'
                    : active === '2'
                        ? 'top-[-25vh]'
                        : active === '6'
                            ? 'top-[-10vh]'
                            : 'top-[-20vh]'
                } py-8`}>
                <div ref={selectorRef} className="whitespace-nowrap overflow-hidden h-full w-full">
                    {renderSubOptions(active, tooth)}
                </div>
            </div>

        </div>
    )
}