import {useEnvironment, useTexture} from "@react-three/drei";
import * as THREE from "three";

export default function Pave({pave, stone} : {pave: string|undefined, stone:string|undefined}) {
    if(!pave || !stone) return;

    // const envMap = useTeethStore((state) => state.envMap);

    const envMap = useEnvironment({
        // files: "envMaps/rosendal_park_sunset_puresky_1k.exr"
        files: "envMaps/Diamond_HDRI_Schiarita.hdr"
        // files: "envMaps/Diamond_HDRI.hdr"
    })

    const pairs = new Map();

    /* ROUND PAVE*/
    const round = useTexture({
        map: 'textures/paves/round/Round_Pave_Diamanti_V03.webp',
        normalMap: 'textures/paves/round/Normal_Diamanti_Round.png'
    });
    round.map.colorSpace = THREE.SRGBColorSpace;
    round.map.wrapS = round.map.wrapT = THREE.RepeatWrapping;
    round.map.repeat.set(22, 22);
    round.normalMap.wrapS = round.normalMap.wrapT = THREE.RepeatWrapping;
    round.normalMap.repeat.set(22, 22);

    pairs.set('round', round.map);
    pairs.set('roundNormal', round.normalMap);

    /* MOSAIC PAVE*/
    const mosaic = useTexture({
        map: 'textures/paves/mosaic/Mosaic_Pave_Diamanti.webp',
        normalMap: 'textures/paves/mosaic/Normal_Diamanti_Mosaic.webp'
    });
    mosaic.map.colorSpace = THREE.SRGBColorSpace;
    mosaic.map.wrapS = mosaic.map.wrapT = THREE.RepeatWrapping;
    mosaic.map.repeat.set(6, 6);
    mosaic.normalMap.wrapS = mosaic.normalMap.wrapT = THREE.RepeatWrapping;
    mosaic.normalMap.repeat.set(6, 6);

    pairs.set('mosaic', mosaic.map);
    pairs.set('mosaicNormal', mosaic.normalMap);


    /* PRINCESS PAVE*/
    const princess = useTexture({
        map: 'textures/paves/princess/Princess_Pave.webp',
        normalMap: 'textures/paves/princess/Normal_Princess.webp'
    });
    princess.map.colorSpace = THREE.SRGBColorSpace;
    princess.map.wrapS = princess.map.wrapT = THREE.RepeatWrapping;
    princess.map.repeat.set(8, 8);
    princess.normalMap.wrapS = princess.normalMap.wrapT = THREE.RepeatWrapping;
    princess.normalMap.repeat.set(8, 8);

    pairs.set('princess', princess.map);
    pairs.set('princessNormal', princess.normalMap);

    /* BAGUETTE PAVE*/
    const baguette = useTexture({
        map: 'textures/paves/baguette/Baguette_Pave.webp',
        normalMap: 'textures/paves/baguette/Normal_Baguette.webp'
    });
    baguette.map.colorSpace = THREE.SRGBColorSpace;
    baguette.map.wrapS = baguette.map.wrapT = THREE.RepeatWrapping;
    baguette.map.repeat.set(4, 4);
    baguette.normalMap.wrapS = baguette.normalMap.wrapT = THREE.RepeatWrapping;
    baguette.normalMap.repeat.set(4, 4);

    pairs.set('baguette', baguette.map);
    pairs.set('baguetteNormal', baguette.normalMap);

    /* HEXAGON PAVE*/
    const hexagon = useTexture({
        map: 'textures/paves/hexagon/Hexagon_Pave.webp',
        normalMap: 'textures/paves/hexagon/Normal_Hexagon.webp'
    });
    hexagon.map.colorSpace = THREE.SRGBColorSpace;
    hexagon.map.wrapS = hexagon.map.wrapT = THREE.RepeatWrapping;
    hexagon.map.repeat.set(5.5, 5.5);
    hexagon.normalMap.wrapS = hexagon.normalMap.wrapT = THREE.RepeatWrapping;
    hexagon.normalMap.repeat.set(5.5, 5.5);

    pairs.set('hexagon', hexagon.map);
    pairs.set('hexagonNormal', hexagon.normalMap);

    /* HEXAGON CAMO PAVE*/
    const hexagonCamo = useTexture({
        map: 'textures/paves/hexagon/Hexagon_Pave_Camo.webp',
    });
    hexagonCamo.map.colorSpace = THREE.SRGBColorSpace;
    hexagonCamo.map.wrapS = hexagonCamo.map.wrapT = THREE.RepeatWrapping;
    hexagonCamo.map.repeat.set(5.5, 5.5);

    pairs.set('hexagonCamo', hexagonCamo.map);

    /* HEXAGON GLITCH PAVE*/
    const hexagonGlitch = useTexture({
        map: 'textures/paves/hexagon/Hexagon_Pave_Glitch.webp',
    });
    hexagonGlitch.map.colorSpace = THREE.SRGBColorSpace;
    hexagonGlitch.map.wrapS = hexagonGlitch.map.wrapT = THREE.RepeatWrapping;
    hexagonGlitch.map.repeat.set(5.5, 5.5);

    pairs.set('hexagonGlitch', hexagonGlitch.map);

    /* PRINCESS CAMO PAVE*/
    const princessCamo = useTexture({
        map: 'textures/paves/princess/Princess_Pave_Camo.webp',
    });
    princessCamo.map.colorSpace = THREE.SRGBColorSpace;
    princessCamo.map.wrapS = princessCamo.map.wrapT = THREE.RepeatWrapping;
    princessCamo.map.repeat.set(8, 8);

    pairs.set('princessCamo', princessCamo.map);

    /* PRINCESS GLITCH PAVE*/
    const princessGlitch = useTexture({
        map: 'textures/paves/princess/Princess_Pave_Glitch.webp',
    });
    princessGlitch.map.colorSpace = THREE.SRGBColorSpace;
    princessGlitch.map.wrapS = princessGlitch.map.wrapT = THREE.RepeatWrapping;
    princessGlitch.map.repeat.set(8, 8);

    pairs.set('princessGlitch', princessGlitch.map);

    /* BAGUETTE CAMO PAVE*/
    const baguetteCamo = useTexture({
        map: 'textures/paves/baguette/Baguette_Pave_Camo.webp',
    });
    baguetteCamo.map.colorSpace = THREE.SRGBColorSpace;
    baguetteCamo.map.wrapS = baguetteCamo.map.wrapT = THREE.RepeatWrapping;
    baguetteCamo.map.repeat.set(6, 6);

    pairs.set('baguetteCamo', baguetteCamo.map);

    /* BAGUETTE GLITCH PAVE*/
    const baguetteGlitch = useTexture({
        map: 'textures/paves/baguette/Baguette_Pave_Glitch.webp',
    });
    baguetteGlitch.map.colorSpace = THREE.SRGBColorSpace;
    baguetteGlitch.map.wrapS = baguetteGlitch.map.wrapT = THREE.RepeatWrapping;
    baguetteGlitch.map.repeat.set(6, 6);

    pairs.set('baguetteGlitch', baguetteGlitch.map);

    /* MOSAIC CAMO PAVE*/
    const mosaicCamo = useTexture({
        map: 'textures/paves/mosaic/Mosaic_Pave_Camo.webp',
    });
    mosaicCamo.map.colorSpace = THREE.SRGBColorSpace;
    mosaicCamo.map.wrapS = mosaicCamo.map.wrapT = THREE.RepeatWrapping;
    mosaicCamo.map.repeat.set(6, 6);

    pairs.set('mosaicCamo', mosaicCamo.map);

    /* MOSAIC GLITCH PAVE*/
    const mosaicGlitch = useTexture({
        map: 'textures/paves/mosaic/Mosaic_Pave_Glitch.webp',
    });
    mosaicGlitch.map.colorSpace = THREE.SRGBColorSpace;
    mosaicGlitch.map.wrapS = mosaicGlitch.map.wrapT = THREE.RepeatWrapping;
    mosaicGlitch.map.repeat.set(6, 6);

    pairs.set('mosaicGlitch', mosaicGlitch.map);

    /* ROUND CAMO PAVE*/
    const roundCamo = useTexture({
        map: 'textures/paves/round/Round_Pave_Camo.webp',
        normalMap: 'textures/paves/round/Round_Pave_Normal.webp'
    });
    roundCamo.map.colorSpace = THREE.SRGBColorSpace;
    roundCamo.map.wrapS = roundCamo.map.wrapT = THREE.RepeatWrapping;
    roundCamo.map.repeat.set(11.5, 11.5);
    roundCamo.normalMap.wrapS = roundCamo.normalMap.wrapT = THREE.RepeatWrapping;
    roundCamo.normalMap.repeat.set(11.5, 11.5);

    pairs.set('roundCamo', roundCamo.map);
    pairs.set('roundCamoNormal', roundCamo.normalMap);

    /* ROUND GLITCH PAVE*/
    const roundGlitch = useTexture({
        map: 'textures/paves/round/Round_Pave_Glitch.webp',
        normalMap: 'textures/paves/round/Round_Pave_Normal.webp'
    });
    roundGlitch.map.colorSpace = THREE.SRGBColorSpace;
    roundGlitch.map.wrapS = roundGlitch.map.wrapT = THREE.RepeatWrapping;
    roundGlitch.map.repeat.set(11.5, 11.5);
    roundGlitch.normalMap.wrapS = roundGlitch.normalMap.wrapT = THREE.RepeatWrapping;
    roundGlitch.normalMap.repeat.set(11.5, 11.5);

    pairs.set('roundGlitch', roundGlitch.map);
    pairs.set('roundGlitchNormal', roundGlitch.normalMap);

    pairs.set('hexagonCamoNormal', hexagon.normalMap);
    pairs.set('hexagonGlitchNormal', hexagon.normalMap);

    pairs.set('princessCamoNormal', princess.normalMap);
    pairs.set('princessGlitchNormal', princess.normalMap);

    pairs.set('mosaicCamoNormal', mosaic.normalMap);
    pairs.set('mosaicGlitchNormal', mosaic.normalMap);

    pairs.set('baguetteCamoNormal', baguette.normalMap);
    pairs.set('baguetteGlitchNormal', baguette.normalMap);

    let hex;
    let paveType;

    switch(stone) {
        case 'bSapph':
            hex = 0x0073b6;
            paveType = pave;
            break;
        case 'aqua':
            hex = 0x00bdca;
            paveType = pave;
            break;
        case 'emerald':
            hex = 0x0c8241;
            paveType = pave;
            break;
        case 'ySapph':
            hex = 0xffc007;
            paveType = pave;
            break;
        case 'ruby':
            hex = 0xe91825;
            paveType = pave;
            break;
        case 'pSapph':
            hex = 0xff6588;
            paveType = pave;
            break;
        case 'ameth':
            hex = 0xae3b9f;
            paveType = pave;
            break;
        case 'whD':
            hex = 0xffffff;
            paveType = pave;
            break;
        case 'brD':
            hex = 0x6e4315;
            paveType = pave;
            break;
        case 'blD':
            hex = 0x1d1e1e;
            paveType = pave;
            break;
        case 'camo':
            hex = 0xffffff;
            paveType = pave + "Camo";
            break;
        case 'glitch':
            hex = 0xffffff;
            paveType = pave + "Glitch";
            break;
        default:
            hex = 0xffffff;
            break;
    }


    return (
        <meshStandardMaterial
            transparent={true}
            map={pairs.get(paveType)}
            normalMap={pairs.get(paveType + "Normal")}
            envMapIntensity={2}
            color={hex}
            metalness={1}
            roughness={0}
            envMap={envMap}
        />
    )
}