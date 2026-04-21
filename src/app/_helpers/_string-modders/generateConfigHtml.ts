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

export type ConfigSummaryItem = {
    title: string,
    details: string[],
    price: number,
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(value);
}

export function buildConfigSummaryItems(teethPrices:Prices, history:History[][], currentStep:number, packaging:Packaging|undefined) {
    const items: ConfigSummaryItem[] = [];

    history.length > 0 && Object.entries(history[currentStep][0].signatureVisible).forEach((signature) => {
        if(history[currentStep][0].signatureVisible[signature[0]]) {
            const details = [
                elabSignatureGold(history[currentStep][0].signatureMaterial[signature[0]], signature[0]),
            ];

            if(
                history[currentStep][0].signatureMaterial[signature[0]]?.includes('lab')
                || history[currentStep][0].signatureMaterial[signature[0]]?.includes('nat')
            ) {
                details.push(`Round pave w/ ${history[currentStep][0].signatureMaterial[signature[0]]?.includes('lab') ? 'lab' : 'natural'} white diamonds`);
            }

            items.push({
                title: elabSignatureName(signature[0]),
                details,
                price: teethPrices.signature,
            });
        }
    });

    history.length > 0 && Object.entries(history[currentStep][0].type).forEach((tooth) => {
        if(history[currentStep][0].visible[tooth[0]]) {
            if(checkDoubleTeeth(tooth[0], tooth[1])) {
                return;
            }

            const isDoubleTooth = (
                ((tooth[1] === 'bar' || tooth[1] === 'barDiamond') && (tooth[0] === 'icssx' || tooth[0] === 'icisx'))
                || ((tooth[1] === 'bigBar' || tooth[1] === 'bigBarDiamond') && tooth[0] === 'cisx')
            );
            const toothTitle = isDoubleTooth ? elabToothName(tooth[0], true) : elabToothName(tooth[0], false);
            const details = [
                (
                    tooth[1] === 'enamel'
                        ? `${firstCapital(history[currentStep][0].enamel[tooth[0]] as string)} ${elabDesignName(tooth[1])}`
                        : `${firstCapital(elabDesignName(tooth[1]))} in ${elabMaterial(history[currentStep][0].finish[tooth[0]], 'finish')}`
                ) + ` ${elabMaterial(history[currentStep][0].material[tooth[0]], 'gold')} gold`,
            ];

            if(history[currentStep][0].stones[tooth[0]].shape !== undefined) {
                details.push(`${firstCapital(elabStoneName(history[currentStep][0].stones[tooth[0]].color as string))} w/ ${history[currentStep][0].stones[tooth[0]].shape} shape`);
            }

            if(history[currentStep][0].pave[tooth[0]].shape !== undefined) {
                details.push(`${firstCapital(history[currentStep][0].pave[tooth[0]].shape as string)} pave w/ ${elabStoneName(history[currentStep][0].pave[tooth[0]].color as string)}`);
            }

            items.push({
                title: toothTitle || 'Custom piece',
                details,
                price: isDoubleTooth ? teethPrices[tooth[0]] * 2 : teethPrices[tooth[0]],
            });
        }
    });

    if(packaging) {
        const details = [
            `${firstCapital(packaging.out)} box w/ ${elabVelvetName(packaging.in)} velvet and ${elabMaterial(packaging.details, 'gold')} gold details`,
        ];

        if(packaging.text.firstLine.length > 0 || packaging.text.secondLine.length > 0) {
            details.push(`Custom text: ${packaging.text.firstLine} ${packaging.text.secondLine}`.trim());
        }

        items.push({
            title: 'Premium Box',
            details,
            price: 300,
        });
    }

    return items;
}

export default function generateConfigHtml(teethPrices:Prices, history:History[][], currentStep:number, packaging:Packaging|undefined, total?:number|undefined) {
    const items = buildConfigSummaryItems(teethPrices, history, currentStep, packaging);
    let html = '';

    items.forEach((item) => {
        html += `<li><h4>${item.title}</h4>${item.details.map((detail) => `<p>${detail}</p>`).join('')}<p>${formatCurrency(item.price)}</p></li>`;
    });

    if(total) {
        html += `<p><strong> Total: ${formatCurrency(total)}</strong></p>`;
    }

    return html;
}

export function generateConfigReceiptDescription(teethPrices:Prices, history:History[][], currentStep:number, packaging:Packaging|undefined) {
    return buildConfigSummaryItems(teethPrices, history, currentStep, packaging)
        .map((item) => [item.title, ...item.details, formatCurrency(item.price)].join('\n'))
        .join('\n\n')
        .trim();
}
