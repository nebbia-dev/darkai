import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import Image from 'next/image';
import Black from "@/../public/gold-icons/black.webp";
import Gold from "@/../public/gold-icons/gold.webp";
import Rose from "@/../public/gold-icons/rose.webp";
import White from "@/../public/gold-icons/white.webp";

export default function GoldOptions({tooth, signature}:{tooth:string|undefined, signature:boolean|undefined}) {
    const material = useTeethStore((state: State) => tooth ? state.teethMaterial[tooth] : undefined);
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
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} ${material && material === 'gold' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <Image priority loading="eager" fetchPriority="high" className="pt-2 pb-1 w-24" src={Gold} alt="yellow-gold-bar"/>
                <span className="text-sm">Gold</span>
            </button>
            <button disabled={signature} type="button" value="rose" onClick={(e) => setGold(e.currentTarget.value)}
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} ${material && material === 'rose' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <Image priority loading="eager" fetchPriority="high" className="pt-2 pb-1 w-24" src={Rose} alt="rose-gold-bar"/>
                <span className="text-sm">Rose</span>
            </button>
            <button disabled={signature} type="button" value="white" onClick={(e) => setGold(e.currentTarget.value)}
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} ${material && material === 'white' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 mb-4 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <Image priority loading="eager" fetchPriority="high" className="pt-2 pb-1 w-24" src={White} alt="white-gold-bar"/>
                <span className="text-sm">White</span>
            </button>
            <button disabled={signature} type="button" value="black" onClick={(e) => setGold(e.currentTarget.value)}
                    className={`${signature ? 'text-slate-400' : 'text-slate-950 cursor-pointer'} ${material && material === 'black' ? 'border-2' : ''} w-[95%] h-[120px] mx-auto rounded-3xl bg-stone-200 px-2 pt-2 pb-3 flex flex-col items-center justify-center`}>
                <Image priority loading="eager" fetchPriority="high" className="pt-2 pb-1 w-24" src={Black} alt="black-gold-bar"/>
                <span className="text-sm">Black</span>
            </button>
        </>
    )
}