'use client'
import {Canvas} from '@react-three/fiber';
import {Environment, OrbitControls} from '@react-three/drei';
import Dentiera from "@/app/components/Dentiera";

export default function Scene() {
    return (
        <Canvas camera={{fov:20, near:0.1, far:200, position: [6,6,12]}} dpr={[1,2]}>
            <OrbitControls/>
            <Environment
                background={false} // can be true, false or "only" (which only sets the background) (default: false)
                backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
                backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
                backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
                environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
                environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
                files="envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"
                path="/"
                scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
                encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
            />
            <Dentiera/>
        </Canvas>
    );
}