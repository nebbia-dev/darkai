'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function Tribals() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature.tribal);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.tribal);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.tribal);
    const TRIBALS = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.hangs, signatureGeometry.frame, signatureGeometry.back, signatureGeometry.pave,];
        const position = signatureGeometry.position
        let material:JSX.Element[];
        switch(mat) {
            case 'pave':
            case 'white':
                material = [<FullMaterial finish="polished" color="white"/>]
                break;
            case 'gold':
                material = [<FullMaterial finish="polished" color="gold"/>]
                break;
            default:
                material = [<FullMaterial finish="polished" color="white"/>];
        }

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[2]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[3]} visible={visible} position={position}>
                        {material[0]}
                        {mat === 'pave' && <DecalPave position={[-1, 0, 0]} pave='round' stone='whD'/>}
                        {mat === 'pave' && <DecalPave position={[0.5, 0, 0]} pave='round' stone='whD'/>}
                    </mesh>
                </>
            )
    })

    return <TRIBALS visible={signatureVisibility} mat={signatureMaterial}/>
}