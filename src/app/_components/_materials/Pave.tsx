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
        map: 'textures/paves/Round_Pavè_Diamanti_V03.webp',
        normalMap: 'textures/paves/Normal_Diamanti_Round.png'
    });
    round.map.colorSpace = THREE.SRGBColorSpace;
    round.map.wrapS = round.map.wrapT = THREE.RepeatWrapping;
    round.map.repeat.set(15, 15);
    round.normalMap.wrapS = round.normalMap.wrapT = THREE.RepeatWrapping;
    round.normalMap.repeat.set(15, 15);

    pairs.set('round', round.map);
    pairs.set('roundNormal', round.normalMap);

    /* MOSAIC PAVE*/
    const mosaic = useTexture({
        map: 'textures/paves/Mosaic_Pavè_Diamanti.webp',
        normalMap: 'textures/paves/Normal_Diamanti_Mosaic.webp'
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
        map: 'textures/paves/Princess_Pavè.webp',
        normalMap: 'textures/paves/Normal_Princess.webp'
    });
    princess.map.colorSpace = THREE.SRGBColorSpace;
    princess.map.wrapS = princess.map.wrapT = THREE.RepeatWrapping;
    princess.map.repeat.set(9, 9);
    princess.normalMap.wrapS = princess.normalMap.wrapT = THREE.RepeatWrapping;
    princess.normalMap.repeat.set(9, 9);

    pairs.set('princess', princess.map);
    pairs.set('princessNormal', princess.normalMap);

    /* BAGUETTE PAVE*/
    const baguette = useTexture({
        map: 'textures/paves/Baguette_Pavè.webp',
        normalMap: 'textures/paves/Normal_Baguette.webp'
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
        map: 'textures/paves/Hexagon_Pavè.webp',
        normalMap: 'textures/paves/Normal_Hexagon.webp'
    });
    hexagon.map.colorSpace = THREE.SRGBColorSpace;
    hexagon.map.wrapS = hexagon.map.wrapT = THREE.RepeatWrapping;
    hexagon.map.repeat.set(6, 6);
    hexagon.normalMap.wrapS = hexagon.normalMap.wrapT = THREE.RepeatWrapping;
    hexagon.normalMap.repeat.set(6, 6);

    pairs.set('hexagon', hexagon.map);
    pairs.set('hexagonNormal', hexagon.normalMap);

    /* HEXAGON CAMO PAVE*/
    const hexagonCamo = useTexture({
        map: 'textures/paves/Hexagon_Pave_Camo.webp',
    });
    hexagonCamo.map.colorSpace = THREE.SRGBColorSpace;
    hexagonCamo.map.wrapS = hexagonCamo.map.wrapT = THREE.RepeatWrapping;
    hexagonCamo.map.repeat.set(6, 6);

    pairs.set('hexagonCamo', hexagonCamo.map);

    /* PRINCESS CAMO PAVE*/
    const princessCamo = useTexture({
        map: 'textures/paves/Princess_Pave_Camo.webp',
    });
    princessCamo.map.colorSpace = THREE.SRGBColorSpace;
    princessCamo.map.wrapS = princessCamo.map.wrapT = THREE.RepeatWrapping;
    princessCamo.map.repeat.set(6, 6);

    pairs.set('princessCamo', princessCamo.map);

    /* BAGUETTE CAMO PAVE*/
    const baguetteCamo = useTexture({
        map: 'textures/paves/Baguette_Pave_Camo.webp',
    });
    baguetteCamo.map.colorSpace = THREE.SRGBColorSpace;
    baguetteCamo.map.wrapS = baguetteCamo.map.wrapT = THREE.RepeatWrapping;
    baguetteCamo.map.repeat.set(6, 6);

    pairs.set('baguetteCamo', baguetteCamo.map);

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
            hex = 0x4c3e34;
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
            normalMap={pairs.get(pave + "Normal")}
            envMapIntensity={2}
            color={hex}
            metalness={1}
            roughness={0}
            envMap={envMap}
        />
    )
}