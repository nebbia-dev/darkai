'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FullMaterial({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYGoldFull = useTexture({
            map: 'textures/Giallo.webp',
            normalMap: 'textures/full/all/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/full/all/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/full/all/DefaultMaterial_Roughness.webp',
            // aoMap: 'textures/full/DefaultMaterial_Mixed_AO.webp',
        });
        propsYGoldFull.map.colorSpace = THREE.SRGBColorSpace;
        const propsRGoldFull = useTexture({
            map: 'textures/Rosa.webp',
        });
        propsRGoldFull.map.colorSpace = THREE.SRGBColorSpace;
        const propsWGoldFull = useTexture({
            map: 'textures/Bianco.webp',
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
                        : undefined}
            normalMap={color !== 'base' ? propsYGoldFull.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYGoldFull.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYGoldFull.roughnessMap : undefined}
            // aoMap = {color !== 'base' ? propsYGoldFull.aoMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }