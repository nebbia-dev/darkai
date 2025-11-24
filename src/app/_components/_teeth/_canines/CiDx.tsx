'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import FullDiamond from "@/app/_components/_materials/FullDiamond";
import FrameDiamond from "@/app/_components/_materials/FrameDiamond";
import BarFull from "@/app/_components/_materials/BarFull";
import BarDiamond from "@/app/_components/_materials/BarDiamond";
import FrameFull from "@/app/_components/_materials/FrameFull";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
import BarSmall from "@/app/_components/_materials/BarSmall";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function CiDx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.cidx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.cidx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.cidx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.cidx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.cidx);
    const toothEnamel = useTeethStore((state: State) => state.teethEnamel.cidx);
    const CIDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry || toothJewelType === 'signature') return <></>
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
                material = [<FullDiamond color={toothMaterial}/>, <FullDiamond color={toothMaterial}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            case 'enamel':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullDiamond color={toothMaterial}/>, <FullEnamel color={toothEnamel ?? 'ivory'}/>]
                position = new THREE.Vector3();
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FrameFull color={toothMaterial}/>]
                position = new THREE.Vector3();
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FrameFull color={toothMaterial}/>, <FrameDiamond color={toothMaterial}/>]
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
            case 'bigBar':
                geometry = [toothGeometry.bigBar.full];
                material = [<BarFull color={toothMaterial}/>]
                position = new THREE.Vector3();
                break;
            case 'bigBarDiamond':
                geometry = [toothGeometry.bigBar.diamond.base, toothGeometry.bigBar.diamond.full];
                material = [<BarFull color={toothMaterial}/>, <BarDiamond color={toothMaterial}/>]
                position = new THREE.Vector3(toothGeometry.bigBar.diamond.position.x, toothGeometry.bigBar.diamond.position.y, 0);
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
                        {type !== 'enamel' && <DecalPave scale={type === 'bigBarDiamond' ? 3 : 1} position={position} pave={toothPave.shape} stone={toothPave.color}/>}
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

    return <CIDX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}