'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";
import State from "@/app/types/State";
export default function CiSxStone() {
    const tooth = useTeethStore((state: State) => state.teethGeometry.cisx ? state.teethGeometry.cisx.stone : null);
    const toothGroup = useTeethStore((state: State) => state.teethGeometry.cssx ? state.teethGeometry.cssx.stone : null);
    console.log(tooth)
    const toothStone =  useTeethStore((state: State) => state.teethStones.cisx);
    const CISXstone = memo(({visible} : {visible: boolean}): JSX.Element => {
        if(!tooth || !toothGroup) return <></>
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