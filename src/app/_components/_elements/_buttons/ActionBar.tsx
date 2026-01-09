import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Tooltip} from "@mui/material";
import React from "react";

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
                className="absolute flex items-center justify-center gap-4 bottom-10 bigger-bottom left-[50%] translate-x-[-50%] w-2/4">
                <Tooltip title="Previous">
                    <button onClick={doUndo} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer">
                        <img src="/action-bar-icons/undo.svg" alt="undo"/>
                    </button>
                </Tooltip>
                <Tooltip title="Next">
                    <button onClick={doRedo} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer">
                        <img className="scale-x-[-1]" src="/action-bar-icons/undo.svg" alt="redo"/>
                    </button>
                </Tooltip>

                <Tooltip title="Reset camera">
                    <button onClick={resetControls} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer">
                        <img src="/action-bar-icons/reset-view.svg" alt="reset-view"/>
                    </button>
                </Tooltip>
                <Tooltip title="Reset configuration">
                    <button onClick={reset} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer">
                        <img src="/action-bar-icons/reset-config.svg" alt="reset-configuration"/>
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}