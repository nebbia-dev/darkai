'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function Sprinkles() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature.sprinkles);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.sprinkles);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.sprinkles);
    const SPRINK = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.csdx, signatureGeometry.cssx, signatureGeometry.ilsdx, signatureGeometry.ilssx];
        let material:JSX.Element[];
        switch(mat) {
            case 'gold':
                material = [<FullMaterial color="gold"/>]
                break;
            case 'white':
                material = [<FullMaterial color="white"/>]
                break;
            case 'rose':
                material = [<FullMaterial color="rose"/>]
                break;
            default:
                material = [<FullMaterial color="white"/>];
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

    return <SPRINK visible={signatureVisibility} mat={signatureMaterial}/>
}