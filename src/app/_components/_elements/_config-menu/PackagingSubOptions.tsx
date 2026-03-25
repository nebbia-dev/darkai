import React from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Tooltip} from "@mui/material";
import CustomTextInput from "@/app/_components/_elements/_upload_inputs/CustomTextInput";

export default function PackagingSubOptions() {

    const value = useTeethStore((state: State) => state.activeSubButton);
    const setPackaging = useTeethStore((state: State) => state.setPackaging);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);


    return (
        <>
            <div className={`${value === 'out' ? 'block' : 'invisible'} h-[170px] lg:h-[120px] pt-4 mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Turquoise" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="turquoise" className="cursor-pointer w-[24px] h-[24px] border bg-[#7dcecb] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Green" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="green" className="cursor-pointer w-[24px] h-[24px] border bg-[#00b298] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Pink" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="pink" className="cursor-pointer w-[24px] h-[24px] border bg-[#efbbc7] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Lavender" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="lavender" className="cursor-pointer w-[24px] h-[24px] border bg-[#b695c5] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Yellow" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="yellow" className="cursor-pointer w-[24px] h-[24px] border bg-[#fcd502] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Orange" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="orange" className="cursor-pointer w-[24px] h-[24px] border bg-[#ff6900] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Red" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="red" className="cursor-pointer w-[24px] h-[24px] border bg-[#e3002b] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Fuchsia" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="fuchsia" className="cursor-pointer w-[24px] h-[24px] border bg-[#ef4a81] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Blue" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="blue" className="cursor-pointer w-[24px] h-[24px] border bg-[#2b4592] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Purple" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="purple" className="cursor-pointer w-[24px] h-[24px] border bg-[#380078] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Gray" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="gray" className="cursor-pointer w-[24px] h-[24px] border bg-[#7b878e] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Silver" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="silver" className="cursor-pointer w-[24px] h-[24px] border bg-[#c0c0c0] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Black" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="black" className="cursor-pointer w-[24px] h-[24px] border bg-[#221f20] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="White" placement="right">
                        <button onClick={(e) => setPackaging('out', e.currentTarget.value)} value="white" className="cursor-pointer w-[24px] h-[24px] border bg-[#ffffff] rounded-full"></button>
                    </Tooltip>
                </div>
            </div>

            <div
                className={`${value === 'in' ? 'block' : 'invisible'} relative top-[-15dvh] h-[170px] lg:h-[120px] mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="White" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="white" className="cursor-pointer w-[24px] h-[24px] border bg-[#f8f8f8] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Black" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="black" className="cursor-pointer w-[24px] h-[24px] border bg-[#1f1f1f] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Grey" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="130" className="cursor-pointer w-[24px] h-[24px] border bg-[#c2c8cc] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Beige" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="131" className="cursor-pointer w-[24px] h-[24px] border bg-[#f1ece3] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Camel" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="30" className="cursor-pointer w-[24px] h-[24px] border bg-[#bf902e] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Brown" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="78" className="cursor-pointer w-[24px] h-[24px] border bg-[#6b3600] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Red" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="57" className="cursor-pointer w-[24px] h-[24px] border bg-[#d53711] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Crimson" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="5" className="cursor-pointer w-[24px] h-[24px] border bg-[#97021b] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Steel blue" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="55" className="cursor-pointer w-[24px] h-[24px] border bg-[#8799ba] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Midnight Blue" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="95" className="cursor-pointer w-[24px] h-[24px] border bg-[#181a4d] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Lavender" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="nk41" className="cursor-pointer w-[24px] h-[24px] border bg-[#aa98ea] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Cyclamen" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="nk132" className="cursor-pointer w-[24px] h-[24px] border bg-[#89057b] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Salmon" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="nk124" className="cursor-pointer w-[24px] h-[24px] border bg-[#fb8282] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Sage" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="53" className="cursor-pointer w-[24px] h-[24px] border bg-[#93bab3] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Green" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="54" className="cursor-pointer w-[24px] h-[24px] border bg-[#02552d] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Forest Green" placement="right">
                        <button onClick={(e) => setPackaging('in', e.currentTarget.value)} value="76" className="cursor-pointer w-[24px] h-[24px] border bg-[#0a3420] rounded-full"></button>
                    </Tooltip>
                </div>
            </div>

            <div className={`${value === 'details' ? 'block' : 'invisible'} h-[170px] lg:h-[120px] pt-4 mb-4 pl-6 text-center`}>
                <div className="w-[36px] flex flex-col gap-2 items-center bg-gray-50 rounded-full py-2 border-1">
                    <Tooltip title="Yellow Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="gold" className="cursor-pointer w-[24px] h-[24px] border bg-[#e1c487] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Rose Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="rose" className="cursor-pointer w-[24px] h-[24px] border bg-[#de9ca0] rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="White Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="white" className="cursor-pointer w-[24px] h-[24px] border bg-gray-100 rounded-full"></button>
                    </Tooltip>
                    <Tooltip title="Black Gold" placement="right">
                        <button onClick={(e) => setPackaging('details', e.currentTarget.value)} value="black" className="cursor-pointer w-[24px] h-[24px] border bg-slate-950 rounded-full"></button>
                    </Tooltip>
                </div>
            </div>

            <div aria-hidden={true} className="lg:hidden block h-[170px] lg:h-[120px] pt-4 mb-4 pl-6"></div>

            {innerWidth >= 1024 && value === 'text' && <CustomTextInput/>}
        </>
    )
}