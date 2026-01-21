import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {useTexture} from "@react-three/drei";

export default function BoxMaterialInf() {
    const color = useTeethStore((state: State) => state.packaging.out);
    const envMap = useTeethStore((state: State) => state.envMap);

    const box = useTexture('textures/packaging/Inferiore.webp');
    box.flipY = false;

    let hex;
    switch(color) {
        case 'turquoise':
        hex = 0x7dcecb;
        break;
        case 'green':
        hex = 0x00b298;
            break;
        case 'pink':
            hex = 0xefbbc7;
            break;
        case 'lavender':
            hex = 0xb695c5;
            break;
        case 'yellow':
            hex = 0xfcd502;
            break;
        case 'orange':
            hex = 0xff6900;
            break;
        case 'red':
            hex = 0xe3002b;
            break;
        case 'fuchsia':
            hex = 0xef4a81;
            break;
        case 'blue':
            hex = 0x2b4592;
            break;
        case 'purple':
            hex = 0x380078;
            break;
        case 'gray':
            hex = 0x7b878e;
            break;
        case 'silver':
            hex = 0xc0c0c0;
            break;
        case 'black':
            hex = 0x221f20;
            break;
        case 'white':
            hex = 0xffffff;
            break;
    }

    return(
        <meshStandardMaterial
            color={hex}
            envMap={envMap}
            metalness={color === 'silver' ? 0.8 : 0.25}
            roughness={color === 'silver' ? 0.2 : 0.75}
            aoMap={box}
        />
    )
}