export default function elabToothName(tooth: string, short: boolean) {
    let title;
    if(tooth.length === 4) {
        title = '';

        if(!short){
            if (tooth[1] === 's') {
                title += 'Upper canine ';
            } else {
                title += 'Lower canine ';
            }
        }

        if(tooth[2] === 'd') {
            title += ' R';
        } else {
            title += ' L';
        }

    } else if(tooth.length === 5) {
        title = '';

        if(!short){
            if (tooth[2] === 's') {
                title += 'Upper ';
            } else {
                title += 'Lower ';
            }
        }

        if(tooth[1] === 'c') {
            title += 'central incisor';
        } else {
            title += 'lateral incisor';
        }


        if(tooth[3] === 'd') {
            title += ' R';
        } else {
            title += ' L';
        }
    }

    return title;
}