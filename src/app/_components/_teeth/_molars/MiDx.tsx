'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
import DecalPave from "@/app/_components/_materials/DecalPave";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";

export default function MiDx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.midx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.midx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.midx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.midx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.midx);
    const toothFinish = useTeethStore((state: State) => state.teethFinish.midx);
    const MIDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry || toothJewelType === 'signature') return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[], position:THREE.Vector3;
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'fullDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>];
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

    return <MIDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}