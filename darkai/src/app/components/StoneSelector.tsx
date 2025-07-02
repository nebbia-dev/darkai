import {useTeethStore} from "@/app/stores/teeth";
import SelectorButton from "@/app/components/SelectorButton";

export default function StoneSelector({tooth, stone, onclick, active}) {
    const type = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const disabled = type === 'frame' || type === 'bar' || type === 'barDiamond' || type === 'bigBar' || type === 'bigBarDiamond' || material === 'base'
    return (
        <SelectorButton click={onclick} disabled={disabled} selection={stone} active={active}/>
    )
}