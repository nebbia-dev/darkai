'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";
import {State} from "@/app/types/State";
import * as THREE from 'three'
export default function IliSxStone() {
    const tooth = useTeethStore((state: State) => state.teethGeometry.ilisx ? state.teethGeometry.ilisx.stones : undefined);
    const toothStone =  useTeethStore((state: State) => state.teethStones.ilisx);
    const ILISXstone = memo(({visible, type} : {visible: boolean, type: string|undefined}): JSX.Element => {
        if(!tooth || !toothStone.shape) {
            return (
                <mesh>
                </mesh>
            )
        }
        let shape;
        switch(type) {
            case 'marquise':
                shape = [tooth.marquise];
                break;
            case 'heart':
                shape = [tooth.heart];
                break;
            case 'circle':
                shape = [tooth.circle];
                break;
            case 'tear':
                shape = [tooth.tear];
                break;
            case 'square':
                shape = [tooth.square];
                break;
            default:
                shape = [undefined];
                break;
        }

        const posVec = new THREE.Vector3;
        const pos: THREE.Vector3 = shape[0] ? shape[0].getWorldPosition(posVec) : new THREE.Vector3();
        const quatVec = new THREE.Quaternion;
        const quat = shape[0] ? shape[0].getWorldQuaternion(quatVec) : new THREE.Quaternion();

        return(
            <>
                {shape[0] && <mesh
                    geometry={(shape[0] as THREE.Mesh).geometry}
                    visible={visible}
                    position={pos}
                    quaternion={quat}
                >
                    <StonesMaterial color={toothStone.color}/>
                </mesh>}
            </>
        )
    })
    return <ILISXstone visible={toothStone.shape !== undefined} type={toothStone.shape}/>
}