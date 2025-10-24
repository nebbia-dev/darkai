import {useTeethStore} from "@/app/stores/teeth";
import {Reset} from "@/app/components/icons/Reset";
import {Undo} from "@/app/components/icons/Undo";
import {Redo} from "@/app/components/icons/Redo";
import {useState} from "react";
import {ResetCamera} from "@/app/components/icons/ResetCamera";
import {State, Stone} from "@/app/types/State";
import {Tooltip} from "@mui/material";

export default function ActionBar() {
    const current = useTeethStore((state:State) => state.currentHistory);
    const history = useTeethStore((state:State) => state.history);
    const activeTooth: string|undefined = useTeethStore((state:State) => state.currentTooth);
    const jewelType: string|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethJewelType[activeTooth] : undefined);
    const material: string|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethMaterial[activeTooth] : undefined);
    const stones: Stone|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethStones[activeTooth] : undefined);
    const availableTypes = useTeethStore((state:State) => state.teethTypeOptions);
    const visible: boolean|undefined = useTeethStore((state:State) => activeTooth !== undefined ? state.teethVisibility[activeTooth] : undefined);
    const reset = useTeethStore((state:State) => state.reset);
    const undo = useTeethStore((state:State) => state.undo);
    const redo = useTeethStore((state:State) => state.redo);
    const [showCopy, setShowCopy] = useState<boolean>(false);
    const doResetControls = useTeethStore((state:State) => state.setResetControls);
    function resetControls() {
        doResetControls(true);
    }

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

    return(
        <div>
            <div
                className="absolute flex items-center justify-center gap-4 bottom-20 left-[50%] translate-x-[-50%] w-2/4">
                <Tooltip title="Previous">
                    <button onClick={doUndo} className="rounded-full border p-2 cursor-pointer bg-gray-50/50">
                        <Undo className="w-8 h-8"/>
                    </button>
                </Tooltip>
                <Tooltip title="Next">
                    <button onClick={doRedo} className="rounded-full border p-2 cursor-pointer bg-gray-50/50">
                        <Redo className="w-8 h-8"/>
                    </button>
                </Tooltip>

                <Tooltip title="Reset camera">
                    <button onClick={resetControls} className="rounded-full border p-2 cursor-pointer bg-gray-50/50">
                        <ResetCamera className="w-8 h-8"/>
                    </button>
                </Tooltip>
                <Tooltip title="Reset configuration">
                    <button onClick={reset} className="bg-gray-50/50 rounded-full border p-2 cursor-pointer">
                        <Reset className="w-8 h-8"/>
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}