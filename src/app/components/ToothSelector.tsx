import React, {useRef, useState} from "react";
import {useTeethStore} from "@/app/stores/teeth";
import {Shape} from "@/app/components/icons/Shape";
import {Metal} from "@/app/components/icons/Metal";
import {Gem} from "@/app/components/icons/Gem";
import {State} from "@/app/types/State";
import ConfiguratorButton from "@/app/components/ConfiguratorButton";
import DesignOptions from "@/app/components/DesignOptions";
import GoldOptions from "@/app/components/GoldOptions";
import FinishingOptions from "@/app/components/FinishingOptions";
import StoneOptions from "@/app/components/StoneOptions";
import SignatureOptions from "@/app/components/SignatureOptions";
import PackagingOptions from "@/app/components/PackagingOptions";
import DesignSubOptions from "@/app/components/DesignSubOptions";
import FinishingSubOptions from "@/app/components/FinishingSubOptions";
import PackagingSubOptions from "@/app/components/PackagingSubOptions";
import SignatureSubOptions from "@/app/components/SignatureSubOptions";

export default function ToothSelector({tooth, onclick, active} : {tooth: string | undefined, active:string|undefined, onclick: (value:string) => void}) {
    const [activeSubButton, setActiveSubButton] = useState<string|undefined>(undefined);
    const [value, setValue] = useState<number>(0);
    const pave = useTeethStore((state: State) => tooth ? state.teethPave[tooth] : undefined);
    const jewelType = useTeethStore((state: State) => tooth ? state.teethJewelType[tooth] : undefined);
    const material = useTeethStore((state: State) => tooth ? state.teethMaterial[tooth] : undefined);
    const stones = useTeethStore((state: State) => tooth ? state.teethStones[tooth] : undefined);
    const visible = useTeethStore((state: State) => tooth ? state.teethVisibility[tooth] : undefined);
    const changeJewelType = useTeethStore((state: State) => state.setType);
    const changeMaterial = useTeethStore((state: State) => state.setMaterial);
    const toggleDiamond = useTeethStore((state: State) => state.setDiamond);
    const changeStone = useTeethStore((state: State) => state.setStone);
    const setActiveDefault = useTeethStore((state: State) => state.setActiveDefault);

    const elementRef = useRef<HTMLDivElement|null>(null);
    const selectorRef = useRef<HTMLDivElement|null>(null);

    function selectType(type: string) {
        if(tooth) {
            setActiveDefault(undefined, undefined);
            changeJewelType(tooth, type);
        }
    }

    function selectMaterial(material: string) {
        if(tooth) {
            setActiveDefault(undefined, undefined);
            changeMaterial(tooth, material);
        }
    }

    function selectDiamond() {
        if(tooth && pave) {
            toggleDiamond(tooth, pave);
        }
    }

    function selectStone(stone: string) {
        if(tooth) {
            changeStone(tooth, stone, 'prev');
        }
    }

    function renderOptions(active:string|undefined, tooth:string|undefined) {
        switch(active) {
            case "1":
                return <SignatureOptions onclick={changeActiveSubButton}/>
            case "2":
                return <DesignOptions tooth={tooth} onclick={changeActiveSubButton} />
            case "3":
                return <GoldOptions tooth={tooth} onclick={changeActiveSubButton}/>
            case "4":
                return <FinishingOptions tooth={tooth} onclick={changeActiveSubButton}/>
            case "5":
                return <StoneOptions tooth={tooth} onclick={changeActiveSubButton}/>
            case "6":
                return <PackagingOptions onclick={changeActiveSubButton}/>
            default:
                return (<div className="w-[95%] h-[120px] mx-auto rounded-3xl  mb-4 p-2 text-center">Choose a tooth first</div>)
        }
    }

    function renderSubOptions(active:string|undefined, tooth:string|undefined) {
        switch(active) {
            case "1":
                return <SignatureSubOptions value={activeSubButton}/>
            case "2":
                return <DesignSubOptions tooth={tooth} value={activeSubButton}/>
            case "4":
                return <FinishingSubOptions tooth={tooth} value={activeSubButton}/>
            case "6":
                return <PackagingSubOptions value={activeSubButton}/>
        }
    }

    function sync() {
        selectorRef.current.scrollTop = elementRef.current?.scrollTop;
    }

    function changeActiveSubButton(value:string) {
        if(value === activeSubButton) {
            setActiveSubButton(undefined)
        } else {
            setActiveSubButton(value);
        }
    }

    // ho sia il bottone selezionato sia l'activeTooth

    return(

        <div className="relative flex flex-col gap-4">
            <ConfiguratorButton inverse={false} value="2" active={active} onclick={onclick} label="Grillz Type">De</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="3" active={active} onclick={onclick} label="Gold Color">Go</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="4" active={active} onclick={onclick} label="Finishing">Fi</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="5" active={active} onclick={onclick} label="Stone Color">Co</ConfiguratorButton>

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