'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

export default function BarIlsdxL({envMap, color}) {

        const propsYBar02 = useTexture({
            map: 'textures/bar/02/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/bar/02/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/bar/02/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/bar/02/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/bar/02/DefaultMaterial_Mixed_AO.webp',
        });
        propsYBar02.map.colorSpace = THREE.SRGBColorSpace;
        const propsRBar02 = useTexture({
            map: 'textures/bar/02/DefaultMaterial_Base_colorRose.webp',
        });
        propsRBar02.map.colorSpace = THREE.SRGBColorSpace;
        const propsWBar02 = useTexture({
            map: 'textures/bar/02/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWBar02.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYBar02.map
                : color === 'rose'
                    ? propsRBar02.map
                    : color === 'white'
                        ? propsWBar02.map
                        : ''}
            normalMap={color !== 'base' ? propsYBar02.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYBar02.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYBar02.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYBar02.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }