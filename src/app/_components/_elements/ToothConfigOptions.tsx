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

export default function ToothConfigOptions({tooth, onclick, active} : {tooth: string | undefined, active:string|undefined, onclick: (value:string) => void}) {
    const pave = useTeethStore((state: State) => tooth ? state.teethPaves[tooth] : undefined);
    const stone = useTeethStore((state: State) => tooth ? state.teethStones[tooth] : undefined);
    const material = useTeethStore((state: State) => tooth ? state.teethMaterial[tooth] : undefined);
    const finish = useTeethStore((state: State) => tooth ? state.teethFinish[tooth] : undefined);
    const jewelType = useTeethStore((state: State) => tooth ? state.teethJewelType[tooth] : undefined);
    const visibility = useTeethStore((state: State) => tooth ? state.teethVisibility[tooth] : undefined);
    const signatures = useTeethStore((state: State) => state.signatureVisibility);

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
    const whDRef = useRef<HTMLButtonElement|null>(null);
    const brDRef = useRef<HTMLButtonElement|null>(null);
    const blDRef = useRef<HTMLButtonElement|null>(null);
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
                            Choose a design first!
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
                            Choose a design first!
                        </div>
                    )
                } else if(!jewelType?.includes('bezel') && !pave?.shape){
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            Gems are not part of the current design :(
                        </div>
                    )
                } else {
                    return <StoneOptions
                        tooth={tooth}
                        bezel={jewelType === 'bezel' || jewelType === 'bezelDiamond'}
                        pave={!!pave?.shape}
                        whDRef={whDRef}
                        brDRef={brDRef}
                        blDRef={blDRef}
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
                    case 'whD':
                        ref = whDRef.current;
                        break;
                    case 'blD':
                        ref = blDRef.current;
                        break;
                    case 'brD':
                        ref = brDRef.current;
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
                        ref = whDRef.current;
                }
        }
        ref?.scrollIntoView();
    }, [active])


    return(

        <div className="relative flex flex-col gap-4">

            <div
                className={`${(active === '5' && (jewelType?.includes('Diamond') || jewelType?.includes('bezel'))) ? 'block' : 'hidden'} text-center absolute top-[-30vh] left-[38.5vw] rounded-3xl bg-gray-50 border-1 py-4 px-8 text-sm w-[200px] mb-4`}>You're
                choosing the <strong>{jewelType?.includes('bezel') ? 'bezel' : 'pave'}</strong> stone color
            </div>


            <ConfiguratorButton inverse={false} value="2" active={active} onclick={onclick} tooth={tooth}
                                label="Grillz Type">
                <img src="/config-menu-svgs/design.svg" alt="design-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="3" active={active} onclick={onclick} tooth={tooth}
                                label="Gold Color">
                <img src="/config-menu-svgs/gold.svg" alt="gold-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="4" active={active} onclick={onclick} tooth={tooth}
                                label="Finish">
                <img src="/config-menu-svgs/colors.webp" className="mt-0.5 mr-1" alt="colors-option-logo"/>
            </ConfiguratorButton>
            <ConfiguratorButton inverse={false} value="5" active={active} onclick={onclick} tooth={tooth}
                                label="Stone Color">
                <img src="/config-menu-svgs/finish.svg" alt="color-option-logo"/>
            </ConfiguratorButton>

            <div className={`absolute ${!active ? 'hidden' : 'block'} ${active === '1'
                ? 'top-[-30vh]'
                : (active === '2' && !checkMolar(tooth))
                    ? 'top-[-20vh]'
                    : (active === '2' && checkMolar(tooth))
                        ? 'top-[-10vh]'
                        : active === '4' && (jewelType?.includes('enamel') || material === 'base')
                            ? 'top-[4.5vh]'
                                : active === '5' && (material === 'base' || (!jewelType?.includes('bezel') && !pave?.shape))
                                    ? 'top-[11vh]'
                                    : active === '6'
                                        ? 'top-[13.5vh]'
                                        : 'top-[-20vh]'
            } left-[48px]`}>

                <div
                    className={`pups text-center ${
                        (active === '4' && (jewelType?.includes('enamel') || material === 'base')) 
                        || (active === '2' && checkMolar(tooth))
                        || (active === '5' && (material === 'base' || (!jewelType?.includes('bezel') && !pave?.shape)))
                            ? 'h-[186px]' 
                            : 'h-[596px]'} 
                        w-[200px] bg-gray-50 rounded-3xl p-8 pr-4 border-1 max-h-[70vh]`}>
                    <div onScroll={sync} ref={elementRef} className="overflow-y-scroll h-full pl-[2px] pr-4">
                        {renderOptions(active, tooth)}
                    </div>
                </div>
            </div>


            <div
                className={`${!active ? 'hidden' : 'block'} pups text-center max-h-[70vh] h-[596px] w-[64px] absolute left-[240px] 
                            ${active === '1'
                    ? 'top-[-30vh]'
                            : active === '6'
                                ? 'top-[-10vh]'
                                : 'top-[-20vh]'
                } py-8`}>
                <div ref={selectorRef} className="whitespace-nowrap overflow-hidden h-full w-full">
                    {renderSubOptions(active, tooth)}
                </div>
            </div>

        </div>
    )
}