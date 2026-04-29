import elabToothName from "@/app/_helpers/_string-modders/elabToothName";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";
import elabDesignName from "@/app/_helpers/_string-modders/elabDesignName";
import elabStoneName from "@/app/_helpers/_string-modders/elabStoneName";
import elabMaterial from "@/app/_helpers/_string-modders/elabMaterial";
import elabSignatureName from "@/app/_helpers/_string-modders/elabSignatureName";
import elabVelvetName from "@/app/_helpers/_string-modders/elabVelvetName";
import elabSignatureGold from "@/app/_helpers/_string-modders/elabSignatureGold";
import {History, Packaging} from "@/app/_types/TeethOptions";
import React from "react";
import checkDoubleTeeth from "@/app/_helpers/_checkers/checkDoubleTeeth";

export default function CheckoutRecap({history, packaging, total, shippingFees} : {history:History|undefined, packaging:Packaging|undefined, total:number, shippingFees:number|undefined}) {

    return (
        <>
            {!history
                ? <div className="w-full h-full flex flex-col items-center justify-center py-4 bg-white gap-4">
                    <div className="loader"></div>
                    Loading your configuration...
                </div>
                : <div className="pl-5 pr-3 py-4 h-full bg-white">
                    <ul className="pr-2 h-full overflow-y-auto">

                        {Object.entries(history.signatureVisible).map(signature => {

                            {/*https://stackoverflow.com/questions/48223852/how-to-conditionally-add-or-not-onclick-on-a-div-in-react*/
                            }
                            return (
                                history.signatureVisible[signature[0]] &&
                                <li key={signature[0]}
                                    className='border-transparent cursor-pointer rounded p-2 lg:border'
                                >
                                    {/*tooth name*/}
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-semibold">
                                            {elabSignatureName(signature[0])}
                                        </h4>
                                    </div>

                                    {/*material*/}
                                    <p>
                                        {
                                            elabSignatureGold(history.signatureMaterial[signature[0]], signature[0])
                                        }
                                    </p>

                                    {
                                        (history.signatureMaterial[signature[0]]?.includes('lab')
                                            || history.signatureMaterial[signature[0]]?.includes('nat')
                                        ) &&
                                        <p>Round pave w/ {
                                            history.signatureMaterial[signature[0]]?.includes('lab')
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
                                            }).format(history.prices.signature)
                                        }
                                    </p>
                                </li>
                            )
                        })}

                        {Object.entries(history.type).map(tooth => {

                            {/*https://stackoverflow.com/questions/48223852/how-to-conditionally-add-or-not-onclick-on-a-div-in-react*/
                            }
                            return (
                                history.visible[tooth[0]] &&
                                <li key={tooth[0]}
                                    className={`${checkDoubleTeeth(tooth[0], tooth[1]) ? 'hidden' : 'block'} cursor-pointer rounded p-2 lg:border border-transparent`}
                                >
                                    {/*tooth name*/}
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-semibold">
                                            {((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx'))
                                            || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
                                                ? elabToothName(tooth[0], true)
                                                : elabToothName(tooth[0], false)
                                            }
                                        </h4>
                                    </div>
                                    {/*type + material*/}
                                    <p>
                                        {tooth[1] === 'enamel'
                                            ? firstCapital(history.enamel[tooth[0]] as string) + ' ' + elabDesignName(tooth[1])
                                            : firstCapital(elabDesignName(tooth[1]))
                                        } in {elabMaterial(history.finish[tooth[0]], 'finish')} {elabMaterial(history.material[tooth[0]], 'gold')} gold
                                    </p>

                                    {/*bezel*/}
                                    {history.stones[tooth[0]].shape !== undefined &&
                                        <p>{firstCapital(elabStoneName(history.stones[tooth[0]].color as string))} w/ {history.stones[tooth[0]].shape} shape</p>
                                    }

                                    {/*pave*/}
                                    {history.pave[tooth[0]].shape !== undefined &&
                                        <p>{firstCapital(history.pave[tooth[0]].shape as string)} pave
                                            w/ {elabStoneName(history.pave[tooth[0]].color as string)}</p>
                                    }
                                    {/*<span aria-hidden={true}*/}
                                    {/*      className="inline-block h-[1px] w-full bg-slate-950"></span>*/}
                                    <p className="w-full font-medium text-left mt-1.5">{
                                        ((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx')) || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
                                            ? new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(history.prices[tooth[0]] * 2)
                                            : new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(history.prices[tooth[0]])
                                    }</p>
                                </li>
                            )
                        })}

                        {packaging &&
                            <li className="rounded p-2">
                                {/*tooth name*/}
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold">
                                        Premium Box
                                    </h4>
                                </div>
                                {/*type + material*/}
                                <p>
                                    {firstCapital(packaging.out)} box w/ {elabVelvetName(packaging.in)} velvet
                                    and {elabMaterial(packaging.details, 'gold')} gold details
                                </p>
                                {(packaging.text.firstLine.length > 0 || packaging.text.secondLine.length > 0) &&
                                    <p>
                                        Custom text: {packaging.text.firstLine} {packaging.text.secondLine}
                                    </p>
                                }
                                <p className="w-full font-medium text-left mt-1.5">{
                                    new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(history.prices.packaging)
                                }</p>
                                <p className="mt-2 p-2 bg-gray-100 rounded">Note: the premium box is optional.<br/>If
                                    you don't
                                    choose one, a standard box will be included with your order free of charge.</p>
                            </li>
                        }

                        <li className="py-4">
                            <p className="font-semibold px-2">Express Insured Shipment<br/>
                                <span className="w-full font-medium text-left mt-1.5">
                                                {shippingFees !== undefined
                                                    ? new Intl.NumberFormat("de-DE", {
                                                        style: "currency",
                                                        currency: "EUR"
                                                    }).format(shippingFees)
                                                    : '-'
                                                }
                                                </span>
                            </p>
                        </li>

                        <li className="py-4 border-t font-semibold">
                            <p className="px-2">Total<br/>
                                <span className="w-full text-xl text-left mt-1.5">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR"
                            }).format(total + (shippingFees ?? 0))

                            }
                        </span>
                            </p>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}