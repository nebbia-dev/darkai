import {useTeethStore} from "@/app/stores/teeth";

export default function ColorSelector({tooth, color}) {
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    return (
        <div className={`w-[48px] h-[48px] rounded ${color === 'gold' ? 'bg-yellow-200' : color === 'rose' ? 'bg-pink-200' : 'bg-zinc-200'}`}
             onClick={() => changeMaterial(tooth, color)}></div>
    )
}