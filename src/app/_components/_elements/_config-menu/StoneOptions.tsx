import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function StoneOptions({tooth, bezel, pave}:{tooth:string|undefined, bezel:boolean, pave:boolean}) {
   const paveColor = useTeethStore((state: State) => tooth ? state.teethPaves[tooth].color : undefined);
   const bezelColor = useTeethStore((state: State) => tooth ? state.teethStones[tooth].color : undefined);
   const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
   const setStone =  useTeethStore((state: State) => state.setStone);
   const setPave =  useTeethStore((state: State) => state.setPave);
   function setStoneColor(e:any) {
       if(tooth && bezel) {
               setActiveSubButton(e);
               setStone(tooth, 'prev', e);
           } else if(tooth && !bezel) {
               setActiveSubButton(e);
               setPave(tooth, 'prev', e);
           }
   }

    return (
        <>
            <button type="button" disabled={!pave && !bezel} value="whD"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'whD' || bezelColor === 'whD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/whD.svg" alt="white-diamond"/>
                <span className="text-xs">White Diamond</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="brD"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'brD' || bezelColor === 'brD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/brD.svg" alt="brown-diamond"/>
                <span className="text-xs">Brown Diamond</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="blD"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'blD' || bezelColor === 'blD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/blD.svg" alt="black-diamond"/>
                <span className="text-xs">Black Diamond</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="ruby"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'ruby' || bezelColor === 'ruby') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/ruby.svg" alt="ruby"/>
                <span className="text-xs">Ruby</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="emerald"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'emerald' || bezelColor === 'emerald') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/emerald.svg" alt="emerald"/>
                <span className="text-xs">Emerald</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="bSapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'bSapph' || bezelColor === 'bSapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/bSapph.svg" alt="blue-sapphire"/>
                <span className="text-xs">Blue Sapphire</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="ySapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'ySapph' || bezelColor === 'ySapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/ySapph.svg" alt="yellow-sapphire"/>
                <span className="text-xs">Yellow Sapphire</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="pSapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'pSapph' || bezelColor === 'pSapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/pSapph.svg" alt="pink-sapphire"/>
                <span className="text-xs">Pink Sapphire</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="aqua"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'aqua' || bezelColor === 'aqua') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/aqua.svg" alt="aquamarina"/>
                <span className="text-xs">Aquamarine</span>
            </button>
            <button type="button" disabled={!pave && !bezel} value="ameth"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${(paveColor === 'ameth' || bezelColor === 'ameth') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/ameth.svg" alt="amethyst"/>
                <span className="text-xs">Amethyst</span>
            </button>
            {!bezel &&
                <>
                    <button type="button" disabled={!pave} value="glitch"
                            onClick={(e) => setStoneColor(e.currentTarget.value)}
                            className={`${paveColor === 'glitch' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                        <img src="/color-icons/glitch.svg" alt="glitch"/>
                        <span className="text-xs">Glitch</span>
                    </button>
                    <button type="button" disabled={!pave} value="camo"
                            onClick={(e) => setStoneColor(e.currentTarget.value)}
                            className={`${paveColor === 'camo' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                        <img src="/color-icons/camo.svg" alt="camo"/>
                        <span className="text-xs">Camo</span>
                    </button>
                </>
            }
        </>
    )
}