'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

export default function Bar01({envMap, color}) {

        const propsYBar01 = useTexture({
            map: 'textures/bar/01/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/bar/01/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/bar/01/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/bar/01/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/bar/01/DefaultMaterial_Mixed_AO.webp',
        });
        propsYBar01.map.colorSpace = THREE.SRGBColorSpace;
        const propsRBar01 = useTexture({
            map: 'textures/bar/01/DefaultMaterial_Base_colorRose.webp',
        });
        propsRBar01.map.colorSpace = THREE.SRGBColorSpace;
        const propsWBar01 = useTexture({
            map: 'textures/bar/01/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWBar01.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYBar01.map
                : color === 'rose'
                    ? propsRBar01.map
                    : color === 'white'
                        ? propsWBar01.map
                        : ''}
            normalMap={color !== 'base' ? propsYBar01.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYBar01.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYBar01.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYBar01.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }