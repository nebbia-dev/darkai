'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/_stores/teeth";

export default function FullMaterial({color, finish} : {color: string, finish:string}) {
    const envMap = useTeethStore((state) => state.envMap);

    // diamond cut texture loading and maps wrapping
    const diamondCut = useTexture({
        map: 'textures/finish/Albedo_Diamond_Cut.webp',
        normalMap: 'textures/finish/Normal_Diamond_Cut.webp',
    });

    diamondCut.map.colorSpace = THREE.SRGBColorSpace;
    diamondCut.map.wrapS = diamondCut.map.wrapT = THREE.RepeatWrapping;
    diamondCut.normalMap.wrapS = diamondCut.normalMap.wrapT = THREE.RepeatWrapping;
    diamondCut.map.repeat.set(200,200);
    diamondCut.normalMap.repeat.set(200,200);

    // hammered texture loading
    const hammeredProps = useTexture({
        normalMap: 'textures/finish/Hammered_DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/finish/Hammered_DefaultMaterial_Metalness.webp',
        roughnessMap: 'textures/finish/Hammered_DefaultMaterial_Roughness.webp',
    });

    const hammeredGold = useTexture({
        map: 'textures/finish/Hammered_DefaultMaterial_Gold.webp',
    });
    hammeredGold.map.colorSpace = THREE.SRGBColorSpace;
    const hammeredWhite = useTexture({
        map: 'textures/finish/Hammered_DefaultMaterial_White.webp',
    });
    hammeredWhite.map.colorSpace = THREE.SRGBColorSpace;
    const hammeredBlack = useTexture({
        map: 'textures/finish/Hammered_DefaultMaterial_Black.webp',
    });
    hammeredBlack.map.colorSpace = THREE.SRGBColorSpace;

    // sprinkles texture loading
    const sprinklesProps = useTexture({
        normalMap: 'textures/finish/Sprinkles_Normal.webp',
    });

    const sprinklesGold = useTexture({
        map: 'textures/finish/Sprinkles_Albedo_Giallo.webp',
    });
    sprinklesGold.map.colorSpace = THREE.SRGBColorSpace;
    const sprinklesWhite = useTexture({
        map: 'textures/finish/Sprinkles_Albedo_Bianco.webp',
    });
    sprinklesWhite.map.colorSpace = THREE.SRGBColorSpace;
    const sprinklesRose = useTexture({
        map: 'textures/finish/Sprinkles_Albedo_Rosa.webp',
    });
    sprinklesRose.map.colorSpace = THREE.SRGBColorSpace;

        return (<meshStandardMaterial
            map={finish === 'diamond_cut'
                ? diamondCut.map
                : finish === 'hammered' && color === 'gold'
                    ? hammeredGold.map
                    : finish === 'hammered' && color === 'white'
                        ? hammeredWhite.map
                        : finish === 'hammered' && color === 'black'
                            ? hammeredBlack.map
                            : finish === 'sprinkles' && color === 'gold'
                                ? sprinklesGold.map
                                : finish === 'sprinkles' && color === 'white'
                                    ? sprinklesWhite.map
                                    : finish === 'sprinkles' && color === 'rose'
                                        ? sprinklesRose.map
                                        : undefined
        }
            normalMap={finish === 'diamond_cut'
                ? diamondCut.normalMap
                : finish === 'hammered'
                    ? hammeredProps.normalMap
                    : finish === 'sprinkles'
                        ? sprinklesProps.normalMap
                        : undefined
        }
            metalnessMap={finish === 'hammered'
                            ? hammeredProps.metalnessMap
                            : undefined
        }
            roughnessMap={finish === 'hammered'
                            ? hammeredProps.roughnessMap
                            : undefined
            }
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {(color !== 'base' && (finish === 'polished' || finish === 'sprinkles')) || (color === 'black' && finish === 'diamond_cut')
                ? 0.1
                : (color !== 'base' && finish === 'diamond_cut')
                    ? 0.25
                    : 0.5}
            envMap = {envMap}
            color={color === 'gold' && finish !== 'hammered' && finish !== 'sprinkles'
                ? '#FFE39A'
                : color === 'rose' && finish !== 'hammered' && finish !== 'sprinkles'
                    ? '#E8B1A6'
                    : color === 'white' || finish === 'hammered' || finish === 'sprinkles'
                        ? 'white'
                        : color === 'black' && finish !== 'hammered'
                            ? '#2B2D30'
                            : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }