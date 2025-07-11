'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function BarFull({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYBarFull = useTexture({
            map: 'textures/bar/full/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/bar/full/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/bar/full/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/bar/full/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/bar/full/DefaultMaterial_Mixed_AO.webp',
        });
        propsYBarFull.map.colorSpace = THREE.SRGBColorSpace;
        const propsRBarFull = useTexture({
            map: 'textures/bar/full/DefaultMaterial_Base_colorRose.webp',
        });
        propsRBarFull.map.colorSpace = THREE.SRGBColorSpace;
        const propsWBarFull = useTexture({
            map: 'textures/bar/full/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWBarFull.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYBarFull.map
                : color === 'rose'
                    ? propsRBarFull.map
                    : color === 'white'
                        ? propsWBarFull.map
                        : undefined}
            normalMap={color !== 'base' ? propsYBarFull.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYBarFull.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYBarFull.roughnessMap : undefined}
            aoMap = {color !== 'base' ? propsYBarFull.aoMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }