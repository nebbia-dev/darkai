import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import React from "react";
import startOpacityTransition from "@/app/_helpers/_css-enablers/startOpacityTransition";
import Image from "next/image";
import Out from "@/../public/packaging-icons/out.webp";
import In from "@/../public/packaging-icons/in.webp";
import Details from "@/../public/packaging-icons/details.webp";
import Text from "@/../public/packaging-icons/text.webp";
import CustomTextInput from "@/app/_components/_elements/_upload_inputs/CustomTextInput";

export default function PackagingOptions() {

    const activeSubButton = useTeethStore((state: State) => state.activeSubButton);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);

    return (
        <>
            <button type="button" value="out" onClick={(e) => setActiveSubButton(e.currentTarget.value)}
                    className={`cursor-pointer ${activeSubButton === 'out' ? 'lg:border-2 border-3' : 'lg:border-0 border-1' } w-[95%] h-[170px] lg:h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 flex flex-col items-center justify-center`}>
                <Image className="transition duration-250 opacity-0 object-cover lg:w-[80%] w-32" onLoad={(e) => startOpacityTransition(e.target)} unoptimized={true} loading="eager" fetchPriority="high" src={Out} alt="outside"/>
                <span className="text-sm">Outside</span>
            </button>
            <button type="button" value="in" onClick={(e) => setActiveSubButton(e.currentTarget.value)}
                    className={`cursor-pointer ${activeSubButton === 'in' ? 'lg:border-2 border-3' : 'lg:border-0 border-1' } w-[95%] h-[170px] lg:h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 flex flex-col items-center justify-center`}>
                <Image className="pb-1 transition duration-250 opacity-0 object-cover lg:w-[75%] w-32" onLoad={(e) => startOpacityTransition(e.target)} unoptimized={true} loading="eager" fetchPriority="high" src={In} alt="inside"/>
                <span className="text-sm">Inside</span>
            </button>
            <button type="button" value="details" onClick={(e) => setActiveSubButton(e.currentTarget.value)}
                    className={`cursor-pointer ${activeSubButton === 'details' ? 'lg:border-2 border-3' : 'lg:border-0 border-1' } w-[95%] h-[170px] lg:h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 flex flex-col items-center justify-center`}>
                <Image className="transition duration-250 opacity-0 object-cover lg:w-[80%] w-32" onLoad={(e) => startOpacityTransition(e.target)} unoptimized={true} loading="eager" fetchPriority="high" src={Details} alt="gold details"/>
                <span className="text-sm">Gold Details</span>
            </button>
            <div>
                <button type="button" value="text" onClick={(e) => setActiveSubButton(e.currentTarget.value)}
                        className={`cursor-pointer ${activeSubButton === 'text' ? 'lg:border-2 border-3' : 'lg:border-0 border-1' } w-[95%] h-[170px] lg:h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 flex flex-col items-center justify-center`}>
                    <Image
                            className={`transition duration-250 opacity-0 object-cover lg:w-[80%] w-32`}
                            onLoad={(e) => startOpacityTransition(e.target)}
                            unoptimized={true} loading="eager" fetchPriority="high" src={Text} alt="custom text"
                        />
                    <span className="text-sm">Custom Text
                        {innerWidth < 1024 && activeSubButton === 'text' && ' (below)'
                        }
                    </span>
                </button>
                {innerWidth < 1024 && activeSubButton === 'text' && <CustomTextInput/> }
            </div>
        </>
    )
}