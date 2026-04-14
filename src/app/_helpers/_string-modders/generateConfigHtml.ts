import elabSignatureName from "@/app/_helpers/_string-modders/elabSignatureName";
import elabSignatureGold from "@/app/_helpers/_string-modders/elabSignatureGold";
import elabToothName from "@/app/_helpers/_string-modders/elabToothName";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";
import elabDesignName from "@/app/_helpers/_string-modders/elabDesignName";
import elabMaterial from "@/app/_helpers/_string-modders/elabMaterial";
import elabStoneName from "@/app/_helpers/_string-modders/elabStoneName";
import {History, Packaging, Prices} from "@/app/_types/TeethOptions";
import elabVelvetName from "@/app/_helpers/_string-modders/elabVelvetName";
import checkDoubleTeeth from "@/app/_helpers/_checkers/checkDoubleTeeth";

export default function generateConfigHtml(teethPrices:Prices, history:History[][], currentStep:number, packaging:Packaging|undefined, total?:number|undefined) {

    let html = '';

    {history.length > 0 && Object.entries(history[currentStep][0].signatureVisible).map(signature => {

            if(history[currentStep][0].signatureVisible[signature[0]]) {
                html += "<li><h4>" + elabSignatureName(signature[0]) + "</h4><p>" + elabSignatureGold(history[currentStep][0].signatureMaterial[signature[0]], signature[0]) + "</p>"

                if((history[currentStep][0].signatureMaterial[signature[0]]?.includes('lab')
                    || history[currentStep][0].signatureMaterial[signature[0]]?.includes('nat')
                )) {
                    html += "<p>Round pave w/" + (history[currentStep][0].signatureMaterial[signature[0]]?.includes('lab')
                        ? 'lab'
                        : 'natural') + "white diamonds</p>"
                }

                html += "<p>" + new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR"
                            }).format(teethPrices.signature) + "</p></li>"
            }


        })}
    {history.length > 0 && Object.entries(history[currentStep][0].type).map(tooth => {

        if(history[currentStep][0].visible[tooth[0]]) {
            if(checkDoubleTeeth(tooth[0], tooth[1])) {
                return;
            }
            html += "<li><h4>" + (
                (
                    ((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx'))
                    || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
                )
                ? elabToothName(tooth[0], true)
                : elabToothName(tooth[0], false)) + "</h4>" + "<p>" + (tooth[1] === 'enamel'
                    ? firstCapital(history[currentStep][0].enamel[tooth[0]] as string) + ' ' + elabDesignName(tooth[1])
                    : firstCapital(elabDesignName(tooth[1])) + " in " + elabMaterial(history[currentStep][0].finish[tooth[0]], 'finish')) + " " + elabMaterial(history[currentStep][0].material[tooth[0]], 'gold') + " gold</p>"

            if(history[currentStep][0].stones[tooth[0]].shape !== undefined) {
                html += "<p>" + firstCapital(elabStoneName(history[currentStep][0].stones[tooth[0]].color as string)) + " w/ " + history[currentStep][0].stones[tooth[0]].shape + "shape</p>"
            }

            if(history[currentStep][0].pave[tooth[0]].shape !== undefined) {
                html += "<p>" + firstCapital(history[currentStep][0].pave[tooth[0]].shape as string) + " pave w/ " + elabStoneName(history[currentStep][0].pave[tooth[0]].color as string) + "</p>"
            }

            html += "<p>" + (
                (
                    ((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx'))
                    || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
                )
                ? new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(teethPrices[tooth[0]] * 2)
                : new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(teethPrices[tooth[0]])) + "</p></li>"
        }

        })}
    if(packaging) {
        html += "<li><h4>Premium Box</h4> <p>" + firstCapital(packaging.out) + " box w/ " + elabVelvetName(packaging.in) + " velvet and " + elabMaterial(packaging.details, 'gold') + " gold details</p>"

        if((packaging.text.firstLine.length > 0 || packaging.text.secondLine.length > 0)) {
            html += "<p>Custom text: " + packaging.text.firstLine + " " + packaging.text.secondLine + "</p>"
        }

        html += "<p>" + new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(300) + "</p></li>"
    }

    if(total) {
        html += '<p><strong> Total: ' + new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(total) + '</strong></p>'
    }

    return html;
}

export function generateConfigReceiptDescription(teethPrices:Prices, history:History[][], currentStep:number, packaging:Packaging|undefined) {
    const html = generateConfigHtml(teethPrices, history, currentStep, packaging);

    return html
        .replace(/<\/li>/gi, '\n')
        .replace(/<\/(h4|p)>/gi, '\n')
        .replace(/<li>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\n{2,}/g, '\n')
        .trim();
}
