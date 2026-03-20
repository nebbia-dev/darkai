'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import StonesMaterial from "@/app/_components/_materials/StonesMaterial";

export default function Sprinkles() {
    const signatureGeometry = useTeethStore((state: State) => state.teethGeometry.signature?.sprinkles);
    const signatureMaterial = useTeethStore((state: State) => state.signatureMaterial.sprinkles);
    const signatureVisibility = useTeethStore((state: State) => state.signatureVisibility.sprinkles);
    const SPRINK = memo(({visible, mat} : {visible: boolean, mat: string|undefined}): JSX.Element => {
        if(!signatureGeometry) return <></>
        let material:JSX.Element[];
        switch(mat) {
            case 'gold_lab':
            case 'gold_nat':
                material = [<FullMaterial finish="polished" color="gold"/>, <FullMaterial finish="sprinkles" color="gold"/>]
                break;
            case 'white_lab':
            case 'white_nat':
                material = [<FullMaterial finish="polished" color="white"/>, <FullMaterial finish="sprinkles" color="white"/>]
                break;
            case 'rose_lab':
            case 'rose_nat':
                material = [<FullMaterial finish="polished" color="rose"/>, <FullMaterial finish="sprinkles" color="rose"/>]
                break;
            default:
                material = [<FullMaterial finish="polished" color="white"/>, <FullMaterial finish="sprinkles" color="white"/>];
        }

            return (
                <>
                    <mesh geometry={signatureGeometry.base} visible={visible}>
                        {material[1]}
                    </mesh>

                    {
                        signatureGeometry.frames.map((frame, i) => {
                            return(
                                <mesh key={(Math.random() + i)/0.25} geometry={frame} visible={visible}>
                                    {material[0]}
                                </mesh>
                            )
                        })
                    }

                    {/* CSDX */}
                    <mesh geometry={signatureGeometry.csdx.n} visible={visible}>
                        <StonesMaterial color="ySapph"/>
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.ne} visible={visible}>
                        <StonesMaterial color="emerald"/>
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.se} visible={visible}>
                        <StonesMaterial color="whD"/>
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.s} visible={visible}>
                                            <StonesMaterial color="bSapph"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.csdx.o} visible={visible}>
                                            <StonesMaterial color="ameth"/>
                                        </mesh>

                    {/* CSSX */}
                    <mesh geometry={signatureGeometry.cssx.n} visible={visible}>
                        <StonesMaterial color="emerald"/>
                    </mesh>
                    <mesh geometry={signatureGeometry.cssx.no} visible={visible}>
                                            <StonesMaterial color="ameth"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.cssx.so} visible={visible}>
                                            <StonesMaterial color="whD"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.cssx.s} visible={visible}>
                                            <StonesMaterial color="bSapph"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.cssx.e} visible={visible}>
                                            <StonesMaterial color="ruby"/>
                                        </mesh>

                    {/* ILSDX */}
                    <mesh geometry={signatureGeometry.ilsdx.ne} visible={visible}>
                        <StonesMaterial color="ameth"/>
                    </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.e} visible={visible}>
                                            <StonesMaterial color="whD"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.se} visible={visible}>
                                            <StonesMaterial color="ruby"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.c} visible={visible}>
                                            <StonesMaterial color="ySapph"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.so} visible={visible}>
                                            <StonesMaterial color="emerald"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.no} visible={visible}>
                                            <StonesMaterial color="bSapph"/>
                                        </mesh>

                    {/* ILSSX */}
                    <mesh geometry={signatureGeometry.ilssx.ne} visible={visible}>
                        <StonesMaterial color="pSapph"/>
                    </mesh>
                    <mesh geometry={signatureGeometry.ilssx.o} visible={visible}>
                                            <StonesMaterial color="aqua"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilssx.se} visible={visible}>
                                            <StonesMaterial color="bSapph"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilssx.c} visible={visible}>
                                            <StonesMaterial color="whD"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilssx.so} visible={visible}>
                                            <StonesMaterial color="ruby"/>
                                        </mesh>
                    <mesh geometry={signatureGeometry.ilssx.no} visible={visible}>
                                            <StonesMaterial color="emerald"/>
                                        </mesh>
                </>
            )
    })

    return <SPRINK visible={signatureVisibility} mat={signatureMaterial}/>
}