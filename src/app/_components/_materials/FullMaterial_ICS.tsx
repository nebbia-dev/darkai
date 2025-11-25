'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/_stores/teeth";

export default function FullMaterial_ICS({color, finish} : {color: string, finish:string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const diamondCut = useTexture({
            map: 'textures/finish/Albedo_Diamond_Cut_ICS.webp',
            normalMap: 'textures/finish/Normal_Diamond_Cut_ICS.webp',
        });

    diamondCut.map.colorSpace = THREE.SRGBColorSpace;
    diamondCut.map.wrapS = diamondCut.map.wrapT = THREE.RepeatWrapping;
    diamondCut.normalMap.wrapS = diamondCut.normalMap.wrapT = THREE.RepeatWrapping;
    diamondCut.map.repeat.set(120,120);
    diamondCut.normalMap.repeat.set(120,120);

        return (<meshStandardMaterial
            map={finish === 'diamond_cut' ? diamondCut.map : undefined}
            normalMap={finish === 'diamond_cut' ? diamondCut.normalMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {(color !== 'base' && finish === 'polished') || (color === 'black' && finish === 'diamond_cut')
                ? 0.1
                : color !== 'base' && finish === 'diamond_cut'
                    ? 0.25
                    : 0.5}
            envMap = {envMap}
            color={color === 'gold'
                ? '#FFE39A'
                : color === 'rose'
                    ? '#E8B1A6'
                    : color === 'white'
                        ? 'white'
                        : color === 'black'
                            ? '#2B2D30'
                            : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }