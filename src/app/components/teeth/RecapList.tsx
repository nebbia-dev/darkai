import elabToothName from "@/app/helpers/elabToothName";
import {Tooltip} from "@mui/material";
import {Close} from "@/app/components/icons/Close";
import firstCapital from "@/app/helpers/firstCapital";
import elabDesignName from "@/app/helpers/elabDesignName";
import elabStoneName from "@/app/helpers/elabStoneName";
import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function RecapList({edit} : {edit:boolean}) {

    const teethPrices = useTeethStore((state:State) => state.teethPrices);
    const total = useTeethStore((state:State) => state.total);
    const history = useTeethStore((state:State) => state.history);
    const currentStep = useTeethStore((state:State) => state.currentHistory - 1);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const setHover = useTeethStore((state: State) => state.setHover);
    const resetTooth = useTeethStore((state: State) => state.resetTooth);

    function setCurrentHover(tooth:string|undefined, e:any) {
        e.stopPropagation();
        setHover(tooth);
    }

    return (
        <div className="pl-6 pr-3 py-4 h-full">
            <ul className="pr-3 h-full overflow-y-scroll">
                {history.length === 0 || total === 0 &&
                    <div className="w-full h-full flex items-center justify-center">
                        <p>Choose your configs wisely!</p>
                    </div>
                }
                {history.length > 0 && Object.entries(history[currentStep][0].type).map(tooth => {
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
                                }, {history[currentStep][0].material[tooth[0]]}
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
                            <span aria-hidden={true}
                                  className="inline-block h-[1px] w-full bg-slate-950"></span>
                            <p className="font-bold w-full text-right">{
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