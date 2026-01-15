export default function elabVelvetName(color: string) {
    let velvet;
    switch(color) {
        case '130':
            velvet = 'grey';
            break;
        case '131':
            velvet = 'beige';
            break;
        case '30':
            velvet = 'camel';
            break;
        case '78':
            velvet = 'brown';
            break;
        case '57':
            velvet = 'red';
            break;
        case '5':
            velvet = 'crimson';
            break;
        case '55':
            velvet = 'steel blue';
            break;
        case '95':
            velvet = 'midnight blue';
            break;
        case 'nk41':
            velvet = 'lavender';
            break;
        case 'nk132':
            velvet = 'cyclamen';
            break;
        case 'nk124':
            velvet = 'salmon';
            break;
        case '53':
            velvet = 'sage';
            break;
        case '54':
            velvet = 'green';
            break;
        case '75':
            velvet = 'forest';
            break;
        default:
            velvet = color;
    }

    return velvet;
}