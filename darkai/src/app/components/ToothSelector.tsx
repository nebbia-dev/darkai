import {useTeethStore} from "@/app/stores/teeth";

export default function ToothSelector({tooth, color, type, title}) {
    const changeTooth = useTeethStore((state) => state.setWholeTooth);
    return (
        <div className="w-[33%] rounded bg-gray-50 p-4"
             onClick={() => changeTooth(tooth, color, type)}>
            <img src={`/webp/${tooth}_${type}${color === 'gold' ? 'Y' : color === 'rose' ? 'R' : 'W'}.webp`} alt={`${title} ${color}`}/>
        </div>
    )
}