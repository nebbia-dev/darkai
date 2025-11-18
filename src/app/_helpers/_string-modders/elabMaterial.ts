export default function elabMaterial(type:string, edit: 'gold' | 'finish') {
    let material;

    if(edit === 'gold') {
        switch(type) {
            case 'gold':
                material = 'yellow';
                break;
            default:
                material = type;
        }
    }

    if(edit === 'finish') {
        switch(type) {
            case 'diamond_cut':
                material = 'diamond cut';
                break;
            default:
                material = type;
        }
    }

    return material;
}