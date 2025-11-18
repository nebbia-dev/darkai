'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import BaseFullDiamond from "@/app/_components/_materials/BaseFullDiamond";
import FullDiamond from "@/app/_components/_materials/FullDiamond";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function SprsSx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.sprssx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.sprssx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.sprssx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.sprssx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.sprssx);
    const SPRSSX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry || toothJewelType === 'signature') return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[], position:THREE.Vector3;
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>]
                position = new THREE.Vector3();
                break;
            case 'fullDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullDiamond color={toothMaterial}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>];
                position = new THREE.Vector3();
        }

        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible}>
                        {material[1]}
                        {type !== 'enamel' && <DecalPave scale={type === 'bigBarDiamond' ? 3 : 1} position={position} pave={toothPave.shape} stone={toothPave.color}/>}
                    </mesh>
                </>
            )
        }
        return (
            <mesh geometry={geometry[0]} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    return <SPRSSX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}