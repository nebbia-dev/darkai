'use client'
import Scene from "@/app/_components/_layout/Scene";
import Selection from "@/app/_components/_layout/Selection";
import React, {useEffect, useState} from "react";
import ActionBar from "@/app/_components/_elements/_buttons/ActionBar";
import {useTeethStore} from "@/app/_stores/teeth";
import Recap from "@/app/_components/_layout/Recap";
import {State} from "@/app/_types/State";

export default function Config() {

    const nextStep = useTeethStore((state) => state.nextStep);
    const setNextStep = useTeethStore((state) => state.setNextStep);
    const total = useTeethStore((state:State) => state.total);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);
    const loaded = useTeethStore((state) => state.loaded);
    const activeButton = useTeethStore((state) => state.activeButton);
    const changeActiveButton = useTeethStore((state) => state.setActiveButton);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showRecap, setShowRecap] = useState<boolean>(false);
    const setInnerWidth = useTeethStore((state) => state.setInnerWidth);

    useEffect(() => {
        updateInnerWidth();
        window.addEventListener('resize', updateInnerWidth);
        return () => window.removeEventListener('resize', updateInnerWidth);

    }, [])

    function setContinue() {
        setNextStep(!nextStep);
        setActive(undefined);
    }

    function updateInnerWidth() {
        setInnerWidth(window.innerWidth);
        if(window.innerWidth >= 1024) {
            setShowMenu(true);
            setShowRecap(true);
        } else {
            setShowMenu(false);
            setShowRecap(false);
        }
    }

    return (
        <>
            <div className="flex flex-col w-[100vw] mx-auto bg-gray-200 relative font-sans">
                <div className="absolute w-full flex justify-center ">
                    <img className="cursor-auto py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
                </div>
                {innerWidth < 1024 &&
                    <div
                    className="z-100 absolute top-[76px] left-[50%] translate-x-[-50%] w-[90%] flex items-center justify-between ">
                        <button onClick={() => setShowMenu(prev => !prev)} type="button"
                                className="bg-gray-50 border-1 rounded-full w-10 h-10">M
                        </button>
                        <button onClick={() => setShowRecap(prev => !prev)} type="button" className="bg-gray-50 border-1 rounded-full w-10 h-10">R</button>
                    </div>
                }
                <div className="flex flex-row w-full">
                    {innerWidth < 1024 && showMenu && <div className="w-screen h-screen absolute z-15 bg-gray-50/75"></div>}
                    <div
                        className={`h-screen lg:h-page-nav ${activeButton ? 'w-[10vw]' : innerWidth < 1024 ? 'w-full' : 'w-[25vw]'} ${nextStep || !showMenu ? 'hidden' : 'block'} absolute z-20 left-0 lg:top-[72px]`}>
                        {loaded && <Selection activeButton={activeButton} changeActiveButton={changeActiveButton}/>}
                    </div>

                    <div className={`h-[100vh] w-full mx-auto relative`}>
                        <Scene/>
                        {loaded && !nextStep && <ActionBar/>}
                        {loaded && innerWidth < 1024 &&
                            <div
                                className="absolute bottom-10 left-[50%] translate-x-[-50%] border-1 rounded-3xl w-[90%] bg-gray-50 pl-6 pr-2 py-2 flex items-center justify-between mt-4">
                                <div>
                                    <h3 className="font-semibold inline">Price: </h3>
                                    <span>{new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(total)}</span>
                                </div>
                                <button className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full cursor-pointer"
                                        onClick={setContinue}>Continue &rarr;</button>
                            </div>
                        }
                    </div>
                    <div className={`h-page-nav ${nextStep ? 'w-[40vw]' : 'w-[30vw]'} ${!showRecap ? 'hidden' : 'block'} absolute z-15 top-[72px] right-0`}>
                        {loaded && <Recap next={nextStep} onclick={setContinue}/>}
                    </div>
                </div>
            </div>
        </>
    );
}
