'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";
import {Suspense, useEffect, useState} from "react";
import Loading from "@/app/components/Loading";
import ActionBar from "@/app/components/ActionBar";
import {useTeethStore} from "@/app/stores/teeth";
import Recap from "@/app/components/Recap";

export default function Config() {
    const [activeButton, setActiveButton] = useState<string|undefined>(undefined);

    const ui = useTeethStore((state) => state.ui);
    // const setUI = useTeethStore((state) => state.setUI);
    const loaded = useTeethStore((state) => state.loaded);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 100);
    });

    function changeActiveButton(value:string) {
        if(value === activeButton) {
            setActiveButton(undefined)
        } else {
            setActiveButton(value);
        }
    }

    // useEffect(() => {
    //     function handleResize() {
    //         const width = window.innerWidth;
    //         const height = window.innerHeight;
    //
    //         if(height > width) {
    //             setUI(true);
    //         } else {
    //             setUI(false);
    //         }
    //     }
    //     window.addEventListener("resize", handleResize);
    //     handleResize();
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    if(!isMounted) return <Loading/>

    return (
        <div className='flex flex-row w-[100vw] mx-auto bg-gray-200 relative'>
            {/*<button className="absolute top-4 left-4 text-white bg-black rounded-[50%] h-12 w-12 cursor-pointer font-bold z-30" onClick={setUI}>UI</button>*/}
            <div className={`h-page-nav ${activeButton ? 'w-[10vw]' : 'w-[25vw]'} absolute z-15 left-0`}>
                {loaded && <Selection activeButton={activeButton} changeActiveButton={changeActiveButton}/>}
            </div>
            <div className="h-page-nav w-full mx-auto">
                <Suspense fallback={<Loading/>}>
                    <Scene/>
                </Suspense>
                {loaded && <ActionBar ui={ui}/>}
            </div>
            <div className=" h-page-nav w-[30vw] absolute z-15 right-0">
                {loaded && <Recap/>}
            </div>
        </div>
    );
}
