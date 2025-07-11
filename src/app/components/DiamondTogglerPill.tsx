import {useTeethStore} from "@/app/stores/teeth";
import SelectorButtonPill from "@/app/components/SelectorButtonPill";

export default function DiamondTogglerPill({tooth, onclick, active, stones} : {tooth: string, onclick: () => void , active: boolean, stones: boolean}) {
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    console.log('ouch');

    return (
        <SelectorButtonPill click={onclick} disabled={material === 'base'} selection="diamond" active={active} stones={stones}/>
    )
}