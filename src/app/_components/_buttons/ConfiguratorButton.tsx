import React from "react";

export default function ConfiguratorButton({tooth, inverse, children, onclick, value, active, label} : {tooth:string|undefined, inverse:boolean, children: React.ReactNode, onclick: (value:string) => void, value: string, active: string|undefined, label:string}) {
    return (
        <button type="button" disabled={!tooth} value={value} className="flex gap-4 items-center text-sm cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>
            <div className="relative">
                <div className={`${inverse ? 'bg-slate-950 text-gray-50' : 'bg-gray-50 text-slate-950 border-1'} rounded-full flex items-center justify-center w-8 h-8 p-1 relative z-20`}>
                    {children}
                </div>

                <div
                    className={`${active === value ? 'block' : 'hidden'} pips z-15 top-[50%] translate-y-[-50%] translate-x-[-4px]`}>
                    <div className="li">
                        <div className="a"></div>
                    </div>
                </div>
            </div>
            {!active && <p className="text-slate-950">{label}</p>}
        </button>
    )
}