import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Tooltip} from "@mui/material";
import React from "react";

export default function ActionBar() {
    const activeButton = useTeethStore((state) => state.activeButton);
    const current = useTeethStore((state:State) => state.currentHistory);
    const history = useTeethStore((state:State) => state.history);
    const reset = useTeethStore((state:State) => state.reset);
    const undo = useTeethStore((state:State) => state.undo);
    const redo = useTeethStore((state:State) => state.redo);

    const currentPack = useTeethStore((state:State) => state.currentHistoryPack);
    const historyPack = useTeethStore((state:State) => state.historyPack);
    const resetPack = useTeethStore((state:State) => state.resetPack);
    const undoPack = useTeethStore((state:State) => state.undoPack);
    const redoPack = useTeethStore((state:State) => state.redoPack);

    const resetCamera = useTeethStore((state:State) => state.resetControls);
    const doResetControls = useTeethStore((state:State) => state.setResetControls);
    function resetControls() {
        doResetControls(true);
    }

    function doUndo() {
        if(activeButton === '6') {
            if(currentPack > 1) {
                undoPack();
            }
        } else {
            if(current > 1) {
                undo();
            }
        }
    }

    function doRedo() {
        if(activeButton === '6') {
            if(currentPack < historyPack.length) {
                redoPack();
            }
        } else {
            if(current < history.length) {
                redo();
            }
        }
    }

    function doReset() {
        if(activeButton === '6') {
            resetPack(false);
        } else {
            reset();
        }
    }

    return(
        <div>
            <div
                className="absolute flex items-center justify-center gap-4 bottom-35 lg:bottom-20 bigger-bottom left-[50%] translate-x-[-50%] lg:w-2/4 w-full">
                <Tooltip title="Previous">
                    <button onClick={doUndo} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer" disabled={resetCamera}>
                        <img src="/action-bar-icons/undo.svg" alt="undo"/>
                    </button>
                </Tooltip>
                <Tooltip title="Next">
                    <button onClick={doRedo} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer" disabled={resetCamera}>
                        <img className="scale-x-[-1]" src="/action-bar-icons/undo.svg" alt="redo"/>
                    </button>
                </Tooltip>

                <Tooltip title="Reset camera">
                    <button onClick={resetControls} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer" disabled={resetCamera} >
                        <img src="/action-bar-icons/reset-view.svg" alt="reset-view"/>
                    </button>
                </Tooltip>
                <Tooltip title="Reset configuration">
                    <button onClick={doReset} className="bg-white/50 rounded-full border w-8 h-8 bigger-icons p-[6px] cursor-pointer" disabled={resetCamera}>
                        <img src="/action-bar-icons/reset-config.svg" alt="reset-configuration"/>
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}