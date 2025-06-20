'use client'
import {OrbitControls, useEnvironment, useFBX} from '@react-three/drei';
import Dentiera from "@/app/components/Dentiera";
import {useMemo} from "react";
import IlsDx from "@/app/components/IlsDx";
import IliDx from "@/app/components/IliDx";

export default function Configurator() {
    const envMap = useEnvironment({files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"})
    const teeth = useMemo(() => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa_180_Phong.fbx');
        console.log(fbx);
        return {
            ilsdx: fbx.children[0].children[0].geometry,
            ilidx: fbx.children[0].children[1].geometry,
        }
    }, []);
    console.log('envMap');
    return (
        <>
            <OrbitControls/>
            <IlsDx envMap={envMap} fbx={teeth}/>
            <IliDx envMap={envMap} fbx={teeth}/>
            <Dentiera envMap={envMap}/>
        </>
    );
}