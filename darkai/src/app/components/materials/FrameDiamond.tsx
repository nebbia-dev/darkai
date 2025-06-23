'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

export default function FrameDiamond({envMap, color}) {

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
                        : ''}
            normalMap={color !== 'base' ? propsYFrameDiamond.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYFrameDiamond.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYFrameDiamond.roughnessMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }