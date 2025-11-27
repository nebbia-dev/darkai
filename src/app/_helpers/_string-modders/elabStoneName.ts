export default function elabStoneName(color: string) {
    let stoneColor;
    // SWITCH per i 5k colori che hanno deciso di inserirci
    switch(color) {
        case 'bSapph':
            stoneColor = 'blue sapphire';
            break;
        case 'ruby':
            stoneColor = 'ruby';
            break;
        case 'ameth':
            stoneColor = 'amethyst';
            break;
        case 'emerald':
            stoneColor = 'emerald';
            break;
        case 'whD':
            stoneColor = 'white diamond';
            break;
        case 'brD':
            stoneColor = 'brown diamond';
            break;
        case 'blD':
            stoneColor = 'black diamond';
            break;
        case 'ySapph':
            stoneColor = 'yellow sapphire';
            break;
        case 'pSapph':
            stoneColor = 'pink sapphire';
            break;
        case 'aqua':
            stoneColor = 'aquamarine';
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