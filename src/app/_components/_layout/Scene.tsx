'use client'
import {Canvas} from '@react-three/fiber';
import Configurator from "@/app/_components/_layout/Configurator";
import React} from "react";
import {useTeethStore} from "@/app/_stores/teeth";

export default function Scene() {
    const loaded = useTeethStore((state) => state.loaded);

    return (
        <>
            <div
                id="loader"
                className={`${loaded ? 'opacity-0' : 'opacity-100'} transition duration-1500 w-[100vw] h-[100vh] top-[-72px] flex justify-center items-center absolute z-30 bg-black`}>
                <div
                    className={`${loaded ? 'opacity-0' : 'opacity-100'} transition duration-1000 flex flex-col justify-center items-center`}>
                    <h1 className="font-bold text-gray-50 mx-auto text-4xl mb-10">DARKAI</h1>
                    {/*<img className="mb-16 w-[132px]" src="/darkai_white.webp" alt="darkai logo"/>*/}
                    <p className="text-gray-50 mx-auto text-lg mb-8">
                        the world's first dental jewelry design interface
                    </p>
                    <span className="loader mb-8 inline-block mx-auto"></span>
                </div>
            </div>
            <Canvas camera={{fov: 20, near: 0.1, far: 200, position: [0, 3, 27]}} dpr={[1, 2]} frameloop="demand">
                <Configurator/>
            </Canvas>
        </>
    );
}