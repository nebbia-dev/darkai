import elabToothName from "@/app/_helpers/_string-modders/elabToothName";
import {Tooltip} from "@mui/material";
import {Close} from "@/app/_components/_icons/Close";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";
import elabDesignName from "@/app/_helpers/_string-modders/elabDesignName";
import elabStoneName from "@/app/_helpers/_string-modders/elabStoneName";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import elabMaterial from "@/app/_helpers/_string-modders/elabMaterial";
import elabSignatureName from "@/app/_helpers/_string-modders/elabSignatureName";

export default function RecapList({edit} : {edit:boolean}) {

    const teethPrices = useTeethStore((state:State) => state.teethPrices);
    const total = useTeethStore((state:State) => state.total);
    const history = useTeethStore((state:State) => state.history);
    const currentStep = useTeethStore((state:State) => state.currentHistory - 1);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const setHover = useTeethStore((state: State) => state.setHover);
    const resetTooth = useTeethStore((state: State) => state.resetTooth);
    const resetSignature = useTeethStore((state: State) => state.resetSignature);

    function setCurrentHover(tooth:string|undefined, e:any) {
        e.stopPropagation();
        setHover(tooth);
    }

    return (
        <div className="pl-6 pr-3 py-4 h-full">
            <ul className="pr-3 h-full overflow-y-scroll">
                {(history.length === 0 || total === 0) &&
                    <li className="w-full h-full flex items-center justify-center">
                        <p>Choose your configs wisely!</p>
                    </li>
                }
                {history.length > 0 && Object.entries(history[currentStep][0].signatureVisible).map(signature => {

                    {/*https://stackoverflow.com/questions/48223852/how-to-conditionally-add-or-not-onclick-on-a-div-in-react*/}
                    return (
                        history[currentStep][0].signatureVisible[signature[0]] &&
                        <li key={signature[0]}
                            className="cursor-pointer mb-4"
                        >
                            {/*tooth name*/}
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">
                                    {elabSignatureName(signature[0])}
                                </h4>
                                {edit && <Tooltip title="Delete signature">
                                            <Close className="cursor-pointer"
                                                   onClick={() => resetSignature(signature[0])}/>
                                        </Tooltip>
                                }
                            </div>

                            {/*material*/}
                            <p>
                                {
                                    history[currentStep][0].signatureMaterial[signature[0]] !== 'pave'
                                        ? (history[currentStep][0].signatureMaterial[signature[0]] === 'gold' ? 'Yellow' : firstCapital(history[currentStep][0].signatureMaterial[signature[0]] as string))
                                        : 'White'
                                } gold
                            </p>

                            {
                                history[currentStep][0].signatureMaterial[signature[0]] === 'pave' &&
                                <p>Round pave w/ white diamonds</p>
                            }

                            {/*<span aria-hidden={true}*/}
                            {/*      className="inline-block h-[1px] w-full bg-slate-950"></span>*/}
                            <p className="w-full text-left mt-1.5">
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
                            {...(edit && { onClick: () => setActive(tooth[0]),
                                           onMouseEnter: (e) => setCurrentHover(tooth[0], e),
                                           onMouseLeave: (e) => setCurrentHover(undefined, e)
                                            })}
                            className={`${((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icsdx' || tooth[0] === 'icidx')) || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cidx') ? 'hidden' : 'block'} cursor-pointer mb-4`}
                        >
                            {/*tooth name*/}
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">
                                    {((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx')) || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
                                        ? elabToothName(tooth[0], true)
                                        : elabToothName(tooth[0], false)
                                    }
                                </h4>
                                {edit && <Tooltip title="Delete tooth">
                                            <Close className="cursor-pointer"
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
                            <p className="w-full text-left mt-1.5">{
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
            </ul>
        </div>
    )
}