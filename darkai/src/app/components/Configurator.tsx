'use client'
import {OrbitControls, useEnvironment, useFBX} from '@react-three/drei';
import Dentiera from "@/app/components/Dentiera";
import IlsDx from "@/app/components/IlsDx";
import IliDx from "@/app/components/IliDx";
import {useMemo} from "react";
import {ChosenOptionsProvider} from "@/app/contexts/ChosenOptionsContext";

export default function Configurator() {

    const envMap = useEnvironment({files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"})

    const teeth = useMemo(() => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa.fbx')
        console.log('dentifbx 1');
        return {
            ilsdx: fbx.children[0].children[0].geometry,
            ilidx: fbx.children[0].children[1].geometry,
        }
    }, []);

    console.log('envMap');
    return (
        <>
            <OrbitControls/>
            <ChosenOptionsProvider>
                <IlsDx envMap={envMap} fbx={teeth}/>
                <IliDx envMap={envMap} fbx={teeth}/>
            </ChosenOptionsProvider>
            <Dentiera envMap={envMap}/>
        </>
    );
}