import * as THREE from 'three';
import {useFBX, useTexture} from "@react-three/drei";
import {useEffect} from "react";

export default function Dentiera({envMap}) {
    const fbx = useFBX('/models/Dentiera.fbx');
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

    return <primitive object={fbx}/>
}