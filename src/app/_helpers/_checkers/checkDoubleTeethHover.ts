export default function checkDoubleTeethHover(tooth:string, jewel:string, hovered:string|undefined) {
    if(tooth === 'icssx' && hovered === 'icsdx' && (jewel === 'bar' || jewel === 'barDiamond')) {
        return true;
    } else if(tooth === 'icisx' && hovered === 'icidx' && (jewel === 'bar' || jewel === 'barDiamond')) {
        return true;
    }else if(tooth === 'cisx' && hovered === 'cidx' && (jewel === 'bigBar' || jewel === 'bigBarDiamond')) {
        return true;
    } else {
        return tooth === hovered;
    }
}