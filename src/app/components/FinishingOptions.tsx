import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function FinishingOptions({tooth, enamel}:{tooth:string|undefined, enamel:boolean}) {

    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    const setPave = useTeethStore((state: State) => state.setPave);

    function changePaveShape(e:any) {
        if(tooth) {
            setActiveSubButton(e);
            if(e === 'nopave') {
                setPave(tooth, e, undefined);
            } else {
                setPave(tooth, e, 'prev');
            }
        }
    }

    return (
        <>
            <button onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="nopave" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">No pave
            </button>
            <button disabled={enamel} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="mosaic" className={`cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel ? 'text-slate-400' : 'text-slate-950'}  text-center`}>Mosaic
            </button>
            <button disabled={enamel} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="round" className={`cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel ? 'text-slate-400' : 'text-slate-950'}  text-center`}>Round
            </button>
            <button disabled={enamel} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="hexagon" className={`cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel ? 'text-slate-400' : 'text-slate-950'}  text-center`}>Hexagon
            </button>
            <button disabled={enamel} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="princess" className={`cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel ? 'text-slate-400' : 'text-slate-950'}  text-center`}>Princess
            </button>
            <button disabled={enamel} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="baguette" className={`cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 ${enamel ? 'text-slate-400' : 'text-slate-950'}  text-center`}>Baguette
            </button>
        </>
    )
}