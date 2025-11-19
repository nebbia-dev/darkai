import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function SignatureOptions() {
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    const setSignature = useTeethStore((state: State) => state.setSignature);

    function setSignatureDesign(e:string) {
        setActiveSubButton(e);
        const material = (e === 'bubblegum') ? 'pink' : 'white';
        setSignature(e, material, true);
    }

    return (
        <>
            <button type="button" value="vamp" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setSignatureDesign(e.currentTarget.value)}>Vamp
            </button>
            <button type="button" value="sprinkles" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setSignatureDesign(e.currentTarget.value)}>Sprinkles
            </button>
            <button type="button" value="bubblegum" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setSignatureDesign(e.currentTarget.value)}>Bubble Gum
            </button>
            <button type="button" value="braces" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setSignatureDesign(e.currentTarget.value)}>Braces
            </button>
            <button type="button" value="tribal" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setSignatureDesign(e.currentTarget.value)}>Tribals
            </button>
            <button type="button" value="cross" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => setSignatureDesign(e.currentTarget.value)}>Cross Spacer
            </button>
            <button type="button" value="hammered" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center" onClick={(e) => setSignatureDesign(e.currentTarget.value)}>Hammered Frames
            </button>
        </>
    )
}