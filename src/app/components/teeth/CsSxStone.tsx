'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";

export default function CsSxStone() {
    const tooth = useTeethStore((state) => state.teethGeometry.cssx.stone);
    const toothStone =  useTeethStore((state) => state.teethStones.cssx);
    const CSSXstone = memo(({visible}): JSX.Element => {
        return(
            <group position={tooth.position} quaternion={tooth.quaternion}>
                <mesh
                    geometry={tooth.children[0].geometry}
                    visible={visible}
                    position={tooth.children[0].position}
                    quaternion={tooth.children[0].quaternion}
                >
                    <StonesMaterial color={toothStone}/>
                </mesh>
            </group>
        )
    })
    return <CSSXstone visible={toothStone !== null}/>
}