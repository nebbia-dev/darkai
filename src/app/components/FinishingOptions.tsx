export default function FinishingOptions({tooth, onclick}:{tooth:string|undefined, onclick:(value:string) => void}) {
    return (
        <>
            <button onClick={(e) => onclick(e.currentTarget.value)} type="button" value="nopave" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">No pave
            </button>
            <button onClick={(e) => onclick(e.currentTarget.value)} type="button" value="mosaicpave" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Mosaic
            </button>
            <button onClick={(e) => onclick(e.currentTarget.value)} type="button" value="roundpave" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Round
            </button>
            <button onClick={(e) => onclick(e.currentTarget.value)} type="button" value="hexpave" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Hexagon
            </button>
            <button onClick={(e) => onclick(e.currentTarget.value)} type="button" value="princepave" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Princess
            </button>
            <button onClick={(e) => onclick(e.currentTarget.value)} type="button" value="baguettepave" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Baguette
            </button>
        </>
    )
}