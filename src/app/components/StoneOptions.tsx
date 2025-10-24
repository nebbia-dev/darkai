import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function StoneOptions({tooth}:{tooth:string|undefined}) {

        const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);

    return (
        <>
            <button type="button" value="whDLab" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">White Diamond (lab)
            </button>
            <button type="button" value="whDNat" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">White Diamond
                (natural)
            </button>
            <button type="button" value="brDLab" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Brown Diamond (lab)
            </button>
            <button type="button" value="brDNat" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Brown Diamond
                (natural)
            </button>
            <button type="button" value="blDLab" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Black Diamond (lab)
            </button>
            <button type="button" value="blDNat" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Black Diamond
                (natural)
            </button>
            <button type="button" value="ruby" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Ruby
            </button>
            <button type="button" value="emerald" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Emerald
            </button>
            <button type="button" value="bSapph" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Blue Sapphire
            </button>
            <button type="button" value="ySapph" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Yellow Sapphire
            </button>
            <button type="button" value="pSapph" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Pink Sapphire
            </button>
            <button type="button" value="aqua" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Aquamarine
            </button>
            <button type="button" value="ameth" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Amethyst
            </button>
            <button type="button" value="glitch" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Glitch
            </button>
            <button type="button" value="camo" onClick={(e) => setActiveSubButton(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Camo
            </button>
        </>
    )
}