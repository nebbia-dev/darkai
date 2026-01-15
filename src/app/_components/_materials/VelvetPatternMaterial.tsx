import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {Decal, useTexture} from "@react-three/drei";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";

export default function VelvetPatternMaterial() {
    const color = useTeethStore((state:State) => state.packaging.in);

    const velvet = useTexture({
        map: 'textures/packaging/Pattern_Velluto.webp',
        normalMap: 'textures/packaging/Velluto_Normal.webp',
    });

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
        <Decal polygonOffsetFactor={-0} position={[0, 0, -0.4]} map={velvet.map}/>
    )
}