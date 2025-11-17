'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import BaseFullDiamond from "@/app/_components/_materials/BaseFullDiamond";
import FullDiamond from "@/app/_components/_materials/FullDiamond";
import BarSmall from "@/app/_components/_materials/BarSmall";
import {State} from "@/app/_types/State";
import * as THREE from "three";
import FrameFull from "@/app/_components/_materials/FrameFull";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function IlsSx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.ilssx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.ilssx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.ilssx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.ilssx);
    const toothEnamel = useTeethStore((state: State) => state.teethEnamel.ilssx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.ilssx);

    const ILSSX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry) return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[], position:THREE.Vector3;
        switch(type) {
            case 'full':
            case 'bezel':
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>]
                position = new THREE.Vector3();
                break;
            case 'fullDiamond':
            case 'bezelDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullDiamond color={toothMaterial}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FrameFull color={toothMaterial}/>]
                position = new THREE.Vector3();
                break;
            case 'enamel':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<BaseFullDiamond color={toothMaterial}/>, <FullEnamel color={toothEnamel ?? 'ivory'}/>]
                position = new THREE.Vector3();
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FullMaterial color={toothMaterial}/>, <FullDiamond color={toothMaterial}/>]
                position = toothGeometry.frame.diamond.position;
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full];
                material = [<BarSmall color={toothMaterial}/>]
                position = new THREE.Vector3();
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<FullMaterial color={toothMaterial}/>, <FullDiamond color={toothMaterial}/>]
                position = toothGeometry.bar.diamond.position;
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial}/>];
                position = new THREE.Vector3();
        }
        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible}>
                        {material[1]}
                        {type !== 'enamel' && <DecalPave position={position} pave={toothPave.shape} stone={toothPave.color}/>}
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

    return <ILSSX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}