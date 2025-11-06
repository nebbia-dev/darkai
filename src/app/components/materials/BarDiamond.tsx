'use client'
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/stores/teeth";
import firstCapital from "@/app/helpers/firstCapital";

export default function BarDiamond({color, pave, stone} : {color: string, pave: string|undefined, stone:string|undefined}) {
    if(!pave || !stone) return;
    const envMap = useTeethStore((state) => state.envMap);

    let gold;

    switch(color) {
        case 'gold':
            gold = 0xfaff8b;
            break;
        case 'pink':
            gold = 0xe8aec5;
            break;
        case 'black':
            gold = 0x2c2d18;
            break;
        case 'white':
            gold = 0xedeee2;
            break;
        default:
            gold = 0xfaff8b;
    }
    // Base
    const baseProps = useTexture({
        normalMap: 'textures/diamondFull/Normal_Diamanti.webp',
        metalnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
        roughnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
    });

    baseProps.normalMap.wrapS = baseProps.normalMap.wrapT = THREE.RepeatWrapping;
    baseProps.normalMap.repeat.set(20,20);
    baseProps.metalnessMap.wrapS = baseProps.metalnessMap.wrapT = THREE.RepeatWrapping;
    baseProps.metalnessMap.repeat.set(20,20);

    const pairs = new Map();

    /* ROUND PAVE*/
    // roundWhD
    const roundWhD = useTexture({
        map: 'textures/paves/roundWhD.png',
    });
    roundWhD.map.colorSpace = THREE.SRGBColorSpace;
    roundWhD.map.wrapS = roundWhD.map.wrapT = THREE.RepeatWrapping;
    roundWhD.map.repeat.set(20,20);
    pairs.set('roundWhD', roundWhD.map);

    // roundBrD
    const roundBrD = useTexture({
        map: 'textures/paves/roundBrD.png',
    });
    roundBrD.map.colorSpace = THREE.SRGBColorSpace;
    roundBrD.map.wrapS = roundBrD.map.wrapT = THREE.RepeatWrapping;
    roundBrD.map.repeat.set(20,20);
    pairs.set('roundBrD', roundBrD.map);

    // roundBlD
    const roundBlD = useTexture({
        map: 'textures/paves/roundBlD.png',
    });
    roundBlD.map.colorSpace = THREE.SRGBColorSpace;
    roundBlD.map.wrapS = roundBlD.map.wrapT = THREE.RepeatWrapping;
    roundBlD.map.repeat.set(20,20);
    pairs.set('roundBlD', roundBlD.map);

    // roundRuby
    const roundRuby = useTexture({
        map: 'textures/paves/roundRuby.png',
    });
    roundRuby.map.colorSpace = THREE.SRGBColorSpace;
    roundRuby.map.wrapS = roundRuby.map.wrapT = THREE.RepeatWrapping;
    roundRuby.map.repeat.set(20,20);
    pairs.set('roundRuby', roundRuby.map);

    // roundEmerald
    const roundEmerald = useTexture({
        map: 'textures/paves/roundEmerald.png',
    });
    roundEmerald.map.colorSpace = THREE.SRGBColorSpace;
    roundEmerald.map.wrapS = roundEmerald.map.wrapT = THREE.RepeatWrapping;
    roundEmerald.map.repeat.set(20,20);
    pairs.set('roundEmerald', roundEmerald.map);

    // roundAmeth
    const roundAmeth = useTexture({
        map: 'textures/paves/roundAmeth.png',
    });
    roundAmeth.map.colorSpace = THREE.SRGBColorSpace;
    roundAmeth.map.wrapS = roundAmeth.map.wrapT = THREE.RepeatWrapping;
    roundAmeth.map.repeat.set(20,20);
    pairs.set('roundAmeth', roundAmeth.map);

    // roundAqua
    const roundAqua = useTexture({
        map: 'textures/paves/roundAqua.png',
    });
    roundAqua.map.colorSpace = THREE.SRGBColorSpace;
    roundAqua.map.wrapS = roundAqua.map.wrapT = THREE.RepeatWrapping;
    roundAqua.map.repeat.set(20,20);
    pairs.set('roundAqua', roundAqua.map);

    // roundBSapph
    const roundBSapph = useTexture({
        map: 'textures/paves/roundBSapph.png',
    });
    roundBSapph.map.colorSpace = THREE.SRGBColorSpace;
    roundBSapph.map.wrapS = roundBSapph.map.wrapT = THREE.RepeatWrapping;
    roundBSapph.map.repeat.set(20,20);
    pairs.set('roundBSapph', roundBSapph.map);

    // roundPSapph
    const roundPSapph = useTexture({
        map: 'textures/paves/roundPSapph.png',
    });
    roundPSapph.map.colorSpace = THREE.SRGBColorSpace;
    roundPSapph.map.wrapS = roundPSapph.map.wrapT = THREE.RepeatWrapping;
    roundPSapph.map.repeat.set(20,20);
    pairs.set('roundPSapph', roundPSapph.map);

    // roundYSapph
    const roundYSapph = useTexture({
        map: 'textures/paves/roundYSapph.png',
    });
    roundYSapph.map.colorSpace = THREE.SRGBColorSpace;
    roundYSapph.map.wrapS = roundYSapph.map.wrapT = THREE.RepeatWrapping;
    roundYSapph.map.repeat.set(20,20);
    pairs.set('roundYSapph', roundYSapph.map);

    /* PRINCESS PAVE*/
    // sqWhD
    const sqWhD = useTexture({
        map: 'textures/paves/sqWhD.png',
    });
    sqWhD.map.colorSpace = THREE.SRGBColorSpace;
    sqWhD.map.wrapS = sqWhD.map.wrapT = THREE.RepeatWrapping;
    sqWhD.map.repeat.set(20,20);
    pairs.set('sqWhD', sqWhD.map);

    // sqBrD
    const sqBrD = useTexture({
        map: 'textures/paves/sqBrD.png',
    });
    sqBrD.map.colorSpace = THREE.SRGBColorSpace;
    sqBrD.map.wrapS = sqBrD.map.wrapT = THREE.RepeatWrapping;
    sqBrD.map.repeat.set(20,20);
    pairs.set('sqBrD', sqBrD.map);

    // sqBlD
    const sqBlD = useTexture({
        map: 'textures/paves/sqBlD.png',
    });
    sqBlD.map.colorSpace = THREE.SRGBColorSpace;
    sqBlD.map.wrapS = sqBlD.map.wrapT = THREE.RepeatWrapping;
    sqBlD.map.repeat.set(20,20);
    pairs.set('sqBlD', sqBlD.map);

    // sqRuby
    const sqRuby = useTexture({
        map: 'textures/paves/sqRuby.png',
    });
    sqRuby.map.colorSpace = THREE.SRGBColorSpace;
    sqRuby.map.wrapS = sqRuby.map.wrapT = THREE.RepeatWrapping;
    sqRuby.map.repeat.set(20,20);
    pairs.set('sqRuby', sqRuby.map);

    // sqEmerald
    const sqEmerald = useTexture({
        map: 'textures/paves/sqEmerald.png',
    });
    sqEmerald.map.colorSpace = THREE.SRGBColorSpace;
    sqEmerald.map.wrapS = sqEmerald.map.wrapT = THREE.RepeatWrapping;
    sqEmerald.map.repeat.set(20,20);
    pairs.set('sqEmerald', sqEmerald.map);

    // sqAmeth
    const sqAmeth = useTexture({
        map: 'textures/paves/sqAmeth.png',
    });
    sqAmeth.map.colorSpace = THREE.SRGBColorSpace;
    sqAmeth.map.wrapS = sqAmeth.map.wrapT = THREE.RepeatWrapping;
    sqAmeth.map.repeat.set(20,20);
    pairs.set('sqAmeth', sqAmeth.map);

    // sqAqua
    const sqAqua = useTexture({
        map: 'textures/paves/sqAqua.png',
    });
    sqAqua.map.colorSpace = THREE.SRGBColorSpace;
    sqAqua.map.wrapS = sqAqua.map.wrapT = THREE.RepeatWrapping;
    sqAqua.map.repeat.set(20,20);
    pairs.set('sqAqua', sqAqua.map);

    // sqBSapph
    const sqBSapph = useTexture({
        map: 'textures/paves/sqBSapph.png',
    });
    sqBSapph.map.colorSpace = THREE.SRGBColorSpace;
    sqBSapph.map.wrapS = sqBSapph.map.wrapT = THREE.RepeatWrapping;
    sqBSapph.map.repeat.set(20,20);
    pairs.set('sqBSapph', sqBSapph.map);

    // sqPSapph
    const sqPSapph = useTexture({
        map: 'textures/paves/sqPSapph.png',
    });
    sqPSapph.map.colorSpace = THREE.SRGBColorSpace;
    sqPSapph.map.wrapS = sqPSapph.map.wrapT = THREE.RepeatWrapping;
    sqPSapph.map.repeat.set(20,20);
    pairs.set('sqPSapph', sqPSapph.map);

    // sqYSapph
    const sqYSapph = useTexture({
        map: 'textures/paves/sqYSapph.png',
    });
    sqYSapph.map.colorSpace = THREE.SRGBColorSpace;
    sqYSapph.map.wrapS = sqYSapph.map.wrapT = THREE.RepeatWrapping;
    sqYSapph.map.repeat.set(20,20);
    pairs.set('sqYSapph', sqYSapph.map);

    /* BAGUETTE PAVE*/
    // rectWhD
    const rectWhD = useTexture({
        map: 'textures/paves/rectWhD.png',
    });
    rectWhD.map.colorSpace = THREE.SRGBColorSpace;
    rectWhD.map.wrapS = rectWhD.map.wrapT = THREE.RepeatWrapping;
    rectWhD.map.repeat.set(20,20);
    pairs.set('rectWhD', rectWhD.map);

    // rectBrD
    const rectBrD = useTexture({
        map: 'textures/paves/rectBrD.png',
    });
    rectBrD.map.colorSpace = THREE.SRGBColorSpace;
    rectBrD.map.wrapS = rectBrD.map.wrapT = THREE.RepeatWrapping;
    rectBrD.map.repeat.set(20,20);
    pairs.set('rectBrD', rectBrD.map);

    // rectBlD
    const rectBlD = useTexture({
        map: 'textures/paves/rectBlD.png',
    });
    rectBlD.map.colorSpace = THREE.SRGBColorSpace;
    rectBlD.map.wrapS = rectBlD.map.wrapT = THREE.RepeatWrapping;
    rectBlD.map.repeat.set(20,20);
    pairs.set('rectBlD', rectBlD.map);

    // rectRuby
    const rectRuby = useTexture({
        map: 'textures/paves/rectRuby.png',
    });
    rectRuby.map.colorSpace = THREE.SRGBColorSpace;
    rectRuby.map.wrapS = rectRuby.map.wrapT = THREE.RepeatWrapping;
    rectRuby.map.repeat.set(20,20);
    pairs.set('rectRuby', rectRuby.map);

    // rectEmerald
    const rectEmerald = useTexture({
        map: 'textures/paves/rectEmerald.png',
    });
    rectEmerald.map.colorSpace = THREE.SRGBColorSpace;
    rectEmerald.map.wrapS = rectEmerald.map.wrapT = THREE.RepeatWrapping;
    rectEmerald.map.repeat.set(20,20);
    pairs.set('rectEmerald', rectEmerald.map);

    // rectAmeth
    const rectAmeth = useTexture({
        map: 'textures/paves/rectAmeth.png',
    });
    rectAmeth.map.colorSpace = THREE.SRGBColorSpace;
    rectAmeth.map.wrapS = rectAmeth.map.wrapT = THREE.RepeatWrapping;
    rectAmeth.map.repeat.set(20,20);
    pairs.set('rectAmeth', rectAmeth.map);

    // rectAqua
    const rectAqua = useTexture({
        map: 'textures/paves/rectAqua.png',
    });
    rectAqua.map.colorSpace = THREE.SRGBColorSpace;
    rectAqua.map.wrapS = rectAqua.map.wrapT = THREE.RepeatWrapping;
    rectAqua.map.repeat.set(20,20);
    pairs.set('rectAqua', rectAqua.map);

    // rectBSapph
    const rectBSapph = useTexture({
        map: 'textures/paves/rectBSapph.png',
    });
    rectBSapph.map.colorSpace = THREE.SRGBColorSpace;
    rectBSapph.map.wrapS = rectBSapph.map.wrapT = THREE.RepeatWrapping;
    rectBSapph.map.repeat.set(20,20);
    pairs.set('rectBSapph', rectBSapph.map);

    // rectPSapph
    const rectPSapph = useTexture({
        map: 'textures/paves/rectPSapph.png',
    });
    rectPSapph.map.colorSpace = THREE.SRGBColorSpace;
    rectPSapph.map.wrapS = rectPSapph.map.wrapT = THREE.RepeatWrapping;
    rectPSapph.map.repeat.set(20,20);
    pairs.set('rectPSapph', rectPSapph.map);

    // rectYSapph
    const rectYSapph = useTexture({
        map: 'textures/paves/rectYSapph.png',
    });
    rectYSapph.map.colorSpace = THREE.SRGBColorSpace;
    rectYSapph.map.wrapS = rectYSapph.map.wrapT = THREE.RepeatWrapping;
    rectYSapph.map.repeat.set(20,20);
    pairs.set('rectYSapph', rectYSapph.map);

    /* MOSAIC PAVE*/
    // mosWhD
    const mosWhD = useTexture({
        map: 'textures/paves/mosWhD.png',
    });
    mosWhD.map.colorSpace = THREE.SRGBColorSpace;
    mosWhD.map.wrapS = mosWhD.map.wrapT = THREE.RepeatWrapping;
    mosWhD.map.repeat.set(20,20);
    pairs.set('mosWhD', mosWhD.map);

    // mosBrD
    const mosBrD = useTexture({
        map: 'textures/paves/mosBrD.png',
    });
    mosBrD.map.colorSpace = THREE.SRGBColorSpace;
    mosBrD.map.wrapS = mosBrD.map.wrapT = THREE.RepeatWrapping;
    mosBrD.map.repeat.set(20,20);
    pairs.set('mosBrD', mosBrD.map);

    // mosBlD
    const mosBlD = useTexture({
        map: 'textures/paves/mosBlD.png',
    });
    mosBlD.map.colorSpace = THREE.SRGBColorSpace;
    mosBlD.map.wrapS = mosBlD.map.wrapT = THREE.RepeatWrapping;
    mosBlD.map.repeat.set(20,20);
    pairs.set('mosBlD', mosBlD.map);

    // mosRuby
    const mosRuby = useTexture({
        map: 'textures/paves/mosRuby.png',
    });
    mosRuby.map.colorSpace = THREE.SRGBColorSpace;
    mosRuby.map.wrapS = mosRuby.map.wrapT = THREE.RepeatWrapping;
    mosRuby.map.repeat.set(20,20);
    pairs.set('mosRuby', mosRuby.map);

    // mosEmerald
    const mosEmerald = useTexture({
        map: 'textures/paves/mosEmerald.png',
    });
    mosEmerald.map.colorSpace = THREE.SRGBColorSpace;
    mosEmerald.map.wrapS = mosEmerald.map.wrapT = THREE.RepeatWrapping;
    mosEmerald.map.repeat.set(20,20);
    pairs.set('mosEmerald', mosEmerald.map);

    // mosAmeth
    const mosAmeth = useTexture({
        map: 'textures/paves/mosAmeth.png',
    });
    mosAmeth.map.colorSpace = THREE.SRGBColorSpace;
    mosAmeth.map.wrapS = mosAmeth.map.wrapT = THREE.RepeatWrapping;
    mosAmeth.map.repeat.set(20,20);
    pairs.set('mosAmeth', mosAmeth.map);

    // mosAqua
    const mosAqua = useTexture({
        map: 'textures/paves/mosAqua.png',
    });
    mosAqua.map.colorSpace = THREE.SRGBColorSpace;
    mosAqua.map.wrapS = mosAqua.map.wrapT = THREE.RepeatWrapping;
    mosAqua.map.repeat.set(20,20);
    pairs.set('mosAqua', mosAqua.map);

    // mosBSapph
    const mosBSapph = useTexture({
        map: 'textures/paves/mosBSapph.png',
    });
    mosBSapph.map.colorSpace = THREE.SRGBColorSpace;
    mosBSapph.map.wrapS = mosBSapph.map.wrapT = THREE.RepeatWrapping;
    mosBSapph.map.repeat.set(20,20);
    pairs.set('mosBSapph', mosBSapph.map);

    // mosPSapph
    const mosPSapph = useTexture({
        map: 'textures/paves/mosPSapph.png',
    });
    mosPSapph.map.colorSpace = THREE.SRGBColorSpace;
    mosPSapph.map.wrapS = mosPSapph.map.wrapT = THREE.RepeatWrapping;
    mosPSapph.map.repeat.set(20,20);
    pairs.set('mosPSapph', mosPSapph.map);

    // mosYSapph
    const mosYSapph = useTexture({
        map: 'textures/paves/mosYSapph.png',
    });
    mosYSapph.map.colorSpace = THREE.SRGBColorSpace;
    mosYSapph.map.wrapS = mosYSapph.map.wrapT = THREE.RepeatWrapping;
    mosYSapph.map.repeat.set(20,20);
    pairs.set('mosYSapph', mosYSapph.map);

    /* HEXAGON PAVE*/
    // hexWhD
    const hexWhD = useTexture({
        map: 'textures/paves/hexWhD.png',
    });
    hexWhD.map.colorSpace = THREE.SRGBColorSpace;
    hexWhD.map.wrapS = hexWhD.map.wrapT = THREE.RepeatWrapping;
    hexWhD.map.repeat.set(20,20);
    pairs.set('hexWhD', hexWhD.map);

    // hexBrD
    const hexBrD = useTexture({
        map: 'textures/paves/hexBrD.png',
    });
    hexBrD.map.colorSpace = THREE.SRGBColorSpace;
    hexBrD.map.wrapS = hexBrD.map.wrapT = THREE.RepeatWrapping;
    hexBrD.map.repeat.set(20,20);
    pairs.set('hexBrD', hexBrD.map);

    // hexBlD
    const hexBlD = useTexture({
        map: 'textures/paves/hexBlD.png',
    });
    hexBlD.map.colorSpace = THREE.SRGBColorSpace;
    hexBlD.map.wrapS = hexBlD.map.wrapT = THREE.RepeatWrapping;
    hexBlD.map.repeat.set(20,20);
    pairs.set('hexBlD', hexBlD.map);

    // hexRuby
    const hexRuby = useTexture({
        map: 'textures/paves/hexRuby.png',
    });
    hexRuby.map.colorSpace = THREE.SRGBColorSpace;
    hexRuby.map.wrapS = hexRuby.map.wrapT = THREE.RepeatWrapping;
    hexRuby.map.repeat.set(20,20);
    pairs.set('hexRuby', hexRuby.map);

    // hexEmerald
    const hexEmerald = useTexture({
        map: 'textures/paves/hexEmerald.png',
    });
    hexEmerald.map.colorSpace = THREE.SRGBColorSpace;
    hexEmerald.map.wrapS = hexEmerald.map.wrapT = THREE.RepeatWrapping;
    hexEmerald.map.repeat.set(20,20);
    pairs.set('hexEmerald', hexEmerald.map);

    // hexAmeth
    const hexAmeth = useTexture({
        map: 'textures/paves/hexAmeth.png',
    });
    hexAmeth.map.colorSpace = THREE.SRGBColorSpace;
    hexAmeth.map.wrapS = hexAmeth.map.wrapT = THREE.RepeatWrapping;
    hexAmeth.map.repeat.set(20,20);
    pairs.set('hexAmeth', hexAmeth.map);

    // hexAqua
    const hexAqua = useTexture({
        map: 'textures/paves/hexAqua.png',
    });
    hexAqua.map.colorSpace = THREE.SRGBColorSpace;
    hexAqua.map.wrapS = hexAqua.map.wrapT = THREE.RepeatWrapping;
    hexAqua.map.repeat.set(20,20);
    pairs.set('hexAqua', hexAqua.map);

    // hexBSapph
    const hexBSapph = useTexture({
        map: 'textures/paves/hexBSapph.png',
    });
    hexBSapph.map.colorSpace = THREE.SRGBColorSpace;
    hexBSapph.map.wrapS = hexBSapph.map.wrapT = THREE.RepeatWrapping;
    hexBSapph.map.repeat.set(20,20);
    pairs.set('hexBSapph', hexBSapph.map);

    // hexPSapph
    const hexPSapph = useTexture({
        map: 'textures/paves/hexPSapph.png',
    });
    hexPSapph.map.colorSpace = THREE.SRGBColorSpace;
    hexPSapph.map.wrapS = hexPSapph.map.wrapT = THREE.RepeatWrapping;
    hexPSapph.map.repeat.set(20,20);
    pairs.set('hexPSapph', hexPSapph.map);

    // hexYSapph
    const hexYSapph = useTexture({
        map: 'textures/paves/hexYSapph.png',
    });
    hexYSapph.map.colorSpace = THREE.SRGBColorSpace;
    hexYSapph.map.wrapS = hexYSapph.map.wrapT = THREE.RepeatWrapping;
    hexYSapph.map.repeat.set(20,20);
    pairs.set('hexYSapph', hexYSapph.map);

        // return (<meshStandardMaterial
        //     map={pairs.get(pave+firstCapital(stone)) ?? undefined}
        //     normalMap={color !== 'base' ? baseProps.normalMap : undefined}
        //     metalnessMap = {color !== 'base' ? baseProps.metalnessMap : undefined}
        //     roughnessMap = {color !== 'base' ? baseProps.roughnessMap : undefined}
        //     metalness = {color !== 'base' ? 1 : 0}
        //     roughness = {color !== 'base' ? 0.5 : 1}
        //     envMap = {envMap}
        //     color={color !== 'base' ? undefined : 'grey'}
        //     onUpdate={(self) => (self.needsUpdate = true)}
        //     attach='material'
        // />)

    return (<meshBasicMaterial
        map={pairs.get(pave + firstCapital(stone))}
        reflectivity={1}
        refractionRatio={1}
        envMap = {envMap}
        color={gold}
        onUpdate={(self) => (self.needsUpdate = true)}
        attach='material'
    />)
    }