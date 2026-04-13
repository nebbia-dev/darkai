'use client'
import {FormEvent, useState} from "react";
import Upload from "@/app/_components/_elements/_upload_inputs/Upload";
import {Modal} from "@mui/material";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import RecapList from "@/app/_components/_elements/RecapList";
import {Dropdown} from "@/app/_components/_icons/Dropdown";
import {useRouter} from "next/navigation";
import {sendMail} from "@/lib/nodemailer/sendMail";
import generateConfigHtml from "@/app/_helpers/_string-modders/generateConfigHtml";
import createConfig from "@/app/_helpers/_db-interactions/createConfig";
import updateConfigScreen from "@/app/_helpers/_db-interactions/updateConfigScreen";
import {dataUrlToFile, uploadToStorage} from "@/app/_helpers/_uploads/uploadToStorage";

export default function Recap({next, onclick} : {next:boolean, onclick:() => void }){
    const router = useRouter();
    const bufferConfigImage = useTeethStore((state:State) => state.bufferConfigImage);
    const teethPreciousness = useTeethStore((state:State) => state.teethPreciousness);
    const total = useTeethStore((state:State) => state.total);
    const teethPrices = useTeethStore((state:State) => state.teethPrices);
    const [showRecap, setShowRecap] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [emailInfo, setEmailInfo] = useState<{name: string, email:string}>({name: '', email:''})
    const [sent, setSent] = useState<boolean>(false);
    const setPreciousness = useTeethStore((state:State) => state.setTeethPreciousness);
    const setSavedConfigId = useTeethStore((state:State) => state.setSavedConfig);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);
    const history = useTeethStore((state:State) => state.history);
    const currentStep = useTeethStore((state:State) => state.currentHistory - 1);
    const packaging = useTeethStore((state: State) => state.packaging);
    function toggleRecap() {
        setShowRecap(prev => !prev);
    }
    function setCarat(e:any) {
        setPreciousness(Number(e));
    }
    async function send(e:FormEvent) {
        e.preventDefault();

        if(emailInfo.name === '' || emailInfo.email === '') {
            return
        }

        if(!bufferConfigImage) {
            return
        }

        setIsSending(true);

        try {
            const config = await createConfig(history[history.length-1][0], total, packaging, 'Not completed');

            if(config) {
                setSavedConfigId(config[0].id);
            }

            let imageUrl: string | undefined;

            if (config?.[0]?.id) {
                const file = await dataUrlToFile(bufferConfigImage, 'config');
                const uploadedConfig = await uploadToStorage('configs', file);

                await updateConfigScreen(config[0].id, uploadedConfig.path);
                imageUrl = uploadedConfig.publicUrl;
            }

            // TODO:
            // - save the configuration in the local storage
            // - IF the checkbox is checked, SAVE name, email address and config in the Newsletter table
            await sendMail({
                    sendTo: emailInfo.email,
                    subject: 'New config!',
                    text: 'Your new Grill!',
                    html: generateConfigHtml(teethPrices, history, currentStep, packaging, total),
                    image: imageUrl,
            });
            setSent(true);
        } finally {
            setIsSending(false);
        }
    }

    function saveTempConfig() {
        router.push('/checkout/payment');
    }

    return(
        <>
            <div className={`w-full relative cursor-auto rounded-3xl lg:mr-[5vw] ${next ? 'h-[calc(100dvh-(0.25rem*5)-60px)]' : 'h-[calc(100dvh-124px-(0.25rem*10)-60px)]'} lg:h-[82.5dvh] ${next ? 'top-[20px]' : 'top-[132px]'} lg:top-[48px] text-sm`}>
                {!next
                    ? <div className="flex flex-col items-center justify-end h-full relative lg:static bottom-30">
                        {/* MyConfig Top */}
                        <div
                            className={`${!showRecap ? 'border-b-0' : ''} border-1 rounded-t-3xl w-full bg-gray-50 px-6 py-4 text-center flex items-center justify-center gap-2`}>
                            <h2 className="font-semibold">My Configuration</h2>
                            {innerWidth >= 1024 &&
                                <button type="button"
                                     className="h-4 w-4 bg-slate-950 rounded-full cursor-pointer text-gray-50 flex items-center justify-center"
                                     onClick={toggleRecap}>
                                    <Dropdown/>
                                </button>
                            }
                        </div>
                        {/* MyConfig Middle w/Recap */}
                        <div
                            className={`${showRecap ? 'h-[80%] lg:h-[60dvh]' :'h-0'} bg-gray-200/50 lg:transition-[height] lg:duration-500 w-[calc(100%-2px)] relative`}>
                            <div
                                className="absolute h-[15%] bottom-0 w-full bg-linear-to-t from-gray-50 to-indigo-0"></div>
                            <RecapList edit={true}/>
                        </div>
                        {/* MyConfig Bottom w/ Carats+Diamonds */}
                        <div className="border-1 rounded-b-3xl w-full bg-gray-50 px-6 py-4">
                            <div className="flex gap-4 items-center">
                                <span className="font-medium inline-block w-[72px]">Carats:</span>
                                <div className="flex justify-evenly gap-4 w-full">
                                    <button type="button" className={`${teethPreciousness.carats === 10 ? 'font-medium border-sky-400 bg-sky-400 text-gray-50' : 'border-slate-950 bg-gray-50 text-slate-950'} border-1 px-4 py-2 rounded-full cursor-pointer`} value="10"
                                            onClick={(e) => setCarat(e.currentTarget.value)}>10K
                                    </button>
                                    <button type="button" className={`${teethPreciousness.carats === 14 ? 'font-medium border-sky-400 bg-sky-400 text-gray-50' : 'border-slate-950 bg-gray-50 text-slate-950'} border-1 px-4 py-2 rounded-full cursor-pointer`} value="14"
                                            onClick={(e) => setCarat(e.currentTarget.value)}>14K
                                    </button>
                                    <button type="button" className={`${teethPreciousness.carats === 18 ? 'font-medium border-sky-400 bg-sky-400 text-gray-50' : 'border-slate-950 bg-gray-50 text-slate-950'} border-1 px-4 py-2 rounded-full cursor-pointer`} value="18"
                                            onClick={(e) => setCarat(e.currentTarget.value)}>18K
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Price */}
                        {innerWidth >= 1024 &&
                            <div
                            className="border-1 rounded-3xl w-full bg-gray-50 pl-6 pr-2 py-2 flex items-center justify-between mt-4">
                                <div>
                                    <h3 className="font-semibold inline">Price: </h3>
                                    <span>{new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(total)}</span>
                                </div>
                                <button disabled={(history.length === 0 || total === 0) && !packaging.premium} className={`rounded-3xl ${(history.length === 0 || total === 0) && !packaging.premium ? 'bg-gray-300' : 'bg-slate-950 cursor-pointer'} text-gray-50 px-5 py-2 h-full`}
                                        onClick={onclick}>Continue &rarr;</button>
                            </div>
                        }
                    </div>
                    : <div className="flex flex-col items-center justify-end h-full">
                        {/* MyConfig Top */}
                        <div
                            className={`${!showRecap ? 'border-b-0' : ''} border-1 rounded-t-3xl w-full bg-gray-50 px-6 py-4 text-center flex items-center justify-center gap-2`}>
                            <h2 className="font-semibold">Review your order</h2>
                            {innerWidth >= 1024 &&
                                <button type="button"
                                     className="h-4 w-4 bg-slate-950 rounded-full cursor-pointer text-gray-50 flex items-center justify-center"
                                     onClick={toggleRecap}>
                                    <Dropdown/>
                                </button>
                            }
                        </div>
                        <div
                            className={`${showRecap ? 'h-[calc(100%-364px)] lg:h-[45%]' : 'h-0'} lg:transition-[height] lg:duration-500 w-full relative`}>
                            <div
                                className="absolute h-[15%] bottom-0 w-full bg-linear-to-t from-gray-50 to-indigo-0"></div>

                            <RecapList edit={false}/>
                        </div>

                        {/* Upload */}
                        <div className="border-1 rounded-b-3xl w-full bg-gray-50 px-6 pt-4 pb-6">
                            <Upload/>
                        </div>

                        {/* Nav Buttons */}
                        <div
                            className="border-1 rounded-3xl w-full bg-gray-50 px-2 py-2 flex items-center justify-between mt-4">
                            {innerWidth < 1024
                                ? <button
                                    className="rounded-full bg-gray-50 text-slate-950 px-3 py-2 h-full cursor-pointer border-1"
                                    onClick={onclick}>&larr;
                                    </button>
                                : <button
                                    className="rounded-3xl bg-gray-50 text-slate-950 px-5 py-2 h-full cursor-pointer border-1"
                                    onClick={onclick}>&larr; Back
                                </button>
                            }
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full cursor-pointer">Save
                                </button>
                                <button
                                    onClick={saveTempConfig}
                                    className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full cursor-pointer">
                                    {innerWidth >= 1024 ? 'Proceed to c' : 'C'}heckout &rarr;
                                </button>
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
                <div className="w-[90%] lg:w-[50%] absolute top-[50%] left-[50%] translate-[-50%] bg-gray-50 rounded py-8 px-8 lg:px-12">
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
                                <form className="flex flex-col gap-2 mt-6" onSubmit={(event) => send(event)}>
                                    <input className="w-full rounded bg-stone-200 py-2 px-4 focus:outline-black" placeholder="Your name"
                                           type="text"
                                           value={emailInfo.name}
                                           onChange={(e) => setEmailInfo({...emailInfo, name: e.currentTarget.value})}
                                           required/>
                                    <input className="w-full rounded bg-stone-200 py-2 px-4" placeholder="Your email"
                                           type="email"
                                           value={emailInfo.email}
                                           onChange={(e) => setEmailInfo({...emailInfo, email: e.currentTarget.value})}
                                           required/>
                                    {/*<label className="flex items-baseline lg:items-center gap-2 mt-2">*/}
                                    {/*    <input className="mr-4 min-w-[4.5vw] min-h-[4.5vw] lg:min-w-auto lg:min-h-auto" type="checkbox"/>*/}
                                    {/*    I'd like to receive more information about Darkai products*/}
                                    {/*</label>*/}
                                    <div className="w-full text-right mt-4">
                                        <button
                                            className="cursor-pointer py-2 px-4 rounded-full border text-gray-950 mr-4"
                                            type="button" onClick={() => setOpen(false)}>Close
                                        </button>
                                        <button
                                            className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                                            type="submit"
                                        >Send
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
