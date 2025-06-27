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
        <button className="w-[48px] h-[48px] rounded"
                onClick={log}
                disabled={material === 'base'}
        >
            <img src="/textures/diamondFull/Difuse_Diamanti.webp" className="rounded object-cover"/>
        </button>
    )
}