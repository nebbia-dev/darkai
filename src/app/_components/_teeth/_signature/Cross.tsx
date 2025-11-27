'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import DecalPave from "@/app/_components/_materials/DecalPave";
import * as THREE from "three";

export default function Cross() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.cross);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.cross);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.cross);
    const CROSS = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const position = signatureGeometry.position
        let geometry:THREE.BufferGeometry[], material:JSX.Element[];
        switch(mat) {
            case 'pave':
                geometry = [signatureGeometry.base, signatureGeometry.pave];
                material = [<FullMaterial finish="polished" color="white"/>];
                break;
            case 'white':
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="white"/>]
                break;
            case 'gold':
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="gold"/>]
                break;
            case 'rose':
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="rose"/>]
                break;
            default:
                geometry = [signatureGeometry.full];
                material = [<FullMaterial finish="polished" color="white"/>];
        }

        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} position={position}>
                        {material[0]}
                        {mat === 'pave' && <DecalPave position={[0,0,0]} pave='round' stone='whD'/>}
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