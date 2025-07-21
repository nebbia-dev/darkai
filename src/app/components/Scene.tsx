'use client'
import {Canvas} from '@react-three/fiber';
import Configurator from "@/app/components/Configurator";
import {useEffect} from "react";
import {useTeethStore} from "@/app/stores/teeth";
import State from "@/app/types/State";

export default function Scene() {

    const setLoaded = useTeethStore((state: State) => state.setLoaded);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 1000);
    }, []);

    return (
        <>
            <Canvas camera={{fov:20, near:0.1, far:200, position: [0,3,20]}} dpr={[1,2]} frameloop="demand">
                <Configurator/>
            </Canvas>
        </>
    );
}