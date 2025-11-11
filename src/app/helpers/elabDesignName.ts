export default function elabDesignName(type: string) {
    let toothDesign;
    // SWITCH per i 5k colori che hanno deciso di inserirci
    switch(type) {
        case 'fullDiamond':
            toothDesign = 'full';
            break;
        case 'frameDiamond':
            toothDesign = 'frame';
            break;
        case 'bezelDiamond':
            toothDesign = 'bezel';
            break;
        case 'bar':
        case 'barDiamond':
            toothDesign = 'spacer';
            break;
        case 'bigBar':
        case 'bigBarDiamond':
            toothDesign = 'bar';
            break;
        default:
            toothDesign = type;
    }

    return toothDesign;
}