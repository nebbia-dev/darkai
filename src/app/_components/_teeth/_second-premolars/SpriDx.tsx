'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import FullDiamond from "@/app/_components/_materials/FullDiamond";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function SpriDx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.spridx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.spridx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.spridx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.spridx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.spridx);
    const toothFinish = useTeethStore((state: State) => state.teethFinish.spridx);
    const SPRIDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry || toothJewelType === 'signature') return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[], position:THREE.Vector3;
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'fullDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullDiamond color={toothMaterial}/>, <FullDiamond color={toothMaterial}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>];
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

    return <SPRIDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}