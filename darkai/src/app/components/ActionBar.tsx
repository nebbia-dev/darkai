import {useTeethStore} from "@/app/stores/teeth";
import {Reset} from "@/app/components/icons/Reset";
import {Copy} from "@/app/components/icons/Copy";
import {Undo} from "@/app/components/icons/Undo";
import {Redo} from "@/app/components/icons/Redo";

export default function ActionBar() {
    const reset = useTeethStore((state) => state.reset);
    return(
        <div className="relative">
            <div className="absolute bottom-30 left-[50%] translate-x-[-50%] w-2/4 flex align-center justify-center gap-4">
                <button className="rounded-full border p-2 cursor-pointer">
                    <Undo className="w-8 h-8"/>
                </button>
                <button className="rounded-full border p-2 cursor-pointer">
                    <Redo className="w-8 h-8"/>
                </button>
                <button className="rounded-full border p-2 cursor-pointer">
                    <Copy className="w-8 h-8"/>
                </button>
                <button onClick={reset} className="rounded-full border p-2 cursor-pointer">
                    <Reset className="w-8 h-8"/>
                </button>
            </div>
        </div>
    )
}