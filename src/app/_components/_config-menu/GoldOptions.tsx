import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function GoldOptions({tooth}:{tooth:string|undefined}) {
    const setMaterial =  useTeethStore((state: State) => state.setMaterial);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    function setGold(e:any) {
        if(tooth) {
            setMaterial(tooth, e);
            setActiveSubButton(e);
        }
    }

    return (
        <>
            <button type="button" value="gold"  onClick={(e) => setGold(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Yellow
            </button>
            <button type="button" value="rose"  onClick={(e) => setGold(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Rose
            </button>
            <button type="button" value="white"  onClick={(e) => setGold(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">White
            </button>
            <button type="button" value="black"  onClick={(e) => setGold(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Black
            </button>
        </>
    )
}