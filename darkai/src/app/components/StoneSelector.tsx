import {useTeethStore} from "@/app/stores/teeth";

export default function StoneSelector({tooth}) {
    const type = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const selectStone = useTeethStore((state) => state.setStone);
    console.log('stoned')
    return (
        <div className="flex gap-2">
            <button className="bg-blue-700"
                    onClick={() => selectStone(tooth, 'sapphire')}
                    disabled={type === 'frame' || type === 'bar' || type === 'barDiamond' || material === 'base'}
            >Sapphire
            </button>
            <button className="bg-red-700"
                    onClick={() => selectStone(tooth, 'ruby')}
                    disabled={type === 'frame' || type === 'bar' || type === 'barDiamond' || material === 'base'}
            >Ruby
            </button>
            <button className="bg-emerald-700"
                    onClick={() => selectStone(tooth, 'emerald')}
                    disabled={type === 'frame' || type === 'bar' || type === 'barDiamond' || material === 'base'}
            >Emerald
            </button>
            <button className="bg-violet-700"
                    onClick={() => selectStone(tooth, 'amethyst')}
                    disabled={type === 'frame' || type === 'bar' || type === 'barDiamond' || material === 'base'}
            >Amethyst
            </button>
        </div>
    )
}