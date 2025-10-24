import React from "react";
import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function DesignSubOptions({tooth, value}: { tooth: string, value:string|undefined }) {

    const setStone =  useTeethStore((state: State) => state.setStone);
    const setEnamel =  useTeethStore((state: State) => state.setEnamel);
    function setStoneShape(e:any) {
        setStone(tooth, e, 'prev');
    }

    function setEnamelColor(e:any) {
        setEnamel(tooth, e);
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
            <div className={`${value === 'bezel' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="circle" className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Round
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="heart" className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Heart
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="tear" className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Drop
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="marquise" className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Marquise
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="square" className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Princess
                    </button>
                    <button type="button" onClick={(e) => setStoneShape(e.currentTarget.value)} value="baguette" className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Baguette
                    </button>
                </div>
            </div>
            <div
                className={`${value === 'enamel' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center relative bottom-60`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" value="blue" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Blue</button>
                    <button type="button" value="turquoise" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Turquoise</button>
                    <button type="button" value="green" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Green</button>
                    <button type="button" value="yellow" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Yellow</button>
                    <button type="button" value="orange" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Orange</button>
                    <button type="button" value="red" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Red</button>
                    <button type="button" value="pink" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Pink</button>
                    <button type="button" value="purple" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Purple</button>
                    <button type="button" value="ivory" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Ivory</button>
                    <button type="button" value="brown" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Brown</button>
                    <button type="button" value="black" onClick={(e) => setEnamelColor(e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Black</button>
                </div>
            </div>
        </>
    )
}