import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";

export default function TeethMap() {

    const activeTooth = useTeethStore((state: State) => state.currentTooth);

    return(
        <div className={`${activeTooth ? 'relative z-30 top-[-50%]' : 'hidden'}`}>
            <div className="absolute flex items-center justify-center gap-4 flex-col translate-y-[-50%] right-[10%]">
               <img className="w-36 h-36" src={`/map/${activeTooth}.webp`} alt="teeth map"/>
            </div>
        </div>
    )
}