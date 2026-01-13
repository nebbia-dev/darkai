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
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
            {
                (tooth === 'cidx' || tooth === 'cisx') &&
                <div aria-hidden={true} className="h-[120px] mb-4 pl-6"></div>
            }
            <div className={`${value?.includes('bezel') || type?.includes('bezel') ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="circle"
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                        <Image priority loading="eager" fetchPriority="high" src={Circle} alt="circle-bezel"/>
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="heart"
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                        <Image priority loading="eager" fetchPriority="high" className="pt-[0.15em] px-[0.1em]" src={Heart} alt="heart-bezel"/>
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="tear"
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                        <Image priority loading="eager" fetchPriority="high" className="pt-[0.05em]" src={Drop} alt="tear-bezel"/>
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="marquise"
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                        <Image priority loading="eager" fetchPriority="high" className="pl-[1px]" src={Marquise} alt="marquise-bezel"/>
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="square"
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                        <Image priority loading="eager" fetchPriority="high" src={Princess} alt="princess-bezel"/>
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="baguette"
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer border-1">
                        <Image priority loading="eager" fetchPriority="high" className="pt-[0.025em]" src={Baguette} alt="baguette-bezel"/>
                    </button>
                </div>
            </div>
            <div
                className={`${value === 'enamel' || type === 'enamel' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center relative bottom-60`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" value="blue" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#0073b6] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="turquoise" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#00bdca] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="green" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#0c8241] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="yellow" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ffc007] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="orange" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ff7b00] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="red" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#e91825] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="pink" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ff6588] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="purple" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#ae3b9f] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="ivory" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#f1eee1] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="brown" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#4c3e34] rounded-full cursor-pointer border-1"></button>
                    <button type="button" value="black" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-[#1d1e1e] rounded-full cursor-pointer border-1"></button>
                </div>
            </div>
        </>
    )
}