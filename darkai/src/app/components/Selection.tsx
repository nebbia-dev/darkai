import {useTeethStore} from "@/app/stores/teeth";

export default function Selection() {
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    const changeJewelType = useTeethStore((state) => state.setType);
    const teethJewelType = useTeethStore((state) => state.teethJewelType);
    function diamondOrNot(tooth) {
        if(teethJewelType[tooth] === 'full') {
            return 'fullDiamond'
        } else if(teethJewelType[tooth] === 'bar') {
            return 'barDiamond'
        } else if(teethJewelType[tooth] === 'fullDiamond') {
            return 'full'
        } else if(teethJewelType[tooth] === 'barDiamond') {
            return 'bar'
        }
    }
    return (
        <>
            <div
                className="w-[40vw] h-[90vh] flex flex-col align-center justify-center text-center bg-white my-auto rounded text-black">
                <p>Welcome to the DARKAI Grillz Configurator</p>
                <p>Choose the grillz perfect for you!</p>
                <div className="flex">
                    <div className="p-4">
                        <p className="text-left">ILS DX Material</p>
                        <div className="w-[48px] h-[48px] bg-yellow-200"
                             onClick={() => changeMaterial('ilsdx', 'gold')}></div>
                        <div className="w-[48px] h-[48px] bg-pink-300"
                             onClick={() => changeMaterial('ilsdx', 'rose')}></div>
                        <div className="w-[48px] h-[48px] bg-zinc-400"
                             onClick={() => changeMaterial('ilsdx', 'white')}></div>
                        <div className="w-[48px] h-[48px] bg-yellow-100"
                             onClick={() => changeJewelType('ilsdx', diamondOrNot('ilsdx'))}></div>
                    </div>
                    <div className="p-4">
                        <p className="text-left">ILS DX Geometry</p>
                        <div className="w-[48px] h-[48px]"
                             onClick={() => changeJewelType('ilsdx', 'full')}>F
                        </div>
                        <div className="w-[48px] h-[48px]"
                             onClick={() => changeJewelType('ilsdx', 'bar')}>B
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-left">ILS SX Material</p>
                        <div className="w-[48px] h-[48px] bg-yellow-200"
                             onClick={() => changeMaterial('ilssx', 'gold')}></div>
                        <div className="w-[48px] h-[48px] bg-pink-300"
                             onClick={() => changeMaterial('ilssx', 'rose')}></div>
                        <div className="w-[48px] h-[48px] bg-zinc-400"
                             onClick={() => changeMaterial('ilssx', 'white')}></div>
                    </div>
                    <div className="p-4">
                        <p className="text-left">ILS SX Geometry</p>
                        <div className="w-[48px] h-[48px]"
                             onClick={() => changeJewelType('ilssx', 'full')}>F
                        </div>
                        <div className="w-[48px] h-[48px]"
                             onClick={() => changeJewelType('ilssx', 'bar')}>B
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}