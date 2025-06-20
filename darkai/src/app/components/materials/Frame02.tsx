'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

export default function Frame02({envMap, color}) {

        const propsYFrame02 = useTexture({
            map: 'textures/frame/02/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/frame/02/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/frame/02/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/frame/02/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/frame/02/DefaultMaterial_Mixed_AO.webp',
        });
        propsYFrame02.map.colorSpace = THREE.SRGBColorSpace;
        const propsRFrame02 = useTexture({
            map: 'textures/frame/02/DefaultMaterial_Base_colorRose.webp',
        });
        propsRFrame02.map.colorSpace = THREE.SRGBColorSpace;
        const propsWFrame02 = useTexture({
            map: 'textures/frame/02/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWFrame02.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYFrame02.map
                : color === 'rose'
                    ? propsRFrame02.map
                    : color === 'white'
                        ? propsWFrame02.map
                        : ''}
            normalMap={color !== 'base' ? propsYFrame02.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYFrame02.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYFrame02.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYFrame02.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }