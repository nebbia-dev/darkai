'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import * as THREE from "three";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import DecalPave from "@/app/_components/_materials/DecalPave";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";

export default function IcsSx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.icssx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.icssx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.icssx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.icssx);
    const toothEnamel = useTeethStore((state: State) => state.teethEnamel.icssx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.icssx);
    const toothFinish = useTeethStore((state: State) => state.teethFinish.icssx);

    const ICSSX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry || toothJewelType === 'signature') return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[], position:THREE.Vector3, barPositions: THREE.Vector3[] | undefined;
        switch(type) {
            case 'full':
            case 'bezel':
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
                break;
            case 'fullDiamond':
            case 'bezelDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = toothGeometry.fullDiamond.position;
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
                break;
            case 'enamel':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullEnamel color={toothEnamel ?? 'ivory'}/>];
                position = new THREE.Vector3();
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = toothGeometry.frame.diamond.position;
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
                barPositions = [toothGeometry.bar.diamond.basePosition, toothGeometry.bar.diamond.fullPosition];
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
        }
        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={barPositions?.[0]}>
                        {material[0]}
                    </mesh>
                    <mesh geometry={geometry[1]} visible={visible} position={barPositions?.[1]}>
                        {material[1]}
                        {type !== 'enamel' && <DecalPave position={position} pave={toothPave.shape} stone={toothPave.color}/>}
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

    return <ICSSX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}