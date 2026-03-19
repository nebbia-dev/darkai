'use client'
import React, {useState} from "react";

export default function ConfiguratorButton({tooth, inverse, children, onclick, value, active, label} : {tooth:string|undefined, inverse:boolean, children: React.ReactNode, onclick: (value:string) => void, value: string, active: string|undefined, label:string}) {
    const [hover, setHover] = useState<boolean>(false);
    function hovering(bool:boolean) {
        setHover(bool);

    }
    return (
            <div className={`relative ${active ? 'max-w-[64px]' : ''}`} onMouseEnter={() => hovering(true)} onMouseLeave={() => hovering(false)}>
                <button type="button" disabled={!tooth} value={value} className="flex gap-4 items-center text-lg lg:text-sm cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>
                    <div className="relative">
                        <div className={`${active === value ? 'border-2 ' : 'border-1'} ${inverse ? 'bg-slate-950 text-gray-50' : 'bg-gray-50 text-slate-950'} p-0.5 rounded-full flex items-center justify-center w-10 h-10 relative z-20`}>
                            {children}
                        </div>

                        <div
                            className={`${active === value ? 'block' : 'hidden'} pips z-15 top-[50%] translate-y-[-50%] translate-x-[-4px]`}>
                            <div className="li">
                                <div className="a"></div>
                            </div>
                        </div>
                    </div>
                    {!active && <p className="text-slate-950 w-[300px] text-left">{label}</p>}
                </button>

            {!tooth && hover &&
                <div className="border-1 bg-gray-50 px-3 py-2 text-sm rounded absolute z-50 left-[44px] top-[50%] translate-y-[-50%] whitespace-nowrap">
                    Select a tooth to start
                </div>
            }
            </div>
    )
}