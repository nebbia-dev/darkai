import elabToothName from "@/app/_helpers/_string-modders/elabToothName";
import {Tooltip} from "@mui/material";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";
import elabDesignName from "@/app/_helpers/_string-modders/elabDesignName";
import elabStoneName from "@/app/_helpers/_string-modders/elabStoneName";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import elabMaterial from "@/app/_helpers/_string-modders/elabMaterial";
import elabSignatureName from "@/app/_helpers/_string-modders/elabSignatureName";
import {Trash} from "@/app/_components/_icons/Trash";
import elabVelvetName from "@/app/_helpers/_string-modders/elabVelvetName";

export default function RecapList({edit} : {edit:boolean}) {

    const teethPrices = useTeethStore((state:State) => state.teethPrices);
    const teethSignature = useTeethStore((state:State) => state.teethSignature);
    const total = useTeethStore((state:State) => state.total);
    const history = useTeethStore((state:State) => state.history);
    const currentStep = useTeethStore((state:State) => state.currentHistory - 1);
    const activeTooth = useTeethStore((state: State) => state.currentTooth)
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const hovered = useTeethStore((state: State) => state.hovered);
    const setHover = useTeethStore((state: State) => state.setHover);
    const resetTooth = useTeethStore((state: State) => state.resetTooth);
    const resetSignature = useTeethStore((state: State) => state.resetSignature);
    const packaging = useTeethStore((state: State) => state.packaging);
    const setPackaging = useTeethStore((state: State) => state.setPackaging);
    const packagingScene = useTeethStore((state: State) => state.packagingScene);
    const setPackagingScene = useTeethStore((state: State) => state.setPackagingScene);

    function activateTooth(tooth:string) {
        setActive(tooth);
        if(packagingScene) {
            setPackagingScene(false);
        }
    }

    function setCurrentHover(tooth:string|undefined, e:any) {
        e.stopPropagation();
        setHover(tooth);
    }

    function checkDoubleTeeth(tooth:string, jewel:string) {
        return ((jewel === 'bar' || jewel === 'barDiamond') && (tooth === 'icsdx' || tooth === 'icidx')) || ((jewel === 'bigBar' || jewel === 'bigBarDiamond') && tooth === 'cidx');
    }

    function checkDoubleTeethHover(tooth:string, jewel:string) {
        if(tooth === 'icssx' && hovered === 'icsdx' && (jewel === 'bar' || jewel === 'barDiamond')) {
            return true;
        } else if(tooth === 'icisx' && hovered === 'icidx' && (jewel === 'bar' || jewel === 'barDiamond')) {
            return true;
        }else if(tooth === 'cisx' && hovered === 'cidx' && (jewel === 'bigBar' || jewel === 'bigBarDiamond')) {
            return true;
        } else {
            return tooth === hovered;
        }
    }

    function checkDoubleTeethActive(tooth:string, jewel:string) {
        if(tooth === 'icssx' && activeTooth === 'icsdx' && (jewel === 'bar' || jewel === 'barDiamond')) {
            return true;
        } else if(tooth === 'icisx' && activeTooth === 'icidx' && (jewel === 'bar' || jewel === 'barDiamond')) {
            return true;
        }else if(tooth === 'cisx' && activeTooth === 'cidx' && (jewel === 'bigBar' || jewel === 'bigBarDiamond')) {
            return true;
        } else {
            return tooth === activeTooth;
        }
    }

    return (
        <div className="pl-5 pr-3 py-4 h-full">
            <ul className="pr-2 h-full overflow-y-auto">
                {((history.length === 0 || total === 0)
                        && !packaging.premium) &&
                    <li className="w-full h-full flex items-center justify-center">
                        <p>Start your design</p>
                    </li>
                }
                {history.length > 0 && Object.entries(history[currentStep][0].signatureVisible).map(signature => {

                    {/*https://stackoverflow.com/questions/48223852/how-to-conditionally-add-or-not-onclick-on-a-div-in-react*/}
                    return (
                        history[currentStep][0].signatureVisible[signature[0]] &&
                        <li key={signature[0]}
                            className={`${teethSignature[signature[0]].includes(activeTooth as string) ? 'bg-white/50' : ''}
                                ${teethSignature[signature[0]].includes(hovered as string) ? 'border-black' : 'border-gray-200/50'}
                                cursor-pointer mb-4 rounded p-2 border`}
                        >
                            {/*tooth name*/}
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold">
                                    {elabSignatureName(signature[0])}
                                </h4>
                                {edit && <Tooltip title="Delete signature">
                                            <Trash className="cursor-pointer rounded-full border-1 p-0.5 w-5 h-5"
                                                   onClick={() => resetSignature(signature[0])}/>
                                        </Tooltip>
                                }
                            </div>

                            {/*material*/}
                            <p>
                                {
                                    !history[currentStep][0].signatureMaterial[signature[0]]?.includes('pave')
                                        ? (history[currentStep][0].signatureMaterial[signature[0]] === 'gold' ? 'Yellow' : firstCapital(history[currentStep][0].signatureMaterial[signature[0]] as string))
                                        : 'White'
                                } gold
                            </p>

                            {
                                history[currentStep][0].signatureMaterial[signature[0]]?.includes('pave') &&
                                <p>Round pave w/ {
                                    history[currentStep][0].signatureMaterial[signature[0]]?.includes('lab')
                                    ? 'lab'
                                    : 'natural'
                                } white diamonds</p>
                            }

                            {/*<span aria-hidden={true}*/}
                            {/*      className="inline-block h-[1px] w-full bg-slate-950"></span>*/}
                            <p className="w-full font-medium text-left mt-1.5">
                                {
                                    new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(teethPrices.signature)
                                }
                            </p>
                        </li>
                    )
                })}
                {history.length > 0 && Object.entries(history[currentStep][0].type).map(tooth => {

                    {/*https://stackoverflow.com/questions/48223852/how-to-conditionally-add-or-not-onclick-on-a-div-in-react*/}
                    return (
                        history[currentStep][0].visible[tooth[0]] &&
                        <li key={tooth[0]}
                            {...(edit && { onClick: () => activateTooth(tooth[0]),
                                           onMouseEnter: (e) => setCurrentHover(tooth[0], e),
                                           onMouseLeave: (e) => setCurrentHover(undefined, e)
                                            })}
                            className={`
                                ${checkDoubleTeeth(tooth[0], tooth[1]) ? 'hidden' : 'block'} 
                                ${checkDoubleTeethActive(tooth[0], tooth[1]) ? 'bg-white/50' : ''}
                                ${checkDoubleTeethHover(tooth[0], tooth[1]) ? 'border-black' : 'border-gray-200/50'}
                                cursor-pointer mb-4 rounded p-2 border`}
                        >
                            {/*tooth name*/}
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold">
                                    {((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx')) || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
                                        ? elabToothName(tooth[0], true)
                                        : elabToothName(tooth[0], false)
                                    }
                                </h4>
                                {edit && <Tooltip title="Delete configuration">
                                            <Trash className="cursor-pointer rounded-full border-1 p-0.5 w-5 h-5"
                                                   onClick={() => resetTooth(tooth[0])}/>
                                        </Tooltip>
                                }
                            </div>
                            {/*type + material*/}
                            <p>
                                {tooth[1] === 'enamel'
                                    ? firstCapital(history[currentStep][0].enamel[tooth[0]] as string) + ' ' + elabDesignName(tooth[1])
                                    : firstCapital(elabDesignName(tooth[1]))
                                } in {elabMaterial(history[currentStep][0].finish[tooth[0]], 'finish')} {elabMaterial(history[currentStep][0].material[tooth[0]], 'gold')} gold
                            </p>

                            {/*bezel*/}
                            {history[currentStep][0].stones[tooth[0]].shape !== undefined &&
                                <p>{firstCapital(elabStoneName(history[currentStep][0].stones[tooth[0]].color as string))} w/ {history[currentStep][0].stones[tooth[0]].shape} shape</p>
                            }

                            {/*pave*/}
                            {history[currentStep][0].pave[tooth[0]].shape !== undefined &&
                                <p>{firstCapital(history[currentStep][0].pave[tooth[0]].shape as string)} pave
                                    w/ {elabStoneName(history[currentStep][0].pave[tooth[0]].color as string)}</p>
                            }
                            {/*<span aria-hidden={true}*/}
                            {/*      className="inline-block h-[1px] w-full bg-slate-950"></span>*/}
                            <p className="w-full font-medium text-left mt-1.5">{
                                ((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx')) || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
                                    ? new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(teethPrices[tooth[0]] * 2)
                                    : new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(teethPrices[tooth[0]])
                            }</p>
                        </li>
                    )
                })}

                {packaging.premium &&
                    <li className="rounded p-2">
                        {/*tooth name*/}
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold">
                                Premium Box
                            </h4>
                            {edit && <Tooltip title="Delete configuration">
                                <Trash className="cursor-pointer rounded-full border-1 p-0.5 w-5 h-5"
                                       onClick={() => setPackaging('premium', false)}/>
                            </Tooltip>
                            }
                        </div>
                        {/*type + material*/}
                        <p>
                            {firstCapital(packaging.out)} box w/ {elabVelvetName(packaging.in)} velvet and {elabMaterial(packaging.details, 'gold')} gold details
                        </p>
                        { (packaging.text.firstLine.length > 0 || packaging.text.secondLine.length > 0) &&
                            <p>
                                Custom text: {packaging.text.firstLine} {packaging.text.secondLine}
                            </p>
                        }
                        <p className="w-full font-medium text-left mt-1.5">{
                            new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR"
                                }).format(300)
                        }</p>
                        <p className="mt-2 p-2 bg-gray-100 rounded">Note: the premium box is optional.<br/>If you don't choose one, a standard box will be included with your order free of charge.</p>
                    </li>
                }
            </ul>
        </div>
    )
}