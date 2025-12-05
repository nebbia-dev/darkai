import {useEnvironment, useTexture} from "@react-three/drei";
import * as THREE from "three";
import {useTeethStore} from "@/app/_stores/teeth";

export default function PaveBar({pave, stone} : {pave:string|undefined, stone:string|undefined}) {

    if(!stone || !pave) return;

    // const envMap = useTeethStore((state) => state.envMap);

    const envMap = useEnvironment({
        // files: "envMaps/rosendal_park_sunset_puresky_1k.exr"
        files: "envMaps/Diamond_HDRI_Schiarita.hdr"
        // files: "envMaps/Diamond_HDRI.hdr"
    })

    const pairs = new Map();

    /* ROUND PAVE */
    const round = useTexture({
        map: 'textures/bar/singoli/Bar_Round.webp',
    });
    round.map.colorSpace = THREE.SRGBColorSpace;
    // round.map.flipY = false;
    pairs.set('round', round.map);

    /* NORMAL ROUND */
    const roundNormal = useTexture({
        normalMap: 'textures/bar/singoli/Bar_Diamanti_Normal.webp',
    });
   // roundNormal.normalMap.flipY = false;
    pairs.set('roundNormal', roundNormal.normalMap);

    /* BAGUETTE PAVE */
    const baguette = useTexture({
        map: 'textures/bar/singoli/Bar_Pavè_Baguette.webp',
    });
    baguette.map.colorSpace = THREE.SRGBColorSpace;
    // baguette.map.flipY = false;
    pairs.set('baguette', baguette.map);

    /* NORMAL BAGUETTE */
    const baguetteNormal = useTexture({
        normalMap: 'textures/bar/singoli/Bar_Pavè_Baguette_Normal.webp',
    });
    // baguetteNormal.normalMap.flipY = false;
    pairs.set('baguetteNormal', baguetteNormal.normalMap);

    let hex;

    switch(stone) {
        case 'bSapph':
            hex = 0x0073b6;
            break;
        case 'aqua':
            hex = 0x00bdca;
            break;
        case 'emerald':
            hex = 0x0c8241;
            break;
        case 'ySapph':
            hex = 0xffc007;
            break;
        case 'ruby':
            hex = 0xe91825;
            break;
        case 'pSapph':
            hex = 0xff6588;
            break;
        case 'ameth':
            hex = 0xae3b9f;
            break;
        case 'whD':
            hex = 0xffffff;
            break;
        case 'brD':
            hex = 0x4c3e34;
            break;
        case 'blD':
            hex = 0x1d1e1e;
            break;
        default:
            hex = 0xffffff;
            break;
    }

    return (
        <meshStandardMaterial
            transparent={true}
            map={pairs.get(pave)}
            normalMap={pairs.get(pave + "Normal")}
            envMapIntensity={2}
            color={hex}
            metalness={1}
            roughness={0.2}
            envMap={envMap}
        />
    )
}