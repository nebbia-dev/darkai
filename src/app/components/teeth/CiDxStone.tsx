'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";
export default function CiDxStone() {
    const tooth = useTeethStore((state) => state.teethGeometry.cidx.stone);
    console.log(tooth)
    const toothStone =  useTeethStore((state) => state.teethStones.cidx);
    const CIDXstone = memo(({visible}): JSX.Element => {
        return(
            <group position={tooth.position} quaternion={tooth.quaternion}>
                <mesh
                    geometry={tooth.children[2].geometry}
                    visible={visible}
                    position={tooth.children[2].position}
                    quaternion={tooth.children[2].quaternion}
                >
                    <StonesMaterial color={toothStone}/>
                </mesh>
            </group>
        )
    })
    return <CIDXstone visible={toothStone !== null}/>
}