'use client'
import {JSX, memo} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import FullEnamel from "@/app/_components/_materials/FullEnamel";

export default function BubbleGum() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature.bubblegum);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.bubblegum);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.bubblegum);
    const BGUM = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.sup];
        const position = signatureGeometry.position;
        let material:JSX.Element[];
        switch(mat) {
            case 'pink':
                material = [<FullEnamel color="pink"/>]
                break;
            case 'blue':
                material = [<FullEnamel color="blue"/>]
                break;
            case 'green':
                material = [<FullEnamel color="green"/>]
                break;
            default:
                material = [<FullEnamel color="pink"/>];
        }

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={position}>
                        {material[0]}
                    </mesh>
                </>
            )
    })

    return <BGUM visible={signatureVisibility} mat={signatureMaterial}/>
}