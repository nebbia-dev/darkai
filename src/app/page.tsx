'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";
import {Suspense, useEffect, useState} from "react";
import Loading from "@/app/components/Loading";
import ActionBar from "@/app/components/ActionBar";
import {useTeethStore} from "@/app/stores/teeth";
import Recap from "@/app/components/Recap";

export default function Config() {

    const [nextStep, setNextStep] = useState<boolean>(false)
    const loaded = useTeethStore((state) => state.loaded);
    const activeButton = useTeethStore((state) => state.activeButton);
    const changeActiveButton = useTeethStore((state) => state.setActiveButton);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 100);
    });

    function setContinue() {
        setNextStep(prev => !prev);
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
            <div className={`h-page-nav ${activeButton ? 'w-[10vw]' : 'w-[25vw]'} ${nextStep ? 'hidden' : 'block'} absolute z-15 left-0`}>
                {loaded && <Selection activeButton={activeButton} changeActiveButton={changeActiveButton}/>}
            </div>
            <div className={`h-page-nav ${nextStep ? 'w-[60%]' : 'w-full mx-auto'}`}>
                <Suspense fallback={<Loading/>}>
                    <Scene/>
                </Suspense>
                {loaded && !nextStep && <ActionBar/>}
            </div>
            <div className={`h-page-nav ${nextStep ? 'w-[40vw]' : 'w-[30vw]'} absolute z-15 right-0`}>
                {loaded && <Recap next={nextStep} onclick={setContinue} />}
            </div>
        </div>
    );
}
