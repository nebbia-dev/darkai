import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function StoneOptions({tooth, bezel}:{tooth:string|undefined, bezel:boolean}) {

   const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
   const setStone =  useTeethStore((state: State) => state.setStone);
   function setStoneColor(e:any) {
           if(tooth && bezel) {
                   setActiveSubButton(e);
                   setStone(tooth, 'prev', e);
           }
   }

    return (
        <>
            <button type="button" value="whD" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">White Diamond
            </button>
            <button type="button" value="brD" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Brown Diamond
            </button>
            <button type="button" value="blD" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Black Diamond
            </button>
            <button type="button" value="ruby" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Ruby
            </button>
            <button type="button" value="emerald" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Emerald
            </button>
            <button type="button" value="bSapph" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Blue Sapphire
            </button>
            <button type="button" value="ySapph" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Yellow Sapphire
            </button>
            <button type="button" value="pSapph" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Pink Sapphire
            </button>
            <button type="button" value="aqua" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Aquamarine
            </button>
            <button type="button" value="ameth" onClick={(e) => setStoneColor(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Amethyst
            </button>
            {!bezel &&
                    <>
                       <button type="button" value="glitch" onClick={(e) => setStoneColor(e.currentTarget.value)}
                                className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Glitch
                       </button>
                       <button type="button" value="camo" onClick={(e) => setStoneColor(e.currentTarget.value)}
                               className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Camo
                       </button>
                    </>
}
        </>
    )
}