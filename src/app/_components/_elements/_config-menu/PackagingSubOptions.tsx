import React from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function PackagingSubOptions() {

    const value = useTeethStore((state: State) => state.activeSubButton);

    return (
        <>
            <div className={`${value === 'prem' ? 'block' : 'invisible'} h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Turquoise</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Green</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Pink</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Lavender</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Yellow</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Orange</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Red</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Fuchsia</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Blue</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Purple</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Grey</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Silver</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Black</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">White</div>
                </div>
            </div>
        </>
    )
}