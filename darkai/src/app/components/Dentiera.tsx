import * as THREE from 'three';
import {useFBX, useTexture} from "@react-three/drei";
import {useMemo} from "react";
import {useTeethStore} from "@/app/stores/teeth";

export default function Dentiera() {
    const fbx = useMemo(() => useFBX('/models/Dentiera.fbx'), []);
    const envMap = useTeethStore((state) => state.envMap);
    const props = useTexture({
        map: 'textures/dentieraBase/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/dentieraBase/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/dentieraBase/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/dentieraBase/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/dentieraBase/DefaultMaterial_Mixed_AO.webp',
    });

    const dentieraMaterial = new THREE.MeshStandardMaterial({
        map: props.map,
        normalMap: props.normalMap,
        metalnessMap: props.metalnessMap,
        roughnessMap: props.roughnessMap,
        aoMap: props.aoMap,
        metalness: 0.5,
        roughness: 0.7,
        envMap: envMap
    });
    fbx.children[0].material = dentieraMaterial;
    console.log('dentiera');
    return <primitive object={fbx}/>
}