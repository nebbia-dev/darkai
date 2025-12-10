import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Ref} from "react";

export default function StoneOptions({tooth, bezel, pave, whDRef, brDRef, blDRef, rubyRef, emeraldRef, bSapphRef, ySapphRef, pSapphRef, aquaRef, amethRef, camoRef, glitchRef}:{
    tooth:string|undefined,
    bezel:boolean,
    pave:boolean,
    whDRef:Ref<HTMLButtonElement|null>,
    brDRef:Ref<HTMLButtonElement|null>,
    blDRef:Ref<HTMLButtonElement|null>,
    rubyRef:Ref<HTMLButtonElement|null>,
    emeraldRef:Ref<HTMLButtonElement|null>,
    bSapphRef:Ref<HTMLButtonElement|null>,
    ySapphRef:Ref<HTMLButtonElement|null>,
    pSapphRef:Ref<HTMLButtonElement|null>,
    amethRef:Ref<HTMLButtonElement|null>,
    aquaRef:Ref<HTMLButtonElement|null>,
    camoRef:Ref<HTMLButtonElement|null>,
    glitchRef:Ref<HTMLButtonElement|null>
}) {
   const paveColor = useTeethStore((state: State) => tooth ? state.teethPaves[tooth].color : undefined);
   const bezelColor = useTeethStore((state: State) => tooth ? state.teethStones[tooth]?.color : undefined);
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

   function highlightSelected(stone:string) {
       if(!paveColor && !bezelColor) {
           return paveColor === stone || bezelColor === stone;
       } else if(!paveColor) {
           return bezelColor === stone;
       } else if(!bezelColor) {
           return paveColor === stone;
       } else {
           return bezelColor === stone;
       }
   }

    return (
        <>
            <button ref={whDRef} type="button" disabled={!pave && !bezel} value="whD"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('whD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/whD.svg" alt="white-diamond"/>
                <span className="text-xs">White Diamond</span>
            </button>
            <button ref={brDRef} type="button" disabled={!pave && !bezel} value="brD"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('brD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/brD.svg" alt="brown-diamond"/>
                <span className="text-xs">Brown Diamond</span>
            </button>
            <button ref={blDRef} type="button" disabled={!pave && !bezel} value="blD"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('blD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/blD.svg" alt="black-diamond"/>
                <span className="text-xs">Black Diamond</span>
            </button>
            <button ref={rubyRef} type="button" disabled={!pave && !bezel} value="ruby"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('ruby') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/ruby.svg" alt="ruby"/>
                <span className="text-xs">Ruby</span>
            </button>
            <button ref={emeraldRef} type="button" disabled={!pave && !bezel} value="emerald"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('emerald') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/emerald.svg" alt="emerald"/>
                <span className="text-xs">Emerald</span>
            </button>
            <button ref={bSapphRef} type="button" disabled={!pave && !bezel} value="bSapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('bSapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/bSapph.svg" alt="blue-sapphire"/>
                <span className="text-xs">Blue Sapphire</span>
            </button>
            <button ref={ySapphRef} type="button" disabled={!pave && !bezel} value="ySapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('ySapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/ySapph.svg" alt="yellow-sapphire"/>
                <span className="text-xs">Yellow Sapphire</span>
            </button>
            <button ref={pSapphRef} type="button" disabled={!pave && !bezel} value="pSapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('pSapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/pSapph.svg" alt="pink-sapphire"/>
                <span className="text-xs">Pink Sapphire</span>
            </button>
            <button ref={aquaRef} type="button" disabled={!pave && !bezel} value="aqua"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('aqua') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/aqua.svg" alt="aquamarina"/>
                <span className="text-xs">Aquamarine</span>
            </button>
            <button ref={amethRef} type="button" disabled={!pave && !bezel} value="ameth"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('ameth') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 ${pave || !bezel ? 'mb-4' : ''} px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <img src="/color-icons/ameth.svg" alt="amethyst"/>
                <span className="text-xs">Amethyst</span>
            </button>
            {!bezel &&
                <>
                    <button ref={glitchRef} type="button" disabled={!pave} value="glitch"
                            onClick={(e) => setStoneColor(e.currentTarget.value)}
                            className={`${paveColor === 'glitch' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                        <img src="/color-icons/glitch.svg" alt="glitch"/>
                        <span className="text-xs">Glitch</span>
                    </button>
                    <button ref={camoRef} type="button" disabled={!pave} value="camo"
                            onClick={(e) => setStoneColor(e.currentTarget.value)}
                            className={`${paveColor === 'camo' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 px-2 pt-2 pb-3 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                        <img src="/color-icons/camo.svg" alt="camo"/>
                        <span className="text-xs">Camo</span>
                    </button>
                </>
            }
        </>
    )
}