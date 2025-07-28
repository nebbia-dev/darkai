'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import State from "@/app/types/State";
import * as THREE from "three";
import FrameFull from "@/app/components/materials/FrameFull";

export default function IcsSx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.icssx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.icssx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.icssx);
    const toothPave = useTeethStore((state: State) => state.teethPave.icssx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.icssx);

    const ICSSX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
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
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FullMaterial color={toothMaterial}/>]
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FullMaterial color={toothMaterial}/>, <FullDiamond color={toothMaterial} pave={toothPave}/>]
                break;
            case 'bar':
                geometry = [];
                material = []
                break;
            case 'barDiamond':
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
        return (
            <mesh geometry={geometry[0]} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    console.log('render 2')

    return <ICSSX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}