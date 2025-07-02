import {useTeethStore} from "@/app/stores/teeth";
import {Reset} from "@/app/components/icons/Reset";
import {Undo} from "@/app/components/icons/Undo";
import {Redo} from "@/app/components/icons/Redo";

export default function ActionBar() {
    const current = useTeethStore((state) => state.currentHistory);
    const history = useTeethStore((state) => state.history);
    const reset = useTeethStore((state) => state.reset);
    const undo = useTeethStore((state) => state.undo);
    const redo = useTeethStore((state) => state.redo);

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
        <div className="relative">
            <div className="absolute bottom-30 left-[50%] translate-x-[-50%] w-2/4 flex align-center justify-center gap-4">
                <button onClick={doUndo} className="rounded-full border p-2 cursor-pointer">
                    <Undo className="w-8 h-8"/>
                </button>
                <button onClick={doRedo} className="rounded-full border p-2 cursor-pointer">
                    <Redo className="w-8 h-8"/>
                </button>
                <button onClick={reset} className="rounded-full border p-2 cursor-pointer">
                    <Reset className="w-8 h-8"/>
                </button>
            </div>
        </div>
    )
}