import {useTeethStore} from "@/app/stores/teeth";

export default function DefaultConfigButton({teeth, color}) {
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
        <div>
            <button className={`${activeDefault === teeth + color ? 'bg-stone-400' : 'bg-stone-200'} max - w - [300px] rounded-2xl p-4`} onClick={setConfig}>
                <img src={`/default/${teeth}${color === 'gold' ? 'Y' : color === 'rose' ? 'R' : color === 'white' ? 'W' : 'Diamond'}.webp`} alt={`${teeth} ${color}`}/>
            </button>
        </div>
    )
}