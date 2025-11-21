import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import checkMolar from "@/app/_helpers/_checkers/checkMolar";
import React from "react";

export default function DesignOptions({tooth}: { tooth: string|undefined }) {
    const setType =  useTeethStore((state: State) => state.setType);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    function setDesign(e:any) {
        if(tooth) {
            setType(tooth, e);
            setActiveSubButton(e);
        }
    }

    return (
        <>
            <button type="button" value="full"
                    className={`w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 ${!checkMolar(tooth) ? 'mb-4 px-2 pb-2 pt-4' : ''} text-center cursor-pointer`}
                    onClick={(e) => setDesign(e.currentTarget.value)}>
                <img src="/design-icons/full.webp" alt="full-design"/>
                <span className="text-sm">Full</span>
            </button>
            {!checkMolar(tooth) &&
                <>
                    <button type="button" value="frame"
                            className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer"
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/frame.webp" alt="frame-design"/>
                        <span className="text-sm">Frame</span>
                    </button>
                    <button type="button" value="bar"
                            className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer"
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/spacer.webp" alt="spacer-design"/>
                        <span className="text-sm">Spacer</span>
                    </button>
                </>
            }
            {(tooth === 'cidx' || tooth === 'cisx') &&
                <button type="button" value="bigBar"
                        className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer"
                        onClick={(e) => setDesign(e.currentTarget.value)}>
                    <img src="/design-icons/bar.webp" alt="bar-design"/>
                    <span className="text-sm">Bar</span>
                </button>
            }
            {!checkMolar(tooth) &&
                <>
                    <button type="button" value="bezel"
                            className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pb-2 pt-4 text-center cursor-pointer"
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/bezel.webp" alt="bezel-design"/>
                        <span className="text-sm">Bezel</span>
                    </button>
                    <button type="button" value="enamel"
                            className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 px-2 pb-2 pt-4 text-center cursor-pointer"
                            onClick={(e) => setDesign(e.currentTarget.value)}>
                        <img src="/design-icons/enamel.webp" alt="enamel-design"/>
                        <span className="text-sm">Enamel</span>
                    </button>
                </>
            }
        </>
    )
}