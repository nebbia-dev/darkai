'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FrameCisx({color}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYFrame04 = useTexture({
            map: 'textures/frame/04/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/frame/04/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/frame/04/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/frame/04/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/frame/04/DefaultMaterial_Mixed_AO.webp',
        });
        propsYFrame04.map.colorSpace = THREE.SRGBColorSpace;
        const propsRFrame04 = useTexture({
            map: 'textures/frame/04/DefaultMaterial_Base_colorRose.webp',
        });
        propsRFrame04.map.colorSpace = THREE.SRGBColorSpace;
        const propsWFrame04 = useTexture({
            map: 'textures/frame/04/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWFrame04.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYFrame04.map
                : color === 'rose'
                    ? propsRFrame04.map
                    : color === 'white'
                        ? propsWFrame04.map
                        : ''}
            normalMap={color !== 'base' ? propsYFrame04.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYFrame04.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYFrame04.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYFrame04.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }