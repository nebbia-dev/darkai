'use client'
import {memo, useState} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BarIlsdxL from "@/app/components/materials/BarIlsdxL";
import BarIlsdxR from "@/app/components/materials/BarIlsdxR";

export default function IlsDx({envMap}) {
    const [visible, setVisible] = useState<boolean>(false);
    const toothGeometry = useTeethStore((state) => state.teethGeometry.ilsdx);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.ilsdx);
    const toothJewelType = useTeethStore((state) => state.teethJewelType.ilsdx);
    const ILSDX = memo(({visible, toothMaterial, type}) => {
        console.log('halo 2');
        let geometry, material;
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial envMap={envMap} color={toothMaterial}/>]
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full.left, toothGeometry.bar.full.right];
                material = [<BarIlsdxL envMap={envMap} color={toothMaterial}/>, <BarIlsdxR envMap={envMap} color={toothMaterial}/>]
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial envMap={envMap} color={toothMaterial}/>]
        }
        if(geometry.length > 1) {
            return (
                <>
                    <mesh geometry={geometry[0]} onClick={log} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} onClick={log} visible={visible}>
                        {material[1]}
                    </mesh>
                </>
            )
        }
        return (
            <mesh geometry={geometry[0]} onClick={log} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2');

    function log() {
        setVisible(!visible);
    }

    return <ILSDX visible={visible} toothMaterial={toothMaterial} type={toothJewelType}/>
}