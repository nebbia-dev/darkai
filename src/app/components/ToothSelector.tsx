import React, {SyntheticEvent, useState} from "react";
import {useTeethStore} from "@/app/stores/teeth";
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

    function renderOptions(active:string|undefined, tooth:string|undefined) {
        switch(active) {
            case "2":
                return (
                    <>
                        <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Full
                        </div>
                        <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Frame
                        </div>
                        <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Spacer
                        </div>
                        <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Bar
                        </div>
                        <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Bezel
                        </div>
                        <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Enamel
                        </div>
                    </>)
            default:
                return (<div className="w-[95%] h-[120px] mx-auto rounded-3xl  mb-4 p-2 text-center">Choose a tooth first</div>)
        }
    }

    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // ho sia il bottone selezionato sia l'activeTooth

    return(

        <div className="relative flex flex-col gap-4">
            <ConfiguratorButton inverse={false} value="2" active={active} onclick={onclick}>De</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="3" active={active} onclick={onclick}>Go</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="4" active={active} onclick={onclick}>Fi</ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="5" active={active} onclick={onclick}>Co</ConfiguratorButton>

            <div
                className={`${!active ? 'hidden' : 'block'} pups text-center h-[600px] w-[200px] bg-gray-50 rounded-3xl absolute 
                            ${active === '1'
                                ? 'top-[-30vh]'
                                : active === '2'
                                    ? 'top-[-25vh]'
                                    : 'top-[-20vh]'
                            } left-[48px] p-8 pr-4 border-1`}>
                <div className="overflow-y-scroll h-full pl-[2px] pr-4">
                    {renderOptions(active, tooth)}
                </div>
            </div>

        </div>
    )
}