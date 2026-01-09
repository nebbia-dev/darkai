'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import Pave from "@/app/_components/_materials/Pave";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import PaveFrame from "@/app/_components/_materials/PaveFrame";
import RoundPaveBaseFrame from "@/app/_components/_materials/RoundPaveBaseFrame";
import PaveBigBar from "@/app/_components/_materials/PaveBigBar";
import RoundPaveBaseBigBar from "@/app/_components/_materials/RoundPaveBaseBigBar";
import PaveBar from "@/app/_components/_materials/PaveBar";
import RoundPaveBaseBar from "@/app/_components/_materials/RoundPaveBaseBar";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";
import resetUvs from "@/app/_helpers/_models-modifiers/resetUvs";

export default function CiDx() {
    const toothGeometry = useTeethStore((state: State) => state.teethGeometry.cidx);
    const toothJewelType = useTeethStore((state: State) => state.teethJewelType.cidx);
    const toothMaterial = useTeethStore((state: State) => state.teethMaterial.cidx);
    const toothPave = useTeethStore((state: State) => state.teethPaves.cidx);
    const toothVisibility = useTeethStore((state: State) => state.teethVisibility.cidx);
    const toothEnamel = useTeethStore((state: State) => state.teethEnamel.cidx);
    const toothFinish = useTeethStore((state: State) => state.teethFinish.cidx);

    const CIDX = memo(({visible, type, mat} : {visible: boolean, type: string, mat: string}): JSX.Element => {
        if(!toothGeometry || toothJewelType === 'signature') return <></>
        let geometry:THREE.BufferGeometry[], material:JSX.Element[], position:THREE.Vector3;
        switch(type) {
            case 'full':
            case 'bezel':
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'fullDiamond':
            case 'bezelDiamond':
                geometry = [toothGeometry.fullDiamond.base, toothGeometry.fullDiamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <Pave pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBase stone={toothPave.color} color={toothMaterial} pave={toothPave.shape}/>]
                position = toothGeometry.fullDiamond.position;
                break;
            case 'enamel':
                geometry = [toothGeometry.frame.full, toothGeometry.enamel.geometry];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullEnamel color={toothEnamel ?? 'ivory'}/>]
                position = toothGeometry.enamel.position;
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <PaveFrame pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBaseFrame color={toothMaterial}/>]
                position = toothGeometry.frame.diamond.position;
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <PaveBar pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBaseBar color={toothMaterial} type={toothPave.shape}/>]
                position = toothGeometry.bar.diamond.position;
                break;
            case 'bigBar':
                geometry = [toothGeometry.bigBar.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>]
                position = new THREE.Vector3();
                break;
            case 'bigBarDiamond':
                geometry = [toothGeometry.bigBar.diamond.base, toothGeometry.bigBar.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <PaveBigBar pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBaseBigBar color={toothMaterial} type={toothPave.shape}/>]
                position = new THREE.Vector3(toothGeometry.bigBar.diamond.position.x, toothGeometry.bigBar.diamond.position.y, 0);
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
        }

        resetUvs(toothGeometry.bar.full, false, 'barDC_lat');
        resetUvs(toothGeometry.frame.full, false, 'barDC_lat');
        resetUvs(toothGeometry.bigBar.full, false, 'barDC_lat');

        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible}>
                        {material[0]}
                    </mesh>
                    {type === 'enamel'
                        ? <mesh geometry={geometry[1]} visible={visible} position={position}>
                            {material[1]}
                          </mesh>
                        : <mesh geometry={geometry[1]} visible={visible}>
                            {material[1]}
                          </mesh>
                    }
                    {
                        ((type.includes('bigBar') && (toothPave.shape === "round" || toothPave.shape === "baguette"))
                            || ((type.includes('bar') || type.includes('frame')) && toothPave.shape === "round")
                            || ((type.includes('full') || type.includes('bezel')) && (toothPave.shape === "round" || toothPave.shape === "mosaic"))
                        ) &&
                        <mesh geometry={geometry[1]} visible={visible}>
                            {material[0]}
                            {material[2]}
                        </mesh>
                    }
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