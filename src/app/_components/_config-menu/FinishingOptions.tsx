import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function FinishingOptions({tooth, enamel, visible, signature}:{tooth:string|undefined, enamel:boolean, visible: boolean|undefined, signature: boolean|undefined}) {

    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    const setPave = useTeethStore((state: State) => state.setPave);

    function isDisabled(finish:'pave'| 'nopave') {
        return !!((finish === 'pave' && (enamel || !visible || signature))
            || (finish === 'nopave' && (!visible || signature)));

    }

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
            <button disabled={isDisabled('nopave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="nopave-pol"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${isDisabled('nopave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} text-center`}>Polished
            </button>
            <button disabled={isDisabled('nopave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="nopave-sblast"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${isDisabled('nopave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} text-center`}>Sandblasted
            </button>
            <button disabled={isDisabled('nopave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="nopave-dcut"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${isDisabled('nopave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} text-center`}>Diamond cut
            </button>
            <button disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="mosaic"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Mosaic
            </button>
            <button disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="round"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Round
            </button>
            <button disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="hexagon"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Hexagon
            </button>
            <button disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="princess"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Princess
            </button>
            <button disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                    value="baguette"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'}  text-center`}>Baguette
            </button>
        </>
    )
}