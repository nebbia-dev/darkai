import {useTeethStore} from "@/app/_stores/teeth";
import {Reset} from "@/app/_components/_icons/Reset";
import {Undo} from "@/app/_components/_icons/Undo";
import {Redo} from "@/app/_components/_icons/Redo";
import {useState} from "react";
import {ResetCamera} from "@/app/_components/_icons/ResetCamera";
import {State, Stone} from "@/app/_types/State";
import {Tooltip} from "@mui/material";

export default function ActionBar() {
    const current = useTeethStore((state:State) => state.currentHistory);
    const history = useTeethStore((state:State) => state.history);
    const reset = useTeethStore((state:State) => state.reset);
    const undo = useTeethStore((state:State) => state.undo);
    const redo = useTeethStore((state:State) => state.redo);
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