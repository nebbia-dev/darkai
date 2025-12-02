import {Decal, useTexture} from "@react-three/drei";
import * as THREE from "three";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";
import {useTeethStore} from "@/app/_stores/teeth";

export default function Pave({pave, stone} : {pave: string|undefined, stone:string|undefined}) {
    if(!pave || !stone) return;

    const envMap = useTeethStore((state) => state.envMap);

    const pairs = new Map();

    /* ROUND PAVE*/
    // roundWhD
    const roundWhD = useTexture({
        map: 'textures/paves/roundWhD.png',
    });
    roundWhD.map.colorSpace = THREE.SRGBColorSpace;
    roundWhD.map.wrapS = roundWhD.map.wrapT = THREE.RepeatWrapping;
    roundWhD.map.repeat.set(10, 10);
    pairs.set('roundWhD', roundWhD.map);

    // roundBrD
    const roundBrD = useTexture({
        map: 'textures/paves/roundBrD.png',
    });
    roundBrD.map.colorSpace = THREE.SRGBColorSpace;
    roundBrD.map.wrapS = roundBrD.map.wrapT = THREE.RepeatWrapping;
    roundBrD.map.repeat.set(10, 10);
    pairs.set('roundBrD', roundBrD.map);

    // roundBlD
    const roundBlD = useTexture({
        map: 'textures/paves/roundBlD.png',
    });
    roundBlD.map.colorSpace = THREE.SRGBColorSpace;
    roundBlD.map.wrapS = roundBlD.map.wrapT = THREE.RepeatWrapping;
    roundBlD.map.repeat.set(10, 10);
    pairs.set('roundBlD', roundBlD.map);

    // roundRuby
    const roundRuby = useTexture({
        map: 'textures/paves/roundRuby.png',
    });
    roundRuby.map.colorSpace = THREE.SRGBColorSpace;
    roundRuby.map.wrapS = roundRuby.map.wrapT = THREE.RepeatWrapping;
    roundRuby.map.repeat.set(10, 10);
    pairs.set('roundRuby', roundRuby.map);

    // roundEmerald
    const roundEmerald = useTexture({
        map: 'textures/paves/roundEmerald.png',
    });
    roundEmerald.map.colorSpace = THREE.SRGBColorSpace;
    roundEmerald.map.wrapS = roundEmerald.map.wrapT = THREE.RepeatWrapping;
    roundEmerald.map.repeat.set(10, 10);
    pairs.set('roundEmerald', roundEmerald.map);

    // roundAmeth
    const roundAmeth = useTexture({
        map: 'textures/paves/roundAmeth.png',
    });
    roundAmeth.map.colorSpace = THREE.SRGBColorSpace;
    roundAmeth.map.wrapS = roundAmeth.map.wrapT = THREE.RepeatWrapping;
    roundAmeth.map.repeat.set(10, 10);
    pairs.set('roundAmeth', roundAmeth.map);

    // roundAqua
    const roundAqua = useTexture({
        map: 'textures/paves/roundAqua.png',
    });
    roundAqua.map.colorSpace = THREE.SRGBColorSpace;
    roundAqua.map.wrapS = roundAqua.map.wrapT = THREE.RepeatWrapping;
    roundAqua.map.repeat.set(10, 10);
    pairs.set('roundAqua', roundAqua.map);

    // roundBSapph
    const roundBSapph = useTexture({
        map: 'textures/paves/roundBSapph.png',
    });
    roundBSapph.map.colorSpace = THREE.SRGBColorSpace;
    roundBSapph.map.wrapS = roundBSapph.map.wrapT = THREE.RepeatWrapping;
    roundBSapph.map.repeat.set(10, 10);
    pairs.set('roundBSapph', roundBSapph.map);

    // roundPSapph
    const roundPSapph = useTexture({
        map: 'textures/paves/roundPSapph.png',
    });
    roundPSapph.map.colorSpace = THREE.SRGBColorSpace;
    roundPSapph.map.wrapS = roundPSapph.map.wrapT = THREE.RepeatWrapping;
    roundPSapph.map.repeat.set(10, 10);
    pairs.set('roundPSapph', roundPSapph.map);

    // roundYSapph
    const roundYSapph = useTexture({
        map: 'textures/paves/roundYSapph.png',
    });
    roundYSapph.map.colorSpace = THREE.SRGBColorSpace;
    roundYSapph.map.wrapS = roundYSapph.map.wrapT = THREE.RepeatWrapping;
    roundYSapph.map.repeat.set(10, 10);
    pairs.set('roundYSapph', roundYSapph.map);

    // roundCamo
    const roundCamo = useTexture({
        map: 'textures/paves/roundCamo.png',
    });
    roundCamo.map.colorSpace = THREE.SRGBColorSpace;
    roundCamo.map.wrapS = roundCamo.map.wrapT = THREE.RepeatWrapping;
    roundCamo.map.repeat.set(10, 10);
    pairs.set('roundCamo', roundCamo.map);

    // roundGlitch
    const roundGlitch = useTexture({
        map: 'textures/paves/roundGlitch.png',
    });
    roundGlitch.map.colorSpace = THREE.SRGBColorSpace;
    roundGlitch.map.wrapS = roundGlitch.map.wrapT = THREE.RepeatWrapping;
    roundGlitch.map.repeat.set(10, 10);
    pairs.set('roundGlitch', roundGlitch.map);

    /* PRINCESS PAVE*/
    // princessWhD
    const princessWhD = useTexture({
        map: 'textures/paves/sqWhD.png',
    });
    princessWhD.map.colorSpace = THREE.SRGBColorSpace;
    princessWhD.map.wrapS = princessWhD.map.wrapT = THREE.RepeatWrapping;
    princessWhD.map.repeat.set(10, 10);
    pairs.set('princessWhD', princessWhD.map);

    // princessBrD
    const princessBrD = useTexture({
        map: 'textures/paves/sqBrD.png',
    });
    princessBrD.map.colorSpace = THREE.SRGBColorSpace;
    princessBrD.map.wrapS = princessBrD.map.wrapT = THREE.RepeatWrapping;
    princessBrD.map.repeat.set(10, 10);
    pairs.set('princessBrD', princessBrD.map);

    // princessBlD
    const princessBlD = useTexture({
        map: 'textures/paves/sqBlD.png',
    });
    princessBlD.map.colorSpace = THREE.SRGBColorSpace;
    princessBlD.map.wrapS = princessBlD.map.wrapT = THREE.RepeatWrapping;
    princessBlD.map.repeat.set(10, 10);
    pairs.set('princessBlD', princessBlD.map);

    // princessRuby
    const princessRuby = useTexture({
        map: 'textures/paves/sqRuby.png',
    });
    princessRuby.map.colorSpace = THREE.SRGBColorSpace;
    princessRuby.map.wrapS = princessRuby.map.wrapT = THREE.RepeatWrapping;
    princessRuby.map.repeat.set(10, 10);
    pairs.set('princessRuby', princessRuby.map);

    // princessEmerald
    const princessEmerald = useTexture({
        map: 'textures/paves/sqEmerald.png',
    });
    princessEmerald.map.colorSpace = THREE.SRGBColorSpace;
    princessEmerald.map.wrapS = princessEmerald.map.wrapT = THREE.RepeatWrapping;
    princessEmerald.map.repeat.set(10, 10);
    pairs.set('princessEmerald', princessEmerald.map);

    // princessAmeth
    const princessAmeth = useTexture({
        map: 'textures/paves/sqAmeth.png',
    });
    princessAmeth.map.colorSpace = THREE.SRGBColorSpace;
    princessAmeth.map.wrapS = princessAmeth.map.wrapT = THREE.RepeatWrapping;
    princessAmeth.map.repeat.set(10, 10);
    pairs.set('princessAmeth', princessAmeth.map);

    // princessAqua
    const princessAqua = useTexture({
        map: 'textures/paves/sqAqua.png',
    });
    princessAqua.map.colorSpace = THREE.SRGBColorSpace;
    princessAqua.map.wrapS = princessAqua.map.wrapT = THREE.RepeatWrapping;
    princessAqua.map.repeat.set(10, 10);
    pairs.set('princessAqua', princessAqua.map);

    // princessBSapph
    const princessBSapph = useTexture({
        map: 'textures/paves/sqBSapph.png',
    });
    princessBSapph.map.colorSpace = THREE.SRGBColorSpace;
    princessBSapph.map.wrapS = princessBSapph.map.wrapT = THREE.RepeatWrapping;
    princessBSapph.map.repeat.set(10, 10);
    pairs.set('princessBSapph', princessBSapph.map);

    // princessPSapph
    const princessPSapph = useTexture({
        map: 'textures/paves/sqPSapph.png',
    });
    princessPSapph.map.colorSpace = THREE.SRGBColorSpace;
    princessPSapph.map.wrapS = princessPSapph.map.wrapT = THREE.RepeatWrapping;
    princessPSapph.map.repeat.set(10, 10);
    pairs.set('princessPSapph', princessPSapph.map);

    // princessYSapph
    const princessYSapph = useTexture({
        map: 'textures/paves/sqYSapph.png',
    });
    princessYSapph.map.colorSpace = THREE.SRGBColorSpace;
    princessYSapph.map.wrapS = princessYSapph.map.wrapT = THREE.RepeatWrapping;
    princessYSapph.map.repeat.set(10, 10);
    pairs.set('princessYSapph', princessYSapph.map);

    // princessCamo
    const princessCamo = useTexture({
        map: 'textures/paves/sqCamo.png',
    });
    princessCamo.map.colorSpace = THREE.SRGBColorSpace;
    princessCamo.map.wrapS = princessCamo.map.wrapT = THREE.RepeatWrapping;
    princessCamo.map.repeat.set(10, 10);
    pairs.set('princessCamo', princessCamo.map);

    // princessGlitch
    const princessGlitch = useTexture({
        map: 'textures/paves/sqGlitch.png',
    });
    princessGlitch.map.colorSpace = THREE.SRGBColorSpace;
    princessGlitch.map.wrapS = princessGlitch.map.wrapT = THREE.RepeatWrapping;
    princessGlitch.map.repeat.set(10, 10);
    pairs.set('princessGlitch', princessGlitch.map);

    /* BAGUETTE PAVE*/
    // baguetteWhD
    const baguetteWhD = useTexture({
        map: 'textures/paves/rectWhD.png',
    });
    baguetteWhD.map.colorSpace = THREE.SRGBColorSpace;
    baguetteWhD.map.wrapS = baguetteWhD.map.wrapT = THREE.RepeatWrapping;
    baguetteWhD.map.repeat.set(10, 10);
    pairs.set('baguetteWhD', baguetteWhD.map);

    // baguetteBrD
    const baguetteBrD = useTexture({
        map: 'textures/paves/rectBrD.png',
    });
    baguetteBrD.map.colorSpace = THREE.SRGBColorSpace;
    baguetteBrD.map.wrapS = baguetteBrD.map.wrapT = THREE.RepeatWrapping;
    baguetteBrD.map.repeat.set(10, 10);
    pairs.set('baguetteBrD', baguetteBrD.map);

    // baguetteBlD
    const baguetteBlD = useTexture({
        map: 'textures/paves/rectBlD.png',
    });
    baguetteBlD.map.colorSpace = THREE.SRGBColorSpace;
    baguetteBlD.map.wrapS = baguetteBlD.map.wrapT = THREE.RepeatWrapping;
    baguetteBlD.map.repeat.set(10, 10);
    pairs.set('baguetteBlD', baguetteBlD.map);

    // baguetteRuby
    const baguetteRuby = useTexture({
        map: 'textures/paves/rectRuby.png',
    });
    baguetteRuby.map.colorSpace = THREE.SRGBColorSpace;
    baguetteRuby.map.wrapS = baguetteRuby.map.wrapT = THREE.RepeatWrapping;
    baguetteRuby.map.repeat.set(10, 10);
    pairs.set('baguetteRuby', baguetteRuby.map);

    // baguetteEmerald
    const baguetteEmerald = useTexture({
        map: 'textures/paves/rectEmerald.png',
    });
    baguetteEmerald.map.colorSpace = THREE.SRGBColorSpace;
    baguetteEmerald.map.wrapS = baguetteEmerald.map.wrapT = THREE.RepeatWrapping;
    baguetteEmerald.map.repeat.set(10, 10);
    pairs.set('baguetteEmerald', baguetteEmerald.map);

    // baguetteAmeth
    const baguetteAmeth = useTexture({
        map: 'textures/paves/rectAmeth.png',
    });
    baguetteAmeth.map.colorSpace = THREE.SRGBColorSpace;
    baguetteAmeth.map.wrapS = baguetteAmeth.map.wrapT = THREE.RepeatWrapping;
    baguetteAmeth.map.repeat.set(10, 10);
    pairs.set('baguetteAmeth', baguetteAmeth.map);

    // baguetteAqua
    const baguetteAqua = useTexture({
        map: 'textures/paves/rectAqua.png',
    });
    baguetteAqua.map.colorSpace = THREE.SRGBColorSpace;
    baguetteAqua.map.wrapS = baguetteAqua.map.wrapT = THREE.RepeatWrapping;
    baguetteAqua.map.repeat.set(10, 10);
    pairs.set('baguetteAqua', baguetteAqua.map);

    // baguetteBSapph
    const baguetteBSapph = useTexture({
        map: 'textures/paves/rectBSapph.png',
    });
    baguetteBSapph.map.colorSpace = THREE.SRGBColorSpace;
    baguetteBSapph.map.wrapS = baguetteBSapph.map.wrapT = THREE.RepeatWrapping;
    baguetteBSapph.map.repeat.set(10, 10);
    pairs.set('baguetteBSapph', baguetteBSapph.map);

    // baguettePSapph
    const baguettePSapph = useTexture({
        map: 'textures/paves/rectPSapph.png',
    });
    baguettePSapph.map.colorSpace = THREE.SRGBColorSpace;
    baguettePSapph.map.wrapS = baguettePSapph.map.wrapT = THREE.RepeatWrapping;
    baguettePSapph.map.repeat.set(10, 10);
    pairs.set('baguettePSapph', baguettePSapph.map);

    // baguetteYSapph
    const baguetteYSapph = useTexture({
        map: 'textures/paves/rectYSapph.png',
    });
    baguetteYSapph.map.colorSpace = THREE.SRGBColorSpace;
    baguetteYSapph.map.wrapS = baguetteYSapph.map.wrapT = THREE.RepeatWrapping;
    baguetteYSapph.map.repeat.set(10, 10);
    pairs.set('baguetteYSapph', baguetteYSapph.map);

    // baguetteCamo
    const baguetteCamo = useTexture({
        map: 'textures/paves/rectCamo.png',
    });
    baguetteCamo.map.colorSpace = THREE.SRGBColorSpace;
    baguetteCamo.map.wrapS = baguetteCamo.map.wrapT = THREE.RepeatWrapping;
    baguetteCamo.map.repeat.set(10, 10);
    pairs.set('baguetteCamo', baguetteCamo.map);

    // baguetteGlitch
    const baguetteGlitch = useTexture({
        map: 'textures/paves/rectGlitch.png',
    });
    baguetteGlitch.map.colorSpace = THREE.SRGBColorSpace;
    baguetteGlitch.map.wrapS = baguetteGlitch.map.wrapT = THREE.RepeatWrapping;
    baguetteGlitch.map.repeat.set(10, 10);
    pairs.set('baguetteGlitch', baguetteGlitch.map);

    /* MOSAIC PAVE*/
    // mosaicWhD
    const mosaicWhD = useTexture({
        map: 'textures/paves/mosWhD.png',
    });
    mosaicWhD.map.colorSpace = THREE.SRGBColorSpace;
    mosaicWhD.map.wrapS = mosaicWhD.map.wrapT = THREE.RepeatWrapping;
    mosaicWhD.map.repeat.set(10, 10);
    pairs.set('mosaicWhD', mosaicWhD.map);

    // mosaicBrD
    const mosaicBrD = useTexture({
        map: 'textures/paves/mosBrD.png',
    });
    mosaicBrD.map.colorSpace = THREE.SRGBColorSpace;
    mosaicBrD.map.wrapS = mosaicBrD.map.wrapT = THREE.RepeatWrapping;
    mosaicBrD.map.repeat.set(10, 10);
    pairs.set('mosaicBrD', mosaicBrD.map);

    // mosaicBlD
    const mosaicBlD = useTexture({
        map: 'textures/paves/mosBlD.png',
    });
    mosaicBlD.map.colorSpace = THREE.SRGBColorSpace;
    mosaicBlD.map.wrapS = mosaicBlD.map.wrapT = THREE.RepeatWrapping;
    mosaicBlD.map.repeat.set(10, 10);
    pairs.set('mosaicBlD', mosaicBlD.map);

    // mosaicRuby
    const mosaicRuby = useTexture({
        map: 'textures/paves/mosRuby.png',
    });
    mosaicRuby.map.colorSpace = THREE.SRGBColorSpace;
    mosaicRuby.map.wrapS = mosaicRuby.map.wrapT = THREE.RepeatWrapping;
    mosaicRuby.map.repeat.set(10, 10);
    pairs.set('mosaicRuby', mosaicRuby.map);

    // mosaicEmerald
    const mosaicEmerald = useTexture({
        map: 'textures/paves/mosEmerald.png',
    });
    mosaicEmerald.map.colorSpace = THREE.SRGBColorSpace;
    mosaicEmerald.map.wrapS = mosaicEmerald.map.wrapT = THREE.RepeatWrapping;
    mosaicEmerald.map.repeat.set(10, 10);
    pairs.set('mosaicEmerald', mosaicEmerald.map);

    // mosaicAmeth
    const mosaicAmeth = useTexture({
        map: 'textures/paves/mosAmeth.png',
    });
    mosaicAmeth.map.colorSpace = THREE.SRGBColorSpace;
    mosaicAmeth.map.wrapS = mosaicAmeth.map.wrapT = THREE.RepeatWrapping;
    mosaicAmeth.map.repeat.set(10, 10);
    pairs.set('mosaicAmeth', mosaicAmeth.map);

    // mosaicAqua
    const mosaicAqua = useTexture({
        map: 'textures/paves/mosAqua.png',
    });
    mosaicAqua.map.colorSpace = THREE.SRGBColorSpace;
    mosaicAqua.map.wrapS = mosaicAqua.map.wrapT = THREE.RepeatWrapping;
    mosaicAqua.map.repeat.set(10, 10);
    pairs.set('mosaicAqua', mosaicAqua.map);

    // mosaicBSapph
    const mosaicBSapph = useTexture({
        map: 'textures/paves/mosBSapph.png',
    });
    mosaicBSapph.map.colorSpace = THREE.SRGBColorSpace;
    mosaicBSapph.map.wrapS = mosaicBSapph.map.wrapT = THREE.RepeatWrapping;
    mosaicBSapph.map.repeat.set(10, 10);
    pairs.set('mosaicBSapph', mosaicBSapph.map);

    // mosaicPSapph
    const mosaicPSapph = useTexture({
        map: 'textures/paves/mosPSapph.png',
    });
    mosaicPSapph.map.colorSpace = THREE.SRGBColorSpace;
    mosaicPSapph.map.wrapS = mosaicPSapph.map.wrapT = THREE.RepeatWrapping;
    mosaicPSapph.map.repeat.set(10, 10);
    pairs.set('mosaicPSapph', mosaicPSapph.map);

    // mosaicYSapph
    const mosaicYSapph = useTexture({
        map: 'textures/paves/mosYSapph.png',
    });
    mosaicYSapph.map.colorSpace = THREE.SRGBColorSpace;
    mosaicYSapph.map.wrapS = mosaicYSapph.map.wrapT = THREE.RepeatWrapping;
    mosaicYSapph.map.repeat.set(10, 10);
    pairs.set('mosaicYSapph', mosaicYSapph.map);

    // mosaicCamo
    const mosaicCamo = useTexture({
        map: 'textures/paves/mosCamo.png',
    });
    mosaicCamo.map.colorSpace = THREE.SRGBColorSpace;
    mosaicCamo.map.wrapS = mosaicCamo.map.wrapT = THREE.RepeatWrapping;
    mosaicCamo.map.repeat.set(10, 10);
    pairs.set('mosaicCamo', mosaicCamo.map);

    // mosaicGlitch
    const mosaicGlitch = useTexture({
        map: 'textures/paves/mosGlitch.png',
    });
    mosaicGlitch.map.colorSpace = THREE.SRGBColorSpace;
    mosaicGlitch.map.wrapS = mosaicGlitch.map.wrapT = THREE.RepeatWrapping;
    mosaicGlitch.map.repeat.set(10, 10);
    pairs.set('mosaicGlitch', mosaicGlitch.map);

    /* HEXAGON PAVE*/
    // hexagonWhD
    const hexagonWhD = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè.webp',
    });
    hexagonWhD.map.colorSpace = THREE.SRGBColorSpace;
    hexagonWhD.map.wrapS = hexagonWhD.map.wrapT = THREE.RepeatWrapping;
    pairs.set('hexagonWhD', hexagonWhD.map);

    // hexagonBrD
    const hexagonBrD = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Marrone.webp',
    });
    hexagonBrD.map.colorSpace = THREE.SRGBColorSpace;
    hexagonBrD.map.wrapS = hexagonBrD.map.wrapT = THREE.RepeatWrapping;
    hexagonBrD.map.repeat.set(10, 10);
    pairs.set('hexagonBrD', hexagonBrD.map);

    // hexagonBlD
    const hexagonBlD = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Nero.webp',
    });
    hexagonBlD.map.colorSpace = THREE.SRGBColorSpace;
    hexagonBlD.map.wrapS = hexagonBlD.map.wrapT = THREE.RepeatWrapping;
    hexagonBlD.map.repeat.set(10, 10);
    pairs.set('hexagonBlD', hexagonBlD.map);

    // hexagonRuby
    const hexagonRuby = useTexture({
            map: 'textures/paves/HEXAGON/Hexagon_Pavè_Rosso.webp'},
    );
    hexagonRuby.map.colorSpace = THREE.SRGBColorSpace;
    hexagonRuby.map.wrapS = hexagonRuby.map.wrapT = THREE.RepeatWrapping;
    hexagonRuby.map.repeat.set(10, 10);
    pairs.set('hexagonRuby', hexagonRuby.map);

    // hexagonEmerald
    const hexagonEmerald = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Verde.webp',
    });
    hexagonEmerald.map.colorSpace = THREE.SRGBColorSpace;
    hexagonEmerald.map.wrapS = hexagonEmerald.map.wrapT = THREE.RepeatWrapping;
    pairs.set('hexagonEmerald', hexagonEmerald.map);

    // hexagonAmeth
    const hexagonAmeth = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Viola_Scuro.webp',
    });
    hexagonAmeth.map.colorSpace = THREE.SRGBColorSpace;
    hexagonAmeth.map.wrapS = hexagonAmeth.map.wrapT = THREE.RepeatWrapping;
    hexagonAmeth.map.repeat.set(10, 10);
    pairs.set('hexagonAmeth', hexagonAmeth.map);

    // hexagonAqua
    const hexagonAqua = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Azzurro.webp',
    });
    hexagonAqua.map.colorSpace = THREE.SRGBColorSpace;
    hexagonAqua.map.wrapS = hexagonAqua.map.wrapT = THREE.RepeatWrapping;
    hexagonAqua.map.repeat.set(10, 10);
    pairs.set('hexagonAqua', hexagonAqua.map);

    // hexagonBSapph
    const hexagonBSapph = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Blu.webp',
    });
    hexagonBSapph.map.colorSpace = THREE.SRGBColorSpace;
    hexagonBSapph.map.wrapS = hexagonBSapph.map.wrapT = THREE.RepeatWrapping;
    hexagonBSapph.map.repeat.set(10, 10);
    pairs.set('hexagonBSapph', hexagonBSapph.map);

    // hexagonPSapph
    const hexagonPSapph = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Viola.webp',
    });
    hexagonPSapph.map.colorSpace = THREE.SRGBColorSpace;
    hexagonPSapph.map.wrapS = hexagonPSapph.map.wrapT = THREE.RepeatWrapping;
    hexagonPSapph.map.repeat.set(10, 10);
    pairs.set('hexagonPSapph', hexagonPSapph.map);

    // hexagonYSapph
    const hexagonYSapph = useTexture({
        map: 'textures/paves/HEXAGON/Hexagon_Pavè_Giallo.webp',
    });
    hexagonYSapph.map.colorSpace = THREE.SRGBColorSpace;
    hexagonYSapph.map.wrapS = hexagonYSapph.map.wrapT = THREE.RepeatWrapping;
    hexagonYSapph.map.repeat.set(10, 10);
    pairs.set('hexagonYSapph', hexagonYSapph.map);

    // hexagonCamo
    const hexagonCamo = useTexture({
        map: 'textures/paves/hexCamo.png',
    });
    hexagonCamo.map.colorSpace = THREE.SRGBColorSpace;
    hexagonCamo.map.wrapS = hexagonCamo.map.wrapT = THREE.RepeatWrapping;
    hexagonCamo.map.repeat.set(10, 10);
    pairs.set('hexagonCamo', hexagonCamo.map);

    // hexagonGlitch
    const hexagonGlitch = useTexture({
        map: 'textures/paves/hexGlitch.png',
    });
    hexagonGlitch.map.colorSpace = THREE.SRGBColorSpace;
    hexagonGlitch.map.wrapS = hexagonGlitch.map.wrapT = THREE.RepeatWrapping;
    hexagonGlitch.map.repeat.set(10, 10);
    pairs.set('hexagonGlitch', hexagonGlitch.map);

    return(
        <meshStandardMaterial
            map={pairs.get(pave+firstCapital(stone))}
            metalness={1}
            roughness={0.1}
            envMap = {envMap}
        />
    )
}