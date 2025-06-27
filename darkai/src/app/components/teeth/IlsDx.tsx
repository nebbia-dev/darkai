'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import BarDiamond from "@/app/components/materials/BarDiamond";
import BarSmall from "@/app/components/materials/BarSmall";

export default function IlsDx() {
    const toothGeometry = useTeethStore((state) => state.teethGeometry.ilsdx);
    const toothJewelType = useTeethStore((state) => state.teethJewelType.ilsdx);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.ilsdx);
    const toothVisibility = useTeethStore((state) => state.teethVisibility.ilsdx);
    const toggleVisibility = useTeethStore((state) => state.setVisibility);
    const ILSDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
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
            case 'bar':
                geometry = [toothGeometry.bar.full.left, toothGeometry.bar.full.right];
                material = [<BarSmall color={toothMaterial}/>, <BarSmall color={toothMaterial}/>]
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.left.base, toothGeometry.bar.diamond.right.base, toothGeometry.bar.diamond.left.full, toothGeometry.bar.diamond.right.full];
                material = [<BarSmall color={toothMaterial}/>, <BarSmall color={toothMaterial}/>, <BarDiamond color={toothMaterial}/>]
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
        if(geometry.length === 4) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible}>
                        {material[1]}
                    </mesh>
                    <mesh geometry={geometry[2]} visible={visible}>
                        {material[2]}
                    </mesh>
                    <mesh geometry={geometry[3]} visible={visible}>
                        {material[2]}
                    </mesh>
                </>
            )
        }
        return (
            <mesh geometry={geometry[0]} onClick={() => toggleVisibility('ilsdx')} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <ILSDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}