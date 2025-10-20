import ToothConfig from "@/app/components/ToothConfig";
import {FormEvent, ReactNode, SyntheticEvent, useEffect, useRef, useState} from "react";
import {Box, Modal, Tab, Tabs} from "@mui/material";
import DefaultConfig from "@/app/components/DefaultConfig";
import ToothSelector from "@/app/components/ToothSelector";
import DefaultSelector from "@/app/components/DefaultSelector";
import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";
import elabToothName from "@/app/helpers/elabToothName";
import Link from 'next/link';
import firstCapital from "@/app/helpers/firstCapital";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export default function Selection({ui} : {ui:boolean}) {
    const total = useTeethStore((state:State) => state.total);
    const totalPreciousness = useTeethStore((state:State) => state.totalPreciousness);
    const calcPreciousness = useTeethStore((state:State) => state.calcPreciousness);
    const visibleTeeth = useTeethStore((state:State) => state.teethVisibility);
    const jewelType = useTeethStore((state: State) => state.teethJewelType);
    const material = useTeethStore((state: State) => state.teethMaterial);
    const pave = useTeethStore((state: State) => state.teethPave);
    const stones = useTeethStore((state: State) => state.teethStones);
    const teethPrices = useTeethStore((state:State) => state.teethPrices);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const setActiveTooth =  useTeethStore((state: State) => state.setActiveTooth);
    const activeTab = useTeethStore((state: State) => state.activeTab);
    const setActiveTab = useTeethStore((state: State) => state.setActiveTab);
    const recap = useTeethStore((state:State) => state.recap);
    const setRecap = useTeethStore((state:State) => state.setRecap);
    const takeScreenshot = useTeethStore((state:State) => state.setIsScreenshotNeeded);

    const [gold, setGold] = useState<string>('14k');
    const [diamond, setDiamond] = useState<string>('mois');
    const [open, setOpen] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

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
    function checkDiamonds() {
        for(const tooth of Object.keys(jewelType)) {
            if(jewelType[tooth].includes('Diamond')) {
                return true;
            }
        }
        return false;
    }
    function showRecap() {
        setRecap(true);
        setActiveTooth(undefined);
        calcPreciousness(gold, diamond);
    }

    useEffect(() => {
        if(checkDiamonds()) {
            calcPreciousness(gold, diamond);
        } else {
            calcPreciousness(gold, undefined);
        }
    }, [recap, gold, diamond]);

    return (
        <>
            <div className="w-full h-full relative">
                <>
                    <>
                        {!activeTooth
                            ?  <div className="w-full h-full flex flex-col items-center justify-center my-auto rounded text-black col-start-2 col-end-2 row-start-1 row-end-1">
                                        <p>Prima scegli un dente</p>
                               </div>


                            : <>
                                {/*DENTI SUPERIORI*/}
                                <ToothSelector tooth='icsdx'/>
                                <ToothSelector tooth='icssx'/>
                                <ToothSelector tooth='ilsdx'/>
                                <ToothSelector tooth='ilssx'/>
                                <ToothSelector tooth='csdx'/>
                                <ToothSelector tooth='cssx'/>
                                {/*DENTI INFERIORI*/}
                                <ToothSelector tooth='icidx'/>
                                <ToothSelector tooth='icisx'/>
                                <ToothSelector tooth='ilidx'/>
                                <ToothSelector tooth='ilisx'/>
                                <ToothSelector tooth='cidx'/>
                                <ToothSelector tooth='cisx'/>
                            </>
                        }
                    </>
                </>
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
                                        <button className="cursor-pointer py-2 px-4 rounded-full border text-gray-950 mr-4"
                                                type="button" onClick={() => setOpen(false)}>Close
                                        </button>
                                        <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
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