import {Tooltip} from "@mui/material";
import {Info} from "@/app/_components/_icons/Info";
import React, {useEffect, useRef, useState} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {InfoMobile} from "@/app/_components/_icons/InfoMobile";

const TUTORIAL_VIDEO_STEPS = 5;
const TUTORIAL_FADE_DURATION = 250;

export default function Tutorial({activeButton}:{activeButton: string|undefined}) {
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const innerWidth = useTeethStore((state:State) => state.innerWidth);

    const [showManual, setShowManual] = useState<boolean>(false);
    const [videoStep, setVideoStep] = useState<number>(1);
    const [showWhiteOverlay, setShowWhiteOverlay] = useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const transitionTimeouts = useRef<number[]>([]);
    const setActiveButton = useTeethStore((state: State) => state.setActiveButton);
    const setActiveSubButton = useTeethStore((state: State) => state.setActiveSubButton);

    function clearTransitionTimeouts() {
        transitionTimeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
        transitionTimeouts.current = [];
    }

    function resetTutorial() {
        clearTransitionTimeouts();
        setShowWhiteOverlay(false);
        setIsTransitioning(false);
        setVideoStep(1);
    }

    function openTutorial() {
        setShowManual((prev) => !prev);
        resetTutorial();
        setActiveButton(undefined);
        setActiveSubButton(undefined);
    }

    function changeStep(direction: 'next' | 'prev') {
        if (isTransitioning) {
            return;
        }

        const nextStep = direction === 'next'
            ? (videoStep === TUTORIAL_VIDEO_STEPS ? 1 : videoStep + 1)
            : (videoStep === 1 ? TUTORIAL_VIDEO_STEPS : videoStep - 1);

        setIsTransitioning(true);
        setShowWhiteOverlay(true);

        const swapTimeout = window.setTimeout(() => {
            setVideoStep(nextStep);
        }, TUTORIAL_FADE_DURATION);

        transitionTimeouts.current.push(swapTimeout);
    }

    function handleVideoLoadedData() {
        if (!isTransitioning) {
            return;
        }

        const startFadeOutTimeout = window.setTimeout(() => {
            setShowWhiteOverlay(false);

            const endTransitionTimeout = window.setTimeout(() => {
                setIsTransitioning(false);
            }, TUTORIAL_FADE_DURATION);

            transitionTimeouts.current.push(endTransitionTimeout);
        }, 40);

        transitionTimeouts.current.push(startFadeOutTimeout);
    }

    useEffect(() => {
        if(activeButton) {
            setShowManual(false);
            resetTutorial();
        }
    }, [activeButton, activeTooth])

    useEffect(() => {
        return () => {
            clearTransitionTimeouts();
        };
    }, []);

    return (
        <div className="relative flex gap-4">
            <Tooltip title="Navigation info">
                <button className="cursor-pointer">
                    {innerWidth >= 1024
                        ? <Info className='w-6 h-6' onClick={openTutorial}/>
                        : <InfoMobile className='w-10 h-10' onClick={openTutorial}/>
                    }
                </button>
            </Tooltip>
            {showManual &&
                <div
                    className={`top-[64px] left-[-144%] w-[90dvw] lg:left-[15%] lg:top-[-150%] lg:w-[500px] absolute flex flex-col border border-gray-950/[33%] text-sm bg-gray-100 rounded z-50`}>
                    <button
                        type="button"
                        className="flex items-center justify-center bg-gray-50 border rounded-full py-1 px-1.5 absolute top-[50%] right-[2%] z-60 cursor-pointer"
                        onClick={() => changeStep('next')}>&rarr;
                    </button>
                    <div className="relative">
                        <video
                            key={videoStep}
                            src={`/video/step${videoStep}.mp4`}
                            className="rounded h-[280px]"
                            autoPlay={true}
                            loop={true}
                            onLoadedData={handleVideoLoadedData}
                        ></video>
                        <div
                            className={`h-[280px] pointer-events-none absolute inset-0 rounded bg-gray-100 transition-opacity duration-500 ${showWhiteOverlay ? 'opacity-100' : 'opacity-0'}`}
                        ></div>
                    </div>
                    <button
                        type="button"
                        className="flex items-center justify-center bg-gray-50 border rounded-full py-1 px-1.5 absolute top-[50%] left-[2%] z-60 cursor-pointer"
                        onClick={() => changeStep('prev')}>&larr;
                    </button>
                </div>
            }
        </div>
    )
}
