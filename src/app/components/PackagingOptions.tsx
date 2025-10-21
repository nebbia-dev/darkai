export default function PackagingOptions({onclick} : {onclick:(value:string) => void }) {
    return (
        <>
            <button type="button" value="base" onClick={(e) => onclick(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center">Standard Box
            </button>
            <button type="button" value="prem" onClick={(e) => onclick(e.currentTarget.value)} className="cursor-pointer w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center">Premium Box
            </button>
        </>
    )
}