'use client'
import {useState} from "react";

export default function Recap(){
    const [activeCarat, setActiveCarat] = useState<string|undefined>(undefined);
    const [activeDiamond, setActiveDiamond] = useState<string|undefined>(undefined);

    return(
        <div className="rounded-3xl border-1 border-red-500 mr-[5vw] h-[calc(100vh-108px)] text-sm">

        {/* MyConfig Top */}
        {/* MyConfig Middle w/Recap */}
        {/* MyConfig Bottom w/ Carats+Diamonds */}
            <div className="border-1 rounded-b-3xl w-full bg-gray-50 px-6 pt-4 pb-6">
                <div className="flex gap-4">
                    <span className="inline-block w-[72px]">Carats:</span>
                    <ul className="flex gap-4">
                        <li className={`${activeCarat === '10K' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}><button className="cursor-pointer" value="10K" onClick={(e) => setActiveCarat(e.currentTarget.value)}>10K</button></li>
                        <li className={`${activeCarat === '14K' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}><button className="cursor-pointer" value="14K" onClick={(e) => setActiveCarat(e.currentTarget.value)}>14K</button></li>
                        <li className={`${activeCarat === '18K' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}><button className="cursor-pointer" value="18K" onClick={(e) => setActiveCarat(e.currentTarget.value)}>18K</button></li>
                    </ul>
                </div>
                <div className="flex gap-4">
                    <span className="inline-block w-[72px]">Diamonds:</span>
                    <ul className="flex gap-4">
                        <li className={`${activeDiamond === 'lab' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}>
                            <button className="cursor-pointer" value="lab"
                                    onClick={(e) => setActiveDiamond(e.currentTarget.value)}>Lab
                            </button>
                        </li>
                        <li className={`${activeDiamond === 'nat' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}>
                            <button className="cursor-pointer" value="nat"
                                    onClick={(e) => setActiveDiamond(e.currentTarget.value)}>Natural
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
            {/* Price */}
            <div className="border-1 rounded-3xl w-full bg-gray-50 flex justify-between mt-4">
                <div className="px-6 py-2">
                    <span className="font-semibold">Price: </span>
                    <span>starting from 5.000€</span>
                </div>
                <button className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full">Continue &rarr;</button>
            </div>

        </div>
    )
}