'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import * as THREE from "three";
import Pave from "@/app/_components/_materials/Pave";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import resetUvs from "@/app/_helpers/_models-modifiers/resetUvs";

export default function Cross() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.cross);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.cross);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.cross);
    const CROSS = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const position = signatureGeometry.position
        let geometry:THREE.BufferGeometry[], material:JSX.Element[];
        switch(mat) {
            case 'pave_lab':
            case 'pave_nat':
                geometry = [signatureGeometry.base, signatureGeometry.pave];
                material = [<FullMaterial finish="polished" color="white"/>, <Pave pave="round" stone="whD_lab"/>, <RoundPaveBase stone="whD_lab" color="white" pave="round"/>];
                break;
            case 'base_white':
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="white"/>]
                break;
            case 'base_gold':
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="gold"/>]
                break;
            case 'base_rose':
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="rose"/>]
                break;
            default:
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="white"/>];
        }

        resetUvs(signatureGeometry.pave, false, 'cross');

        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} position={position}>
                        {material[1]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} position={position}>
                        {material[0]}
                        {material[2]}
                    </mesh>
                </>
            )
        }

        return (
            <>
                <mesh geometry={geometry[0]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                </>
            )
    })

    return <CROSS visible={signatureVisibility} mat={signatureMaterial}/>
}