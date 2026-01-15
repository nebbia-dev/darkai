import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
// import {useTexture} from "@react-three/drei";

export default function BoxMaterial() {
    const color = useTeethStore((state: State) => state.packaging.out);
    const envMap = useTeethStore((state: State) => state.envMap);
    // const matcap = useTexture('/textures/matcaps/10.webp')
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
            hex = 0xf6f6f6;
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
            metalness={0.25}
            roughness={0.75}
        />
        // <meshMatcapMaterial
        //     color={hex}
        //     matcap={matcap}
        // />
    )
}