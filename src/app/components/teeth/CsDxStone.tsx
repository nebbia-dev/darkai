'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";
import State from "@/app/types/State";
import * as THREE from 'three'

export default function CsDxStone() {
    const tooth = useTeethStore((state: State) => state.teethGeometry.csdx ? state.teethGeometry.csdx.stone : undefined);
    const toothStone =  useTeethStore((state: State) => state.teethStones.csdx);
    const CSDXstone = memo(({visible} : {visible: boolean}): JSX.Element => {
        if(!tooth) return <></>
        return(
            <group position={tooth.position} quaternion={tooth.quaternion}>
                <mesh
                    geometry={(tooth.children[2] as THREE.Mesh).geometry}
                    visible={visible}
                    position={tooth.children[2].position}
                    quaternion={tooth.children[2].quaternion}
                >
                    <StonesMaterial color={toothStone}/>
                </mesh>
            </group>
        )
    })
    return <CSDXstone visible={toothStone !== undefined}/>
}