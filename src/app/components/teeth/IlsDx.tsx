'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import BarDiamond from "@/app/components/materials/BarDiamond";
import BarSmall from "@/app/components/materials/BarSmall";
import {State} from "@/app/types/State";
import * as THREE from "three";
import FrameFull from "@/app/components/materials/FrameFull";
import FullEnamel from "@/app/components/materials/FullEnamel";

export default function IlsDx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.ilsdx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.ilsdx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.ilsdx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.ilsdx);
    const toothEnamel = useTeethStore((state: State) => state.teethEnamel.ilsdx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.ilsdx);

    const ILSDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry) return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[];
        switch(type) {
            case 'full':
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>]
                break;
            case 'fullDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullDiamond color={toothMaterial} pave={toothPave.shape} stone={toothPave.color}/>]
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FrameFull color={toothMaterial}/>]
                break;
            case 'enamel':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullEnamel color={toothEnamel ?? 'ivory'}/>]
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FullMaterial color={toothMaterial}/>, <FullDiamond color={toothMaterial} pave={toothPave.shape} stone={toothPave.color}/>]
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full];
                material = [<BarSmall color={toothMaterial}/>]
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<FullMaterial color={toothMaterial}/>, <FullDiamond color={toothMaterial} pave={toothPave.shape} stone={toothPave.color}/>]
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
            <mesh geometry={geometry[0]} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <ILSDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}