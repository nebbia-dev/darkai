import {useTeethStore} from "@/app/stores/teeth";

export default function DiamondToggler({tooth}) {
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const toggleDiamond = useTeethStore((state) => state.setDiamond);
    function log() {
        console.log('quaso');
        toggleDiamond(tooth);
    }
    console.log('ouch')
    return (
        <button className="bg-yellow-100"
                onClick={log}
                disabled={material === 'base'}
        >Diamonds</button>
    )
}