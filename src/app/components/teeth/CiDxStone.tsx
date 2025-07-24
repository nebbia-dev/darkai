'use client'
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {JSX, memo} from "react";
import State from "@/app/types/State";
import * as THREE from 'three'
export default function CiDxStone() {
    const tooth = useTeethStore((state: State) => state.teethGeometry.cidx ? state.teethGeometry.cidx.stones : undefined);
    const toothStone =  useTeethStore((state: State) => state.teethStones.cidx ? state.teethStones.cidx : undefined);
    const CIDXstone = memo(({visible, type} : {visible: boolean, type: string|undefined}): JSX.Element => {
        if(!tooth || !toothStone?.shape) return <></>
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
        }

        const posVec = new THREE.Vector3;
        const pos = shape[0].getWorldPosition(posVec);
        const quatVec = new THREE.Quaternion;
        const quat = shape[0].getWorldQuaternion(quatVec);

        return(
            <mesh
                geometry={shape[0].geometry}
                visible={visible}
                position={pos}
                quaternion={quat}
            >
                <StonesMaterial color={toothStone.color}/>
            </mesh>
        )
    })
    return <CIDXstone visible={toothStone !== undefined} type={toothStone?.shape}/>
}