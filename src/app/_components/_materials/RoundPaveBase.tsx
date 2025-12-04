import {useTexture} from "@react-three/drei";
import * as THREE from "three";
import {useTeethStore} from "@/app/_stores/teeth";

export default function RoundPaveBase({color} : {color: string|undefined}) {
    if(!color) return;

    const envMap = useTeethStore((state) => state.envMap);
    // roundWhD
    const roundDecalGold = useTexture({
        map: 'textures/proveDiamanti/Round_Pavè_Struttura_Oro_Giallo.webp',
        normalMap: 'textures/proveDiamanti/Normal_Struttura.png'
    });
    roundDecalGold.map.colorSpace = THREE.SRGBColorSpace;
    roundDecalGold.map.wrapS = roundDecalGold.map.wrapT = THREE.RepeatWrapping;
    roundDecalGold.map.repeat.set(25, 25);
    roundDecalGold.normalMap.wrapS = roundDecalGold.map.wrapT = THREE.RepeatWrapping;
    roundDecalGold.normalMap.repeat.set(25, 25);

        return (
            <>
            <meshStandardMaterial
                transparent={true}
                map={roundDecalGold.map}
                normalMap={roundDecalGold.normalMap}
                metalness={0.6}
                roughness={0.1}
                envMap={envMap}
            />

            </>
        )
}