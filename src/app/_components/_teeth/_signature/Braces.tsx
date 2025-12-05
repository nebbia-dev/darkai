'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import DecalPave from "@/app/_components/_materials/DecalPave";
import StonesMaterial from "@/app/_components/_materials/StonesMaterial";
import Pave from "@/app/_components/_materials/Pave";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import resetUvs from "@/app/_helpers/_models-modifiers/resetUvs";

export default function Braces() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.braces);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.braces);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.braces);
    const BRACES = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.structure, signatureGeometry.pave, signatureGeometry.stones, signatureGeometry.outline];
        const position = signatureGeometry.position
        let material:JSX.Element[];
        switch(mat) {
            case 'pave':
                material = [<FullMaterial color="white" finish="polished"/>, <StonesMaterial color="emerald"/>, <Pave pave="round" stone="whD"/>, <RoundPaveBase color="white" type="round"/>]
                break;
            case 'metal':
                material = [<FullMaterial color="white" finish="polished"/>, <StonesMaterial color="ruby"/>]
                break;
            default:
                material = [<FullMaterial color="white" finish="polished"/>, <StonesMaterial color="ruby"/>];
        }

        resetUvs(signatureGeometry.pave, true)

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>

                    <mesh geometry={geometry[1]} visible={visible} position={position}>
                        {mat === 'pave'
                            ? material[2]
                            : material[0]
                        }
                    </mesh>
                    {mat === 'pave' &&
                        <mesh geometry={geometry[1]} visible={visible} position={position}>
                            {material[0]}
                            {material[3]}
                        </mesh>
                    }

                    <mesh geometry={geometry[2]} visible={visible} position={position}>
                        {material[1]}
                    </mesh>
                    <mesh geometry={geometry[3]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                </>
            )
    })

    return <BRACES visible={signatureVisibility} mat={signatureMaterial}/>
}