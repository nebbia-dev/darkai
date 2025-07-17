import {useTeethStore} from "@/app/stores/teeth";
import {Reset} from "@/app/components/icons/Reset";
import {Undo} from "@/app/components/icons/Undo";
import {Redo} from "@/app/components/icons/Redo";
import {Copy} from "@/app/components/icons/Copy";
import elabToothName from "@/app/helpers/elabToothName";
import {useState} from "react";
import State from "@/app/types/State";

export default function ActionBar({ui} : {ui: boolean}) {
    const current = useTeethStore((state:State) => state.currentHistory);
    const total = useTeethStore((state:State) => state.total);
    const history = useTeethStore((state:State) => state.history);
    const activeTooth: string|undefined = useTeethStore((state:State) => state.currentTooth);
    const jewelType: string|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethJewelType[activeTooth] : undefined);
    const material: string|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethMaterial[activeTooth] : undefined);
    const stones: string|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethStones[activeTooth] : undefined);
    const availableTypes = useTeethStore((state:State) => state.teethTypeOptions);
    const visible: boolean|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethVisibility[activeTooth] : undefined);
    const copy = useTeethStore((state:State) => state.setCopy);
    const reset = useTeethStore((state:State) => state.reset);
    const undo = useTeethStore((state:State) => state.undo);
    const redo = useTeethStore((state:State) => state.redo);
    const [showCopy, setShowCopy] = useState<boolean>(false);

    function doUndo() {
        if(current > 1) {
            undo();
        }
    }

    function doRedo() {
        if(current < history.length) {
            redo();
        }
    }

    function setCopy(newTooth: string, oldTooth: string) {
        copy(newTooth, oldTooth);
        setShowCopy(false);
    }

    return(
        <div className="relative z-30">
            <div
                className={`absolute flex items-center justify-center gap-4 ${ui ? 'bottom-5' : 'bottom-30'} left-[50%] translate-x-[-50%] w-2/4`}>
                <button onClick={doUndo} className="rounded-full border p-2 cursor-pointer bg-gray-50/50">
                    <Undo className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                </button>
                <button onClick={doRedo} className="rounded-full border p-2 cursor-pointer bg-gray-50/50">
                    <Redo className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                </button>
                <div className={`${visible && material !== 'base' && ui ? 'flex' : 'hidden'} relative items-center justify-center col-start-1 col-end-1 row-start-1 row-end-1`}>
                    <button className="bg-gray-50/50 rounded-full border p-2 cursor-pointer w-fit"
                            onClick={() => setShowCopy((prev) => !prev)}>
                        <Copy className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                    </button>
                    <div
                        className={`${showCopy && jewelType && availableTypes[jewelType] ? 'block' : 'hidden'} absolute border rounded mt-2 bg-gray-50 z-10 translate-y-[-96px] w-[75vw] text-sm min-[400px]:text-base min-[600px]:text-lg min-[800px]:text-xl min-[900px]:text-2xl`}>
                        <h3 className="bg-gray-950 p-4 text-gray-50">Copia su...</h3>
                        <ul className="py-2 flex overflow-x-scroll">
                            {jewelType && availableTypes[jewelType] && availableTypes[(stones ? 'stones' : jewelType)].map((data, i) => {
                                const opt = elabToothName(data, false);
                                if(activeTooth && data !== activeTooth) return (
                                    <li className="hover:bg-stone-200 hover:rounded px-4 py-1" key={data + activeTooth + i}>
                                        <button className="cursor-pointer whitespace-nowrap" onClick={() => setCopy(data, activeTooth)}>
                                            {opt}
                                        </button>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                </div>
                <button onClick={reset} className="bg-gray-50/50 rounded-full border p-2 cursor-pointer">
                    <Reset className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                </button>
                <div>{total}€</div>
            </div>
        </div>
    )
}