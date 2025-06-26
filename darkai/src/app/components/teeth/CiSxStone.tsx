'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";

export default function CiSxStone() {
    const tooth = useTeethStore((state) => state.teethGeometry.cisx.stone);
    const toothStone =  useTeethStore((state) => state.teethStones.cisx);
    const CISXstone = memo(({visible}): JSX.Element => {
        return(
            <group position={tooth.position} quaternion={tooth.quaternion}>
                <mesh
                    geometry={tooth.children[3].geometry}
                    visible={visible}
                    position={tooth.children[3].position}
                    quaternion={tooth.children[3].quaternion}
                >
                    <StonesMaterial color={toothStone}/>
                </mesh>
            </group>
        )
    })
    return <CISXstone visible={toothStone !== null}/>
}