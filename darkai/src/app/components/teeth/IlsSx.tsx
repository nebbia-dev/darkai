'use client'
import {memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BarIlssxR from "@/app/components/materials/BarIlssxR";
import BarIlssxL from "@/app/components/materials/BarIlssxL";


export default function IlsSx({envMap}) {
    const toothGeometry = useTeethStore((state) => state.teethGeometry.ilssx);
    const toothJewelType = useTeethStore((state) => state.teethJewelType.ilssx);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.ilssx);
    const toothVisibility = useTeethStore((state) => state.teethVisibility.ilssx);
    const toggleVisibility = useTeethStore((state) => state.setVisibility);
    const ILSSX = memo(({visible, type, mat}) => {
        let geometry, material;
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial envMap={envMap} color={toothMaterial}/>]
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full.left, toothGeometry.bar.full.right];
                material = [<BarIlssxL envMap={envMap} color={toothMaterial}/>, <BarIlssxR envMap={envMap} color={toothMaterial}/>]
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial envMap={envMap} color={toothMaterial}/>]
        }
        if(geometry.length > 1) {
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
            <mesh geometry={geometry[0]} onClick={() => toggleVisibility('ilssx')} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 1')

    return <ILSSX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}