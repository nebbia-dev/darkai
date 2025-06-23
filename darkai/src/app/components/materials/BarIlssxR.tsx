'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

export default function BarIlssxR({envMap, color}) {

        const propsYBar04 = useTexture({
            map: 'textures/bar/04/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/bar/04/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/bar/04/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/bar/04/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/bar/04/DefaultMaterial_Mixed_AO.webp',
        });
        propsYBar04.map.colorSpace = THREE.SRGBColorSpace;
        const propsRBar04 = useTexture({
            map: 'textures/bar/04/DefaultMaterial_Base_colorRose.webp',
        });
        propsRBar04.map.colorSpace = THREE.SRGBColorSpace;
        const propsWBar04 = useTexture({
            map: 'textures/bar/04/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWBar04.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYBar04.map
                : color === 'rose'
                    ? propsRBar04.map
                    : color === 'white'
                        ? propsWBar04.map
                        : ''}
            normalMap={color !== 'base' ? propsYBar04.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYBar04.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYBar04.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYBar04.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }