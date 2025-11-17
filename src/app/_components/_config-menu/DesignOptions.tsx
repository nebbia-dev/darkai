import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import checkMolar from "@/app/_helpers/checkMolar";

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
            <button type="button" value="full" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => setDesign(e.currentTarget.value)}>Full
            </button>
            { !checkMolar(tooth) &&
                <>
                    <button type="button" value="frame"
                         className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer"
                         onClick={(e) => setDesign(e.currentTarget.value)}>Frame
                    </button>
                    <button type="button" value="bar" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => setDesign(e.currentTarget.value)}>Spacer
                    </button>
                </>
            }
            { (tooth === 'cidx' || tooth === 'cisx') &&
                <button type="button" value="bigBar"
                     className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer"
                     onClick={(e) => setDesign(e.currentTarget.value)}>Bar
                </button>
            }
            { !checkMolar(tooth) &&
                <>
                    <button type="button" value="bezel"
                            className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer"
                            onClick={(e) => setDesign(e.currentTarget.value)}>Bezel
                    </button>
                    <button type="button" value="enamel"
                            className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center cursor-pointer"
                            onClick={(e) => setDesign(e.currentTarget.value)}>Enamel
                    </button>
                </>
            }
        </>
    )
}