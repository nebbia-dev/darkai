import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function StoneOptions({tooth, bezel, pave}:{tooth:string|undefined, bezel:boolean, pave:boolean}) {

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
            <button type="button" disabled={!pave && !bezel} value="whD" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>White Diamond
            </button>
            <button type="button" disabled={!pave && !bezel} value="brD" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Brown Diamond
            </button>
            <button type="button" disabled={!pave && !bezel} value="blD" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Black Diamond
            </button>
            <button type="button" disabled={!pave && !bezel} value="ruby" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Ruby
            </button>
            <button type="button" disabled={!pave && !bezel} value="emerald" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Emerald
            </button>
            <button type="button" disabled={!pave && !bezel} value="bSapph" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Blue Sapphire
            </button>
            <button type="button" disabled={!pave && !bezel} value="ySapph" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Yellow Sapphire
            </button>
            <button type="button" disabled={!pave && !bezel} value="pSapph" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Pink Sapphire
            </button>
            <button type="button" disabled={!pave && !bezel} value="aqua" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Aquamarine
            </button>
            <button type="button" disabled={!pave && !bezel} value="ameth" onClick={(e) => setStoneColor(e.currentTarget.value)} className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Amethyst
            </button>
            {!bezel &&
                    <>
                       <button type="button" disabled={!pave} value="glitch" onClick={(e) => setStoneColor(e.currentTarget.value)}
                               className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Glitch
                       </button>
                       <button type="button" disabled={!pave} value="camo" onClick={(e) => setStoneColor(e.currentTarget.value)}
                               className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} text-center`}>Camo
                       </button>
                    </>
}
        </>
    )
}