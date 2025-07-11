'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FullDiamond({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYDiamondFull = useTexture({
            map: 'textures/diamondFull/Difuse_Diamanti.webp',
            normalMap: 'textures/diamondFull/Normal_Diamanti.webp',
            metalnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
            roughnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
        });

        propsYDiamondFull.map.colorSpace = THREE.SRGBColorSpace;

        propsYDiamondFull.map.wrapS = propsYDiamondFull.map.wrapT = THREE.RepeatWrapping;
        propsYDiamondFull.map.repeat.set(6, 6);
        propsYDiamondFull.normalMap.wrapS = propsYDiamondFull.normalMap.wrapT = THREE.RepeatWrapping;
        propsYDiamondFull.normalMap.repeat.set(6, 6);
        propsYDiamondFull.metalnessMap.wrapS = propsYDiamondFull.metalnessMap.wrapT = THREE.RepeatWrapping;
        propsYDiamondFull.metalnessMap.repeat.set(6, 6);

        const propsRDiamondFull = useTexture({
            map: 'textures/diamondFull/Difuse_Diamanti_Rosa.webp',
        });

        propsRDiamondFull.map.colorSpace = THREE.SRGBColorSpace;

        propsRDiamondFull.map.wrapS = propsRDiamondFull.map.wrapT = THREE.RepeatWrapping;
        propsRDiamondFull.map.repeat.set(6, 6);

        const propsWDiamondFull = useTexture({
            map: 'textures/diamondFull/Metalness_Diamanti.webp',
        });

        propsWDiamondFull.map.colorSpace = THREE.SRGBColorSpace;

        propsWDiamondFull.map.wrapS = propsWDiamondFull.map.wrapT = THREE.RepeatWrapping;
        propsWDiamondFull.map.repeat.set(6, 6);

        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYDiamondFull.map
                : color === 'rose'
                    ? propsRDiamondFull.map
                    : color === 'white'
                        ? propsWDiamondFull.map
                        : ''}
            normalMap={color !== 'base' ? propsYDiamondFull.normalMap : ''}
            metalnessMap = {color !== 'base' ? propsYDiamondFull.metalnessMap : ''}
            roughnessMap = {color !== 'base' ? propsYDiamondFull.roughnessMap : ''}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0 : 1}
            envMap = {envMap}
            color={color !== 'base' ? '' : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }