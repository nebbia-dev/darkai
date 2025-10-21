export default function SignatureOptions({onclick} : {onclick:(value:string) => void}) {
    return (
        <>
            <button type="button" value="vamp" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => onclick(e.currentTarget.value)}>Vamp Canines
            </button>
            <button type="button" value="sprinkles" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => onclick(e.currentTarget.value)}>Sprinkles
            </button>
            <button type="button" value="bgum" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => onclick(e.currentTarget.value)}>Bubble Gum
            </button>
            <button type="button" value="braces" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => onclick(e.currentTarget.value)}>Braces
            </button>
            <button type="button" value="tribal" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => onclick(e.currentTarget.value)}>Tribals
            </button>
            <button type="button" value="cross" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center" onClick={(e) => onclick(e.currentTarget.value)}>Cross Spacer
            </button>
            <button type="button" value="hammer" className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center" onClick={(e) => onclick(e.currentTarget.value)}>Hammered Frames
            </button>
        </>
    )
}