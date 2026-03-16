import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Ref} from "react";
import Image from 'next/image';
import Ameth from "@/../public/color-icons/ameth.webp";
import Aqua from "@/../public/color-icons/aqua.webp";
import BLD from "@/../public/color-icons/blD.webp";
import BRD from "@/../public/color-icons/brD.webp";
import BSapph from "@/../public/color-icons/bSapph.webp";
import Camo from "@/../public/color-icons/camo.webp";
import Emerald from "@/../public/color-icons/emerald.webp";
import Glitch from "@/../public/color-icons/glitch.webp";
import PSapph from "@/../public/color-icons/pSapph.webp";
import Ruby from "@/../public/color-icons/ruby.webp";
import WHD from "@/../public/color-icons/whD.webp";
import YSapph from "@/../public/color-icons/ySapph.webp";
import startOpacityTransition from "@/app/_helpers/_css-enablers/startOpacityTransition";

export default function StoneOptions({tooth, bezel, pave, whDLabRef, whDNatRef, brDNatRef, blDNatRef, rubyRef, emeraldRef, bSapphRef, ySapphRef, pSapphRef, aquaRef, amethRef, camoRef, glitchRef}:{
    tooth:string|undefined,
    bezel:boolean,
    pave:boolean,
    whDLabRef:Ref<HTMLButtonElement|null>,
    whDNatRef:Ref<HTMLButtonElement|null>,
    brDNatRef:Ref<HTMLButtonElement|null>,
    blDNatRef:Ref<HTMLButtonElement|null>,
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
   const jewelType = useTeethStore((state: State) => tooth ? state.teethJewelType[tooth] : undefined);
   const paveColor = useTeethStore((state: State) => tooth ? state.teethPaves[tooth].color : undefined);
   const paveShape = useTeethStore((state: State) => tooth ? state.teethPaves[tooth].shape : undefined);
   const bezelColor = useTeethStore((state: State) => tooth ? state.teethStones[tooth]?.color : undefined);
   const bezelShape = useTeethStore((state: State) => tooth ? state.teethStones[tooth]?.shape : undefined);
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
            <button ref={whDLabRef} type="button" disabled={!pave && !bezel} value="whD_lab"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('whD_lab') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 py-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={WHD} alt="white-diamond"/>
                <span className="text-xs">White Diamond (Lab)</span>
            </button>

            {/*NO pave hex*/}
            { paveShape !== 'hexagon' &&
                <button ref={whDNatRef} type="button" disabled={!pave && !bezel} value="whD_nat"
                     onClick={(e) => setStoneColor(e.currentTarget.value)}
                     className={`${highlightSelected('whD_nat') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 py-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                    <Image unoptimized={true} loading="eager" fetchPriority="high"
                           className="w-18 transition duration-250 opacity-0"
                           onLoad={(e) => startOpacityTransition(e.target)} src={WHD} alt="white-diamond"/>
                    <span className="text-xs">White Diamond (Natural)</span>
                </button>
            }

            {/*pave round, pave mosaic*/}
            { (paveShape === 'round' || paveShape === 'mosaic') &&
                <button ref={brDNatRef} type="button" disabled={!pave && !bezel} value="brD_nat"
                     onClick={(e) => setStoneColor(e.currentTarget.value)}
                     className={`${highlightSelected('brD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 py-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                    <Image unoptimized={true} loading="eager" fetchPriority="high"
                           className="w-18 transition duration-250 opacity-0"
                           onLoad={(e) => startOpacityTransition(e.target)} src={BRD} alt="brown-diamond"/>
                    <span className="text-xs">Brown Diamond (Natural)</span>
                </button>
            }

            {/*bezel circle/pave round, pave mosaic */}
            { ((!bezel && (paveShape === 'round' || paveShape === 'mosaic')) || bezelShape === 'circle') &&
                <button ref={blDNatRef} type="button" disabled={!pave && !bezel} value="blD_nat"
                     onClick={(e) => setStoneColor(e.currentTarget.value)}
                     className={`${highlightSelected('blD') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 py-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                    <Image unoptimized={true} loading="eager" fetchPriority="high"
                           className="w-18 transition duration-250 opacity-0"
                           onLoad={(e) => startOpacityTransition(e.target)} src={BLD} alt="black-diamond"/>
                    <span className="text-xs">Black Diamond (Natural)</span>
                </button>
            }

            <button ref={rubyRef} type="button" disabled={!pave && !bezel} value="ruby"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('ruby') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="pb-1 w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={Ruby} alt="ruby"/>
                <span className="text-xs">Ruby (Lab)</span>
            </button>
            <button ref={emeraldRef} type="button" disabled={!pave && !bezel} value="emerald"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('emerald') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="pb-1 w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={Emerald} alt="emerald"/>
                <span className="text-xs">Emerald (Lab)</span>
            </button>
            <button ref={bSapphRef} type="button" disabled={!pave && !bezel} value="bSapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('bSapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={BSapph} alt="blue-sapphire"/>
                <span className="text-xs">Blue Sapphire (Lab)</span>
            </button>
            <button ref={ySapphRef} type="button" disabled={!pave && !bezel} value="ySapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('ySapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={YSapph} alt="yellow-sapphire"/>
                <span className="text-xs">Yellow Sapphire (Lab)</span>
            </button>
            <button ref={pSapphRef} type="button" disabled={!pave && !bezel} value="pSapph"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('pSapph') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={PSapph} alt="pink-sapphire"/>
                <span className="text-xs">Pink Sapphire (Lab)</span>
            </button>
            <button ref={aquaRef} type="button" disabled={!pave && !bezel} value="aqua"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('aqua') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="pb-1 w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={Aqua} alt="aquamarina"/>
                <span className="text-xs">Aquamarine (Lab)</span>
            </button>
            <button ref={amethRef} type="button" disabled={!pave && !bezel} value="ameth"
                    onClick={(e) => setStoneColor(e.currentTarget.value)}
                    className={`${highlightSelected('ameth') ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 ${pave || !bezel ? 'mb-4' : ''} px-2 pt-2 pb-3 ${(pave || bezel) ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                <Image unoptimized={true} loading="eager" fetchPriority="high"
                       className="pb-1 w-18 transition duration-250 opacity-0"
                       onLoad={(e) => startOpacityTransition(e.target)} src={Ameth} alt="amethyst"/>
                <span className="text-xs">Amethyst (Lab)</span>
            </button>
            {!bezel && jewelType?.includes('full') &&
                <>
                    <button ref={glitchRef} type="button" disabled={!pave} value="glitch"
                            onClick={(e) => setStoneColor(e.currentTarget.value)}
                            className={`${paveColor === 'glitch' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                        <Image unoptimized={true} loading="eager" fetchPriority="high"
                               className="pb-1 w-18 transition duration-250 opacity-0"
                               onLoad={(e) => startOpacityTransition(e.target)} src={Glitch} alt="glitch"/>
                        <span className="text-xs">Glitch</span>
                    </button>
                    <button ref={camoRef} type="button" disabled={!pave} value="camo"
                            onClick={(e) => setStoneColor(e.currentTarget.value)}
                            className={`${paveColor === 'camo' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 px-2 pt-2 pb-3 ${pave ? 'text-slate-950 cursor-pointer' : 'text-slate-400'} flex flex-col items-center justify-center`}>
                        <Image unoptimized={true} loading="eager" fetchPriority="high"
                               className="pb-1 w-18 transition duration-250 opacity-0"
                               onLoad={(e) => startOpacityTransition(e.target)} src={Camo} alt="camo"/>
                        <span className="text-xs">Camo</span>
                    </button>
                </>
            }
        </>
    )
}