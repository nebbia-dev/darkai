'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import FrameFull from "@/app/components/materials/FrameFull";
import FrameDiamond from "@/app/components/materials/FrameDiamond";

export default function CsDx() {
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