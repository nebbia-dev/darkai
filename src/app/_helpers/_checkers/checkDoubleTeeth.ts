export default function checkDoubleTeeth(tooth:string, jewel:string) {
    return ((jewel === 'bar' || jewel === 'barDiamond') && (tooth === 'icsdx' || tooth === 'icidx')) || ((jewel === 'bigBar' || jewel === 'bigBarDiamond') && tooth === 'cidx');
}