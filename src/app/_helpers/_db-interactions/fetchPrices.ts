'use server'
import {createClient} from "@/lib/supabase/serverSU";

export default async function fetchPrices() {

    const supabase = await createClient();
    let { data: base, error: errorBase } = await supabase
        .from('No_Stone')
        .select('*');
    let { data: bezels, error: errorBezel } = await supabase
        .from('Bezel')
        .select('*');
    let { data: paves, error: errorPave } = await supabase
        .from('Pave')
        .select('*');
    let { data: signature, error: errorSignature } = await supabase
        .from('Signature')
        .select('*');

    const [whDLab_b, whDNat_b, brDLab_b, brDNat_b, blDLab_b, blDNat_b, stone_b]:any[] = [[],[],[],[],[],[],[]]
    const [whDLab_p, whDNat_p, brDLab_p, brDNat_p, blDLab_p, blDNat_p, stone_p, camo, glitch]:any[] = [[],[],[],[],[],[],[],[],[]]

    for(let bezel of bezels!) {
        switch(bezel.stone) {
            case 'white_diamond_lab':
                whDLab_b.push(bezel);
                break;
            case 'white_diamond_nat':
                whDNat_b.push(bezel);
                break;
            case 'brown_diamond_lab':
                brDLab_b.push(bezel);
                break;
            case 'brown_diamond_nat':
                brDNat_b.push(bezel);
                break;
            case 'black_diamond_lab':
                blDLab_b.push(bezel);
                break;
            case 'black_diamond_nat':
                blDNat_b.push(bezel);
                break;
            default:
                stone_b.push(bezel);
                break;
        }
    }
    for(let pave of paves!) {
        switch(pave.stone) {
            case 'white_diamond_lab':
                whDLab_p.push(pave);
                break;
            case 'white_diamond_nat':
                whDNat_p.push(pave);
                break;
            case 'brown_diamond_lab':
                brDLab_p.push(pave);
                break;
            case 'brown_diamond_nat':
                brDNat_p.push(pave);
                break;
            case 'black_diamond_lab':
                blDLab_p.push(pave);
                break;
            case 'black_diamond_nat':
                blDNat_p.push(pave);
                break;
            case 'camo':
                camo.push(pave);
                break;
            case 'glitch':
                glitch.push(pave);
                break;
            default:
                stone_p.push(pave);
                break;
        }
    }

    return {'base': base, 'bezel': {
                        whDLab_b, whDNat_b, brDLab_b, brDNat_b, blDLab_b, blDNat_b, stone_b
                    }, 'pave': {
                        whDLab_p, whDNat_p, brDLab_p, brDNat_p, blDLab_p, blDNat_p, stone_p, camo, glitch
                    }, 'signature':signature}
}