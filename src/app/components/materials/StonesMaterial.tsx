'use client'

import {useTeethStore} from "@/app/stores/teeth";
import {MeshTransmissionMaterial} from "@react-three/drei";

export default function StonesMaterial({color} : {color: string | undefined}) {
    const envMap = useTeethStore((state) => state.envMap);
        let stoneColor;
        // SWITCH per i 5k colori che hanno deciso di inserirci
        switch(color) {
            case 'bSapph':
                stoneColor = 0x5773ff;
                break;
            case 'ruby':
                stoneColor = 0x9d0633;
                break;
            case 'ameth':
                stoneColor = 0x8756e8;
                break;
            case 'emerald':
                stoneColor = 0x0f6151;
                break;
            case 'whD':
                stoneColor = 0xffffff;
                break;
            case 'brD':
                stoneColor = 0x6e6869;
                break;
            case 'blD':
                stoneColor = 0x515252;
                break;
            case 'ySapph':
                stoneColor = 0xe8d78e;
                break;
            case 'pSapph':
                stoneColor = 0xd46ab7;
                break;
            case 'aqua':
                stoneColor = 0x37d0db;
                break;
        }
        return (<meshBasicMaterial
            color={stoneColor}
            reflectivity={1}
            refractionRatio={1}
            envMap = {envMap}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }

// export default function StonesMaterial({color} : {color: string | undefined}) {
//     const envMap = useTeethStore((state) => state.envMap);
//     return (<MeshTransmissionMaterial
//         color= '#FFFFFF'
//         ior ={5.00}
//         reflectivity={10}
//         chromaticAberration={1}
//         thickness={100}
//         distortion = {1}
//         // backside={true}
//         // backsideThickness={5}
//         clearcoat={1}
//         envMap = {envMap}
//         onUpdate={(self) => (self.needsUpdate = true)}
//         attach='material'
//     />)
// }