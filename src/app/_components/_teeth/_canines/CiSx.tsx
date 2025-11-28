'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import * as THREE from "three";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import DecalPave from "@/app/_components/_materials/DecalPave";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";

export default function CiSx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.cisx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.cisx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.cisx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.cisx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.cisx);
    const toothEnamel = useTeethStore((state: State) => state.teethEnamel.cisx);
    const toothFinish = useTeethStore((state: State) => state.teethFinish.cisx);

    const CISX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry || toothJewelType === 'signature') return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[], position:THREE.Vector3;
        switch(type) {
            case 'full':
            case 'bezel':
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'fullDiamond':
            case 'bezelDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            case 'enamel':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullEnamel color={toothEnamel ?? 'ivory'}/>]
                position = new THREE.Vector3();
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = toothGeometry.frame.diamond.position;
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = toothGeometry.bar.diamond.position;
                break;
            case 'bigBar':
                geometry = [toothGeometry.bigBar.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'bigBarDiamond':
                geometry = [toothGeometry.bigBar.diamond.base, toothGeometry.bigBar.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3(toothGeometry.bigBar.diamond.position.x, toothGeometry.bigBar.diamond.position.y, 0);
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>];
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
        if(geometry.length === 0) return <></>
        return (
            <mesh geometry={geometry[0]} visible={visible}>
                {material[0]}
            </mesh>
        )
    })

    return <CISX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}