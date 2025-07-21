// 'use client'
// import {useTeethStore} from "@/app/stores/teeth";
// import StonesMaterial from "@/app/components/materials/StonesMaterial";
// import {JSX, memo} from "react";
// import State from "@/app/types/State";
// export default function CiSxStone() {
//     const tooth = useTeethStore((state: State) => state.teethGeometry.cisx ? state.teethGeometry.cisx.stone : undefined);
//     const toothGroup = useTeethStore((state: State) => state.teethGeometry.cssx ? state.teethGeometry.cssx.stone : undefined);
//     console.log(tooth)
//     const toothStone =  useTeethStore((state: State) => state.teethStones.cisx);
//     const CISXstone = memo(({visible} : {visible: boolean}): JSX.Element => {
//         if(!tooth || !toothGroup) return <></>
//         return(
//             <group position={toothGroup.position} quaternion={toothGroup.quaternion}>
//                 <primitive object={tooth}
//                     visible={visible}
//                 >
//                     <StonesMaterial color={toothStone}/>
//                 </primitive>
//             </group>
//         )
//     })
//     return <CISXstone visible={toothStone !== undefined}/>
// }

'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";
import State from "@/app/types/State";
import * as THREE from 'three'

export default function CiSxStone() {
    const tooth = useTeethStore((state: State) => state.teethGeometry.cisx ? state.teethGeometry.cisx.stone : undefined);
    const toothStone =  useTeethStore((state: State) => state.teethStones.cisx);
    const CISXstone = memo(({visible} : {visible: boolean}): JSX.Element => {
        if(!tooth) return <></>
        return(
            <group position={tooth.position} quaternion={tooth.quaternion}>
                <mesh
                    geometry={(tooth.children[0] as THREE.Mesh).geometry}
                    visible={visible}
                    position={tooth.children[0].position}
                    quaternion={tooth.children[0].quaternion}
                >
                    <StonesMaterial color={toothStone}/>
                </mesh>
            </group>
        )
    })
    return <CISXstone visible={toothStone !== undefined}/>
}