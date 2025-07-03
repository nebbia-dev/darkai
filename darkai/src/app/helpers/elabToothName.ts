export default function elabToothName(tooth, short) {
    let title;
    if(tooth.length === 4) {
        title = 'Canino';

        if(!short){
            if (tooth[1] === 's') {
                title += ' superiore';
            } else {
                title += ' inferiore';
            }
        }

        if(tooth[2] === 'd') {
            title += ' destro';
        } else {
            title += ' sinistro';
        }

    } else if(tooth.length === 5) {
        title = 'Incisivo';

        if(tooth[1] === 'c') {
            title += ' centrale';
        } else {
            title += ' laterale';
        }

        if(!short){
            if (tooth[2] === 's') {
                title += ' superiore';
            } else {
                title += ' inferiore';
            }
        }

        if(tooth[3] === 'd') {
            title += ' destro';
        } else {
            title += ' sinistro';
        }
    }

    return title;
}