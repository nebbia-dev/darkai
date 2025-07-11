'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";

export default function CsDxStone() {
    const tooth = useTeethStore((state) => state.teethGeometry.csdx.stone);
    const toothStone =  useTeethStore((state) => state.teethStones.csdx);
    const CSDXstone = memo(({visible}): JSX.Element => {
        return(
            <group position={tooth.position} quaternion={tooth.quaternion}>
                <mesh
                    geometry={tooth.children[1].geometry}
                    visible={visible}
                    position={tooth.children[1].position}
                    quaternion={tooth.children[1].quaternion}
                >
                    <StonesMaterial color={toothStone}/>
                </mesh>
            </group>
        )
    })
    return <CSDXstone visible={toothStone !== null}/>
}