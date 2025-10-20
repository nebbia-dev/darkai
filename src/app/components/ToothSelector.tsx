import React, {SyntheticEvent, useState} from "react";
import {useTeethStore} from "@/app/stores/teeth";
import SelectorButtonPill from "@/app/components/SelectorButtonPill";
import DiamondTogglerPill from "@/app/components/DiamondTogglerPill";
import StoneSelectorPill from "@/app/components/StoneSelectorPill";
import {Shape} from "@/app/components/icons/Shape";
import {Metal} from "@/app/components/icons/Metal";
import {Gem} from "@/app/components/icons/Gem";
import {State} from "@/app/types/State";
import ConfiguratorButton from "@/app/components/ConfiguratorButton";

export default function ToothSelector({tooth, onclick, active} : {tooth: string | undefined, active:string|undefined, onclick: (value:string) => void,}) {
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
    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return(

        <div className="relative flex flex-col gap-4">
            <ConfiguratorButton inverse={false} value="2" active={active} onclick={onclick}>De</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="3" active={active} onclick={onclick}>Go</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="4" active={active} onclick={onclick}>Fi</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="5" active={active} onclick={onclick}>Co</ConfiguratorButton>

            <div
                className={`${!active ? 'hidden' : 'block'} text-center h-[80vh] w-[300px] bg-gray-50 rounded-3xl absolute top-[-30vh] left-[48px] p-8 overflow-y-scroll border-1`}>
                <div className="w-[95%] h-[216px] mx-auto rounded-3xl bg-stone-200 mb-4"></div>
                <div className="w-[95%] h-[216px] mx-auto rounded-3xl bg-stone-200 mb-4"></div>
                <div className="w-[95%] h-[216px] mx-auto rounded-3xl bg-stone-200 mb-4"></div>
                <div className="w-[95%] h-[216px] mx-auto rounded-3xl bg-stone-200 mb-4"></div>
            </div>

        </div>
    )
}