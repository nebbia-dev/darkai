import React from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import Image from 'next/image';
import Baguette from "@/../public/bezel-icons/baguette.webp";
import Circle from "@/../public/bezel-icons/circle.webp";
import Drop from "@/../public/bezel-icons/drop.webp";
import Heart from "@/../public/bezel-icons/heart.webp";
import Marquise from "@/../public/bezel-icons/marquise.webp";
import Princess from "@/../public/bezel-icons/princess.webp";
import {Tooltip} from "@mui/material";

export default function DesignSubOptions({tooth, type}: { tooth: string|undefined, type:string|undefined }) {
    const setStone =  useTeethStore((state: State) => state.setStone);
    const setEnamel =  useTeethStore((state: State) => state.setEnamel);
    const value = useTeethStore((state: State) => state.activeSubButton);
    function setStoneShape(e:any) {
        if(tooth) {
            setStone(tooth, e, 'prev');
        }
    }

    function setEnamelColor(e:any) {
        if(tooth) {
            setEnamel(tooth, e);
        }
    }

    return (
        <>
            <div aria-hidden={true} className="h-[170px] lg:h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[170px] lg:h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[170px] lg:h-[120px] mb-4 pl-6">
            </div>
            {
                (tooth === 'cidx' || tooth === 'cisx') &&
                <div aria-hidden={true} className="h-[170px] lg:h-[120px] mb-4 pl-6"></div>
            }
            <div className={`${value?.includes('bezel') || type?.includes('bezel') ? 'block' : 'invisible'} h-[170px] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Round" placement="right">
                        <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="round"
                                className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Circle} alt="circle-bezel"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Heart" placement="right">
                        <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="heart"
                                className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" className="pt-[0.15em] px-[0.1em]" src={Heart} alt="heart-bezel"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Drop" placement="right">
                        <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="drop"
                                className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" className="pt-[0.05em]" src={Drop} alt="tear-bezel"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Marquise" placement="right">
                        <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="marquise"
                                className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" className="pl-[1px]" src={Marquise} alt="marquise-bezel"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Princess" placement="right">
                        <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="princess"
                                className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Princess} alt="princess-bezel"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Baguette" placement="right">
                        <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="baguette"
                                className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" className="pt-[0.025em]" src={Baguette} alt="baguette-bezel"/>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div
                className={`${value === 'enamel' || type === 'enamel' ? 'block' : 'invisible'} h-[170px] lg:h-[120px] mb-4 pl-6 text-center relative bottom-50 lg:bottom-60`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Blue" placement="right">
                        <button type="button" value="blue" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#0073b6] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Turquoise" placement="right">
                        <button type="button" value="turquoise" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#00bdca] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Green" placement="right">
                        <button type="button" value="green" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#0c8241] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Yellow" placement="right">
                        <button type="button" value="yellow" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ffc007] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Orange" placement="right">
                        <button type="button" value="orange" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ff7b00] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Red" placement="right">
                        <button type="button" value="red" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#e91825] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Pink" placement="right">
                        <button type="button" value="pink" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ff6588] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Purple" placement="right">
                        <button type="button" value="purple" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ae3b9f] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Ivory" placement="right">
                        <button type="button" value="ivory" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#f1eee1] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Brown" placement="right">
                        <button type="button" value="brown" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#4c3e34] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                    <Tooltip title="Black" placement="right">
                        <button type="button" value="black" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#1d1e1e] rounded-full cursor-pointer border-1"></button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}