'use client'
import {memo, useState} from "react";
import FullMaterial from "@/app/components/materials/FullMaterial";

export default function IliDx({envMap, fbx}) {
    const [visible, setVisible] = useState<boolean>(false);
    // const {chosenOptions} = useChosenOptions();
    const ILIDX = memo(({visible}) => {
        console.log('halo 1')
        return (
            <mesh geometry={fbx.ilidx} onClick={log} visible={visible}>
                <FullMaterial envMap={envMap} color='gold'/>
            </mesh>
    )
    })

    console.log('render 1');

    function log() {
        setVisible(!visible);
    }

    return <ILIDX visible={visible}/>
}