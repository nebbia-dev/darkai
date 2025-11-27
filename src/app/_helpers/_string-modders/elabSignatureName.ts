export default function elabSignatureName(type: string) {
    let signature;
    switch(type) {
        case 'vamp':
            signature = 'Vampire canines';
            break;
        case 'bubblegum':
            signature = 'Bubblegum';
            break;
        case 'cross':
            signature = 'Cross spacer';
            break;
        case 'hammered':
            signature = 'Hammered frames';
            break;
        case 'tribal':
            signature = 'Tribals';
            break;
        case 'braces':
            signature = 'Braces';
            break;
        case 'sprinkles':
            signature = 'Sprinkles';
            break;
        default:
            signature = type;
    }

    return signature;
}