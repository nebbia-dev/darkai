import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function DefaultConfigSelector({teeth, color} : {teeth: string, color: string}) {
    const setDefaultConfig = useTeethStore((state: State) => state.setDefaultConfig);
    const activeDefault = useTeethStore((state: State) => state.activeDefault);
    const setActiveDefault = useTeethStore((state: State) => state.setActiveDefault);
    function setConfig() {
        if(color === 'diamond') {
            setActiveDefault(teeth, color);
            return setDefaultConfig(teeth + color[0].toUpperCase() + color.slice(1), 'gold');
        }
        setActiveDefault(teeth, color);
        return setDefaultConfig(teeth, color);
    }
    return(
            <button className={`
            ${activeDefault === teeth + color ? 'bg-gray-950 text-gray-50' : 'bg-gray-50 text-gray-950'} 
            min-w-[200px] rounded-full py-1 pr-1 pl-4 flex items-center justify-between gap-4 h-[15%]
            text-sm min-[400px]:text-base min-[600px]:text-lg min-[800px]:text-xl min-[900px]:text-2xl`} onClick={setConfig}>
                {color[0].toUpperCase() + color.slice(1)}
                <span className={`${color === 'gold' ? 'bg-yellow-200' : color === 'rose' ? 'bg-pink-200' : color === 'white' ? 'bg-zinc-200' : 'bg-orange-200'} inline-block w-full h-full rounded-full max-w-[50%]`}></span>
            </button>
    )
}