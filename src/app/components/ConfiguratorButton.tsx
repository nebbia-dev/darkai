import React from "react";

export default function ConfiguratorButton({inverse, children, onclick, value, active, label} : {inverse:boolean, children: React.ReactNode, onclick: (value:string) => void, value: string, active: string|undefined, label:string}) {
    return (
        <div className="flex gap-4 items-center text-sm">
            <div className="relative">
                <button
                    type="button"
                    value={value}
                    className={`${inverse ? 'bg-slate-950 text-gray-50' : 'bg-gray-50 text-slate-950 border-1'} cursor-pointer rounded-full flex items-center justify-center w-8 h-8 p-1 relative z-20`}
                    onClick={(e) => onclick(e.currentTarget.value)}>
                    {children}
                </button>

                <div
                    className={`${active === value ? 'block' : 'hidden'} pips z-15 top-[50%] translate-y-[-50%] translate-x-[-4px]`}>
                    <div className="li">
                        <div className="a"></div>
                    </div>
                </div>
            </div>
            {!active && <p className="text-slate-950">{label}</p>}
        </div>
    )
}