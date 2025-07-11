import {useTeethStore} from "@/app/stores/teeth";
import SelectorButton from "@/app/components/SelectorButton";

export default function DiamondToggler({tooth, onclick, active} : {tooth: string, onclick: () => void , active: boolean}) {
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    console.log('ouch');

    return (
        <SelectorButton click={onclick} disabled={material === 'base'} selection="diamond" active={active}/>
    )
}