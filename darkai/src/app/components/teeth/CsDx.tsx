'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BarIlsdxL from "@/app/components/materials/BarIlsdxL";
import BarIlsdxR from "@/app/components/materials/BarIlsdxR";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import BarDiamond from "@/app/components/materials/BarDiamond";
import FrameCsdx from "@/app/components/materials/FrameCsdx";
import FrameDiamond from "@/app/components/materials/FrameDiamond";
export default function CsDx({envMap}) {
    const toothGeometry = useTeethStore((state) => state.teethGeometry.csdx);
    const toothJewelType = useTeethStore((state) => state.teethJewelType.csdx);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.csdx);
    const toothVisibility = useTeethStore((state) => state.teethVisibility.csdx);
    const toggleVisibility = useTeethStore((state) => state.setVisibility);
    const CSDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        let geometry, material;
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial envMap={envMap} color={toothMaterial}/>]
                break;
            case 'fullDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond envMap={envMap} color={toothMaterial}/>, <FullDiamond envMap={envMap} color={toothMaterial}/>]
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FrameCsdx envMap={envMap} color={toothMaterial}/>]
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FrameCsdx envMap={envMap} color={toothMaterial}/>, <FrameDiamond envMap={envMap} color={toothMaterial}/>]
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial envMap={envMap} color={toothMaterial}/>]
        }
        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible}>
                        {material[1]}
                    </mesh>
                </>
            )
        }
        return (
            <mesh geometry={geometry[0]} onClick={() => toggleVisibility('csdx')} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <CSDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}