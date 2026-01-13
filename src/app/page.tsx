'use client'
import Scene from "@/app/_components/_layout/Scene";
import Selection from "@/app/_components/_layout/Selection";
import React from "react";
import ActionBar from "@/app/_components/_elements/_buttons/ActionBar";
import {useTeethStore} from "@/app/_stores/teeth";
import Recap from "@/app/_components/_layout/Recap";
import {State} from "@/app/_types/State";

export default function Config() {

    const nextStep = useTeethStore((state) => state.nextStep);
    const setNextStep = useTeethStore((state) => state.setNextStep);
    const loaded = useTeethStore((state) => state.loaded);
    const activeButton = useTeethStore((state) => state.activeButton);
    const changeActiveButton = useTeethStore((state) => state.setActiveButton);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);

    function setContinue() {
        setNextStep(!nextStep);
        setActive(undefined);
    }


    return (
        <>
            <div className="flex flex-col w-[100vw] mx-auto bg-gray-200 relative font-sans">
                <div className="absolute w-full flex justify-center ">
                    <img className="cursor-auto py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
                </div>
                <div className="flex flex-row w-full">
                    <div
                        className={`h-page-nav ${activeButton ? 'w-[10vw]' : 'w-[25vw]'} ${nextStep ? 'hidden' : 'block'} absolute z-15 left-0 top-[72px]`}>
                        {loaded && <Selection activeButton={activeButton} changeActiveButton={changeActiveButton}/>}
                    </div>

                    <div className={`h-[100vh] w-full mx-auto`}>
                        <Scene/>
                        {loaded && !nextStep && <ActionBar/>}
                    </div>
                    <div className={`h-page-nav ${nextStep ? 'w-[40vw]' : 'w-[30vw]'} absolute z-15 top-[72px] right-0`}>
                        {loaded && <Recap next={nextStep} onclick={setContinue}/>}
                    </div>
                </div>
            </div>
        </>
    );
}
