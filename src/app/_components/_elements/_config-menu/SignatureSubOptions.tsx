import React from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import Image from 'next/image';
import Emerald from "@/../public/signatures-icons/emerald_pave.svg";
import Ruby from "@/../public/signatures-icons/ruby_white.svg";
import Pave from "@/../public/signatures-icons/pave.svg";
import {Tooltip} from "@mui/material";

export default function SignatureSubOptions() {
    const value = useTeethStore((state: State) => state.activeSubButton);
    const setSignature = useTeethStore((state: State) => state.setSignature);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility);
    function setSignatureDesign(type:string, e:string) {
        if(signatureMaterial[type] === e) {
            return;
        }
        setSignature(type, e, false);
    }

    return (
        <>
            <div className={`${(signatureVisibility.vamp || value === 'vamp') ? 'block' : 'invisible'} h-[20dvh] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="White Gold" placement="right">
                        <button type="button" value="base_white"
                            onClick={(e) => setSignatureDesign('vamp', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-gray-100 border-1 rounded-full cursor-pointer"></button>
                    </Tooltip>
                        <Tooltip title="Black Gold" placement="right">
                            <button type="button" value="base_black"
                                onClick={(e) => setSignatureDesign('vamp', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-slate-950 border-1 rounded-full cursor-pointer">
                        </button>
                    </Tooltip>
                    <Tooltip title="Lab Diamonds" placement="right">
                        <button type="button" value="pave_lab"
                                onClick={(e) => setSignatureDesign('vamp', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 border-1 rounded-full cursor-pointer flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Pave} alt="pave-logo"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Natural Diamonds" placement="right">
                        <button type="button" value="pave_nat"
                                onClick={(e) => setSignatureDesign('vamp', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 border-1 rounded-full cursor-pointer flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Pave} alt="pave-logo"/>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div
                className={`${(signatureVisibility.sprinkles || value === 'sprinkles') ? 'block' : 'invisible'} h-[20dvh] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="White Gold w/ Lab Diamonds" placement="right">
                        <button type="button" value="white_lab"
                                onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="White Gold w/ Natural Diamonds" placement="right">
                        <button type="button" value="white_nat"
                                onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Yellow Gold w/ Lab Diamonds" placement="right">
                        <button type="button" value="gold_lab"
                                onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#e1c487] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Yellow Gold w/ Natural Diamonds" placement="right">
                        <button type="button" value="gold_nat"
                                onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#e1c487] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Rose Gold w/ Lab Diamonds" placement="right">
                        <button type="button" value="rose_lab"
                                onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#de9ca0] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Rose Gold w/ Natural Diamonds" placement="right">
                    <button type="button" value="rose_nat"
                            onClick={(e) => setSignatureDesign('sprinkles', e.currentTarget.value)}
                            className="w-[24px] h-[24px] bg-[#de9ca0] rounded-full cursor-pointer border-1">
                    </button>
                    </Tooltip>
                </div>
            </div>
            <div
                className={`${(signatureVisibility.bubblegum || value === 'bubblegum') ? 'block' : 'invisible'} h-[20vh] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Pink" placement="right">
                        <button type="button" value="pink"
                                onClick={(e) => setSignatureDesign('bubblegum', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#ff6588] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Blue" placement="right">
                        <button type="button" value="blue"
                                onClick={(e) => setSignatureDesign('bubblegum', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#0073b6] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Green" placement="right">
                        <button type="button" value="green"
                                onClick={(e) => setSignatureDesign('bubblegum', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#0c8241] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div className={`${(signatureVisibility.braces || value === 'braces') ? 'block' : 'invisible'} h-[20vh] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Rubies on White Gold" placement="right">
                        <button type="button" value="base_white"
                                onClick={(e) => setSignatureDesign('braces', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1 flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Ruby} alt="pave-logo"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Emeralds on Lab Diamonds" placement="right">
                        <button type="button" value="pave_lab"
                                onClick={(e) => setSignatureDesign('braces', e.currentTarget.value)}
                                className="w-[24px] h-[24px] gray rounded-full cursor-pointer border-1 flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Emerald} alt="pave-logo"/>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div className={`${(signatureVisibility.tribal || value === 'tribal') ? 'block' : 'invisible'} h-[20vh] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="White Gold" placement="right">
                        <button type="button" value="base_white"
                                onClick={(e) => setSignatureDesign('tribal', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1 ">
                        </button>
                    </Tooltip>
                    <Tooltip title="Yellow Gold" placement="right">
                        <button type="button" value="base_gold"
                                onClick={(e) => setSignatureDesign('tribal', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#e1c487] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Lab Diamonds" placement="right">
                        <button type="button" value="pave_lab"
                                onClick={(e) => setSignatureDesign('tribal', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1 flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Pave} alt="pave-logo"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Natural Diamonds" placement="right">
                        <button type="button" value="pave_nat"
                                onClick={(e) => setSignatureDesign('tribal', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1 flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Pave} alt="pave-logo"/>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div
                className={`${(signatureVisibility.cross || value === 'cross') ? 'block' : 'invisible'} h-[20vh] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="White Gold" placement="right">
                        <button type="button" value="base_white"
                                onClick={(e) => setSignatureDesign('cross', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Yellow Gold" placement="right">
                        <button type="button" value="base_gold"
                                onClick={(e) => setSignatureDesign('cross', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#e1c487] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Rose Gold" placement="right">
                        <button type="button" value="base_rose"
                                onClick={(e) => setSignatureDesign('cross', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#de9ca0] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Lab Diamonds" placement="right">
                        <button type="button" value="pave_lab"
                                onClick={(e) => setSignatureDesign('cross', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1 flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Pave} alt="pave-logo"/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Natural Diamonds" placement="right">
                        <button type="button" value="pave_nat"
                                onClick={(e) => setSignatureDesign('cross', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1 flex items-center justify-center">
                            <Image unoptimized={true} loading="eager" fetchPriority="high" src={Pave} alt="pave-logo"/>
                        </button>
                    </Tooltip>

                </div>
            </div>
            <div
                className={`${(signatureVisibility.hammered || value === 'hammered') ? 'block' : 'invisible'} h-[20vh] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="White Gold" placement="right">
                        <button type="button" value="base_white"
                                onClick={(e) => setSignatureDesign('hammered', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-gray-100 rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Yellow Gold" placement="right">
                        <button type="button" value="base_gold"
                                onClick={(e) => setSignatureDesign('hammered', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-[#e1c487] rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                    <Tooltip title="Black Gold" placement="right">
                        <button type="button" value="base_black"
                                onClick={(e) => setSignatureDesign('hammered', e.currentTarget.value)}
                                className="w-[24px] h-[24px] bg-slate-950 rounded-full cursor-pointer border-1">
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}