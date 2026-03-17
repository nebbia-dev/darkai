import firstCapital from "@/app/_helpers/_string-modders/firstCapital";

export default function elabSignatureGold(material:string|undefined, signature:string) {
    if(material) {
        let gold;
        switch(signature) {
            case 'bubblegum':
                gold = firstCapital(material) + ' on yellow gold';
                break;
            case 'braces':
                gold = (material.includes("base") ? 'Lab rubies' : 'Lab emeralds') + ' on white gold';
                break;
            default:
                gold = (
                    material.includes("gold")
                        ? 'Yellow'
                        : material.includes("rose")
                            ? 'Rose'
                            : material.includes("black")
                                ? 'Black'
                                : 'White'
                ) + ' gold';
        }
        return gold;
    }
    return "";
}
