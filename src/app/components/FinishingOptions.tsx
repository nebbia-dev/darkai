import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function FinishingOptions({tooth}:{tooth:string|undefined}) {

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
            <button onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="mos" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Mosaic
            </button>
            <button onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="round" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Round
            </button>
            <button onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="hex" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Hexagon
            </button>
            <button onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="sq" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Princess
            </button>
            <button onClick={(e) => changePaveShape(e.currentTarget.value)} type="button" value="rect" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Baguette
            </button>
        </>
    )
}