import {useTeethStore} from "@/app/stores/teeth";
import SelectorButton from "@/app/components/SelectorButton";

export default function StoneSelector({tooth, stone, onclick, active} : {onclick: () => void, tooth: string, active: boolean, stone: string}) {
    const type = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const disabled = type === 'frame' || type === 'bar' || type === 'barDiamond' || type === 'bigBar' || type === 'bigBarDiamond' || material === 'base'
    console.log('oops')
    return (
        <SelectorButton click={onclick} disabled={disabled} selection={stone} active={active}/>
    )
}