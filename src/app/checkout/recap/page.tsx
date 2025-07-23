'use client'
import {useTeethStore} from "@/app/stores/teeth";
import State from "@/app/types/State";

export default function Recap() {
    const takeScreenshot = useTeethStore((state:State) => state.setIsScreenshotNeeded);
    function download() {
        takeScreenshot(true);
    }

    // questa in realta' e' nella stessa pagina del configuratore

    return(
        <div className="w-full h-full flex items-center justify-center">
            <button onClick={download} className="rounded-full border p-2 cursor-pointer bg-gray-50/50">Download</button>
        </div>
    )
}