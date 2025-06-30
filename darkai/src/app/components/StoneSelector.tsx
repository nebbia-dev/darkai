import {useTeethStore} from "@/app/stores/teeth";
import SelectorButton from "@/app/components/SelectorButton";

export default function StoneSelector({tooth}) {
    const type = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const selectStone = useTeethStore((state) => state.setStone);
    const disabled = type === 'frame' || type === 'bar' || type === 'barDiamond' || type === 'bigBar' || type === 'bigBarDiamond' || material === 'base'
    console.log('stoned')
    return (
        <div className="flex gap-2">
            <SelectorButton click={() => selectStone(tooth, 'sapphire')} disabled={disabled} selection="sapphire"/>
            <SelectorButton click={() => selectStone(tooth, 'ruby')} disabled={disabled} selection="ruby"/>
            <SelectorButton click={() => selectStone(tooth, 'emerald')} disabled={disabled} selection="emerald"/>
            <SelectorButton click={() => selectStone(tooth, 'amethyst')} disabled={disabled} selection="amethyst"/>

        </div>
    )
}