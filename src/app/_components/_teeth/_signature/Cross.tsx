'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function Cross() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature.cross);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.cross);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.cross);
    const CROSS = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.ics];
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
            case 'rose':
                material = [<FullMaterial finish="polished" color="rose"/>]
                break;
            default:
                material = [<FullMaterial finish="polished" color="white"/>];
        }

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position}>
                        {material[0]}
                        {mat === 'pave' && <DecalPave position={[-position.x, 21.5, -position.z]} pave='round' stone='whD'/>}
                    </mesh>
                </>
            )
    })

    return <CROSS visible={signatureVisibility} mat={signatureMaterial}/>
}