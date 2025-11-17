import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function FinishingOptions({tooth, enamel, visible}:{tooth:string|undefined, enamel:boolean, visible: boolean|undefined}) {

    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    const setPave = useTeethStore((state: State) => state.setPave);

    function changePaveShape(e:any) {
        if(tooth) {
            setActiveSubButton(e);
            if(e.includes('nopave')) {
                setPave(tooth, e, undefined);
            } else {
                setPave(tooth, e, 'prev');
            }
        }
    }

    return (
        <>
            <button disabled={!visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="nopave-pol"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${!visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} text-center`}>Polished
            </button>
            <button disabled={!visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="nopave-sblast"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${!visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} text-center`}>Sandblasted
            </button>
            <button disabled={!visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="nopave-dcut"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${!visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} text-center`}>Diamond cut
            </button>
            <button disabled={enamel || !visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="mosaic"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel || !visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Mosaic
            </button>
            <button disabled={enamel || !visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="round"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel || !visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Round
            </button>
            <button disabled={enamel || !visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="hexagon"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel || !visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Hexagon
            </button>
            <button disabled={enamel || !visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="princess"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${enamel || !visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Princess
            </button>
            <button disabled={enamel || !visible} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="baguette"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 ${enamel || !visible ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Baguette
            </button>
        </>
    )
}