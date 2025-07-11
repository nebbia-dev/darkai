'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FrameDiamond({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYFrameDiamond = useTexture({
            map: 'textures/frame/diamond/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/frame/diamond/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/frame/diamond/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/frame/diamond/DefaultMaterial_Roughness.webp',
        });
        propsYFrameDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsRFrameDiamond = useTexture({
            map: 'textures/frame/diamond/DefaultMaterial_Base_colorRose.webp',
        });
        propsRFrameDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsWFrameDiamond = useTexture({
            map: 'textures/frame/diamond/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWFrameDiamond.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYFrameDiamond.map
                : color === 'rose'
                    ? propsRFrameDiamond.map
                    : color === 'white'
                        ? propsWFrameDiamond.map
                        : undefined}
            normalMap={color !== 'base' ? propsYFrameDiamond.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYFrameDiamond.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYFrameDiamond.roughnessMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }