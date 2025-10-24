'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import FrameDiamond from "@/app/components/materials/FrameDiamond";
import FrameFull from "@/app/components/materials/FrameFull";
import {State} from "@/app/types/State";
import * as THREE from "three";
import BarSmall from "@/app/components/materials/BarSmall";
import FullEnamel from "@/app/components/materials/FullEnamel";

export default function CiSx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.cisx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.cisx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.cisx);
    const toothPave = useTeethStore((state: State) => state.teethPave.cisx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.cisx);
    const toothEnamel = useTeethStore((state: State) => state.teethEnamel.cisx);
    const CISX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry) return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[];
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>]
                break;
            case 'fullDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullDiamond color={toothMaterial} pave={toothPave}/>]
                break;
            case 'enamel':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullEnamel color={toothEnamel}/>]
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FrameFull color={toothMaterial}/>]
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FrameFull color={toothMaterial}/>, <FrameDiamond color={toothMaterial} pave={toothPave}/>]
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full];
                material = [<BarSmall color={toothMaterial}/>]
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<FullMaterial color={toothMaterial}/>, <FullDiamond color={toothMaterial} pave={toothPave}/>]
                break;
            case 'bigBar':
                geometry = [];
                material = []
                break;
            case 'bigBarDiamond':
                geometry = [];
                material = []
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
        if(geometry.length === 0) return <></>
        return (
            <mesh geometry={geometry[0]} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <CISX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}