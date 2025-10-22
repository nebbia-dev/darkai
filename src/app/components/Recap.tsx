'use client'
import {useState} from "react";

export default function Recap(){
    const [activeCarat, setActiveCarat] = useState<string|undefined>(undefined);
    const [activeDiamond, setActiveDiamond] = useState<string|undefined>(undefined);

    return(
        <div className="rounded-3xl mr-[5vw] h-[calc(100vh-108px)] text-sm">
            <div className="flex flex-col items-center justify-center h-full">
            {/* MyConfig Top */}
                <div className="border-1 rounded-t-3xl w-full bg-gray-50 px-6 py-4 text-center flex items-center justify-center gap-2">
                    <h2 className="font-semibold">My Configuration</h2>
                    <button type="button" className="h-4 w-4 bg-slate-950 rounded-full cursour-pointer"></button>
                </div>
            {/* MyConfig Middle w/Recap */}
                <div className="h-[calc(50vh-54px)] w-full relative">
                    <div className="absolute h-[15%] bottom-0 w-full bg-linear-to-t from-gray-50 to-indigo-0"></div>
                    <div className="pl-6 pr-3 py-4 h-full">
                        <ul className="pr-3 h-full overflow-y-scroll">
                            <li>
                                <h4 className="font-semibold">
                                    Upper central incisor R
                                </h4>
                                <p>Full, white</p>
                                <span aria-hidden={true} className="inline-block h-[1px] w-full bg-slate-950"></span>
                                <p className="font-bold w-full text-right">500€</p>
                            </li>
                            <li>
                                <h4 className="font-semibold">
                                    Upper central incisor L
                                </h4>
                                <p>Full, white</p>
                                <span aria-hidden={true} className="inline-block h-[1px] w-full bg-slate-950"></span>
                                <p className="font-bold w-full text-right">500€</p>
                            </li>
                            <li>
                                <h4 className="font-semibold">
                                    Lower central incisor R
                                </h4>
                                <p>Full, white</p>
                                <span aria-hidden={true} className="inline-block h-[1px] w-full bg-slate-950"></span>
                                <p className="font-bold w-full text-right">500€</p>
                            </li>
                            <li>
                                <h4 className="font-semibold">
                                    Lower central incisor L
                                </h4>
                                <p>Full, white</p>
                                <span aria-hidden={true} className="inline-block h-[1px] w-full bg-slate-950"></span>
                                <p className="font-bold w-full text-right">500€</p>
                            </li>
                            <li>
                                <h4 className="font-semibold">
                                    Upper canine R
                                </h4>
                                <p>Full, gold</p>
                                <span aria-hidden={true} className="inline-block h-[1px] w-full bg-slate-950"></span>
                                <p className="font-bold w-full text-right">500€</p>
                            </li>
                            <li>
                                <h4 className="font-semibold">
                                    Upper canine L
                                </h4>
                                <p>Full, gold</p>
                                <span aria-hidden={true} className="inline-block h-[1px] w-full bg-slate-950"></span>
                                <p className="font-bold w-full text-right">500€</p>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* MyConfig Bottom w/ Carats+Diamonds */}
                <div className="border-1 rounded-b-3xl w-full bg-gray-50 px-6 pt-4 pb-6">
                    <div className="flex gap-4">
                        <span className="inline-block w-[72px]">Carats:</span>
                        <ul className="flex gap-4">
                            <li className={`${activeCarat === '10K' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}><button type="button" className="cursor-pointer" value="10K" onClick={(e) => setActiveCarat(e.currentTarget.value)}>10K</button></li>
                            <li className={`${activeCarat === '14K' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}><button type="button" className="cursor-pointer" value="14K" onClick={(e) => setActiveCarat(e.currentTarget.value)}>14K</button></li>
                            <li className={`${activeCarat === '18K' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}><button type="button" className="cursor-pointer" value="18K" onClick={(e) => setActiveCarat(e.currentTarget.value)}>18K</button></li>
                        </ul>
                    </div>
                    <div className="flex gap-4">
                        <span className="inline-block w-[72px]">Diamonds:</span>
                        <ul className="flex gap-4">
                            <li className={`${activeDiamond === 'lab' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}>
                                <button type="button" className="cursor-pointer" value="lab"
                                        onClick={(e) => setActiveDiamond(e.currentTarget.value)}>Lab
                                </button>
                            </li>
                            <li className={`${activeDiamond === 'nat' ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl`}>
                                <button type="button" className="cursor-pointer" value="nat"
                                        onClick={(e) => setActiveDiamond(e.currentTarget.value)}>Natural
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
                {/* Price */}
                <div className="border-1 rounded-3xl w-full bg-gray-50 flex justify-between mt-4">
                    <div className="px-6 py-2">
                        <h3 className="font-semibold inline">Price: </h3>
                        <span>5.000€</span>
                    </div>
                    <button className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full">Continue &rarr;</button>
                </div>
            </div>
        </div>
    )
}