'use client'
import {OrbitControls, useEnvironment} from '@react-three/drei';
import Dentiera from "@/app/components/Dentiera";
import Teeth from "@/app/components/Teeth";

export default function Configurator() {

    const envMap = useEnvironment({files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"})
    console.log('envMap');
    return (
        <>
            <OrbitControls/>
            <Teeth envMap={envMap}/>
            <Dentiera envMap={envMap}/>
        </>
    );
}