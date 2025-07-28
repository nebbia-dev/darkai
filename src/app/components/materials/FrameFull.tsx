'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FrameFull({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYFrame01 = useTexture({
            map: 'textures/Giallo.webp',
            normalMap: 'textures/frame/all/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/frame/all/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/frame/all/DefaultMaterial_Roughness.webp',
            // aoMap: 'textures/frame/all/DefaultMaterial_Mixed_AO.webp',
        });
        propsYFrame01.map.colorSpace = THREE.SRGBColorSpace;
        const propsRFrame01 = useTexture({
            map: 'textures/Rosa.webp',
        });
        propsRFrame01.map.colorSpace = THREE.SRGBColorSpace;
        const propsWFrame01 = useTexture({
            map: 'textures/Bianco.webp',
        });
        propsWFrame01.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYFrame01.map
                : color === 'rose'
                    ? propsRFrame01.map
                    : color === 'white'
                        ? propsWFrame01.map
                        : undefined}
            normalMap={color !== 'base' ? propsYFrame01.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYFrame01.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYFrame01.roughnessMap : undefined}
            // aoMap = {color !== 'base' ? propsYFrame01.aoMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }