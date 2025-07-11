'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function BarDiamond({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYBarDiamond = useTexture({
            map: 'textures/bar/diamond/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/bar/diamond/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/bar/diamond/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/bar/diamond/DefaultMaterial_Roughness.webp',
        });
        propsYBarDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsRBarDiamond = useTexture({
            map: 'textures/bar/diamond/DefaultMaterial_Base_colorRose.webp',
        });
        propsRBarDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsWBarDiamond = useTexture({
            map: 'textures/bar/diamond/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWBarDiamond.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYBarDiamond.map
                : color === 'rose'
                    ? propsRBarDiamond.map
                    : color === 'white'
                        ? propsWBarDiamond.map
                        : ''}
            normalMap={color !== 'base' ? propsYBarDiamond.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYBarDiamond.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYBarDiamond.roughnessMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }