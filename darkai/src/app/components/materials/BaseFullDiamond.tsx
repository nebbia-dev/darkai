'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function BaseFullDiamond({color}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYBaseFullDiamond = useTexture({
            map: 'textures/diamondFull/frameDiamond/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/diamondFull/frameDiamond/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/diamondFull/frameDiamond/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/diamondFull/frameDiamond/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/diamondFull/frameDiamond/DefaultMaterial_Mixed_AO.webp',
        });
        propsYBaseFullDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsRBaseFullDiamond = useTexture({
            map: 'textures/diamondFull/frameDiamond/DefaultMaterial_Base_colorRose.webp',
        });
        propsRBaseFullDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsWBaseFullDiamond = useTexture({
            map: 'textures/diamondFull/frameDiamond/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWBaseFullDiamond.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYBaseFullDiamond.map
                : color === 'rose'
                    ? propsRBaseFullDiamond.map
                    : color === 'white'
                        ? propsWBaseFullDiamond.map
                        : ''}
            normalMap={color !== 'base' ? propsYBaseFullDiamond.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYBaseFullDiamond.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYBaseFullDiamond.roughnessMap : ''}
            aoMap = {color !== 'base' ? propsYBaseFullDiamond.aoMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }