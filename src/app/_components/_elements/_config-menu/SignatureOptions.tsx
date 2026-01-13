import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Ref} from "react";
import Image from 'next/image'

export default function SignatureOptions({crossRef, vampRef, bubblegumRef, sprinklesRef, bracesRef, hammeredRef, tribalRef} : {
    crossRef:Ref<HTMLButtonElement|null>,
    vampRef:Ref<HTMLButtonElement|null>,
    bubblegumRef:Ref<HTMLButtonElement|null>,
    sprinklesRef:Ref<HTMLButtonElement|null>,
    bracesRef:Ref<HTMLButtonElement|null>,
    hammeredRef:Ref<HTMLButtonElement|null>,
    tribalRef:Ref<HTMLButtonElement|null>
}) {
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
            <button ref={vampRef} type="button" value="vamp"
                    className={`${signature.vamp ? 'border-2 border-sky-400 rounded-25xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image priority width={150} height={150} loading="eager" fetchPriority="high" className="h-full"
                     src="/signatures-icons/vamp.webp" alt="vamp-logo"/>
            </button>
            <button ref={sprinklesRef} type="button" value="sprinkles"
                    className={`${signature.sprinkles ? 'border-2 border-sky-400 rounded-25xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image priority width={150} height={150} loading="eager" fetchPriority="high" className="h-full"
                     src="/signatures-icons/sprinkles.webp"
                     alt="sprinkles-logo"/>
            </button>
            <button ref={bubblegumRef} type="button" value="bubblegum"
                    className={`${signature.bubblegum ? 'border-2 border-sky-400 rounded-25xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image priority width={150} height={150} loading="eager" fetchPriority="high" className="h-full"
                     src="/signatures-icons/bubblegum.webp"
                     alt="bubblegum-logo"/>
            </button>
            <button ref={bracesRef} type="button" value="braces"
                    className={`${signature.braces ? 'border-2 border-sky-400 rounded-25xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image priority width={150} height={150} loading="eager" fetchPriority="high" className="h-full"
                     src="/signatures-icons/braces.webp"
                     alt="braces-logo"/>
            </button>
            <button ref={tribalRef} type="button" value="tribal"
                    className={`${signature.tribal ? 'border-2 border-sky-400 rounded-25xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image priority width={150} height={150} loading="eager" fetchPriority="high" className="h-full"
                     src="/signatures-icons/tribal.webp"
                     alt="tribals-logo"/>
            </button>
            <button ref={crossRef} type="button" value="cross"
                    className={`${signature.cross ? 'border-2 border-sky-400 rounded-25xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image priority width={150} height={150} loading="eager" fetchPriority="high" className="h-full"
                     src="/signatures-icons/cross.webp"
                     alt="cross-logo"/>
            </button>
            <button ref={hammeredRef} type="button" value="hammered"
                    className={`${signature.hammered ? 'border-2 border-sky-400 rounded-25xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[120px] mx-auto`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image priority width={150} height={150} loading="eager" fetchPriority="high" className="h-full"
                     src="/signatures-icons/hammered.webp"
                     alt="hammered-logo"/>
            </button>
        </>
    )
}