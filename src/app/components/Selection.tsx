'use client'
import {FormEvent, ReactNode, useEffect, useState} from "react";
import {Modal, Tooltip} from "@mui/material";
import ToothSelector from "@/app/components/ToothSelector";
import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";
import elabToothName from "@/app/helpers/elabToothName";
import Link from 'next/link';
import firstCapital from "@/app/helpers/firstCapital";
import {Packaging} from "@/app/components/icons/Packaging";
import {Info} from "@/app/components/icons/Info";
import {Close} from "@/app/components/icons/Close";
import ConfiguratorButton from "@/app/components/ConfiguratorButton";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export default function Selection({activeButton, changeActiveButton} : {activeButton: string|undefined, changeActiveButton:(value:string) => void }) {
    const total = useTeethStore((state:State) => state.total);
    const totalPreciousness = useTeethStore((state:State) => state.totalPreciousness);
    const calcPreciousness = useTeethStore((state:State) => state.calcPreciousness);
    const visibleTeeth = useTeethStore((state:State) => state.teethVisibility);
    const jewelType = useTeethStore((state: State) => state.teethJewelType);
    const material = useTeethStore((state: State) => state.teethMaterial);
    const pave = useTeethStore((state: State) => state.teethPave);
    const stones = useTeethStore((state: State) => state.teethStones);
    const teethPrices = useTeethStore((state:State) => state.teethPrices);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const setActiveTooth =  useTeethStore((state: State) => state.setActiveTooth);
    const activeTab = useTeethStore((state: State) => state.activeTab);
    const setActiveTab = useTeethStore((state: State) => state.setActiveTab);
    const recap = useTeethStore((state:State) => state.recap);
    const setRecap = useTeethStore((state:State) => state.setRecap);

    const [gold, setGold] = useState<string>('14k');
    const [diamond, setDiamond] = useState<string>('mois');


    const [showManual, setShowManual] = useState<boolean>(false);
    function checkDiamonds() {
        for(const tooth of Object.keys(jewelType)) {
            if(jewelType[tooth].includes('Diamond')) {
                return true;
            }
        }
        return false;
    }
    function showRecap() {
        setRecap(true);
        setActiveTooth(undefined);
        calcPreciousness(gold, diamond);
    }

    useEffect(() => {
        if(checkDiamonds()) {
            calcPreciousness(gold, diamond);
        } else {
            calcPreciousness(gold, undefined);
        }
    }, [recap, gold, diamond]);

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
                        <ConfiguratorButton tooth="alwaysActive" inverse={true} value="1" active={activeButton} onclick={changeActiveButton} label="Signature Designs">
                            SD
                        </ConfiguratorButton>
                        <span aria-hidden={true} className="relative z-20 inline-block h-[2px] w-8 bg-slate-950"></span>
                        <ToothSelector tooth={activeTooth} active={activeButton} onclick={changeActiveButton}/>
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