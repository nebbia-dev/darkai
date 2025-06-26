'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";
export default function CiSxStone() {
    const tooth = useTeethStore((state) => state.teethGeometry.cisx.stone);
    const toothGroup = useTeethStore((state) => state.teethGeometry.cssx.stone);
    console.log(tooth)
    const toothStone =  useTeethStore((state) => state.teethStones.cisx);
    const CISXstone = memo(({visible}): JSX.Element => {
        return(
            <group position={toothGroup.position} quaternion={toothGroup.quaternion}>
                <primitive object={tooth}
                    visible={visible}
                >
                    <StonesMaterial color={toothStone}/>
                </primitive>
            </group>
        )
    })
    return <CISXstone visible={toothStone !== null}/>
}