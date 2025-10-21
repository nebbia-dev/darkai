export default function FinishingOptions({tooth}:{tooth:string|undefined}) {
    return (
        <>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">No pave
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Mosaic
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Round
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Hexagon
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Princess
            </div>
            <div className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Baguette
            </div>
        </>
    )
}