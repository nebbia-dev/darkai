import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Ref} from "react";
import Image from 'next/image';
import Braces from "@/../public/signatures-icons/braces.webp";
import Bubblegum from "@/../public/signatures-icons/bubblegum.webp";
import Cross from "@/../public/signatures-icons/cross.webp";
import Hammered from "@/../public/signatures-icons/hammered.webp";
import Sprinkles from "@/../public/signatures-icons/sprinkles.webp";
import Tribal from "@/../public/signatures-icons/tribal.webp";
import Vamp from "@/../public/signatures-icons/vamp.webp";
import startOpacityTransition from "@/app/_helpers/_css-enablers/startOpacityTransition";

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
        let material;
        switch(e) {
            case 'bubblegum':
                material = 'pink';
                break;
            case 'sprinkles':
                material = 'white_lab';
                break;
            default:
                material = 'base_white';
        }

        setSignature(e, material, true);
    }

    return (
        <>
            <button ref={vampRef} type="button" value="vamp"
                    className={`${signature.vamp ? 'border-2 border-black rounded-3xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[170px] lg:h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image unoptimized={true} loading="eager" fetchPriority="high" className="border-1 border-1 h-full transition duration-250 opacity-0 object-cover rounded-25xl" onLoad={(e) => startOpacityTransition(e.target)}
                     src={Vamp} alt="vamp-logo"/>
            </button>
            <button ref={sprinklesRef} type="button" value="sprinkles"
                    className={`${signature.sprinkles ? 'border-2 border-black rounded-3xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[170px] lg:h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image unoptimized={true} loading="eager" fetchPriority="high" className="border-1 h-full transition duration-250 opacity-0 object-cover rounded-25xl" onLoad={(e) => startOpacityTransition(e.target)}
                     src={Sprinkles}
                     alt="sprinkles-logo"/>
            </button>
            <button ref={bubblegumRef} type="button" value="bubblegum"
                    className={`${signature.bubblegum ? 'border-2 border-black rounded-3xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[170px] lg:h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image unoptimized={true} loading="eager" fetchPriority="high" className="border-1 h-full transition duration-250 opacity-0 object-cover rounded-25xl" onLoad={(e) => startOpacityTransition(e.target)}
                     src={Bubblegum}
                     alt="bubblegum-logo"/>
            </button>
            <button ref={bracesRef} type="button" value="braces"
                    className={`${signature.braces ? 'border-2 border-black rounded-3xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[170px] lg:h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image unoptimized={true} loading="eager" fetchPriority="high" className="border-1 h-full transition duration-250 opacity-0 object-cover rounded-25xl" onLoad={(e) => startOpacityTransition(e.target)}
                     src={Braces}
                     alt="braces-logo"/>
            </button>
            <button ref={tribalRef} type="button" value="tribal"
                    className={`${signature.tribal ? 'border-2 border-black rounded-3xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[170px] lg:h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image unoptimized={true} loading="eager" fetchPriority="high" className="border-1 h-full transition duration-250 opacity-0 object-cover rounded-25xl" onLoad={(e) => startOpacityTransition(e.target)}
                     src={Tribal}
                     alt="tribals-logo"/>
            </button>
            <button ref={crossRef} type="button" value="cross"
                    className={`${signature.cross ? 'border-2 border-black rounded-3xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[170px] lg:h-[120px] mx-auto mb-4`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image unoptimized={true} loading="eager" fetchPriority="high" className="border-1 h-full transition duration-250 opacity-0 object-cover rounded-25xl" onLoad={(e) => startOpacityTransition(e.target)}
                     src={Cross}
                     alt="cross-logo"/>
            </button>
            <button ref={hammeredRef} type="button" value="hammered"
                    className={`${signature.hammered ? 'border-2 border-black rounded-3xl' : ''} cursor-pointer flex items-center justify-center w-[95%] h-[170px] lg:h-[120px] mx-auto`}
                    onClick={(e) => setSignatureDesign(e.currentTarget.value)}>
                <Image unoptimized={true} loading="eager" fetchPriority="high" className="border-1 h-full transition duration-250 opacity-0 object-cover rounded-25xl" onLoad={(e) => startOpacityTransition(e.target)}
                     src={Hammered}
                     alt="hammered-logo"/>
            </button>
        </>
    )
}