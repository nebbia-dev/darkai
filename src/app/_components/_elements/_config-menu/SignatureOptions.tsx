import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function SignatureOptions() {
    const signature = useTeethStore((state: State) => state.signatureVisibility);
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
                    className={`${signature.vamp ? 'border-2 border-sky-400' : ''} cursor-pointer w-[95%] h-[120px] mx-auto mb-4 bg-[#282828] bg-[url(/signatures-icons/signature-bg.svg)] rounded-3xl`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full"
                     src="/signatures-icons/vamp.svg" alt="vamp-logo"/>
            </button>
            <button type="button" value="sprinkles"
                    className={`${signature.sprinkles ? 'border-2 border-sky-400' : ''} cursor-pointer w-[95%] h-[120px] mx-auto mb-4 bg-[#282828] bg-[url(/signatures-icons/signature-bg.svg)] rounded-3xl`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full"
                     src="/signatures-icons/sprinkles.svg"
                     alt="sprinkles-logo"/>
            </button>
            <button type="button" value="bubblegum"
                    className={`${signature.bubblegum ? 'border-2 border-sky-400' : ''} p-2 cursor-pointer w-[95%] h-[120px] mx-auto mb-4 bg-[#282828] bg-[url(/signatures-icons/signature-bg.svg)] rounded-3xl`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full"
                     src="/signatures-icons/bubblegum.svg"
                     alt="bubblegum-logo"/>
            </button>
            <button type="button" value="braces"
                    className={`${signature.braces ? 'border-2 border-sky-400' : ''} pl-2 pr-1 cursor-pointer w-[95%] h-[120px] mx-auto mb-4 bg-[#282828] bg-[url(/signatures-icons/signature-bg.svg)] rounded-3xl`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full"
                     src="/signatures-icons/braces.svg"
                     alt="braces-logo"/>
            </button>
            <button type="button" value="tribal"
                    className={`${signature.braces ? 'border-2 border-sky-400' : ''} p-1 cursor-pointer w-[95%] h-[120px] mx-auto mb-4 bg-[#282828] bg-[url(/signatures-icons/signature-bg.svg)] rounded-3xl`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full"
                     src="/signatures-icons/tribal.svg"
                     alt="tribals-logo"/>
            </button>
            <button type="button" value="cross"
                    className={`${signature.cross ? 'border-2 border-sky-400' : ''} cursor-pointer w-[95%] h-[120px] mx-auto mb-4 bg-[#282828] bg-[url(/signatures-icons/signature-bg.svg)] rounded-3xl`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full"
                     src="/signatures-icons/cross.svg"
                     alt="cross-logo"/>
            </button>
            <button type="button" value="hammered"
                    className={`${signature.hammered ? 'border-2 border-sky-400' : ''} p-1 cursor-pointer w-[95%] h-[120px] mx-auto bg-[#282828] bg-[url(/signatures-icons/signature-bg.svg)] rounded-3xl`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <img className="h-full object-cover object-center w-full"
                     src="/signatures-icons/hammered.svg"
                     alt="hammered-logo"/>
            </button>
        </>
    )
}