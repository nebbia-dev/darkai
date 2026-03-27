import React from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Tooltip} from "@mui/material";
import CustomTextInput from "@/app/_components/_elements/_upload_inputs/CustomTextInput";

export default function PackagingSubOptions() {
    const value = useTeethStore((state: State) => state.activeSubButton);
    const packaging = useTeethStore((state: State) => state.packaging);
    const setPackaging = useTeethStore((state: State) => state.setPackaging);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);


    return (
        <>
            <div className={`${value === 'out' ? 'block' : 'invisible'} h-[170px] lg:h-[120px] pt-4 mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Turquoise" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="turquoise"
                                className={`w-[24px] h-[24px] bg-[#7dcecb] ${packaging.out === 'turquoise' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Green" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="green"
                                className={`w-[24px] h-[24px] bg-[#00b298] ${packaging.out === 'green' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Pink" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="pink"
                                className={`w-[24px] h-[24px] bg-[#efbbc7] ${packaging.out === 'pink' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Lavender" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="lavender"
                                className={`w-[24px] h-[24px] bg-[#b695c5] ${packaging.out === 'lavender' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Yellow" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="yellow"
                                className={`w-[24px] h-[24px] bg-[#fcd502] ${packaging.out === 'yellow' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Orange" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="orange"
                                className={`w-[24px] h-[24px] bg-[#ff6900] ${packaging.out === 'orange' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Red" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="red"
                                className={`w-[24px] h-[24px] bg-[#e3002b] ${packaging.out === 'red' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Fuchsia" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="fuchsia"
                                className={`w-[24px] h-[24px] bg-[#ef4a81] ${packaging.out === 'fuchsia' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Blue" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="blue"
                                className={`w-[24px] h-[24px] bg-[#2b4592] ${packaging.out === 'blue' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Purple" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="purple"
                                className={`w-[24px] h-[24px] bg-[#380078] ${packaging.out === 'purple' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Gray" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="gray"
                                className={`w-[24px] h-[24px] bg-[#7b878e] ${packaging.out === 'gray' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Silver" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="silver"
                                className={`w-[24px] h-[24px] bg-[#c0c0c0] ${packaging.out === 'silver' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Black" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="black"
                                className={`w-[24px] h-[24px] bg-[#221f20] ${packaging.out === 'black' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="White" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="white"
                                className={`w-[24px] h-[24px] bg-[#ffffff] ${packaging.out === 'white' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                </div>
            </div>

            <div
                className={`${value === 'in' ? 'block' : 'invisible'} relative top-[-15dvh] h-[170px] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="White" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="white"
                                className={`w-[24px] h-[24px] bg-[#f8f8f8] ${packaging.in === 'white' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Black" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="black"
                                className={`w-[24px] h-[24px] bg-[#1f1f1f] ${packaging.in === 'black' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Grey" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="130"
                                className={`w-[24px] h-[24px] bg-[#c2c8cc] ${packaging.in === '130' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Beige" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="131"
                                className={`w-[24px] h-[24px] bg-[#f1ece3] ${packaging.in === '131' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Camel" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="30"
                                className={`w-[24px] h-[24px] bg-[#bf902e] ${packaging.in === '30' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Brown" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="78"
                                className={`w-[24px] h-[24px] bg-[#6b3600] ${packaging.in === '78' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Red" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="57"
                                className={`w-[24px] h-[24px] bg-[#d53711] ${packaging.in === '57' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Crimson" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="5"
                                className={`w-[24px] h-[24px] bg-[#97021b] ${packaging.in === '5' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Steel blue" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="55"
                                className={`w-[24px] h-[24px] bg-[#8799ba] ${packaging.in === '55' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Midnight Blue" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="95"
                                className={`w-[24px] h-[24px] bg-[#181a4d] ${packaging.in === '95' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Lavender" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="nk41"
                                className={`w-[24px] h-[24px] bg-[#aa98ea] ${packaging.in === 'nk41' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Cyclamen" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="nk132"
                                className={`w-[24px] h-[24px] bg-[#89057b] ${packaging.in === 'nk132' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Salmon" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="nk124"
                                className={`w-[24px] h-[24px] bg-[#fb8282] ${packaging.in === 'nk124' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Sage" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="53"
                                className={`w-[24px] h-[24px] bg-[#93bab3] ${packaging.in === '53' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Green" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="54"
                                className={`w-[24px] h-[24px] bg-[#02552d] ${packaging.in === '54' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Forest Green" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="76"
                                className={`w-[24px] h-[24px] bg-[#0a3420] ${packaging.in === '76' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                </div>
            </div>

            <div className={`${value === 'details' ? 'block' : 'invisible'} h-[170px] lg:h-[120px] pt-4 mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Yellow Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="gold"
                                className={`w-[24px] h-[24px] bg-[#e1c487] ${packaging.details === 'gold' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="Rose Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="rose"
                                className={`w-[24px] h-[24px] bg-[#de9ca0] ${packaging.details === 'rose' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                    <Tooltip title="White Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="white"
                            className={`w-[24px] h-[24px] bg-gray-100 ${packaging.details === 'white' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                            >
                        </button>
                    </Tooltip>
                    <Tooltip title="Black Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="black"
                                className={`w-[24px] h-[24px] bg-slate-950 ${packaging.details === 'black' ? 'border-2 border-sky-500' : 'border-1 border-black'} rounded-full cursor-pointer`}
                        ></button>
                    </Tooltip>
                </div>
            </div>

            <div aria-hidden={true} className="lg:hidden block h-[170px] lg:h-[120px] pt-4 mb-4 pl-6"></div>

            {innerWidth >= 1024 && value === 'text' && <CustomTextInput/>}
        </>
    )
}