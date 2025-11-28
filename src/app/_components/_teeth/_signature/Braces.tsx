'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import DecalPave from "@/app/_components/_materials/DecalPave";
import StonesMaterial from "@/app/_components/_materials/StonesMaterial";

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
                material = [<FullMaterial color="white" finish="polished"/>, <StonesMaterial color="emerald"/>]
                break;
            case 'metal':
                material = [<FullMaterial color="white" finish="polished"/>, <StonesMaterial color="ruby"/>]
                break;
            default:
                material = [<FullMaterial color="white" finish="polished"/>, <StonesMaterial color="ruby"/>];
        }

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} position={position}>
                        {material[0]}
                        {mat === 'pave' && <DecalPave position={[-1.46, 0, position.z]} pave='round' stone='whD'/>}
                        {mat === 'pave' && <DecalPave position={[2.46, 0, position.z]} pave='round' stone='whD'/>}
                    </mesh>
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