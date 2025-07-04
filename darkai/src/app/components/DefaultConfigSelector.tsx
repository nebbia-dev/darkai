import {useTeethStore} from "@/app/stores/teeth";

export default function DefaultConfigSelector({teeth, color}) {
    const setDefaultConfig = useTeethStore((state) => state.setDefaultConfig);
    const activeDefault = useTeethStore((state) => state.activeDefault);
    const setActiveDefault = useTeethStore((state) => state.setActiveDefault);
    function setConfig() {
        if(color === 'diamond') {
            setActiveDefault(teeth, color);
            return setDefaultConfig(teeth + color[0].toUpperCase() + color.slice(1), 'gold');
        }
        setActiveDefault(teeth, color);
        return setDefaultConfig(teeth, color);
    }
    return(
            <button className={`${activeDefault === teeth + color ? 'bg-gray-950 text-gray-50' : 'bg-gray-50 text-gray-950'} min-w-[200px] rounded-full py-1 pr-1 pl-4 flex items-center justify-between gap-4`} onClick={setConfig}>
                {color[0].toUpperCase() + color.slice(1)}
                <span className={`${color === 'gold' ? 'bg-yellow-200' : color === 'rose' ? 'bg-pink-200' : color === 'white' ? 'bg-zinc-200' : 'bg-orange-200'} inline-block w-full h-8 rounded-full`}></span>
            </button>
    )
}