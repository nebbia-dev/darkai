import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function DesignOptions({tooth, onclick}: { tooth: string|undefined, onclick:(value:string) => void }) {
    const setType =  useTeethStore((state: State) => state.setType);
    const unsetTooth = useTeethStore((state: State) => state.unsetLastActivatedTooth);
    function setDesign(e:any) {
        if(tooth) {
            setType(tooth, e);
            unsetTooth();
            onclick(e);
        }
    }

    return (
        <>
            <button type="button" value="full" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => setDesign(e.currentTarget.value)}>Full
            </button>
            <button type="button" value="frame" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => setDesign(e.currentTarget.value)}>Frame
            </button>
            <button type="button" value="bar" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => setDesign(e.currentTarget.value)}>Spacer
            </button>
            { (tooth === 'cidx' || tooth === 'cisx') &&
                <button type="button" value="bigBar"
                     className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer"
                     onClick={(e) => setDesign(e.currentTarget.value)}>Bar
                </button>
            }
            <button type="button" value="bezel" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => setDesign(e.currentTarget.value)}>Bezel
            </button>
            <button type="button" value="enamel" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center cursor-pointer" onClick={(e) => setDesign(e.currentTarget.value)}>Enamel
            </button>
        </>
    )
}