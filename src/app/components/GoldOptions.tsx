export default function GoldOptions({tooth, onclick}:{tooth:string|undefined, onclick:(value:string) => void}) {
    return (
        <>
            <button type="button" value="gold"  onClick={(e) => onclick(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Yellow
            </button>
            <button type="button" value="rose"  onClick={(e) => onclick(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Rose
            </button>
            <button type="button" value="white"  onClick={(e) => onclick(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">White
            </button>
            <button type="button" value="black"  onClick={(e) => onclick(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Black
            </button>
        </>
    )
}