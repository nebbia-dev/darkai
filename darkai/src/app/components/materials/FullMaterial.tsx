'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FullMaterial({color}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYGoldFull = useTexture({
            map: 'textures/full/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/full/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/full/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/full/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/full/DefaultMaterial_Mixed_AO.webp',
        });
        propsYGoldFull.map.colorSpace = THREE.SRGBColorSpace;
        const propsRGoldFull = useTexture({
            map: 'textures/full/DefaultMaterial_Base_colorRose.webp',
        });
        propsRGoldFull.map.colorSpace = THREE.SRGBColorSpace;
        const propsWGoldFull = useTexture({
            map: 'textures/full/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWGoldFull.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYGoldFull.map
                : color === 'rose'
                    ? propsRGoldFull.map
                    : color === 'white'
                        ? propsWGoldFull.map
                        : ''}
            normalMap={color !== 'base' ? propsYGoldFull.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYGoldFull.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYGoldFull.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYGoldFull.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'white'}
            transparent={color === 'base'}
            opacity={color !== 'base' ? 1 : 0}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }