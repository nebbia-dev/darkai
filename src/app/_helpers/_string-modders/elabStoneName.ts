export default function elabStoneName(color: string) {
    let stoneColor;
    // SWITCH per i 5k colori che hanno deciso di inserirci
    switch(color) {
        case 'bSapph':
            stoneColor = 'lab blue sapphire';
            break;
        case 'ruby':
            stoneColor = 'lab ruby';
            break;
        case 'ameth':
            stoneColor = 'lab amethyst';
            break;
        case 'emerald':
            stoneColor = 'lab emerald';
            break;
        case 'whD_lab':
            stoneColor = 'lab white diamond';
            break;
        case 'whD_nat':
            stoneColor = 'natural white diamond';
            break;
        case 'brD_nat':
            stoneColor = 'natural brown diamond';
            break;
        case 'blD_nat':
            stoneColor = 'natural black diamond';
            break;
        case 'ySapph':
            stoneColor = 'lab yellow sapphire';
            break;
        case 'pSapph':
            stoneColor = 'lab pink sapphire';
            break;
        case 'aqua':
            stoneColor = 'lab aquamarine';
            break;
        case 'camo':
            stoneColor = 'camo pattern';
            break;
        case 'glitch':
            stoneColor = 'glitch pattern';
            break;
        default:
            stoneColor = 'stone';
    }

    return stoneColor;
}