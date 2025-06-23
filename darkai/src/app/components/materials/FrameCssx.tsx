'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

export default function FrameCssx({envMap, color}) {

        const propsYFrame03 = useTexture({
            map: 'textures/frame/03/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/frame/03/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/frame/03/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/frame/03/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/frame/03/DefaultMaterial_Mixed_AO.webp',
        });
        propsYFrame03.map.colorSpace = THREE.SRGBColorSpace;
        const propsRFrame03 = useTexture({
            map: 'textures/frame/03/DefaultMaterial_Base_colorRose.webp',
        });
        propsRFrame03.map.colorSpace = THREE.SRGBColorSpace;
        const propsWFrame03 = useTexture({
            map: 'textures/frame/03/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWFrame03.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYFrame03.map
                : color === 'rose'
                    ? propsRFrame03.map
                    : color === 'white'
                        ? propsWFrame03.map
                        : ''}
            normalMap={color !== 'base' ? propsYFrame03.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYFrame03.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYFrame03.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYFrame03.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }