import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import checkSignature from "@/app/_helpers/_checkers/checkSignature";

export default function GoldOptions({tooth, signature}:{tooth:string|undefined, signature:boolean|undefined}) {
    const setMaterial =  useTeethStore((state: State) => state.setMaterial);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);
    function setGold(e:any) {
        if(tooth) {
            setMaterial(tooth, e);
            setActiveSubButton(e);
        }
    }

    return (
        <>
            <button disabled={signature} type="button" value="gold"  onClick={(e) => setGold(e.currentTarget.value)} className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center`}>Yellow
            </button>
            <button disabled={signature} type="button" value="rose"  onClick={(e) => setGold(e.currentTarget.value)} className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center`}>Rose
            </button>
            <button disabled={signature} type="button" value="white"  onClick={(e) => setGold(e.currentTarget.value)} className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 p-2 text-center`}>White
            </button>
            <button disabled={signature} type="button" value="black"  onClick={(e) => setGold(e.currentTarget.value)} className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 p-2 text-center`}>Black
            </button>
        </>
    )
}