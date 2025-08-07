import {useTeethStore} from "@/app/stores/teeth";
import SelectorButton from "@/app/components/SelectorButton";
import {State} from "@/app/types/State";

export default function DiamondToggler({tooth, onclick, active, selection} : {tooth: string, onclick: () => void , active: boolean, selection: string}) {
    const material = useTeethStore((state: State) => state.teethMaterial[tooth]);

    return (
        <SelectorButton click={onclick} disabled={material === 'base'} selection={selection} active={active} adjust={false}/>
    )
}