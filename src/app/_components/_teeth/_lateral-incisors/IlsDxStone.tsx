'use client'
import {useTeethStore} from "@/app/_stores/teeth";
import StonesMaterial from "@/app/_components/_materials/StonesMaterial";
import {JSX, memo} from "react";
import {State} from "@/app/_types/State";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import getQuaternion from "@/app/_helpers/_models-modifiers/getQuaternion";
export default function IlsDxStone() {
    const tooth = useTeethStore((state: State) => state.teethGeometry.ilsdx ? state.teethGeometry.ilsdx.stones : undefined);
    const toothStone =  useTeethStore((state: State) => state.teethStones.ilsdx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.ilsdx);
    const toothFinish = useTeethStore((state: State) => state.teethFinish.ilsdx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.ilsdx.shape);
    const ILSDXstone = memo(({visible, type, mat} : {visible: boolean, type: string|undefined, mat: string}): JSX.Element => {
        if(!tooth || !toothStone.shape) {
            return (
                <></>
            )
        }

        return(
            <>
                <mesh geometry={tooth[toothStone.shape].geometries[0]}
                      position={tooth[toothStone.shape].positions[0]}
                      quaternion={getQuaternion(tooth[toothStone.shape].quaternions[0], true, (toothPave as unknown as boolean), false)}
                      visible={false}
                >
                </mesh>
                <mesh geometry={tooth[toothStone.shape].geometries[0]}
                      position={tooth[toothStone.shape].positions[0]}
                      quaternion={getQuaternion(tooth[toothStone.shape].quaternions[0], true, (toothPave as unknown as boolean), false)}
                >
                    <FullMaterial color={toothMaterial} finish={toothFinish}/>
                </mesh>
                <mesh geometry={tooth[toothStone.shape].geometries[1]}
                      position={tooth[toothStone.shape].positions[1]}
                      quaternion={getQuaternion(tooth[toothStone.shape].quaternions[1], true, (toothPave as unknown as boolean), false)}
                >
                    <StonesMaterial color={toothStone.color}/>
                </mesh>
            </>
        )
    })
    return <ILSDXstone visible={toothStone.shape !== undefined} type={toothStone.shape} mat={toothMaterial}/>
}