'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import FrameDiamond from "@/app/components/materials/FrameDiamond";
import BarFull from "@/app/components/materials/BarFull";
import BarDiamond from "@/app/components/materials/BarDiamond";
import FrameFull from "@/app/components/materials/FrameFull";

export default function CiDx() {
    const toothGeometry = useTeethStore((state) => state.teethGeometry.cidx);
    const toothJewelType = useTeethStore((state) => state.teethJewelType.cidx);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.cidx);
    const toothVisibility = useTeethStore((state) => state.teethVisibility.cidx);
    const toggleVisibility = useTeethStore((state) => state.setVisibility);
    const CIDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        let geometry, material;
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>]
                break;
            case 'fullDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullDiamond color={toothMaterial}/>]
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FrameFull color={toothMaterial}/>]
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FrameFull color={toothMaterial}/>, <FrameDiamond color={toothMaterial}/>]
                break;
            case 'bigBar':
                geometry = [toothGeometry.bar.full];
                material = [<BarFull color={toothMaterial}/>]
                break;
            case 'bigBarDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<BarFull color={toothMaterial}/>, <BarDiamond color={toothMaterial}/>]
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>]
        }

        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} onClick={() => toggleVisibility('cidx')}>
                        {material[1]}
                    </mesh>
                </>
            )
        }
        return (
            <mesh geometry={geometry[0]} onClick={() => toggleVisibility('cidx')} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <CIDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}