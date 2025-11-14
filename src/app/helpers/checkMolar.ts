export default  function checkMolar(tooth:string|undefined) {
    let isMolar;
    if(tooth) {
        switch (tooth) {
            case 'icsdx':
            case 'icssx':
            case 'icidx':
            case 'icisx':
            case 'ilsdx':
            case 'ilssx':
            case 'ilidx':
            case 'ilisx':
            case 'csdx':
            case 'cssx':
            case 'cidx':
            case 'cisx':
                isMolar = false;
                break;
            default:
                isMolar = true;
        }
    }
    return isMolar;
}