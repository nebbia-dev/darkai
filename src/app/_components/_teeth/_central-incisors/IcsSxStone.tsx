'use client'
import {useTeethStore} from "@/app/_stores/teeth";
import StonesMaterial from "@/app/_components/_materials/StonesMaterial";
import {JSX, memo} from "react";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
export default function IcsSxStone() {
    const tooth = useTeethStore((state: State) => state.teethGeometry.icssx ? state.teethGeometry.icssx.stones : undefined);
    const toothStone =  useTeethStore((state: State) => state.teethStones.icssx);
    const ICSSXstone = memo(({visible, type} : {visible: boolean, type: string|undefined}): JSX.Element => {
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
            case 'baguette':
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
    return <ICSSXstone visible={toothStone.shape !== undefined} type={toothStone.shape}/>
}