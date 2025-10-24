'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function BarDiamond({color, pave} : {color: string, pave: string|undefined, stone:string|undefined}) {
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

    const propsGEmeraldBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Verde.png',
    });
    propsGEmeraldBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // EmeraldRose
    const propsREmeraldBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Verde.png',
    });
    propsREmeraldBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // EmeraldWhite
    const propsWEmeraldBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Verde.png',
    });
    propsWEmeraldBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // SapphireGold
    const propsGSapphireBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Blu.png',
    });
    propsGSapphireBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // SapphireRose
    const propsRSapphireBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Blu.png',
    });
    propsRSapphireBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // SapphireWhite
    const propsWSapphireBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Blu.png',
    });
    propsWSapphireBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // RubyGold
    const propsGRubyBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Rosso.png',
    });
    propsGRubyBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // RubyRose
    const propsRRubyBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Rosso.png',
    });
    propsRRubyBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    // RubyWhite
    const propsWRubyBarDiamond = useTexture({
        map: 'textures/bar/diamond/Diffuse_Diamanti_Rosso.png',
    });
    propsWRubyBarDiamond.map.colorSpace = THREE.SRGBColorSpace;

    const pairs = new Map();
    pairs.set('golddiamond', propsYBarDiamond.map);
    pairs.set('rosediamond', propsRBarDiamond.map);
    pairs.set('whitediamond', propsWBarDiamond.map);

    pairs.set('goldemerald', propsGEmeraldBarDiamond.map);
    pairs.set('roseemerald', propsREmeraldBarDiamond.map);
    pairs.set('whiteemerald', propsWEmeraldBarDiamond.map);

    pairs.set('goldsapphire', propsGSapphireBarDiamond.map);
    pairs.set('rosesapphire', propsRSapphireBarDiamond.map);
    pairs.set('whitesapphire', propsWSapphireBarDiamond.map);

    pairs.set('goldruby', propsGRubyBarDiamond.map);
    pairs.set('roseruby', propsRRubyBarDiamond.map);
    pairs.set('whiteruby', propsWRubyBarDiamond.map);

        return (<meshStandardMaterial
            map={pairs.get(color+pave) ?? undefined}
            normalMap={color !== 'base' ? propsYBarDiamond.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYBarDiamond.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYBarDiamond.roughnessMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }