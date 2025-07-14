import {useTeethStore} from "@/app/stores/teeth";
import SelectorButtonPill from "@/app/components/SelectorButtonPill";
import State from "@/app/types/State";

export default function StoneSelectorPill({tooth, stone, onclick, active} : {onclick: () => void, tooth: string, active: boolean, stone: string}) {
    const type = useTeethStore((state: State) => state.teethJewelType[tooth]);
    const material = useTeethStore((state: State) => state.teethMaterial[tooth]);
    const disabled = type === 'frame' || type === 'frameDiamond' || type === 'bar' || type === 'barDiamond' || type === 'bigBar' || type === 'bigBarDiamond' || material === 'base'
    return (
        <SelectorButtonPill click={onclick} disabled={disabled} selection={stone} active={active} stones={true}/>
    )
}