'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function Hammered() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature.hammered);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.hammered);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.hammered);
    const HAMMER = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.icidx, signatureGeometry.ilssx, signatureGeometry.ilsdx, signatureGeometry.ilisx];
        let material:JSX.Element[];
        switch(mat) {
            case 'gold':
                material = [<FullMaterial finish="polished" color="gold"/>]
                break;
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
                    </mesh>
                    <mesh geometry={geometry[2]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[3]} visible={visible}>
                        {material[0]}
                    </mesh>
                </>
            )
    })

    return <HAMMER visible={signatureVisibility} mat={signatureMaterial}/>
}