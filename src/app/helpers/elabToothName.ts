export default function elabToothName(tooth: string, recap: boolean) {
    let title;
    if(tooth.length === 4) {
        title = '';

        if (tooth[1] === 's') {
            title += 'Upper ';
        } else {
            title += 'Lower ';
        }

        if (tooth[0] === 'c') {
            title += 'canine ';
        } else {
            title += 'molar ';
        }

        if(!recap){
            if (tooth[2] === 'd') {
                title += ' R';
            } else {
                title += ' L';
            }
        } else {
            title += 's';
        }

    } else if(tooth.length === 5) {
        title = '';

        if (tooth[2] === 's') {
            title += 'Upper ';
        } else {
            title += 'Lower ';
        }

        if(tooth[1] === 'c') {
            title += 'central incisor';
        } else {
            title += 'lateral incisor';
        }

        if(!recap){
            if (tooth[3] === 'd') {
                title += ' R';
            } else {
                title += ' L';
            }
        } else {
            title += 's';
        }
    } else if(tooth.length === 6) {
        title = '';

        if (tooth[3] === 's') {
            title += 'Upper ';
        } else {
            title += 'Lower ';
        }

        if(tooth[0] === 'p') {
            title += 'first premolar';
        } else {
            title += 'second premolar';
        }

        if(!recap){
            if (tooth[4] === 'd') {
                title += ' R';
            } else {
                title += ' L';
            }
        } else {
            title += 's';
        }
    }

    return title;
}