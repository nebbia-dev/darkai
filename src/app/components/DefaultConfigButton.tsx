import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function DefaultConfigButton({teeth, color} : {teeth: string, color: string}) {
    const setDefaultConfig = useTeethStore((state: State) => state.setDefaultConfig);
    const setActiveDefault = useTeethStore((state: State) => state.setActiveDefault);
    const reset = useTeethStore((state: State) => state.reset);
    const activeDefault = useTeethStore((state: State) => state.activeDefault);
    function setConfig() {

        switch(color) {
         case 'goldDiamond':
             if(activeDefault === teeth + 'goldDiamond') {
                 setActiveDefault(undefined, undefined);
                 reset();
                 return;
             }
             return setDefaultConfig(teeth + 'Diamond', 'gold');
         case 'roseDiamond':
             if(activeDefault === teeth + 'roseDiamond') {
                 setActiveDefault(undefined, undefined);
                 reset();
                 return;
             }
             return setDefaultConfig(teeth + 'Diamond', 'rose');
         case 'whiteDiamond':
             if(activeDefault === teeth + 'whiteDiamond') {
                 setActiveDefault(undefined, undefined);
                 reset();
                 return;
             }
             return setDefaultConfig(teeth + 'Diamond', 'white');
         default:
             if(activeDefault === teeth + color) {
                 setActiveDefault(undefined, undefined);
                 reset();
                 return;
             }
             return setDefaultConfig(teeth, color);
        }
    }
    return(
        <div>
            <button type="button" className={`${activeDefault === teeth + color ? 'bg-stone-400' : 'bg-stone-200'} w-[150px] cursor-pointer rounded-2xl p-4`} onClick={setConfig}>
                <img src={`/default/${teeth}${color === 'gold' ? 'Y' : color === 'rose' ? 'R' : color === 'white' ? 'W' : 'Diamond'}.webp`} alt={`${teeth} ${color}`}/>
            </button>
        </div>
    )
}