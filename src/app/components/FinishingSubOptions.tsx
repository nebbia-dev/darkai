import React from "react";

export default function FinishingSubOptions({tooth}: { tooth: string | undefined }) {

    return (
        <>
            <div className="h-[120px] mb-4 pl-6 text-center">
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Polished</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Sandblasted</div>
                    <div className="w-[24px] h-[24px] bg-stone-200 rounded-full">Diamond cut</div>
                </div>
            </div>
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
            <div aria-hidden={true} className="h-[120px] mb-4 pl-6">
            </div>
        </>
    )
}