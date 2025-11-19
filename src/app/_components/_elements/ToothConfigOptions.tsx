import React, {useRef} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import ConfiguratorButton from "@/app/_components/_buttons/ConfiguratorButton";
import DesignOptions from "@/app/_components/_config-menu/DesignOptions";
import GoldOptions from "@/app/_components/_config-menu/GoldOptions";
import FinishingOptions from "@/app/_components/_config-menu/FinishingOptions";
import StoneOptions from "@/app/_components/_config-menu/StoneOptions";
import SignatureOptions from "@/app/_components/_config-menu/SignatureOptions";
import PackagingOptions from "@/app/_components/_config-menu/PackagingOptions";
import DesignSubOptions from "@/app/_components/_config-menu/DesignSubOptions";
import PackagingSubOptions from "@/app/_components/_config-menu/PackagingSubOptions";
import SignatureSubOptions from "@/app/_components/_config-menu/SignatureSubOptions";
import checkSignature from "@/app/_helpers/_checkers/checkSignature";

export default function ToothConfigOptions({tooth, onclick, active} : {tooth: string | undefined, active:string|undefined, onclick: (value:string) => void}) {
    const pave = useTeethStore((state: State) => tooth ? state.teethPaves[tooth] : undefined);
    const jewelType = useTeethStore((state: State) => tooth ? state.teethJewelType[tooth] : undefined);
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
                return <FinishingOptions tooth={tooth} enamel={jewelType === 'enamel'} visible={visibility} signature={checkSignature(jewelType)}/>
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
        selectorRef.current.scrollTop = elementRef.current?.scrollTop;
    }

    // ho sia il bottone selezionato sia l'activeTooth

    return(

        <div className="relative flex flex-col gap-4">
            <ConfiguratorButton inverse={false} value="2" active={active} onclick={onclick} tooth={tooth} label="Grillz Type">De</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="3" active={active} onclick={onclick} tooth={tooth} label="Gold Color">Go</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="4" active={active} onclick={onclick} tooth={tooth} label="Finishing">Fi</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="5" active={active} onclick={onclick} tooth={tooth} label="Stone Color">Co</ConfiguratorButton>

            <div
                className={`${!active ? 'hidden' : 'block'} pups text-center ${active === '6' ? 'h-[324px]' : 'h-[596px]'} w-[200px] bg-gray-50 rounded-3xl absolute 
                            ${active === '1'
                    ? 'top-[-30vh]'
                    : active === '2'
                        ? 'top-[-25vh]'
                        : active === '6'
                            ? 'top-[13.5vh]'
                            : 'top-[-20vh]'
                } left-[48px] p-8 pr-4 border-1`}>
                <div onScroll={sync} ref={elementRef} className="overflow-y-scroll h-full pl-[2px] pr-4">
                    {renderOptions(active, tooth)}
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