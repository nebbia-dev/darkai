'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";

export default function FullDiamond({color, pave} : {color: string, pave: string}) {
    const envMap = useTeethStore((state) => state.envMap);

        // DiamondGold
        const propsYDiamondFull = useTexture({
            map: 'textures/diamondFull/Difuse_Diamanti.webp',
            // map: 'textures/proveDiamanti/Prova_03.png',
            normalMap: 'textures/diamondFull/Normal_Diamanti.webp',
            // normalMap: 'textures/proveDiamanti/Normal (1).png',
            metalnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
            roughnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
        });
        propsYDiamondFull.map.colorSpace = THREE.SRGBColorSpace;
        propsYDiamondFull.map.wrapS = propsYDiamondFull.map.wrapT = THREE.RepeatWrapping;
        propsYDiamondFull.map.repeat.set(6,6);
        propsYDiamondFull.normalMap.wrapS = propsYDiamondFull.normalMap.wrapT = THREE.RepeatWrapping;
        propsYDiamondFull.normalMap.repeat.set(6,6);
        propsYDiamondFull.metalnessMap.wrapS = propsYDiamondFull.metalnessMap.wrapT = THREE.RepeatWrapping;
        propsYDiamondFull.metalnessMap.repeat.set(6,6);

        // DiamondRose
        const propsRDiamondFull = useTexture({
            map: 'textures/diamondFull/Difuse_Diamanti_Rosa.webp',
        });
        propsRDiamondFull.map.colorSpace = THREE.SRGBColorSpace;
        propsRDiamondFull.map.wrapS = propsRDiamondFull.map.wrapT = THREE.RepeatWrapping;
        propsRDiamondFull.map.repeat.set(6,6);

        // DiamondWhite
        const propsWDiamondFull = useTexture({
            map: 'textures/diamondFull/Metalness_Diamanti.webp',
        });
        propsWDiamondFull.map.colorSpace = THREE.SRGBColorSpace;
        propsWDiamondFull.map.wrapS = propsWDiamondFull.map.wrapT = THREE.RepeatWrapping;
        propsWDiamondFull.map.repeat.set(6,6);

        // EmeraldGold
        const propsGEmeraldFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Verde.png',
        });
        propsGEmeraldFull.map.colorSpace = THREE.SRGBColorSpace;
        propsGEmeraldFull.map.wrapS = propsGEmeraldFull.map.wrapT = THREE.RepeatWrapping;
        propsGEmeraldFull.map.repeat.set(6,6);

        // EmeraldRose
        const propsREmeraldFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Verde.png',
        });
        propsREmeraldFull.map.colorSpace = THREE.SRGBColorSpace;
        propsREmeraldFull.map.wrapS = propsREmeraldFull.map.wrapT = THREE.RepeatWrapping;
        propsREmeraldFull.map.repeat.set(6,6);

        // EmeraldWhite
        const propsWEmeraldFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Verde.png',
        });
        propsWEmeraldFull.map.colorSpace = THREE.SRGBColorSpace;
        propsWEmeraldFull.map.wrapS = propsWEmeraldFull.map.wrapT = THREE.RepeatWrapping;
        propsWEmeraldFull.map.repeat.set(6,6);

        // SapphireGold
        const propsGSapphireFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Blu.png',
        });
        propsGSapphireFull.map.colorSpace = THREE.SRGBColorSpace;
        propsGSapphireFull.map.wrapS = propsGSapphireFull.map.wrapT = THREE.RepeatWrapping;
        propsGSapphireFull.map.repeat.set(6,6);

        // SapphireRose
        const propsRSapphireFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Blu.png',
        });
        propsRSapphireFull.map.colorSpace = THREE.SRGBColorSpace;
        propsRSapphireFull.map.wrapS = propsRSapphireFull.map.wrapT = THREE.RepeatWrapping;
        propsRSapphireFull.map.repeat.set(6,6);

        // SapphireWhite
        const propsWSapphireFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Blu.png',
        });
        propsWSapphireFull.map.colorSpace = THREE.SRGBColorSpace;
        propsWSapphireFull.map.wrapS = propsWSapphireFull.map.wrapT = THREE.RepeatWrapping;
        propsWSapphireFull.map.repeat.set(6,6);

        // RubyGold
        const propsGRubyFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Rosso.png',
        });
        propsGRubyFull.map.colorSpace = THREE.SRGBColorSpace;
        propsGRubyFull.map.wrapS = propsGRubyFull.map.wrapT = THREE.RepeatWrapping;
        propsGRubyFull.map.repeat.set(6,6);

        // RubyRose
        const propsRRubyFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Rosso.png',
        });
        propsRRubyFull.map.colorSpace = THREE.SRGBColorSpace;
        propsRRubyFull.map.wrapS = propsRRubyFull.map.wrapT = THREE.RepeatWrapping;
        propsRRubyFull.map.repeat.set(6,6);

        // RubyWhite
        const propsWRubyFull = useTexture({
            map: 'textures/diamondFull/Diffuse_Diamanti_Rosso.png',
        });
        propsWRubyFull.map.colorSpace = THREE.SRGBColorSpace;
        propsWRubyFull.map.wrapS = propsWRubyFull.map.wrapT = THREE.RepeatWrapping;
        propsWRubyFull.map.repeat.set(6,6);

        const pairs = new Map();
        pairs.set('golddiamond', propsYDiamondFull.map);
        pairs.set('rosediamond', propsRDiamondFull.map);
        pairs.set('whitediamond', propsWDiamondFull.map);

        pairs.set('goldemerald', propsGEmeraldFull.map);
        pairs.set('roseemerald', propsREmeraldFull.map);
        pairs.set('whiteemerald', propsWEmeraldFull.map);

        pairs.set('goldsapphire', propsGSapphireFull.map);
        pairs.set('rosesapphire', propsRSapphireFull.map);
        pairs.set('whitesapphire', propsWSapphireFull.map);

        pairs.set('goldruby', propsGRubyFull.map);
        pairs.set('roseruby', propsRRubyFull.map);
        pairs.set('whiteruby', propsWRubyFull.map);

        return (<meshStandardMaterial
            map={pairs.get(color+pave) ?? undefined}
            normalMap={color !== 'base' ? propsYDiamondFull.normalMap : undefined}
            metalnessMap = {color !== 'base' ? propsYDiamondFull.metalnessMap : undefined}
            roughnessMap = {color !== 'base' ? propsYDiamondFull.roughnessMap : undefined}
            metalness = {color !== 'base' ? 0.5 : 0}
            roughness = {color !== 'base' ? 0 : 1}
            envMap = {envMap}
            color={color !== 'base' ? undefined : 'grey'}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }