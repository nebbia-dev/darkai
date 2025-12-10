import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import checkMolar from "@/app/_helpers/_checkers/checkMolar";
import React, {useEffect} from "react";

export default function DesignOptions({tooth}: { tooth: string|undefined }) {
    const jewelType = useTeethStore((state: State) => tooth ? state.teethJewelType[tooth] : undefined);
    const material = useTeethStore((state: State) => tooth ? state.teethMaterial[tooth] : undefined);
    const setType =  useTeethStore((state: State) => state.setType);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    function setDesign(e:any) {
        if(tooth) {
            setType(tooth, e);
            setActiveSubButton(e);
        }
    }

    useEffect(() => {
        console.log(jewelType);
    // scrollTo opzione scelta, con id = jewelType
    // anche quando viene cambiato ActiveSubButton
    }, [jewelType])

    return (
        <>
            <button type="button" value="full"
                    className={`${jewelType?.includes('full') && material && material !== 'base' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 ${!checkMolar(tooth) ? 'mb-4 px-2 pb-2 pt-4' : ''} text-center cursor-pointer`}
                    onClick={(e) => setDesign(e.currentTarget.value)}>
                <img src="/design-icons/full.webp" alt="full-design"/>
                <span className="text-sm">Full</span>
            </button>
            {!checkMolar(tooth) &&
                <>
                    <button type="button" value="frame"
                            className={`${jewelType?.includes('frame') && material && material !== 'base' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer`}
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/frame.webp" alt="frame-design"/>
                        <span className="text-sm">Frame</span>
                    </button>
                    <button type="button" value="bar"
                            className={`${jewelType?.includes('bar') && material && material !== 'base' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer`}
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/spacer.webp" alt="spacer-design"/>
                        <span className="text-sm">Spacer</span>
                    </button>
                </>
            }
            {(tooth === 'cidx' || tooth === 'cisx') &&
                <button type="button" value="bigBar"
                        className={`${jewelType?.includes('bigBar') && material && material !== 'base' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer`}
                        onClick={(e) => setDesign(e.currentTarget.value)}>
                    <img src="/design-icons/bar.webp" alt="bar-design"/>
                    <span className="text-sm">Bar</span>
                </button>
            }
            {!checkMolar(tooth) &&
                <>
                    <button type="button" value="bezel"
                            className={`${jewelType?.includes('bezel') && material && material !== 'base' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer`}
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/bezel.webp" alt="bezel-design"/>
                        <span className="text-sm">Bezel</span>
                    </button>
                    <button type="button" value="enamel"
                            className={`${jewelType?.includes('enamel') && material && material !== 'base' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 px-2 pb-2 pt-4 text-center cursor-pointer`}
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/enamel.webp" alt="enamel-design"/>
                        <span className="text-sm">Enamel</span>
                    </button>
                </>
            }
        </>
    )
}