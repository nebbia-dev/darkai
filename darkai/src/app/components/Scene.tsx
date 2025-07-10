'use client'
import {Canvas} from '@react-three/fiber';
import Configurator from "@/app/components/Configurator";
import {Suspense, useEffect} from "react";
import Loading from "@/app/components/Loading";
import {useTeethStore} from "@/app/stores/teeth";

export default function Scene() {

    const setLoaded = useTeethStore((state) => state.setLoaded);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 1000);
    }, []);

    return (
        <>
            {/*<Suspense fallback={<Loading/>}>*/}
                <Canvas camera={{fov:20, near:0.1, far:200, position: [0,3,20]}} dpr={[1,2]}>
                    <Configurator/>
                </Canvas>
            {/*</Suspense>*/}

        </>
    );
}