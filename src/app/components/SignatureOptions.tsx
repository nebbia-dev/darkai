import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function SignatureOptions() {
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);

    return (
        <>
            <button type="button" value="vamp" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setActiveSubButton(e.currentTarget.value)}>Vamp Canines
            </button>
            <button type="button" value="sprinkles" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setActiveSubButton(e.currentTarget.value)}>Sprinkles
            </button>
            <button type="button" value="bgum" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setActiveSubButton(e.currentTarget.value)}>Bubble Gum
            </button>
            <button type="button" value="braces" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setActiveSubButton(e.currentTarget.value)}>Braces
            </button>
            <button type="button" value="tribal" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setActiveSubButton(e.currentTarget.value)}>Tribals
            </button>
            <button type="button" value="cross" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setActiveSubButton(e.currentTarget.value)}>Cross Spacer
            </button>
            <button type="button" value="hammer" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center" onClick={(e) => setActiveSubButton(e.currentTarget.value)}>Hammered Frames
            </button>
        </>
    )
}