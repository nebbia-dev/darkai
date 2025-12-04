import {useTexture} from "@react-three/drei";
import * as THREE from "three";
import {useTeethStore} from "@/app/_stores/teeth";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";

export default function RoundPaveBase({color, type} : {color: string|undefined, type: string|undefined}) {
    if(!color || !type) return;

    const envMap = useTeethStore((state) => state.envMap);

    const pairs = new Map();

    // ROUND
    const roundNormal = useTexture({
        normalMap: 'textures/proveDiamanti/Normal_Struttura_Round.png'
    });

    roundNormal.normalMap.wrapS = roundNormal.normalMap.wrapT = THREE.RepeatWrapping;
    roundNormal.normalMap.repeat.set(15, 15);
    pairs.set('roundNormal', roundNormal.normalMap);

    //ROUND COLORS
    const roundGold = useTexture({
        map: 'textures/proveDiamanti/Round_Pavè_Struttura_Oro_Giallo.webp',
    });
    roundGold.map.colorSpace = THREE.SRGBColorSpace;
    roundGold.map.wrapS = roundGold.map.wrapT = THREE.RepeatWrapping;
    roundGold.map.repeat.set(15, 15);
    pairs.set('roundGold', roundGold.map);

    const roundRose = useTexture({
        map: 'textures/proveDiamanti/Round_Pavè_Struttura_Oro_Rosa.webp',
    });
    roundRose.map.colorSpace = THREE.SRGBColorSpace;
    roundRose.map.wrapS = roundRose.map.wrapT = THREE.RepeatWrapping;
    roundRose.map.repeat.set(15, 15);
    pairs.set('roundRose', roundRose.map);

    const roundWhite = useTexture({
        map: 'textures/proveDiamanti/Round_Pavè_Struttura_Oro_Bianco.webp',
    });
    roundWhite.map.colorSpace = THREE.SRGBColorSpace;
    roundWhite.map.wrapS = roundWhite.map.wrapT = THREE.RepeatWrapping;
    roundWhite.map.repeat.set(15, 15);
    pairs.set('roundWhite', roundWhite.map);

    const roundBlack = useTexture({
        map: 'textures/proveDiamanti/Round_Pavè_Struttura_Oro_Nero.webp',
    });
    roundBlack.map.colorSpace = THREE.SRGBColorSpace;
    roundBlack.map.wrapS = roundBlack.map.wrapT = THREE.RepeatWrapping;
    roundBlack.map.repeat.set(15, 15);
    pairs.set('roundBlack', roundBlack.map);


    // MOSAIC
    const mosaicNormal = useTexture({
        normalMap: 'textures/proveDiamanti/Normal_Struttura_Mosaic.webp'
    });

    mosaicNormal.normalMap.wrapS = mosaicNormal.normalMap.wrapT = THREE.RepeatWrapping;
    mosaicNormal.normalMap.repeat.set(6, 6);
    pairs.set('mosaicNormal', mosaicNormal.normalMap);

    //MOSAIC COLORS
    const mosaicGold = useTexture({
        map: 'textures/proveDiamanti/Mosaic_Pavè_Struttura_Oro_Giallo.webp',
    });
    mosaicGold.map.colorSpace = THREE.SRGBColorSpace;
    mosaicGold.map.wrapS = mosaicGold.map.wrapT = THREE.RepeatWrapping;
    mosaicGold.map.repeat.set(6, 6);
    pairs.set('mosaicGold', mosaicGold.map);

    const mosaicRose = useTexture({
        map: 'textures/proveDiamanti/Mosaic_Pavè_Struttura_Oro_Rosa.webp',
    });
    mosaicRose.map.colorSpace = THREE.SRGBColorSpace;
    mosaicRose.map.wrapS = mosaicRose.map.wrapT = THREE.RepeatWrapping;
    mosaicRose.map.repeat.set(6, 6);
    pairs.set('mosaicRose', mosaicRose.map);

    const mosaicWhite = useTexture({
        map: 'textures/proveDiamanti/Mosaic_Pavè_Struttura_Oro_Bianco.webp',
    });
    mosaicWhite.map.colorSpace = THREE.SRGBColorSpace;
    mosaicWhite.map.wrapS = mosaicWhite.map.wrapT = THREE.RepeatWrapping;
    mosaicWhite.map.repeat.set(6, 6);
    pairs.set('mosaicWhite', mosaicWhite.map);

    const mosaicBlack = useTexture({
        map: 'textures/proveDiamanti/Mosaic_Pavè_Struttura_Oro_Nero.webp',
    });
    mosaicBlack.map.colorSpace = THREE.SRGBColorSpace;
    mosaicBlack.map.wrapS = mosaicBlack.map.wrapT = THREE.RepeatWrapping;
    mosaicBlack.map.repeat.set(6, 6);
    pairs.set('mosaicBlack', mosaicBlack.map);

        return (
            <>
            <meshStandardMaterial
                transparent={true}
                map={pairs.get(type + firstCapital(color))}
                normalMap={pairs.get(type + "Normal")}
                metalness={0.6}
                roughness={0.1}
                envMap={envMap}
            />

            </>
        )
}