'use client'
import {Canvas} from '@react-three/fiber';
import Configurator from "@/app/components/Configurator";

export default function Scene() {

    return (
        <Canvas camera={{fov:20, near:0.1, far:200, position: [6,6,12]}} dpr={[1,2]} >
            <Configurator/>
        </Canvas>
    );
}