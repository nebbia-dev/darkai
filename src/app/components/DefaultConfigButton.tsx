import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function DefaultConfigButton({teeth, color} : {teeth: string, color: string}) {
    const setDefaultConfig = useTeethStore((state: State) => state.setDefaultConfig);
    const activeDefault = useTeethStore((state: State) => state.activeDefault);
    function setConfig() {
        switch(color) {
         case 'goldDiamond':
             return setDefaultConfig(teeth + 'Diamond', 'gold');
         case 'roseDiamond':
             return setDefaultConfig(teeth + 'Diamond', 'rose');
         case 'whiteDiamond':
             return setDefaultConfig(teeth + 'Diamond', 'white');
         default:
             return setDefaultConfig(teeth, color);
        }
    }
    return(
        <div>
            <button className={`${activeDefault === teeth + color ? 'bg-stone-400' : 'bg-stone-200'} w-[150px] cursor-pointer rounded-2xl p-4`} onClick={setConfig}>
                <img src={`/default/${teeth}${color === 'gold' ? 'Y' : color === 'rose' ? 'R' : color === 'white' ? 'W' : 'Diamond'}.webp`} alt={`${teeth} ${color}`}/>
            </button>
        </div>
    )
}