import {useTeethStore} from "@/app/stores/teeth";

export default function Selection() {
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    const changeJewelType = useTeethStore((state) => state.setType);

    return (
        <>
            <div
                className="w-[40vw] h-[90vh] flex flex-col align-center justify-center text-center bg-white my-auto rounded text-black">
                <p>Welcome to the DARKAI Grillz Configurator</p>
                <p>Choose the grillz perfect for you!</p>
                <div>
                    <div className="p-4">
                        <p className="text-left">ILS DX Material</p>
                        <div className="w-[48px] h-[48px] bg-yellow-200"
                             onClick={() => changeMaterial('ilsdx', 'gold')}></div>
                        <div className="w-[48px] h-[48px] bg-pink-300"
                             onClick={() => changeMaterial('ilsdx', 'rose')}></div>
                        <div className="w-[48px] h-[48px] bg-zinc-400"
                             onClick={() => changeMaterial('ilsdx', 'white')}></div>
                    </div>
                    <div className="p-4">
                        <p className="text-left">ILS DX Geometry</p>
                        <div className="w-[48px] h-[48px]"
                             onClick={() => changeJewelType('ilsdx', 'full')}>F</div>
                        <div className="w-[48px] h-[48px]"
                             onClick={() => changeJewelType('ilsdx', 'bar')}>B</div>
                    </div>
                    <div className="p-4">
                        <p className="text-left">ILI DX</p>
                        <div className="w-[48px] h-[48px] bg-yellow-200"
                             onClick={() => changeMaterial('ilidx', 'gold')}></div>
                        <div className="w-[48px] h-[48px] bg-pink-300"
                             onClick={() => changeMaterial('ilidx', 'rose')}></div>
                        <div className="w-[48px] h-[48px] bg-zinc-400"
                             onClick={() => changeMaterial('ilidx', 'white')}></div>
                    </div>
                </div>
            </div>

        </>
    )
}