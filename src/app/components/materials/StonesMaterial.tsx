'use client'

import {useTeethStore} from "@/app/stores/teeth";
import {MeshTransmissionMaterial} from "@react-three/drei";

export default function StonesMaterial({color} : {color: string | undefined}) {
    const envMap = useTeethStore((state) => state.envMap);
        // SWITCH per i 5k colori che hanno deciso di inserirci
        return (<meshBasicMaterial
            color={color === 'sapphire'
                ? 0x5773ff
                : color === 'ruby'
                    ? 0x9d0633
                    : color === 'amethyst'
                        ? 0x6c2593
                        : 0x0f6151}
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