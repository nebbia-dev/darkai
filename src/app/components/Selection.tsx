import ToothConfig from "@/app/components/ToothConfig";
import {FormEvent, ReactNode, SyntheticEvent, useEffect, useState} from "react";
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
        calcPreciousness(gold, diamond);
    }
    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
    function CustomTabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                className={`w-full ${ui ? 'bg-stone-200 h-full' : ''}`}
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && ui && <Box sx={{height: 1}}>{children}</Box>}
                {value === index && !ui && <Box>{children}</Box>}
            </div>
        );
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
            {!ui
                ? <div className="border-l-1 border-gray-400">
                    {!recap
                        ?
                        <>
                            <div>
                                <Tabs
                                    value={activeTab} onChange={changeTab} aria-label="tabs" sx={{
                                    width: 1,
                                    '& .MuiTabs-indicator': {top: 0, backgroundColor: '#030712', height: '0.2rem'},
                                    borderBottom: `${activeTab === 0 || !activeTooth && Object.values(visibleTeeth).filter((el:boolean):boolean => el).length === 0 ? '1px solid #9ca3af' : ''}`,
                                    '& .Mui-selected': {color: '#030712 !important'}
                                }}>
                                    <Tab label="DEFAULT" sx={{width: 0.5, maxWidth: 1}}/>
                                    <Tab label="CUSTOM" sx={{width: 0.5, maxWidth: 1}}/>
                                </Tabs>
                            </div>
                            <CustomTabPanel value={activeTab} index={0}>
                        <div
                            className="w-full h-[calc(100vh-54px-48px-0.2rem-15vh)] flex flex-col align-center justify-start text-center bg-gray-50 my-auto rounded text-black">
                            <div className="overflow-y-auto">
                                <DefaultConfig teeth="full"/>
                                <DefaultConfig teeth="bar"/>
                                <DefaultConfig teeth="frame"/>
                                <DefaultConfig teeth="canines"/>
                                <DefaultConfig teeth="stones"/>
                            </div>
                        </div>
                    </CustomTabPanel>
                            <CustomTabPanel value={activeTab} index={1}>
                                {!activeTooth && Object.values(visibleTeeth).filter((el:boolean):boolean => el).length === 0
                                    ? <div className="w-full h-[calc(100vh-54px-48px-0.2rem-15vh)] flex flex-col align-center justify-center">
                                        <p className="text-center">To start, select a tooth</p>
                                      </div>
                                    : <div className="w-full h-[calc(100vh-54px-48px-0.2rem-15vh)] flex flex-col align-center justify-start text-center bg-gray-50 my-auto rounded text-black">
                                        <div className="overflow-y-auto">
                                            {/*DENTI SUPERIORI*/}
                                            {(activeTooth === 'icsdx' || visibleTeeth.icsdx) &&
                                                <ToothConfig tooth='icsdx' />}
                                            {(activeTooth === 'icssx' || visibleTeeth.icssx) &&
                                                <ToothConfig tooth='icssx' />}
                                            {(activeTooth === 'ilsdx' || visibleTeeth.ilsdx) &&
                                                <ToothConfig tooth='ilsdx' />}
                                            {(activeTooth === 'ilssx' || visibleTeeth.ilssx) &&
                                                <ToothConfig tooth='ilssx' />}
                                            {(activeTooth === 'csdx' || visibleTeeth.csdx) &&
                                                <ToothConfig tooth='csdx' />}
                                            {(activeTooth === 'cssx' || visibleTeeth.cssx) &&
                                                <ToothConfig tooth='cssx' />}
                                            {/*DENTI INFERIORI*/}
                                            {(activeTooth === 'icidx' || visibleTeeth.icidx) &&
                                                <ToothConfig tooth='icidx' />}
                                            {(activeTooth === 'icisx' || visibleTeeth.icisx) &&
                                                <ToothConfig tooth='icisx' />}
                                            {(activeTooth === 'ilidx' || visibleTeeth.ilidx) &&
                                                <ToothConfig tooth='ilidx' />}
                                            {(activeTooth === 'ilisx' || visibleTeeth.ilisx) &&
                                                <ToothConfig tooth='ilisx' />}
                                            {(activeTooth === 'cidx' || visibleTeeth.cidx) &&
                                                <ToothConfig tooth='cidx' />}
                                            {(activeTooth === 'cisx' || visibleTeeth.cisx) &&
                                                <ToothConfig tooth='cisx' />}
                                        </div>
                                    </div>
                                }
                            </CustomTabPanel>
                                <div className="w-full h-[15vh] bg-stone-200">
                            {Object.values(visibleTeeth).filter((el:boolean):boolean => el).length > 0 &&
                                    <div className="h-full flex items-center justify-between w-[90%] mx-auto">
                                        <p>{total !== 0 && <span>Starting from {total}€</span>}</p>
                                        <button type="button" onClick={() => showRecap()}
                                                className="bg-gray-950 py-2 px-4 rounded-full text-gray-50 cursor-pointer">Continue &rarr;</button>
                                    </div>
                            }
                                </div>
                        </>
                        : <div className="h-[calc(100vh-54px)] flex flex-col w-full mx-auto">
                            <div className="h-[calc(100%-15vh-7.5vh)] overflow-y-auto mt-[48px] w-full mx-auto">
                                {
                                    Object.keys(visibleTeeth).map((tooth, i) => {
                                        if (!visibleTeeth[tooth]) return null;
                                        if (tooth === 'cisx' && (jewelType[tooth] === 'bigBar' || jewelType[tooth] === 'bigBarDiamond')) return null;
                                        if (tooth === 'icisx' && (jewelType[tooth] === 'bar' || jewelType[tooth] === 'barDiamond')) return null;
                                        if (tooth === 'icssx' && (jewelType[tooth] === 'bar' || jewelType[tooth] === 'barDiamond')) return null;

                                        return (
                                            <div key={i} className="flex flex-col mb-4">
                                                <div className="w-full py-1 px-3 bg-stone-200 mb-2">
                                                    <h3 className="w-full flex items-center justify-start">
                                                        <span className="inline-block w-[75%] mx-auto">{
                                                    (tooth === 'cidx' && (jewelType[tooth] === 'bigBar' || jewelType[tooth] === 'bigBarDiamond'))
                                                    ? 'Canini inferiori'
                                                    : (tooth === 'icidx' && (jewelType[tooth] === 'bar' || jewelType[tooth] === 'barDiamond'))
                                                        ? 'Incisivi centrali inferiori'
                                                        : (tooth === 'icsdx' && (jewelType[tooth] === 'bar' || jewelType[tooth] === 'barDiamond'))
                                                            ? 'Incisivi centrali superiori'
                                                            : elabToothName(tooth, false)
                                                        }</span></h3>
                                                    </div>
                                                <ul className="ml-4 w-full flex flex-col items-center justify-start mb-2">
                                                    <li className="inline-block w-[75%] mx-auto">Jewel type: {jewelType[tooth].includes('Diamond') ? firstCapital(jewelType[tooth].split('D')[0]) + ' with ' + pave[tooth] + 's': firstCapital(jewelType[tooth])}</li>
                                                    <li className="inline-block w-[75%] mx-auto">Material: {firstCapital(material[tooth])}</li>
                                                    {(stones[tooth].shape && stones[tooth].color) && <li className="inline-block w-[75%] mx-auto">Gem: {firstCapital(stones[tooth].color as string)}, {firstCapital(stones[tooth].shape as string)} cut</li>}
                                                </ul>
                                                <div className="border-t-1 w-full flex flex-col items-center">
                                                    <span className="text-right py-1 px-3 mt-2 font-semibold text-xl inline-block w-[75%] mx-auto">{
                                                        (tooth === 'cidx' && (jewelType[tooth] === 'bigBar' || jewelType[tooth] === 'bigBarDiamond'))
                                                        || ((tooth === 'icidx' || tooth === 'icsdx') && (jewelType[tooth] === 'bar' || jewelType[tooth] === 'barDiamond'))
                                                            ? teethPrices[tooth]*2
                                                            : teethPrices[tooth]
                                                    }€</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="mb-4">
                                    <div className="w-full py-1 px-3 bg-stone-200 mb-2">
                                        <h3 className="w-full flex items-center justify-start">
                                            <span className="inline-block w-[75%] mx-auto">Gold carats</span>
                                        </h3>
                                    </div>
                                        <div className="w-[75%] mx-auto">
                                            <label htmlFor="18k" className="flex items-center gap-2 ml-4">
                                                <input type="radio" id="18k" name="carats" checked={gold === '18k'}
                                                       value="18k" onChange={(e) => setGold(e.target.value)}/>
                                                18K
                                            </label>
                                            <label htmlFor="14k" className="flex items-center gap-2 ml-4">
                                                <input type="radio" id="14k" name="carats" checked={gold === '14k'}
                                                       value="14k" onChange={(e) => setGold(e.target.value)}/>
                                                14K
                                            </label>
                                        </div>
                                </div>
                                {checkDiamonds() &&
                                    <div>
                                        <div className="w-full py-1 px-3 bg-stone-200 mb-2">
                                            <h3 className="w-full flex items-center justify-start">
                                                <span className="inline-block w-[75%] mx-auto">Diamonds type</span>
                                            </h3>
                                        </div>
                                        <div className="w-[75%] mx-auto">
                                            <label htmlFor="natural" className="flex items-center gap-2 ml-4">
                                                <input type="radio" id="natural" name="diamonds"
                                                       checked={diamond === 'natural'}
                                                       value="natural" onChange={(e) => setDiamond(e.target.value)}/>
                                                Natural
                                            </label>
                                            <label htmlFor="lab" className="flex items-center gap-2 ml-4">
                                                <input type="radio" id="lab" name="diamonds" checked={diamond === 'lab'}
                                                       value="lab" onChange={(e) => setDiamond(e.target.value)}/>
                                                Lab
                                            </label>
                                            <label htmlFor="mois" className="flex items-center gap-2 ml-4">
                                                <input type="radio" id="mois" name="diamonds" checked={diamond === 'mois'}
                                                       value="mois" onChange={(e) => setDiamond(e.target.value)}/>
                                                Moissanite
                                            </label>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex justify-end w-[90%] px-3 h-[7.5vh] items-center text-right my-4 font-bold text-3xl">Total: {total + totalPreciousness}€</div>
                                <div className="w-full h-[15vh] bg-stone-200">
                                    <div className="flex items-center justify-between w-[90%] h-full mx-auto">
                                        <button type="button" onClick={() => setRecap(false)}
                                                className="bg-gray-50 py-2 px-4 rounded-full text-gray-950 border cursor-pointer">&larr; Back
                                        </button>
                                        <div className="flex gap-4">
                                            <button type="button" onClick={() => setOpen(true)}
                                                    className="bg-gray-50 py-2 px-4 rounded-full text-gray-950 border cursor-pointer">Save
                                            </button>
                                            <Link href="/checkout/upload"
                                                    className="bg-gray-950 py-2 px-4 rounded-full text-gray-50 cursor-pointer border">Next &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                : <div className="w-full h-full relative">
                    <>
                        <Tabs
                            value={activeTab} onChange={changeTab} aria-label="tabs" sx={{
                            width: 1,
                            '& .MuiTabs-indicator': {backgroundColor: '#030712', height: '0.2rem'},
                            '& .Mui-selected': {color: '#030712 !important'},
                            position: 'absolute',
                            backgroundColor: '#f9fafb80',
                            top: '-60vh'
                        }}>
                            <Tab label="DEFAULT" sx={{
                                width: 0.5,
                                maxWidth: 1,
                                fontSize: '0.875rem',
                                "@media (min-width: 400px)": {
                                    fontSize: '1rem',
                                },
                                "@media (min-width: 600px)": {
                                    fontSize: '1.125rem',
                                },
                                "@media (min-width: 800px)": {
                                    fontSize: '1.25rem',
                                },
                                "@media (min-width: 900px)": {
                                    fontSize: '1.5rem',
                                }
                            }}/>
                            <Tab label="CUSTOM" sx={{
                                width:  0.5,
                                maxWidth: 1,
                                fontSize: '0.875rem',
                                "@media (min-width: 400px)": {
                                    fontSize: '1rem',
                                },
                                "@media (min-width: 600px)": {
                                    fontSize: '1.125rem',
                                },
                                "@media (min-width: 800px)": {
                                    fontSize: '1.25rem',
                                },
                                "@media (min-width: 900px)": {
                                    fontSize: '1.5rem',
                                }
                            }}/>
                        </Tabs>

                        <CustomTabPanel value={activeTab} index={0}>
                            <DefaultSelector/>
                        </CustomTabPanel>
                            <>
                            {!activeTooth
                                ? <CustomTabPanel value={activeTab} index={1}>
                                    <div className="w-full">
                                        <Tabs
                                            value={0} aria-label="tabs" sx={{
                                            width: 1,
                                            '& .MuiTabs-indicator': {
                                                top: 0,
                                                backgroundColor: '#030712',
                                                height: '0.2rem'
                                            },
                                            borderBottom: '1px solid #9ca3af',
                                            backgroundColor: '#f9fafb',
                                            '& .Mui-selected': {color: '#030712 !important'}
                                        }}>
                                            <Tab sx={{width: 1, maxWidth: 1}}/>
                                        </Tabs>
                                    </div>
                                    <Box sx={{height: 'calc(100% - 48px - 0.2rem)', display:'grid', gridTemplateRows:'80% 10% 10%', gridTemplateColumns:'25% 50% 25%'}}>
                                        <div className="w-full h-full bg-stone-200 flex flex-col items-center justify-center my-auto rounded text-black col-start-2 col-end-2 row-start-1 row-end-1">
                                            <p>Prima scegli un dente</p>
                                        </div>
                                    </Box>
                                </CustomTabPanel>

                                : <CustomTabPanel value={activeTab} index={1}>
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
                                    </CustomTabPanel>
                            }
                        </>
                    </>
                </div>
            }
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