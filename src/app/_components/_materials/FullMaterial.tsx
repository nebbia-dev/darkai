'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/_stores/teeth";

export default function FullMaterial({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYGoldFull = useTexture({
            map: 'textures/Giallo.webp',
            // normalMap: 'textures/full/all/DefaultMaterial_Normal.webp',
            // metalnessMap: 'textures/full/all/DefaultMaterial_Metallic.webp',
            // roughnessMap: 'textures/full/all/DefaultMaterial_Roughness.webp',
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

        const propsBGoldFull = useTexture({
            map: 'textures/Nero.webp',
        });
        propsBGoldFull.map.colorSpace = THREE.SRGBColorSpace;

        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYGoldFull.map
                : color === 'rose'
                    ? propsRGoldFull.map
                    : color === 'white'
                        ? propsWGoldFull.map
                        : color === 'black'
                            ? propsBGoldFull.map
                            : undefined}
            // normalMap={color !== 'base' ? propsYGoldFull.normalMap : undefined}
            // metalnessMap = {color !== 'base' ? propsYGoldFull.metalnessMap : undefined}
            // roughnessMap = {color !== 'base' ? propsYGoldFull.roughnessMap : undefined}
            // aoMap = {color !== 'base' ? propsYGoldFull.aoMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.1 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }