'use client'

import {useTeethStore} from "@/app/_stores/teeth";

export default function FullEnamel({color} : {color: string}) {
    const envMap = useTeethStore((state) => state.envMap);
    let hex;
    switch(color) {
        case 'blue':
            hex = 0x0073b6;
            break;
        case 'turquoise':
            hex = 0x00bdca;
            break;
        case 'green':
            hex = 0x0c8241;
            break;
        case 'yellow':
            hex = 0xffc007;
            break;
        case 'orange':
            hex = 0xff7b00;
            break;
        case 'red':
            hex = 0xe91825;
            break;
        case 'pink':
            hex = 0xff6588;
            break;
        case 'purple':
            hex = 0xae3b9f;
            break;
        case 'ivory':
            hex = 0xf1eee1;
            break;
        case 'brown':
            hex = 0x4c3e34;
            break;
        case 'black':
            hex = 0x1d1e1e;
            break;
        default:
            hex = 0xf1eee1;
            break;
    }

    return (<meshBasicMaterial
            color={hex}
            reflectivity={0.4}
            envMap = {envMap}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }
