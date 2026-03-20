'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import Pave from "@/app/_components/_materials/Pave";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import resetUvs from "@/app/_helpers/_models-modifiers/resetUvs";

export default function Vamp() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.vamp);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.vamp);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.vamp);
    const VAMP = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        const geometry = [signatureGeometry.csdx.base, signatureGeometry.csdx.pave.geometry, signatureGeometry.cssx.base, signatureGeometry.cssx.pave.geometry];
        const position = [signatureGeometry.csdx.pave.position, signatureGeometry.cssx.pave.position]
        let material:JSX.Element[];
        switch(mat) {
            case 'pave_lab':
            case 'pave_nat':
                material = [<FullMaterial finish="polished" color="white"/>, <Pave pave="round" stone="whD_lab"/>, <RoundPaveBase stone="whD_lab" color="white" pave="round"/>]
                break;
            case 'base_white':
                material = [<FullMaterial finish="polished" color="white"/>]
                break;
            case 'base_black':
                material = [<FullMaterial finish="polished" color="black"/>]
                break;
            default:
                material = [<FullMaterial finish="polished" color="white"/>];
        }

        resetUvs(signatureGeometry.csdx.pave.geometry, true, 'vamp', 'dx');
        resetUvs(signatureGeometry.cssx.pave.geometry, true, 'vamp', 'sx');

            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible}>
                        {mat?.includes('pave')
                            ? material[1]
                            : material[0]
                        }
                    </mesh>
                    {mat?.includes('pave') &&
                        <mesh geometry={geometry[1]} visible={visible}>
                            {material[0]}
                            {material[2]}
                        </mesh>
                    }


                    <mesh geometry={geometry[2]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[3]} visible={visible}>
                        {mat?.includes('pave')
                            ? material[1]
                            : material[0]
                        }
                    </mesh>
                    {mat?.includes('pave') &&
                        <mesh geometry={geometry[3]} visible={visible}>
                            {material[0]}
                            {material[2]}
                        </mesh>
                    }
                </>
            )
    })

    return <VAMP visible={signatureVisibility} mat={signatureMaterial}/>
}