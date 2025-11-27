'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function Vamp() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.vamp);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.vamp);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.vamp);
    const VAMP = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.csdx.base.geometry, signatureGeometry.csdx.pave.geometry, signatureGeometry.cssx.base.geometry, signatureGeometry.cssx.pave.geometry];
        const position = [signatureGeometry.csdx.base.position, signatureGeometry.csdx.pave.position, signatureGeometry.cssx.base.position, signatureGeometry.cssx.pave.position]
        let material:JSX.Element[];
        switch(mat) {
            case 'pave':
            case 'white':
                material = [<FullMaterial finish="polished" color="white"/>]
                break;
            case 'black':
                material = [<FullMaterial finish="polished" color="black"/>]
                break;
            default:
                material = [<FullMaterial finish="polished" color="white"/>];
        }

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible}>
                        {material[0]}
                        {mat === 'pave' && <DecalPave position={position[1]} pave='round' stone='whD'/>}
                    </mesh>
                    <mesh geometry={geometry[2]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[3]} visible={visible}>
                        {material[0]}
                        {mat === 'pave' && <DecalPave position={position[3]} pave='round' stone='whD'/>}
                    </mesh>
                </>
            )
    })

    return <VAMP visible={signatureVisibility} mat={signatureMaterial}/>
}