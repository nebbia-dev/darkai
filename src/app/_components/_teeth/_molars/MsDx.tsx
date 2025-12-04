'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
import DecalPave from "@/app/_components/_materials/DecalPave";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";
import Pave from "@/app/_components/_materials/Pave";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import resetUvs from "@/app/_helpers/_models-modifiers/resetUvs";

export default function MsDx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.msdx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.msdx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.msdx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.msdx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.msdx);
    const toothFinish = useTeethStore((state: State) => state.teethFinish.msdx);
    const MSDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
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
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <Pave pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBase color={toothMaterial} type={toothPave.shape}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
        }

        resetUvs(toothGeometry.fullDiamond.full, true);

        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible}>
                        {material[1]}
                    </mesh>
                    {(toothPave.shape === "round" || toothPave.shape === "mosaic") &&
                        <mesh geometry={geometry[1]} visible={visible}>
                            {material[0]}
                            {material[2]}
                        </mesh>
                    }
                </>
            )
        }
        return (
            <mesh geometry={geometry[0]} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    return <MSDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}