'use client'
import {memo, useState} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";
import {useTeethStore} from "@/app/stores/teeth";

export default function IlsDx({envMap}) {
    const [visible, setVisible] = useState<boolean>(false);
    const toothGeometry = useTeethStore((state) => state.teethGeometry.ilsdx.full);
    const toothMaterial = useTeethStore((state) => state.teethMaterial.ilsdx)
    // let geom, mat;
    const ILSDX = memo(({visible, toothMaterial}) => {
        console.log('halo 2');
        // switch(geometry) {
        //     case 'full':
        //         break;
        //     case 'bar':
        //         break;
        //     default:
        // }
        // switch(material) {
        //     case 'gold':
        //         mat = <FullMaterial envMap={envMap} color={'gold'}/>
        //         break;
        //     case 'rose':
        //         break;
        //     case 'white':
        //         break;
        //     case 'diamond':
        //         break;
        //     default:
        // }
        return (
            <mesh geometry={toothGeometry} onClick={log} visible={visible}>
                <FullMaterial envMap={envMap} color={toothMaterial}/>
            </mesh>
        )
    })

    console.log('render 2');

    function log() {
        setVisible(!visible);
    }

    return <ILSDX visible={visible} toothMaterial={toothMaterial}/>
}