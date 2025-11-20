import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

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
            <button disabled={signature} type="button" value="gold" onClick={(e) => setGold(e.currentTarget.value)}
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <img src="/gold-icons/Giallo%202.svg" alt="yellow-gold-bar"/>
                <span className="text-sm">Gold</span>
            </button>
            <button disabled={signature} type="button" value="rose" onClick={(e) => setGold(e.currentTarget.value)}
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <img src="/gold-icons/Rosa%203.svg" alt="rose-gold-bar"/>
                <span className="text-sm">Rose</span>
            </button>
            <button disabled={signature} type="button" value="white" onClick={(e) => setGold(e.currentTarget.value)}
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <img src="/gold-icons/Bianco%201.svg" alt="white-gold-bar"/>
                <span className="text-sm">White</span>
            </button>
            <button disabled={signature} type="button" value="black" onClick={(e) => setGold(e.currentTarget.value)}
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <img src="/gold-icons/Nero%203.svg" alt="black-gold-bar"/>
                <span className="text-sm">Black</span>
            </button>
        </>
    )
}