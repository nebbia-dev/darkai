'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import FrameDiamond from "@/app/components/materials/FrameDiamond";
import FrameCisx from "@/app/components/materials/FrameCisx";

export default function CiSx() {
    const toothGeometry = useTeethStore((state) => state.teethGeometry.cisx);
    const toothJewelType = useTeethStore((state) => state.teethJewelType.cisx);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.cisx);
    const toothVisibility = useTeethStore((state) => state.teethVisibility.cisx);
    const toggleVisibility = useTeethStore((state) => state.setVisibility);
    const CISX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
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
                material = [<FrameCisx color={toothMaterial}/>]
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FrameCisx color={toothMaterial}/>, <FrameDiamond color={toothMaterial}/>]
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
            <mesh geometry={geometry[0]} onClick={() => toggleVisibility('cisx')} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <CISX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}