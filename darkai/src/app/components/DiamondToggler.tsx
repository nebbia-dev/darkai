import {useTeethStore} from "@/app/stores/teeth";

export default function DiamondToggler({tooth}) {
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const toggleDiamond = useTeethStore((state) => state.setDiamond);
    console.log('ouch')
    return (
        <button className="bg-yellow-100"
                onClick={() => toggleDiamond(tooth)}
                disabled={material === 'base'}
        >Diamonds</button>
    )
}