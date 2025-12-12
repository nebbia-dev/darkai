import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import React, {Ref} from "react";

export default function FinishOptions({tooth, jewelType, visible, signature, polishedRef, sBlastRef, dCutRef, mosaicRef, roundRef, hexRef, princessRef, baguetteRef}:{
    tooth:string|undefined,
    jewelType:string|undefined,
    visible: boolean|undefined,
    signature: boolean|undefined
    polishedRef:Ref<HTMLButtonElement|null>,
    sBlastRef:Ref<HTMLButtonElement|null>,
    dCutRef:Ref<HTMLButtonElement|null>,
    mosaicRef:Ref<HTMLButtonElement|null>,
    roundRef:Ref<HTMLButtonElement|null>,
    hexRef:Ref<HTMLButtonElement|null>,
    princessRef:Ref<HTMLButtonElement|null>,
    baguetteRef:Ref<HTMLButtonElement|null>
}) {
    const finish = useTeethStore((state: State) => tooth ? state.teethFinish[tooth] : undefined);
    const pave = useTeethStore((state: State) => tooth ? state.teethPaves[tooth] : undefined);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    const setPave = useTeethStore((state: State) => state.setPave);

    function isDisabled(finish:'pave'| 'nopave') {
        return !!((finish === 'pave' && (jewelType === 'enamel' || !visible || signature))
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
            <button ref={polishedRef} disabled={isDisabled('nopave')} onClick={(e) => changePaveShape(e.currentTarget.value)}
                    type="button"
                    value="nopave-pol"
                    className={`${(finish === 'polished' && !pave?.shape) ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 ${jewelType?.includes('enamel') ? '' : 'mb-4' } p-2 ${isDisabled('nopave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img className="pb-3" src="/finish-icons/polished.svg" alt="polished-metal"/>
                <span className="text-sm">Polished</span>
            </button>
            {!jewelType?.includes('enamel') &&
                <button ref={sBlastRef} disabled={isDisabled('nopave')} onClick={(e) => changePaveShape(e.currentTarget.value)}
                     type="button"
                     value="nopave-sblast"
                     className={`${(finish === 'sandblasted' && !pave?.shape) ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 ${isDisabled('nopave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img className="pb-3" src="/finish-icons/sandblasted.svg" alt="sandblasted-metal"/>
                <span className="text-sm">Sandblasted</span>
            </button>}
            {!jewelType?.includes('enamel') &&
                <button ref={dCutRef} disabled={isDisabled('nopave')} onClick={(e) => changePaveShape(e.currentTarget.value)}
                     type="button"
                     value="nopave-dcut"
                     className={`${(finish === 'diamond_cut' && !pave?.shape) ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 ${!jewelType?.includes('enamel') ? 'mb-4' : ''} p-2 ${isDisabled('nopave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img className="pb-3" src="/finish-icons/diamondcut.svg" alt="diamond-cut-metal"/>
                <span className="text-sm">Diamond cut</span>
            </button>}
            {(!jewelType || (jewelType.includes('full') || jewelType.includes('bezel'))) &&
                <button ref={mosaicRef} disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                     value="mosaic"
                     className={`${pave?.shape === 'mosaic' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img src="/finish-icons/mosaic.svg" alt="mosaic-pave"/>
                <span className="text-sm">Mosaic</span>
            </button>}
            {(!jewelType || !jewelType.includes('enamel')) &&
                <button ref={roundRef} disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                     value="round"
                     className={`${pave?.shape === 'round' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img src="/finish-icons/round.svg" alt="round-pave"/>
                <span className="text-sm">Round</span>
            </button>}
            {(!jewelType || (jewelType.includes('full') || jewelType.includes('bezel'))) &&
                <button ref={hexRef} disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                     value="hexagon"
                     className={`${pave?.shape === 'hexagon' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img className="pb-1" src="/finish-icons/hex.svg" alt="hexagon-pave"/>
                <span className="text-sm">Hexagon</span>
            </button>}
            {(!jewelType || (jewelType.includes('full') || jewelType.includes('bezel'))) &&
                <button ref={princessRef} disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                     value="princess"
                     className={`${pave?.shape === 'princess' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 mb-4 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img className="pb-1" src="/finish-icons/princess.svg" alt="princess-pave"/>
                <span className="text-sm">Princess</span>
            </button>}
            {(!jewelType || jewelType !== 'enamel') &&
                <button ref={baguetteRef} disabled={isDisabled('pave')} onClick={(e) => changePaveShape(e.currentTarget.value)} type="button"
                     value="baguette"
                     className={`${pave?.shape === 'baguette' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 ${isDisabled('pave') ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} flex flex-col items-center justify-center`}>
                <img className="pb-1" src="/finish-icons/baguette.svg" alt="baguette-pave"/>
                <span className="text-sm">Baguette</span>
            </button>}
        </>
    )
}