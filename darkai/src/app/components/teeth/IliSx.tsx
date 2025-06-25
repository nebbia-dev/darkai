'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import BarDiamond from "@/app/components/materials/BarDiamond";
import BarIlssxL from "@/app/components/materials/BarIlssxL";
import BarIlssxR from "@/app/components/materials/BarIlssxR";
export default function IliSx({envMap}) {
    const toothGeometry = useTeethStore((state) => state.teethGeometry.ilisx);
    const toothJewelType = useTeethStore((state) => state.teethJewelType.ilisx);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.ilisx);
    const toothVisibility = useTeethStore((state) => state.teethVisibility.ilisx);
    const toggleVisibility = useTeethStore((state) => state.setVisibility);
    const ILISX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
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
            <mesh geometry={geometry[0]} onClick={() => toggleVisibility('ilisx')} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <ILISX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}