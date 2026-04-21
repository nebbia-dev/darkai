export default function checkDoubleTeethActive(tooth:string, jewel:string, activeTooth:string|undefined) {
    if(tooth === 'icssx' && activeTooth === 'icsdx' && (jewel === 'bar' || jewel === 'barDiamond')) {
        return true;
    } else if(tooth === 'icisx' && activeTooth === 'icidx' && (jewel === 'bar' || jewel === 'barDiamond')) {
        return true;
    }else if(tooth === 'cisx' && activeTooth === 'cidx' && (jewel === 'bigBar' || jewel === 'bigBarDiamond')) {
        return true;
    } else {
        return tooth === activeTooth;
    }
}