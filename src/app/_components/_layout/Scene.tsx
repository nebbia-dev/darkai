'use client'
import {Canvas} from '@react-three/fiber';
import Configurator from "@/app/_components/_layout/Configurator";
import React, {Suspense} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import LoadedMaterials from "@/app/_components/_layout/LoadedMaterials";
import Loading from "@/app/_components/_layout/Loading";
import {Perf} from "r3f-perf";

export default function Scene() {
    const loaded = useTeethStore((state) => state.loaded);
    const innerWidth = useTeethStore((state) => state.innerWidth);

    return (
        <>
            <div
                id="loader"
                className={`${loaded ? 'opacity-0' : 'opacity-100'} transition duration-1500 w-[100vw] px-12 h-[100dvh] flex justify-center items-center absolute z-30 bg-black`}>
                <div
                    className={`${loaded ? 'opacity-0' : 'opacity-100'} transition duration-1000 flex flex-col justify-center items-center`}>
                    <h1 className="font-bold text-gray-50 mx-auto text-4xl mb-4">DARKAI</h1>
                    <p className="text-gray-50 text-center text-lg mb-10">
                        the world's first dental jewelry design interface
                    </p>
                    <span className="loader mb-8 inline-block mx-auto"></span>
                </div>
            </div>

            <Canvas camera={{fov: 20, near: 0.1, far: 100, position: [0, 3, (innerWidth >= 1024 ? 27 : 42)]}} dpr={[1, 2]} frameloop="demand">
                {/*<Perf/>*/}
                <Suspense fallback={<Loading/>}>
                    <Configurator/>
                </Suspense>
                <Suspense fallback={null}>
                    <LoadedMaterials/>
                </Suspense>
            </Canvas>
        </>
    );
}