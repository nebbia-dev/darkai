export default function DesignOptions({tooth, onclick}: { tooth: string | undefined, onclick:(value:string) => void }) {

    return (
        <>
            <button type="button" value="full" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>Full
            </button>
            <button type="button" value="frame" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>Frame
            </button>
            <button type="button" value="spacer" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>Spacer
            </button>
            <button type="button" value="bar" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>Bar
            </button>
            <button type="button" value="bezel" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>Bezel
            </button>
            <button type="button" value="enamel" className="w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center cursor-pointer" onClick={(e) => onclick(e.currentTarget.value)}>Enamel
            </button>
        </>
    )
}