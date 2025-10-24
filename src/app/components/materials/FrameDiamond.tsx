'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FrameDiamond({color, pave} : {color: string, pave: string|undefined, stone:string|undefined}) {
    const envMap = useTeethStore((state) => state.envMap);
        const propsYFrameDiamond = useTexture({
            map: 'textures/frame/diamond/DefaultMaterial_Base_color.webp',
            normalMap: 'textures/frame/diamond/DefaultMaterial_Normal.webp',
            metalnessMap: 'textures/frame/diamond/DefaultMaterial_Metallic.webp',
            roughnessMap: 'textures/frame/diamond/DefaultMaterial_Roughness.webp',
        });
        propsYFrameDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsRFrameDiamond = useTexture({
            map: 'textures/frame/diamond/DefaultMaterial_Base_colorRose.webp',
        });
        propsRFrameDiamond.map.colorSpace = THREE.SRGBColorSpace;
        const propsWFrameDiamond = useTexture({
            map: 'textures/frame/diamond/DefaultMaterial_Base_colorWhite.webp',
        });
        propsWFrameDiamond.map.colorSpace = THREE.SRGBColorSpace;

        const propsGEmeraldFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Verde.png',
        });
        propsGEmeraldFrame.map.colorSpace = THREE.SRGBColorSpace;

        // EmeraldRose
        const propsREmeraldFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Verde.png',
        });
        propsREmeraldFrame.map.colorSpace = THREE.SRGBColorSpace;

        // EmeraldWhite
        const propsWEmeraldFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Verde.png',
        });
        propsWEmeraldFrame.map.colorSpace = THREE.SRGBColorSpace;

        // SapphireGold
        const propsGSapphireFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Blu.png',
        });
        propsGSapphireFrame.map.colorSpace = THREE.SRGBColorSpace;

        // SapphireRose
        const propsRSapphireFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Blu.png',
        });
        propsRSapphireFrame.map.colorSpace = THREE.SRGBColorSpace;

        // SapphireWhite
        const propsWSapphireFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Blu.png',
        });
        propsWSapphireFrame.map.colorSpace = THREE.SRGBColorSpace;

        // RubyGold
        const propsGRubyFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Rosso.png',
        });
        propsGRubyFrame.map.colorSpace = THREE.SRGBColorSpace;

        // RubyRose
        const propsRRubyFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Rosso.png',
        });
        propsRRubyFrame.map.colorSpace = THREE.SRGBColorSpace;

        // RubyWhite
        const propsWRubyFrame = useTexture({
            map: 'textures/frame/diamond/Diffuse_Diamanti_Rosso.png',
        });
        propsWRubyFrame.map.colorSpace = THREE.SRGBColorSpace;

        const pairs = new Map();
        pairs.set('golddiamond', propsYFrameDiamond.map);
        pairs.set('rosediamond', propsRFrameDiamond.map);
        pairs.set('whitediamond', propsWFrameDiamond.map);

        pairs.set('goldemerald', propsGEmeraldFrame.map);
        pairs.set('roseemerald', propsREmeraldFrame.map);
        pairs.set('whiteemerald', propsWEmeraldFrame.map);

        pairs.set('goldsapphire', propsGSapphireFrame.map);
        pairs.set('rosesapphire', propsRSapphireFrame.map);
        pairs.set('whitesapphire', propsWSapphireFrame.map);

        pairs.set('goldruby', propsGRubyFrame.map);
        pairs.set('roseruby', propsRRubyFrame.map);
        pairs.set('whiteruby', propsWRubyFrame.map);

        return (<meshStandardMaterial
            map={pairs.get(color+pave) ?? undefined}
            normalMap={color !== 'base' ? propsYFrameDiamond.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYFrameDiamond.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYFrameDiamond.roughnessMap : undefined}
            metalness = {color !== 'base' ? 1 : 0}
            roughness = {color !== 'base' ? 0.5 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }