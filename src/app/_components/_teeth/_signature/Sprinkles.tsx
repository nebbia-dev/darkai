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
            case 'gold':
                material = [<FullMaterial finish="polished" color="gold"/>, <FullMaterial finish="sprinkles" color="gold"/>]
                break;
            case 'white':
                material = [<FullMaterial finish="polished" color="white"/>, <FullMaterial finish="sprinkles" color="white"/>]
                break;
            case 'rose':
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

                    {/* CSDX */}
                    <mesh geometry={signatureGeometry.csdx.n.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.n.stone} visible={visible}>
                        <StonesMaterial color="ySapph"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.csdx.ne.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.ne.stone} visible={visible}>
                        <StonesMaterial color="emerald"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.csdx.se.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.se.stone} visible={visible}>
                        <StonesMaterial color="whD"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.csdx.s.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.s.stone} visible={visible}>
                        <StonesMaterial color="bSapph"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.csdx.o.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.csdx.o.stone} visible={visible}>
                        <StonesMaterial color="ameth"/>
                    </mesh>

                    {/* CSSX */}
                    <mesh geometry={signatureGeometry.cssx.n.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.cssx.n.stone} visible={visible}>
                        <StonesMaterial color="emerald"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.cssx.no.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.cssx.no.stone} visible={visible}>
                        <StonesMaterial color="ameth"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.cssx.so.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.cssx.so.stone} visible={visible}>
                        <StonesMaterial color="whD"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.cssx.s.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.cssx.s.stone} visible={visible}>
                        <StonesMaterial color="bSapph"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.cssx.e.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.cssx.e.stone} visible={visible}>
                        <StonesMaterial color="ruby"/>
                    </mesh>

                    {/* ILSDX */}
                    <mesh geometry={signatureGeometry.ilsdx.ne.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.ne.stone} visible={visible}>
                        <StonesMaterial color="ameth"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilsdx.e.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.e.stone} visible={visible}>
                        <StonesMaterial color="whD"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilsdx.se.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.se.stone} visible={visible}>
                        <StonesMaterial color="ruby"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilsdx.c.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.c.stone} visible={visible}>
                        <StonesMaterial color="ySapph"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilsdx.so.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.so.stone} visible={visible}>
                        <StonesMaterial color="emerald"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilsdx.no.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilsdx.no.stone} visible={visible}>
                        <StonesMaterial color="bSapph"/>
                    </mesh>

                    {/* ILSSX */}
                    <mesh geometry={signatureGeometry.ilssx.ne.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilssx.ne.stone} visible={visible}>
                        <StonesMaterial color="pSapph"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilssx.o.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilssx.o.stone} visible={visible}>
                        <StonesMaterial color="aqua"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilssx.se.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilssx.se.stone} visible={visible}>
                        <StonesMaterial color="bSapph"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilssx.c.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilssx.c.stone} visible={visible}>
                        <StonesMaterial color="whD"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilssx.so.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilssx.so.stone} visible={visible}>
                        <StonesMaterial color="ruby"/>
                    </mesh>

                    <mesh geometry={signatureGeometry.ilssx.no.frame} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={signatureGeometry.ilssx.no.stone} visible={visible}>
                        <StonesMaterial color="emerald"/>
                    </mesh>
                </>
            )
    })

    return <SPRINK visible={signatureVisibility} mat={signatureMaterial}/>
}