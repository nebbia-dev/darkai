'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FrameFull({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYFrame01 = useTexture({
            map: 'textures/frame/01/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/frame/01/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/frame/01/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/frame/01/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/frame/01/DefaultMaterial_Mixed_AO.webp',
        });
        propsYFrame01.map.colorSpace = THREE.SRGBColorSpace;
        const propsRFrame01 = useTexture({
            map: 'textures/frame/01/DefaultMaterial_Base_colorRose.webp',
        });
        propsRFrame01.map.colorSpace = THREE.SRGBColorSpace;
        const propsWFrame01 = useTexture({
            map: 'textures/frame/01/DefaultMaterial_Base_colorWhite.webp',
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
                        : ''}
            normalMap={color !== 'base' ? propsYFrame01.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYFrame01.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYFrame01.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYFrame01.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }