import React from "react";

export default function DesignOptions({tooth}:{tooth:string|undefined}) {
    return (
        <>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Full
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Frame
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Spacer
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Bar
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Bezel
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Enamel
            </div>
        </>
    )
}