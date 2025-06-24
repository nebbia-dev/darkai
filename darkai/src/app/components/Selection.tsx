import {useTeethStore} from "@/app/stores/teeth";

export default function Selection() {
    const changeIlsDx = useTeethStore((state) => state.setMaterial);

    return (
        <div
            className="w-[40vw] h-[90vh] flex flex-col align-center justify-center text-center bg-white my-auto rounded text-black">
            <p>Welcome to the DARKAI Grillz Configurator</p>
            <p>Choose the grillz perfect for you!</p>
            <div className="p-4">
                <p className="text-left">ILS DX</p>
                <div className="w-[48px] h-[48px] bg-yellow-200" onClick={() => changeIlsDx('ilsdx', 'gold')}></div>
                <div className="w-[48px] h-[48px] bg-pink-300" onClick={() => changeIlsDx('ilsdx', 'rose')}></div>
                <div className="w-[48px] h-[48px] bg-zinc-400" onClick={() => changeIlsDx('ilsdx', 'white')}></div>
            </div>
        </div>
    )
}