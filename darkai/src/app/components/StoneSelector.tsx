import {useTeethStore} from "@/app/stores/teeth";

export default function StoneSelector({tooth}) {
    const type = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const selectStone = useTeethStore((state) => state.setStone);
    const disabled = type === 'frame' || type === 'bar' || type === 'barDiamond' || type === 'bigBar' || type === 'bigBarDiamond' || material === 'base'
    console.log('stoned')
    return (
        <div className="flex flex-col gap-2">
            <button className="bg-blue-700"
                    onClick={() => selectStone(tooth, 'sapphire')}
                    disabled={disabled}
            >Sapphire
            </button>
            <button className="bg-red-700"
                    onClick={() => selectStone(tooth, 'ruby')}
                    disabled={disabled}
            >Ruby
            </button>
            <button className="bg-emerald-700"
                    onClick={() => selectStone(tooth, 'emerald')}
                    disabled={disabled}
            >Emerald
            </button>
            <button className="bg-violet-700"
                    onClick={() => selectStone(tooth, 'amethyst')}
                    disabled={disabled}
            >Amethyst
            </button>
        </div>
    )
}