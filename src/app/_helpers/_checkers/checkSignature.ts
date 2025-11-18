export default  function checkSignature(type:string|undefined) {
    let isSignature;
    if(type) {
        switch (type) {
            case 'vamp':
            case 'hammered':
            case 'cross':
            case 'sprinkles':
            case 'bubblegum':
            case 'tribal':
            case 'braces':
            case 'ilisx':
                isSignature = true;
                break;
            default:
                isSignature = false;
        }
    }

    return isSignature;
}