'use server'

import fetchPrices from "@/app/_helpers/_db-interactions/fetchPrices";
import {History, Packaging} from "@/app/_types/TeethOptions";
import {TempPrices} from "@/app/_types/State";

export default async function calcTotal(config:History, packaging:Packaging|undefined) {
    const response = await fetchPrices();
    const prices:TempPrices = {base: response.base!, bezel: response.bezel, pave: response.pave! as any, signature: response.signature!, packaging:response.packaging!}
    let total = 0;

    for (let [tooth, price] of Object.entries(config.prices)) {
        price = 0;
    }

    for (let [tooth, visibility] of Object.entries(config.visible)) {
        if (visibility) {
            let priceToFind;
            switch (config.type[tooth]) {
                case 'full':
                case 'frame':
                case 'enamel':
                case 'bar':
                case 'bigBar':
                    priceToFind = prices.base!.filter(p => p.type === config.type[tooth] && p.carats === config.preciousness?.carats && p.finish.includes(config.finish[tooth]));
                    if ((config.type[tooth] === 'bar' && (tooth === 'icsdx' || tooth === 'icssx'))
                        || (config.type[tooth] === 'bar' && (tooth === 'icidx' || tooth === 'icisx'))
                        || (config.type[tooth] === 'bigBar' && (tooth === 'cidx' || tooth === 'cisx'))
                    ) {
                        config.prices[tooth] = priceToFind[0].price / 2;
                        total += priceToFind[0].price / 2;
                    } else {
                        config.prices[tooth] = priceToFind[0].price;
                        total += priceToFind[0].price;
                    }
                    break;
                case 'bezel':
                    let stoneToFind;
                    switch(config.stones[tooth].color) {
                        case 'whD_lab':
                            stoneToFind = 'whDLab_b';
                            break;
                        case 'whD_nat':
                            stoneToFind = 'whDNat_b';
                            break;
                        case 'blD_nat':
                            stoneToFind = 'blDNat_b';
                            break;
                        default:
                            stoneToFind = 'stone_b';
                    }
                    priceToFind = prices.bezel[stoneToFind].filter(p => p.carats === config.preciousness?.carats && p.shape === config.stones[tooth].shape && p.finish.includes(config.finish[tooth]));
                    config.prices[tooth] = priceToFind[0].price;
                    total += priceToFind[0].price;
                    break;
                case 'fullDiamond':
                case 'frameDiamond':
                case 'barDiamond':
                case 'bigBarDiamond':
                    let paveToFind;
                    switch(config.pave[tooth].color) {
                        case 'whD_lab':
                            paveToFind = 'whDLab_p';
                            break;
                        case 'whD_nat':
                            paveToFind = 'whDNat_p';
                            break;
                        case 'brD_nat':
                            paveToFind = 'brDNat_p';
                            break;
                        case 'blD_nat':
                            paveToFind = 'blDNat_p';
                            break;
                        case 'camo':
                            paveToFind = 'camo_p';
                            break;
                        case 'glitch':
                            paveToFind = 'glitch_p';
                            break;
                        default:
                            paveToFind = 'stone_p';
                    }
                    const prevType = config.type[tooth].slice();
                    const realType = prevType.replace('Diamond', '');
                    const paveStone = prices.pave[paveToFind];
                    priceToFind = paveStone.filter(p => p.type === realType && p.carats === config.preciousness?.carats && p.shape === config.pave[tooth].shape);
                    if ((config.type[tooth] === 'barDiamond' && (tooth === 'icsdx' || tooth === 'icssx'))
                        || (config.type[tooth] === 'barDiamond' && (tooth === 'icidx' || tooth === 'icisx'))
                        || (config.type[tooth] === 'bigBarDiamond' && (tooth === 'cidx' || tooth === 'cisx'))
                    ) {
                        config.prices[tooth] = priceToFind[0].price / 2;
                        total += priceToFind[0].price / 2;
                    } else {
                        config.prices[tooth] = priceToFind[0].price;
                        total += priceToFind[0].price;
                    }
                    break;
                case 'bezelDiamond':
                    let stoneToFindP;
                    switch(config.stones[tooth].color) {
                        case 'whD_lab':
                            stoneToFindP = 'whDLab_b';
                            break;
                        case 'whD_nat':
                            stoneToFindP = 'whDNat_b';
                            break;
                        case 'blD_nat':
                            stoneToFindP = 'blDNat_b';
                            break;
                        default:
                            stoneToFindP = 'stone_b';
                    }

                    priceToFind = prices.bezel[stoneToFindP].filter(p => p.carats === config.preciousness?.carats && p.shape === config.stones[tooth].shape && p.finish.includes(config.pave[tooth].shape));
                    config.prices[tooth] = priceToFind[0].price;
                    total += priceToFind[0].price;
                    break;
            }
        }
    }
    for (let [signature, visibility] of Object.entries(config.signatureVisible)) {
        if (visibility) {
            const signatureToFind = prices.signature!.filter(p => p.type.includes(signature) && p.carats === config.preciousness?.carats);
            let chosenSignature;
            switch (signature) {
                case 'vamp':
                    chosenSignature = signatureToFind.filter(p => p.type.includes(config.signatureMaterial[signature]));
                    break;
                case 'cross':
                case 'braces':
                case 'tribal':
                    if(config.signatureMaterial[signature]?.includes('base')) {
                        chosenSignature = signatureToFind.filter(p => p.type === signature + '_base');
                    } else {
                        chosenSignature = signatureToFind.filter(p => p.type.includes(config.signatureMaterial[signature]));
                    }
                    break;
                case 'sprinkles':
                    if(config.signatureMaterial[signature]?.includes('lab')) {
                        chosenSignature = signatureToFind.filter(p => p.type.includes('lab'));
                    } else {
                        chosenSignature = signatureToFind.filter(p => p.type.includes('nat'));
                    }
                    break;
                case 'hammered':
                    if(config.signatureMaterial[signature]?.includes('black')) {
                        chosenSignature = signatureToFind.filter(p => p.type.includes('black'));
                    } else {
                        chosenSignature = signatureToFind.filter(p => p.type.includes('white'));
                    }
                    break;
                case 'bubblegum':
                    chosenSignature = signatureToFind;
                    break;
                default:
                    chosenSignature = [{price: 0}];
            }
            config.prices.signature = chosenSignature[0].price;
            total += chosenSignature[0].price;
        }
    }

    if(packaging) {
        total += prices.packaging[0].price;
    }

    return {config, total}
}