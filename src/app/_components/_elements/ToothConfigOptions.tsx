import React, {useEffect, useRef} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import ConfiguratorButton from "@/app/_components/_elements/_buttons/ConfiguratorButton";
import DesignOptions from "@/app/_components/_elements/_config-menu/DesignOptions";
import GoldOptions from "@/app/_components/_elements/_config-menu/GoldOptions";
import FinishOptions from "@/app/_components/_elements/_config-menu/FinishOptions";
import StoneOptions from "@/app/_components/_elements/_config-menu/StoneOptions";
import SignatureOptions from "@/app/_components/_elements/_config-menu/SignatureOptions";
import PackagingOptions from "@/app/_components/_elements/_config-menu/PackagingOptions";
import DesignSubOptions from "@/app/_components/_elements/_config-menu/DesignSubOptions";
import PackagingSubOptions from "@/app/_components/_elements/_config-menu/PackagingSubOptions";
import SignatureSubOptions from "@/app/_components/_elements/_config-menu/SignatureSubOptions";
import checkSignature from "@/app/_helpers/_checkers/checkSignature";
import checkMolar from "@/app/_helpers/_checkers/checkMolar";
import {Close} from "@/app/_components/_icons/Close";

export default function ToothConfigOptions({tooth, onclick, active} : {tooth: string | undefined, active:string|undefined, onclick: (value:string) => void}) {
    const pave = useTeethStore((state: State) => tooth ? state.teethPaves[tooth] : undefined);
    const stone = useTeethStore((state: State) => tooth ? state.teethStones[tooth] : undefined);
    const material = useTeethStore((state: State) => tooth ? state.teethMaterial[tooth] : undefined);
    const finish = useTeethStore((state: State) => tooth ? state.teethFinish[tooth] : undefined);
    const jewelType = useTeethStore((state: State) => tooth ? state.teethJewelType[tooth] : undefined);
    const visibility = useTeethStore((state: State) => tooth ? state.teethVisibility[tooth] : undefined);
    const signatures = useTeethStore((state: State) => state.signatureVisibility);
    const gemBox = useTeethStore((state: State) => state.showGemTypeBox);
    const showGemBox = useTeethStore((state: State) => state.setShowGemTypeBox);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);

    const elementRef = useRef<HTMLDivElement|null>(null);
    const selectorRef = useRef<HTMLDivElement|null>(null);
    // ref to menus individual buttons
    const fullRef = useRef<HTMLButtonElement|null>(null);
    const frameRef = useRef<HTMLButtonElement|null>(null);
    const barRef = useRef<HTMLButtonElement|null>(null);
    const bigBarRef = useRef<HTMLButtonElement|null>(null);
    const bezelRef = useRef<HTMLButtonElement|null>(null);
    const enamelRef = useRef<HTMLButtonElement|null>(null);
    const polishedRef = useRef<HTMLButtonElement|null>(null);
    const sBlastRef = useRef<HTMLButtonElement|null>(null);
    const dCutRef = useRef<HTMLButtonElement|null>(null);
    const mosaicRef = useRef<HTMLButtonElement|null>(null);
    const roundRef = useRef<HTMLButtonElement|null>(null);
    const hexRef = useRef<HTMLButtonElement|null>(null);
    const princessRef = useRef<HTMLButtonElement|null>(null);
    const baguetteRef = useRef<HTMLButtonElement|null>(null);
    const whDLabRef = useRef<HTMLButtonElement|null>(null);
    const whDNatRef = useRef<HTMLButtonElement|null>(null);
    const brDNatRef = useRef<HTMLButtonElement|null>(null);
    const blDNatRef = useRef<HTMLButtonElement|null>(null);
    const rubyRef = useRef<HTMLButtonElement|null>(null);
    const emeraldRef = useRef<HTMLButtonElement|null>(null);
    const bSapphRef = useRef<HTMLButtonElement|null>(null);
    const pSapphRef = useRef<HTMLButtonElement|null>(null);
    const ySapphRef = useRef<HTMLButtonElement|null>(null);
    const aquaRef = useRef<HTMLButtonElement|null>(null);
    const amethRef = useRef<HTMLButtonElement|null>(null);
    const camoRef = useRef<HTMLButtonElement|null>(null);
    const glitchRef = useRef<HTMLButtonElement|null>(null);
    const vampRef = useRef<HTMLButtonElement|null>(null);
    const bracesRef = useRef<HTMLButtonElement|null>(null);
    const crossRef = useRef<HTMLButtonElement|null>(null);
    const hammeredRef = useRef<HTMLButtonElement|null>(null);
    const sprinklesRef = useRef<HTMLButtonElement|null>(null);
    const bubblegumRef = useRef<HTMLButtonElement|null>(null);
    const tribalRef = useRef<HTMLButtonElement|null>(null);

    function renderOptions(active:string|undefined, tooth:string|undefined) {
        switch(active) {
            case "1":
                return <SignatureOptions
                    vampRef={vampRef}
                    bracesRef={bracesRef}
                    tribalRef={tribalRef}
                    sprinklesRef={sprinklesRef}
                    hammeredRef={hammeredRef}
                    bubblegumRef={bubblegumRef}
                    crossRef={crossRef}
                />
            case "2":
                return <DesignOptions
                    tooth={tooth}
                    fullRef={fullRef}
                    frameRef={frameRef}
                    barRef={barRef}
                    bigBarRef={bigBarRef}
                    bezelRef={bezelRef}
                    enamelRef={enamelRef}
                />
            case "3":
                return <GoldOptions tooth={tooth} signature={checkSignature(jewelType)}/>
            case "4":
                if(material === 'base') {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            Start by selecting a grillz type
                        </div>
                    )
                } else {
                    return <FinishOptions tooth={tooth}
                                          jewelType={jewelType}
                                          visible={visibility}
                                          signature={checkSignature(jewelType)}
                                          polishedRef={polishedRef}
                                          sBlastRef={sBlastRef}
                                          dCutRef={dCutRef}
                                          mosaicRef={mosaicRef}
                                          roundRef={roundRef}
                                          hexRef={hexRef}
                                          princessRef={princessRef}
                                          baguetteRef={baguetteRef}
                    />
                }
            case "5":
                if(material === 'base') {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            Start by selecting a grillz type
                        </div>
                    )
                } else if(!jewelType?.includes('bezel') && !pave?.shape){
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            Add gems to your design to edit colors
                        </div>
                    )
                } else {
                    return <StoneOptions
                        tooth={tooth}
                        bezel={jewelType === 'bezel' || jewelType === 'bezelDiamond'}
                        pave={!!pave?.shape}
                        whDLabRef = {whDLabRef}
                        whDNatRef={whDNatRef}
                        brDNatRef={brDNatRef}
                        blDNatRef={blDNatRef}
                        rubyRef={rubyRef}
                        emeraldRef={emeraldRef}
                        pSapphRef={pSapphRef}
                        bSapphRef={bSapphRef}
                        ySapphRef={ySapphRef}
                        aquaRef={aquaRef}
                        amethRef={amethRef}
                        camoRef={camoRef}
                        glitchRef={glitchRef}
                    />
                }
            case "6":
                return <PackagingOptions/>
            default:
                return (<div className="w-[95%] h-[120px] mx-auto rounded-3xl  mb-4 p-2 text-center">Choose a tooth first</div>)
        }
    }

    function renderSubOptions(active:string|undefined, tooth:string|undefined) {
        switch(active) {
            case "1":
                return <SignatureSubOptions/>
            case "2":
                return <DesignSubOptions tooth={tooth} type={jewelType}/>
            case "6":
                return <PackagingSubOptions/>
        }
    }

    function sync() {
        if(selectorRef.current && elementRef.current) {
            selectorRef.current.scrollTop = elementRef.current.scrollTop;
        }
    }

    useEffect(() => {
        let ref;
        if(active === '1') {
            for(let [key, value] of Object.entries(signatures)) {
                if(value) {
                    switch(key) {
                        case 'vamp':
                            ref = vampRef.current;
                            break;
                        case 'bubblegum':
                            ref = bubblegumRef.current;
                            break;
                        case 'cross':
                            ref = crossRef.current;
                            break;
                        case 'sprinkles':
                            ref = sprinklesRef.current;
                            break;
                        case 'tribal':
                            ref = tribalRef.current;
                            break;
                        case 'braces':
                            ref = bracesRef.current;
                            break;
                        case 'hammered':
                            ref = hammeredRef.current;
                            break;
                    }
                    break;
                }
            }
        }
        if(active === '2') {
            switch(jewelType) {
                case 'full':
                case 'fullDiamond':
                    ref = fullRef.current;
                    break;
                case 'bar':
                case 'barDiamond':
                    ref = barRef.current;
                    break;
                case 'bigBar':
                case 'bigBarDiamond':
                    ref = bigBarRef.current;
                    break;
                case 'frame':
                case 'frameDiamond':
                    ref = frameRef.current;
                    break;
                case 'bezel':
                case 'bezelDiamond':
                    ref = bezelRef.current;
                    break;
                case 'enamel':
                    ref = enamelRef.current;
                    break;
                default:
                    ref = fullRef.current;
            }
        }
        if(active === '4') {
            if(pave?.shape) {
                switch(pave.shape) {
                    case 'mosaic':
                        ref = mosaicRef.current;
                        break;
                    case 'round':
                        ref = roundRef.current;
                        break;
                    case 'hexagon':
                        ref = hexRef.current;
                        break;
                    case 'princess':
                        ref = princessRef.current;
                        break;
                    case 'baguette':
                        ref = baguetteRef.current;
                        break;
                    default:
                        ref = polishedRef.current;
                }
            } else {
                switch(finish) {
                    case 'polished':
                        ref = polishedRef.current;
                        break;
                    case 'sandblasted':
                        ref = sBlastRef.current;
                        break;
                    case 'diamond_cut':
                        ref = dCutRef.current;
                        break;
                    default:
                        ref = polishedRef.current;
                }
            }
        }
        if(active === '5') {
            const gem = stone?.color ?? pave?.color;
            switch(gem) {
                    case 'whD_lab':
                        ref = whDLabRef.current;
                        break;
                    case 'whD_nat':
                        ref = whDNatRef.current;
                    break;
                    case 'blD_nat':
                        ref = blDNatRef.current;
                        break;
                    case 'brD_nat':
                        ref = brDNatRef.current;
                        break;
                    case 'ruby':
                        ref = rubyRef.current;
                        break;
                    case 'emerald':
                        ref = emeraldRef.current;
                        break;
                    case 'bSapph':
                        ref = bSapphRef.current;
                        break;
                    case 'ySapph':
                        ref = ySapphRef.current;
                        break;
                    case 'pSapph':
                        ref = pSapphRef.current;
                        break;
                    case 'ameth':
                        ref = amethRef.current;
                        break;
                    case 'aqua':
                        ref = aquaRef.current;
                        break;
                    case 'camo':
                        ref = camoRef.current;
                        break;
                    case 'glitch':
                        ref = glitchRef.current;
                        break;
                    default:
                        ref = whDLabRef.current;
                }
        }
        ref?.scrollIntoView();
    }, [active])


    return(

        <div className="relative flex flex-col gap-4">

            {innerWidth >= 1024 &&
                <div
                className={`${
                    (gemBox && (jewelType?.includes('Diamond') || jewelType?.includes('bezel')))
                        ? 'flex justify-center gap-3' : 'hidden'} absolute top-[-32.5vh] left-[37.75vw] rounded-3xl bg-gray-50 border-1 pb-4 pt-2 pl-8 pr-2 text-sm w-[224px] mb-4`}>
                    <p className="text-center pt-3">You're choosing
                        the <strong>{jewelType?.includes('bezel') ? 'bezel' : 'pave'}</strong> stone color</p>
                    <div className="">
                        <Close className="cursor-pointer w-5 h-5" onClick={() => showGemBox(false)}/>
                    </div>
                </div>
            }


            <ConfiguratorButton inverse={false} value="2" active={active} onclick={onclick} tooth={tooth}
                                label="Grillz Type">
                <img src="/config-menu-svgs/grillz.webp" className="pl-[0.5px]" alt="design-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="3" active={active} onclick={onclick} tooth={tooth}
                                label="Gold Color">
                <img className="px-[0.75px]" src="/config-menu-svgs/gold.webp" alt="gold-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="4" active={active} onclick={onclick} tooth={tooth}
                                label="Setting / Finishing">
                <img src="/config-menu-svgs/finishing.webp" className="pt-0.5" alt="colors-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="5" active={active} onclick={onclick} tooth={tooth}
                                label="Stone Color">
                <img src="/config-menu-svgs/colors.webp" alt="color-option-logo"/>
            </ConfiguratorButton>

            <div className={`absolute ${!active ? 'hidden' : 'block'} ${
                (active === '2' && !checkMolar(tooth))
                    ? 'top-[-25vh]'
                    : (active === '2' && checkMolar(tooth))
                        ? 'top-[-10vh]'
                        : active === '4' && (jewelType?.includes('enamel') || material === 'base')
                            ? 'top-[4.5vh]'
                                : active === '5' && (material === 'base' || (!jewelType?.includes('bezel') && !pave?.shape))
                                    ? 'top-[11vh]'
                                    : 'top-[-25vh]'
            } left-[48px]`}>

                <div
                    className={`pups text-center ${
                        (active === '4' && (jewelType?.includes('enamel') || material === 'base')) 
                        || (active === '2' && checkMolar(tooth))
                        || (active === '5' && (material === 'base' || (!jewelType?.includes('bezel') && !pave?.shape)))
                            ? 'h-[186px]'
                            : 'h-[596px]'} 
                        w-[65vw] lg:w-[200px] bg-gray-50/75 lg:bg-gray-50 rounded-3xl p-8 pr-4 border-1 max-h-[70vh]`}>
                    <div onScroll={sync} ref={elementRef} className="overflow-y-auto h-full pl-[2px] pr-4">
                        {renderOptions(active, tooth)}
                    </div>
                </div>
            </div>


            <div
                className={`${!active ? 'hidden' : 'block'} text-center max-h-[70vh] ${active === '6' ? 'h-[604px] py-4 w-[64px] lg:w-[250px]' : 'h-[596px] py-8 w-[64px]'} absolute left-[72.5vw] lg:left-[240px] top-[-25vh]`}>
                <div ref={selectorRef} className="whitespace-nowrap overflow-hidden h-full w-full">
                    {renderSubOptions(active, tooth)}
                </div>
            </div>

        </div>
    )
}