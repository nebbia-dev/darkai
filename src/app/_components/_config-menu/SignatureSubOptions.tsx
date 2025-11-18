import React from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function SignatureSubOptions() {
    const value = useTeethStore((state: State) => state.activeSubButton);
    const setSignature = useTeethStore((state: State) => state.setSignature);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial);
    function setSignatureDesign(type:string, e:string) {
        if(signatureMaterial[type] === e) {
            return;
        }
        setSignature(type, e);
    }

    return (
        <>
            <div className={`${value === 'vamp' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" value="white" onClick={(e) => setSignatureDesign('vamp', e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">White metal</button>
                    <button type="button" value="pave" onClick={(e) => setSignatureDesign('vamp', e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">White pave</button>
                    <button type="button" value="black" onClick={(e) => setSignatureDesign('vamp', e.currentTarget.value)} className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Black metal</button>
                </div>
            </div>
            <div className={`${value === 'sprinkles' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" value="white"
                            onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">White
                    </button>
                    <button type="button" value="gold"
                            onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Gold
                    </button>
                    <button type="button" value="rose"
                            onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Rose
                    </button>

                </div>
            </div>
            <div className={`${value === 'bubblegum' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" value="pink"
                            onClick={(e) => setSignatureDesign('bubblegum', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Pink
                    </button>
                    <button type="button" value="blue"
                            onClick={(e) => setSignatureDesign('bubblegum', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Blue
                    </button>
                    <button type="button" value="green"
                            onClick={(e) => setSignatureDesign('bubblegum', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Green
                    </button>
                </div>
            </div>
            <div className={`${value === 'braces' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <button type="button" value="white"
                            onClick={(e) => setSignatureDesign('braces', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">White
                    </button>
                    <button type="button" value="pave"
                            onClick={(e) => setSignatureDesign('braces', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-stone-200 rounded-full cursor-pointer">Pave
                    </button>
                </div>
            </div>
            <div className={`${value === 'tribal' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">White metal</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">White pave</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Gold metal</div>
                </div>
            </div>
            <div className={`${value === 'cross' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">White pave</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">White metal</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Rose metal</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Gold metal</div>
                </div>
            </div>
            <div className={`${value === 'hammer' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">White metal</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Gold metal</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Black metal</div>
                </div>
            </div>
        </>
    )
}