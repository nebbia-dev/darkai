'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import Pave from "@/app/_components/_materials/Pave";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import resetUvs from "@/app/_helpers/_models-modifiers/resetUvs";

export default function Tribals() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.tribal);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.tribal);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.tribal);
    const TRIBALS = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.hangs, signatureGeometry.full, signatureGeometry.frame, signatureGeometry.pave];
        const position = [signatureGeometry.positionHangs, signatureGeometry.positionFull]
        let material:JSX.Element[];
        switch(mat) {
            case 'pave':
                material = [<FullMaterial finish="polished" color="white"/>, <Pave pave="round" stone="whD"/>, <RoundPaveBase stone="whD" color="white" pave="round"/>]
                break;
            case 'white':
                material = [<FullMaterial finish="polished" color="white"/>]
                break;
            case 'gold':
                material = [<FullMaterial finish="polished" color="gold"/>]
                break;
            default:
                material = [<FullMaterial finish="polished" color="white"/>];
        }

        resetUvs(signatureGeometry.pave, false, "tribal")

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position[0]}>
                        {material[0]}
                    </mesh>
                    {
                        mat === 'pave'
                            ?
                            <>
                                <mesh geometry={geometry[2]} visible={visible} position={position[1]}>
                                    {material[0]}
                                </mesh>
                                <mesh geometry={geometry[3]} visible={visible} position={position[1]}>
                                    {material[1]}
                                </mesh>
                                <mesh geometry={geometry[3]} visible={visible} position={position[1]}>
                                    {material[0]}
                                    {material[2]}
                                </mesh>
                            </>
                            : <mesh geometry={geometry[1]} visible={visible} position={position[1]}>
                                {material[0]}
                            </mesh>
                    }
                </>
            )
    })

    return <TRIBALS visible={signatureVisibility} mat={signatureMaterial}/>
}