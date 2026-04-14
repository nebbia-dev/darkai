import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {useEnvironment, useTexture} from "@react-three/drei";
import * as THREE from "three";

export default function VelvetHingeMaterial() {
    const color = useTeethStore((state:State) => state.packaging?.in);
    // const envMap = useTeethStore((state: State) => state.envMap);

    const envMap = useEnvironment({
        // files: "envMaps/rosendal_park_sunset_puresky_1k.exr"
        files: "envMaps/Diamond_HDRI_Schiarita.hdr"
        // files: "envMaps/Diamond_HDRI.hdr"
    })

    const velvet = useTexture({
        map: 'textures/packaging/Linguetta_Base_color.webp',
        normalMap: 'textures/packaging/Linguetta_Normal.webp',
        metalnessMap: 'textures/packaging/Linguetta_Metallic.webp',
        roughnessMap: 'textures/packaging/Linguetta_Roughness.webp',
    });
    velvet.map.colorSpace = THREE.SRGBColorSpace;
    velvet.map.flipY = false;
    velvet.normalMap.flipY = false;
    velvet.metalnessMap.flipY = false;
    velvet.roughnessMap.flipY = false;

    let hex;
    switch(color) {
        case 'white':
            hex = 0xf8f8f8;
            break;
        case 'black':
            hex = 0x1f1f1f;
            break;
        case '130':
            hex = 0xc2c8cc;
            break;
        case '131':
            hex = 0xf1ece3;
            break;
        case '30':
            hex = 0xbf902e;
            break;
        case '78':
            hex = 0x6b3600;
            break;
        case '57':
            hex = 0xd53711;
            break;
        case '5':
            hex = 0x97021b;
            break;
        case '55':
            hex = 0x8799ba;
            break;
        case '95':
            hex = 0x181a4d;
            break;
        case 'nk41':
            hex = 0xaa98ea;
            break;
        case 'nk132':
            hex = 0x89057b;
            break;
        case 'nk124':
            hex = 0xfb8282;
            break;
        case '53':
            hex = 0x93bab3;
            break;
        case '54':
            hex = 0x02552d;
            break;
        case '76':
            hex = 0x0a3420;
            break;
    }

    return(
        <meshStandardMaterial
            color={hex}
            envMap={envMap}
            map={velvet.map}
            normalMap={velvet.normalMap}
            metalnessMap={velvet.metalnessMap}
            roughnessMap={velvet.roughnessMap}
        />
    )
}