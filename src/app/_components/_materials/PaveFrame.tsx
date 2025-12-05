import {useEnvironment, useTexture} from "@react-three/drei";
import * as THREE from "three";
import {useTeethStore} from "@/app/_stores/teeth";

export default function PaveFrame({stone} : {stone:string|undefined}) {
    if(!stone) return;

    // const envMap = useTeethStore((state) => state.envMap);

    const envMap = useEnvironment({
        // files: "envMaps/rosendal_park_sunset_puresky_1k.exr"
        files: "envMaps/Diamond_HDRI_Schiarita.hdr"
        // files: "envMaps/Diamond_HDRI.hdr"
    })

    /* ROUND PAVE */
    const round = useTexture({
        map: 'textures/frame/Frame_Round_Texture_Diamanti.webp',
    });
    round.map.colorSpace = THREE.SRGBColorSpace;
    round.map.flipY = false;

    /* NORMAL */
    const normal = useTexture({
        normalMap: 'textures/frame/Frame_Round_Texture_Diamanti_Normal.webp',
    });

   normal.normalMap.flipY = false;

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
            map={round.map}
            normalMap={normal.normalMap}
            envMapIntensity={2}
            color={hex}
            metalness={1}
            roughness={0.2}
            envMap={envMap}
        />
    )
}