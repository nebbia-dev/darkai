import {useTeethStore} from "@/app/stores/teeth";
import {Reset} from "@/app/components/icons/Reset";
import {Undo} from "@/app/components/icons/Undo";
import {Redo} from "@/app/components/icons/Redo";
import {Copy} from "@/app/components/icons/Copy";
import elabToothName from "@/app/helpers/elabToothName";
import {useState} from "react";

export default function ActionBar({ui}) {
    const current = useTeethStore((state) => state.currentHistory);
    const history = useTeethStore((state) => state.history);
    const activeTooth = useTeethStore((state) => state.currentTooth);
    const jewelType = useTeethStore((state) => state.teethJewelType[activeTooth]);
    const material = useTeethStore((state) => state.teethMaterial[activeTooth]);
    const stones = useTeethStore((state) => state.teethStones[activeTooth]);
    const availableTypes = useTeethStore((state) => state.teethTypeOptions);
    const visible = useTeethStore((state) => state.teethVisibility[activeTooth]);
    const copy = useTeethStore((state) => state.setCopy);
    const reset = useTeethStore((state) => state.reset);
    const undo = useTeethStore((state) => state.undo);
    const redo = useTeethStore((state) => state.redo);
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

    function setCopy(newTooth, oldTooth) {
        copy(newTooth, oldTooth);
        setShowCopy(false);
    }

    return(
        <div className="relative z-30">
            <div
                className={`absolute flex items-center justify-center gap-4 ${ui ? 'bottom-5' : 'bottom-30'} left-[50%] translate-x-[-50%] w-2/4`}>
                <button onClick={doUndo} className="rounded-full border p-2 cursor-pointer">
                    <Undo className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                </button>
                <button onClick={doRedo} className="rounded-full border p-2 cursor-pointer">
                    <Redo className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                </button>
                <div className={`${visible && material !== 'base' && ui ? 'flex' : 'hidden'} relative items-center justify-center col-start-1 col-end-1 row-start-1 row-end-1`}>
                    <button className=" rounded-full border p-2 cursor-pointer w-fit"
                            onClick={() => setShowCopy((prev) => !prev)}>
                        <Copy className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                    </button>
                    <div
                        className={`${showCopy && availableTypes[jewelType] ? 'block' : 'hidden'} absolute border rounded mt-2 bg-gray-50 z-10 left-[125%] w-[25vw]`}>
                        <h3 className="bg-gray-950 p-4 text-gray-50">Copia su...</h3>
                        <ul className="pb-2">
                            {availableTypes[jewelType] && availableTypes[(stones ? 'stones' : jewelType)].map((data, i) => {
                                const opt = elabToothName(data, false);

                                return (
                                    <li className="hover:bg-stone-200 hover:rounded px-4 py-1" key={data + activeTooth + i}>
                                        {data !== activeTooth &&
                                            <button className="cursor-pointer" onClick={() => setCopy(data, activeTooth)}>
                                                {opt}
                                            </button>
                                        }
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                </div>
                <button onClick={reset} className="rounded-full border p-2 cursor-pointer">
                    <Reset className={`${ui ? 'w-6 h-6' : 'w-8 h-8'}`}/>
                </button>
            </div>
        </div>
    )
}