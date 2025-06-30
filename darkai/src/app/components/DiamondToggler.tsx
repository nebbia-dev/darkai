import {useTeethStore} from "@/app/stores/teeth";
import SelectorButton from "@/app/components/SelectorButton";

export default function DiamondToggler({tooth}) {
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const toggleDiamond = useTeethStore((state) => state.setDiamond);
    function log() {
        console.log('quaso');
        toggleDiamond(tooth);
    }
    console.log('ouch')
    return (
        <SelectorButton click={log} disabled={material === 'base'} selection="diamond"/>
    )
}