'use client'
import {FormEvent, useState} from "react";
import Upload from "./Upload";
import {Modal, Tooltip} from "@mui/material";
import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";
import Link from 'next/link';
import elabToothName from "@/app/helpers/elabToothName";
import firstCapital from "@/app/helpers/firstCapital";
import elabStoneName from "@/app/helpers/elabStoneName";
import {Close} from "@/app/components/icons/Close";

export default function Recap({next, onclick} : {next:boolean, onclick:() => void }){
    const teethPreciousness = useTeethStore((state:State) => state.teethPreciousness);
    const teethStones = useTeethStore((state:State) => state.teethStones);
    const teethPaves = useTeethStore((state:State) => state.teethPaves);
    const teethPrices = useTeethStore((state:State) => state.teethPrices);
    const total = useTeethStore((state:State) => state.total);
    const history = useTeethStore((state:State) => state.history);
    const [showRecap, setShowRecap] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const takeScreenshot = useTeethStore((state:State) => state.setIsScreenshotNeeded);
    const resetTooth = useTeethStore((state: State) => state.resetTooth);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const setHover = useTeethStore((state: State) => state.setHover);
    const setPreciousness = useTeethStore((state:State) => state.setTeethPreciousness);
    const prices = useTeethStore((state:State) => state.prices);

    console.log(prices);
    function checkDiamonds():boolean {
        for(let stone of Object.values(teethStones)) {
            if(stone.color === 'whD' || stone.color === 'brD' || stone.color === 'blD') {
                return true;
            }
        }

        for(let pave of Object.values(teethPaves)) {
            if(pave.color === 'whD' || pave.color === 'brD' || pave.color === 'blD') {
                return true;
            }
        }

        return false;
    }
    function toggleRecap() {
        setShowRecap(prev => !prev)
    }

    function setCarat(e:any) {
        setPreciousness(Number(e), teethPreciousness.diamonds);
    }

    function setDiamonds(e:any) {
        setPreciousness(teethPreciousness.carats, e);
    }

    function setCurrentHover(tooth:string|undefined, e:any) {
        e.stopPropagation();
        setHover(tooth);
    }
    function download(e:FormEvent) {
        e.preventDefault();
        setIsSending(true);
        setTimeout(() => {
            takeScreenshot(true);
            // TODO:
            // - set Nodemailer to SEND the email with the current configuration and the screenshot
            // - save the configuration in the local storage
            // - IF the checkbox is checked, SAVE name, email address and config in the Newsletter table
            setIsSending(false);
            setSent(true);
        }, 1000)
    }

    return(
        <>
            <div className="rounded-3xl mr-[5vw] h-[82.5vh] text-sm">
                {!next
                    ? <div className="flex flex-col items-center justify-end h-full">
                        {/* MyConfig Top */}
                        <div
                            className={`${!showRecap ? 'border-b-0' : ''} border-1 rounded-t-3xl w-full bg-gray-50 px-6 py-4 text-center flex items-center justify-center gap-2`}>
                            <h2 className="font-semibold">My Configuration</h2>
                            <button type="button"
                                    className="h-4 w-4 bg-slate-950 rounded-full cursor-pointer text-gray-50"
                                    onClick={toggleRecap}>V
                            </button>
                        </div>
                        {/* MyConfig Middle w/Recap */}
                        <div
                            className={`${showRecap ? 'h-[50vh]' : 'h-0'} transition-[height] duration-500 w-full relative`}>
                            <div
                                className="absolute h-[15%] bottom-0 w-full bg-linear-to-t from-gray-50 to-indigo-0"></div>
                            <div className="pl-6 pr-3 py-4 h-full">
                                <ul className="pr-3 h-full overflow-y-scroll">
                                    {history.length === 0 &&
                                        <div className="w-full h-full flex items-center justify-center">
                                            <p>Choose your configs wisely!</p>
                                        </div>
                                    }
                                    {history.length > 0 && Object.entries(history[history.length - 1][0].type).map(tooth => {
                                        return (
                                            history[history.length - 1][0].visible[tooth[0]] &&
                                            <li key={tooth[0]} onClick={() => setActive(tooth[0])} onMouseEnter={(e) => setCurrentHover(tooth[0], e)} onMouseLeave={(e) => setCurrentHover(undefined, e)} className="cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-semibold">
                                                        {elabToothName(tooth[0], false)}
                                                    </h4>
                                                    <Tooltip title="Delete tooth">
                                                        <Close className="cursor-pointer"
                                                               onClick={() => resetTooth(tooth[0])}/>
                                                    </Tooltip>
                                                </div>
                                                <p>{firstCapital(tooth[1])}, {history[history.length - 1][0].material[tooth[0]]}</p>
                                                { history[history.length - 1][0].stones[tooth[0]].shape !== undefined &&
                                                    <p>{firstCapital(elabStoneName(history[history.length - 1][0].stones[tooth[0]].color as string))} w/ {history[history.length - 1][0].stones[tooth[0]].shape} shape</p>
                                                }
                                                { history[history.length - 1][0].pave[tooth[0]].shape !== undefined &&
                                                    <p>{firstCapital(history[history.length - 1][0].pave[tooth[0]].shape as string)} pave w/ {firstCapital(elabStoneName(history[history.length - 1][0].pave[tooth[0]].color as string))}</p>
                                                }
                                                <span aria-hidden={true}
                                                      className="inline-block h-[1px] w-full bg-slate-950"></span>
                                                <p className="font-bold w-full text-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(teethPrices[tooth[0]])}</p>
                                            </li>
                                        )
                                    })}
                                    {/*<li><button onClick={() => console.log(history[history.length - 1][0].type.icsdx)}>Halo</button></li>*/}
                                </ul>
                            </div>
                        </div>
                        {/* MyConfig Bottom w/ Carats+Diamonds */}
                        <div className="border-1 rounded-b-3xl w-full bg-gray-50 px-6 pt-4 pb-6">
                            <div className="flex gap-4 mb-2 items-center">
                                <span className="inline-block w-[72px]">Carats:</span>
                                <div className="flex gap-4">
                                    <button type="button" className={`${teethPreciousness.carats === 10 ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl cursor-pointer`} value="10"
                                            onClick={(e) => setCarat(e.currentTarget.value)}>10K
                                    </button>
                                    <button type="button" className={`${teethPreciousness.carats === 14 ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl cursor-pointer`} value="14"
                                            onClick={(e) => setCarat(e.currentTarget.value)}>14K
                                    </button>
                                    <button type="button" className={`${teethPreciousness.carats === 18 ? 'bg-stone-500 text-gray-50' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl cursor-pointer`} value="18"
                                            onClick={(e) => setCarat(e.currentTarget.value)}>18K
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className={`inline-block w-[72px] ${!checkDiamonds() ? 'text-slate-100' : 'text-slate-950'}`}>Diamonds:</span>
                                <div className="flex gap-4">
                                    <button disabled={!checkDiamonds()} type="button" className={`${teethPreciousness.diamonds === 'lab' ? 'bg-stone-500 text-gray-50' : !checkDiamonds() ? 'bg-gray-50 text-slate-200' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl ${!checkDiamonds() ? '' : 'cursor-pointer'}`} value="lab"
                                            onClick={(e) => setDiamonds(e.currentTarget.value)}>Lab
                                    </button>
                                    <button disabled={!checkDiamonds()} type="button" className={`${teethPreciousness.diamonds === 'nat' ? 'bg-stone-500 text-gray-50' : !checkDiamonds() ? 'bg-gray-50 text-slate-200' : 'bg-gray-50 text-slate-950'} px-2 py-1 rounded-3xl ${!checkDiamonds() ? '' : 'cursor-pointer'}`} value="nat"
                                            onClick={(e) => setDiamonds(e.currentTarget.value)}>Natural
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Price */}
                        <div
                            className="border-1 rounded-3xl w-full bg-gray-50 pl-6 pr-2 py-2 flex items-center justify-between mt-4">
                            <div>
                                <h3 className="font-semibold inline">Price: </h3>
                                <span>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(total)}</span>
                            </div>
                            <button className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full cursor-pointer"
                                    onClick={onclick}>Continue &rarr;</button>
                        </div>
                    </div>
                    : <div className="flex flex-col items-center justify-end h-full">
                        {/* MyConfig Top */}
                        <div
                            className={`${!showRecap ? 'border-b-0' : ''} border-1 rounded-t-3xl w-full bg-gray-50 px-6 py-4 text-center flex items-center justify-center gap-2`}>
                            <h2 className="font-semibold">Review your order</h2>
                            <button type="button"
                                    className="h-4 w-4 bg-slate-950 rounded-full cursor-pointer text-gray-50"
                                    onClick={toggleRecap}>V
                            </button>
                        </div>
                        {/* MyConfig Middle w/Recap */}
                        {/* DA SOSTITUIRE CON IL NUOVO */}
                        <div
                            className={`${showRecap ? 'h-[30vh]' : 'h-0'} transition-[height] duration-500 w-full relative`}>
                            <div
                                className="absolute h-[15%] bottom-0 w-full bg-linear-to-t from-gray-50 to-indigo-0"></div>
                            <div className="pl-6 pr-3 py-4 h-full">
                                <ul className="pr-3 h-full overflow-y-scroll">
                                    <li>
                                        <h4 className="font-semibold">
                                            Upper central incisor R
                                        </h4>
                                        <p>Full, white</p>
                                        <span aria-hidden={true}
                                              className="inline-block h-[1px] w-full bg-slate-950"></span>
                                        <p className="font-bold w-full text-right">500€</p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">
                                            Upper central incisor L
                                        </h4>
                                        <p>Full, white</p>
                                        <span aria-hidden={true}
                                              className="inline-block h-[1px] w-full bg-slate-950"></span>
                                        <p className="font-bold w-full text-right">500€</p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">
                                            Lower central incisor R
                                        </h4>
                                        <p>Full, white</p>
                                        <span aria-hidden={true}
                                              className="inline-block h-[1px] w-full bg-slate-950"></span>
                                        <p className="font-bold w-full text-right">500€</p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">
                                            Lower central incisor L
                                        </h4>
                                        <p>Full, white</p>
                                        <span aria-hidden={true}
                                              className="inline-block h-[1px] w-full bg-slate-950"></span>
                                        <p className="font-bold w-full text-right">500€</p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">
                                            Upper canine R
                                        </h4>
                                        <p>Full, gold</p>
                                        <span aria-hidden={true}
                                              className="inline-block h-[1px] w-full bg-slate-950"></span>
                                        <p className="font-bold w-full text-right">500€</p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">
                                            Upper canine L
                                        </h4>
                                        <p>Full, gold</p>
                                        <span aria-hidden={true}
                                              className="inline-block h-[1px] w-full bg-slate-950"></span>
                                        <p className="font-bold w-full text-right">500€</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Upload */}
                        <div className="border-1 rounded-b-3xl w-full bg-gray-50 px-6 pt-4 pb-6">
                            <Upload/>
                        </div>

                        {/* Nav Buttons */}
                        <div
                            className="border-1 rounded-3xl w-full bg-gray-50 px-2 py-2 flex items-center justify-between mt-4">
                            <button
                                className="rounded-3xl bg-gray-50 text-slate-950 px-5 py-2 h-full cursor-pointer border-1"
                                onClick={onclick}>&larr; Back
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full cursor-pointer">Save
                                </button>
                                <Link
                                    href='/checkout/payment'
                                    className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full cursor-pointer">Proceed
                                    to checkout &rarr;
                                </Link>
                            </div>

                        </div>
                    </div>
                }
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="absolute top-[50%] left-[50%] translate-[-50%] bg-gray-50 rounded py-8 px-12">
                    {isSending
                        ?
                        <div className="w-full text-center">
                            <span className="loader mb-8 inline-block mx-auto"></span>
                            <h2 className="text-gray-950 mx-auto">Sending...</h2>
                        </div>
                        : sent
                            ? <div>
                                <p className="text-gray-950">Your configuration has been sent to you!</p>
                                <div className="w-full text-right mt-6">
                                    <button className="cursor-pointer py-2 px-4 rounded-full border text-gray-950"
                                            type="button" onClick={() => setOpen(false)}>Close
                                    </button>
                                </div>
                            </div>

                            : <div>
                                <p className="text-gray-950">In order to save your configuration, tell us to whom we may
                                    send it!</p>
                                <form className="flex flex-col gap-2 mt-6" onSubmit={(event) => download(event)}>
                                    <input className="w-full rounded bg-stone-200 py-2 px-4" placeholder="Your name"
                                           type="text"
                                           required/>
                                    <input className="w-full rounded bg-stone-200 py-2 px-4" placeholder="Your email"
                                           type="email"
                                           required/>
                                    <label className="flex items-center gap-2 mt-2">
                                        <input className="mr-4" type="checkbox"/>
                                        I'd like to receive more information about Darkai products
                                    </label>
                                    <div className="w-full text-right mt-4">
                                        <button
                                            className="cursor-pointer py-2 px-4 rounded-full border text-gray-950 mr-4"
                                            type="button" onClick={() => setOpen(false)}>Close
                                        </button>
                                        <button
                                            className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                                            type="submit">Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                    }
                </div>
            </Modal>
        </>
    )
}