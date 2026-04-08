'use client'
import Scene from "@/app/_components/_layout/Scene";
import Selection from "@/app/_components/_layout/Selection";
import React, {useEffect, useState} from "react";
import ActionBar from "@/app/_components/_elements/_buttons/ActionBar";
import {useTeethStore} from "@/app/_stores/teeth";
import Recap from "@/app/_components/_layout/Recap";
import {State} from "@/app/_types/State";
import { Close, Menu } from "@mui/icons-material";
import {Box} from "@/app/_components/_icons/Box";
import isTouchDevice from "@/app/_helpers/_checkers/isTouchDevice";

export default function Config() {

    const nextStep = useTeethStore((state) => state.nextStep);
    const setNextStep = useTeethStore((state) => state.setNextStep);
    const total = useTeethStore((state:State) => state.total);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);
    const loaded = useTeethStore((state) => state.loaded);
    const activeButton = useTeethStore((state) => state.activeButton);
    const activeSubButton = useTeethStore((state) => state.activeSubButton);
    const changeActiveButton = useTeethStore((state) => state.setActiveButton);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showRecap, setShowRecap] = useState<boolean>(false);
    const setInnerWidth = useTeethStore((state) => state.setInnerWidth);
    const setInnerHeight = useTeethStore((state) => state.setInnerHeight);
    const takeScreenshot = useTeethStore((state:State) => state.setIsScreenshotNeeded);
    const setIsTouch = useTeethStore((state:State) => state.setIsTouch);
    const history = useTeethStore((state:State) => state.history);
    const packaging = useTeethStore((state: State) => state.packaging);

    useEffect(() => {
        updateInnerSize();
        if(isTouchDevice()) {
            setIsTouch(true)
        }
        window.addEventListener('resize', updateInnerSize);
        window.addEventListener('orientationchange', updateInnerSize);
        window.visualViewport?.addEventListener('resize', updateInnerSize);
        window.visualViewport?.addEventListener('scroll', updateInnerSize);

        return () => {
            window.removeEventListener('resize', updateInnerSize);
            window.removeEventListener('orientationchange', updateInnerSize);
            window.visualViewport?.removeEventListener('resize', updateInnerSize);
            window.visualViewport?.removeEventListener('scroll', updateInnerSize);
        };
    }, [])

    useEffect(() => {
        if(activeSubButton !== 'text') {
            if (innerWidth >= 1024) {
                setShowMenu(true);
                setShowRecap(true);
            } else if (innerWidth < 1024) {
                setShowMenu(false);
                setShowRecap(false);
            }
        }
    }, [innerWidth])

    function setContinue() {
        takeScreenshot(true);
        setNextStep(!nextStep);
        setActive(undefined);
    }

    function updateInnerSize() {
        const viewport = window.visualViewport;

        setInnerWidth(Math.round(viewport?.width ?? window.innerWidth));
        setInnerHeight(Math.round(viewport?.height ?? window.innerHeight));
    }

    function closeAllUIs() {
        setShowMenu(false);
        setShowRecap(false);
    }

    function toggleUI(ui:"menu"|"recap") {
        switch(ui) {
            case "menu":
                setShowMenu(prev => !prev);
                if(showRecap) {
                    setShowRecap(false)
                }
                break;
            case "recap":
                setShowRecap(prev => !prev);
                if(showMenu) {
                    setShowMenu(false)
                }
                break;
        }
    }

    return (
            <div className="flex flex-col w-[100vw] mx-auto bg-gray-200 relative font-sans max-h-[100dvh]">
                <div className="absolute w-full flex justify-center z-16">
                    <img className="cursor-auto py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
                </div>
                {loaded && innerWidth < 1024 && !nextStep &&
                    <div
                        className="z-29 absolute top-[70px] left-[50%] translate-x-[-50%] w-[90%] flex items-center justify-between">
                        <button onClick={() => toggleUI('menu')} type="button"
                                className="bg-gray-50 border-1 rounded-full w-10 h-10 flex items-center justify-center">
                            <Box className="w-8 h-8 p-1"/>
                        </button>
                        {(showMenu || showRecap) &&
                            <button onClick={closeAllUIs} type="button"
                                 className="bg-gray-50 border-1 rounded-full w-10 h-10">
                                <Close className="mb-[1px]"/>
                            </button>
                        }
                        <button onClick={() => toggleUI('recap')} type="button"
                                className="bg-gray-50 border-1 rounded-full w-10 h-10">
                            <Menu className="mb-[1px]"/>
                        </button>
                    </div>
                }
                <div className="flex flex-row w-full">
                    {innerWidth < 1024 && (showMenu || showRecap || nextStep) && <div className="w-screen h-[100dvh] absolute z-15 bg-gray-50/75"></div>}
                    <div
                        className={`h-[100dvh] lg:h-page-nav ${activeButton ? 'w-[10vw]' : innerWidth < 1024 ? 'w-full' : 'w-[25vw]'} ${nextStep || !showMenu ? 'hidden' : 'block'} absolute z-20 left-0 lg:top-[72px]`}>
                        {loaded && <Selection activeButton={activeButton} changeActiveButton={changeActiveButton}/>}
                    </div>

                    <div className={`h-[100dvh] w-full mx-auto relative`}>
                        <Scene/>
                        {loaded && !nextStep && <ActionBar/>}
                        {loaded && innerWidth < 1024 && !nextStep &&
                            <div
                                className="absolute z-16 bottom-5 left-[50%] translate-x-[-50%] border-1 rounded-3xl w-[90%] bg-gray-50 pl-6 pr-2 py-2 flex items-center justify-between mt-4">
                                <div>
                                    <h3 className="font-semibold inline">Price: </h3>
                                    <span>{new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(total)}</span>
                                </div>
                                <button disabled={(history.length === 0 || total === 0) && !packaging.premium} className={`rounded-3xl ${(history.length === 0 || total === 0) && !packaging.premium ? 'bg-gray-300' : 'bg-slate-950 cursor-pointer'} text-gray-50 px-5 py-2 h-full`}
                                        onClick={setContinue}>Continue &rarr;</button>
                            </div>
                        }
                    </div>
                    <div className={`lg:h-page-nav h-[100dvh] flex justify-center items-center ${nextStep && innerWidth >= 1024  ? 'w-[40vw]' : innerWidth < 1024 ? 'w-[90vw] mx-auto left-[50%] translate-x-[-50%]' : 'w-[30vw]'} ${!showRecap && !nextStep ? 'hidden' : 'block'} absolute z-15 lg:right-0`}>
                        {loaded && <Recap next={nextStep} onclick={setContinue}/>}
                    </div>
                </div>
            </div>
    );
}
