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
            <button type="button" value="vamp"
                    className="cursor-pointer w-[95%] h-[120px] mx-auto mb-4"
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full rounded-3xl" src="/signatures-icons/vamp.svg" alt="vamp-logo"/>
            </button>
            <button type="button" value="sprinkles"
                    className="cursor-pointer w-[95%] h-[120px] mx-auto mb-4"
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-[120px] object-cover object-center w-full rounded-3xl" src="/signatures-icons/sprinkles.svg"
                     alt="sprinkles-logo"/>
            </button>
            <button type="button" value="bubblegum"
                    className="cursor-pointer w-[95%] h-[120px] mx-auto mb-4"
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-[120px] object-cover object-center w-full rounded-3xl"
                     src="/signatures-icons/bubblegum.svg"
                     alt="bubblegum-logo"/>
            </button>
            <button type="button" value="braces"
                    className="cursor-pointer w-[95%] h-[120px] mx-auto mb-4"
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-[120px] object-cover object-center w-full rounded-3xl"
                     src="/signatures-icons/braces.svg"
                     alt="braces-logo"/>
            </button>
            <button type="button" value="tribal"
                    className="cursor-pointer w-[95%] h-[120px] mx-auto mb-4"
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-[120px] object-cover object-center w-full rounded-3xl"
                     src="/signatures-icons/tribal.svg"
                     alt="tribals-logo"/>
            </button>
            <button type="button" value="cross"
                    className="cursor-pointer w-[95%] h-[120px] mx-auto mb-4"
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-[120px] object-cover object-center w-full rounded-3xl"
                     src="/signatures-icons/cross.svg"
                     alt="cross-logo"/>
            </button>
            <button type="button" value="hammered"
                    className="cursor-pointer w-[95%] h-[120px] mx-auto"
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-[120px] object-cover object-center w-full rounded-3xl"
                     src="/signatures-icons/hammered.svg"
                     alt="hammered-logo"/>
            </button>
        </>
    )
}