import {useTeethStore} from "@/app/stores/teeth";
import SelectorButton from "@/app/components/SelectorButton";

export default function ColorSelector({tooth, color}) {
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    return (
        <SelectorButton disabled={false} selection={color} click={() => changeMaterial(tooth, color)}/>
    )
}
