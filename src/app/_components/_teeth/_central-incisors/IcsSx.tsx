'use client'
import {JSX, memo} from "react";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import * as THREE from "three";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";
import Pave from "@/app/_components/_materials/Pave";
import resetUvs from "@/app/_helpers/_models-modifiers/resetUvs";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import PaveFrame from "@/app/_components/_materials/PaveFrame";
import RoundPaveBaseFrame from "@/app/_components/_materials/RoundPaveBaseFrame";
import PaveBar from "@/app/_components/_materials/PaveBar";
import RoundPaveBaseBar from "@/app/_components/_materials/RoundPaveBaseBar";

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
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>,<Pave pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBase stone={toothPave.color} color={toothMaterial} pave={toothPave.shape}/>];
                position = toothGeometry.fullDiamond.position;
                break;
            case 'frame':
                geometry = [toothGeometry.frame.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
                break;
            case 'enamel':
                geometry = [toothGeometry.frame.full, toothGeometry.enamel.geometry];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <FullEnamel color={toothEnamel ?? 'ivory'}/>];
                position = toothGeometry.enamel.position;
                break;
            case 'frameDiamond':
                geometry = [toothGeometry.frame.diamond.base, toothGeometry.frame.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <PaveFrame pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBaseFrame color={toothMaterial}/>];
                position = toothGeometry.frame.diamond.position;
                break;
            case 'bar':
                geometry = [toothGeometry.bar.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
                break;
            case 'barDiamond':
                geometry = [toothGeometry.bar.diamond.base, toothGeometry.bar.diamond.full];
                material = [<FullMaterial color={toothMaterial} finish={toothFinish}/>, <PaveBar pave={toothPave.shape} stone={toothPave.color}/>, <RoundPaveBaseBar color={toothMaterial} type={toothPave.shape}/>];
                position = new THREE.Vector3();
                barPositions = [toothGeometry.bar.diamond.basePosition, toothGeometry.bar.diamond.fullPosition];
                break;
            default:
                geometry = [toothGeometry.full];
                material = [<FullMaterial_ICS color={toothMaterial} finish={toothFinish}/>];
                position = new THREE.Vector3();
        }

        resetUvs(toothGeometry.fullDiamond.full, false);
        resetUvs(toothGeometry.bar.full, false, 'barDC');
        resetUvs(toothGeometry.frame.full, false, 'barDC');

        if(geometry.length === 2) {
            return (
                <>
                    <mesh geometry={geometry[0]} visible={visible} position={barPositions?.[0]}>
                        {material[0]}
                    </mesh>
                    {type === 'enamel'
                        ? <mesh geometry={geometry[1]} visible={visible} position={position}>
                            {material[1]}
                        </mesh>
                        : <mesh geometry={geometry[1]} visible={visible} position={barPositions?.[1]}>
                            {material[1]}
                        </mesh>
                    }
                    {(((type.includes('bar') || type.includes('frame')) && toothPave.shape === "round")
                            || ((type.includes('full') || type.includes('bezel')) && (toothPave.shape === "round" || toothPave.shape === "mosaic"))
                        ) &&
                        <mesh geometry={geometry[1]} visible={visible} position={barPositions?.[1]}>
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

    return <ICSSX visible={toothVisibility} type={toothJewelType} mat={toothMaterial}/>
}