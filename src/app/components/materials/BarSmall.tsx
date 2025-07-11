'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function BarSmall({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYBar03 = useTexture({
            map: 'textures/bar/03/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/bar/03/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/bar/03/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/bar/03/DefaultMaterial_Roughness.webp',
            aoMap: 'textures/bar/03/DefaultMaterial_Mixed_AO.webp',
        });
        propsYBar03.map.colorSpace = THREE.SRGBColorSpace;
        const propsRBar03 = useTexture({
            map: 'textures/bar/03/DefaultMaterial_Base_colorRose.webp',
        });
        propsRBar03.map.colorSpace = THREE.SRGBColorSpace;
        const propsWBar03 = useTexture({
            map: 'textures/bar/03/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWBar03.map.colorSpace = THREE.SRGBColorSpace;
        console.log(color);
        return (<meshStandardMaterial
            map={color === 'gold'
                ? propsYBar03.map
                : color === 'rose'
                    ? propsRBar03.map
                    : color === 'white'
                        ? propsWBar03.map
                        : undefined}
            normalMap={color !== 'base' ? propsYBar03.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYBar03.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYBar03.roughnessMap : undefined}
            aoMap = {color !== 'base' ? propsYBar03.aoMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }