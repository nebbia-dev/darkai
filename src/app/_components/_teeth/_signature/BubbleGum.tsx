'use client'
import {JSX, memo} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import FullMaterial from "@/app/_components/_materials/FullMaterial";

export default function BubbleGum() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.bubblegum);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.bubblegum);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.bubblegum);
    const BGUM = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.base, signatureGeometry.pave];
        const position = [signatureGeometry.positionBase, signatureGeometry.positionPave];
        let material:JSX.Element[];
        switch(mat) {
            case 'pink':
                material = [<FullMaterial color="gold" finish="polished"/>, <FullEnamel color="pink"/>]
                break;
            case 'blue':
                material = [<FullMaterial color="gold" finish="polished"/>, <FullEnamel color="blue"/>]
                break;
            case 'green':
                material = [<FullMaterial color="gold" finish="polished"/>, <FullEnamel color="green"/>]
                break;
            default:
                material = [<FullMaterial color="gold" finish="polished"/>, <FullEnamel color="pink"/>];
        }

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position[0]}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} position={position[1]}>
                        {material[1]}
                    </mesh>
                </>
            )
    })

    return <BGUM visible={signatureVisibility} mat={signatureMaterial}/>
}