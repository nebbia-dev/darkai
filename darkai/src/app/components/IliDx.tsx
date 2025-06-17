import {useFBX} from "@react-three/drei";
import {memo, useMemo, useState} from "react";
import FullMaterial from "@/app/components/FullMaterial";

export default function IliDx({envMap}) {
    const tooth = useMemo(() => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa.fbx');
        console.log('dentifbx 1')
        return {
            ilidx: fbx.children[0].children[1].geometry,
        };
    }, []);
    const [visible, setVisible] = useState<boolean>(false);
    const ILIDX = memo(({visible}) => {
        console.log('halo 1')
        return (
            <mesh geometry={tooth.ilidx} onClick={log}>
            {visible? <FullMaterial envMap={envMap} color="gold"/> : <FullMaterial envMap={envMap} color="base"/>}
            </mesh>
    )
    })

    console.log('render 1');

    function log() {
        setVisible(!visible);
    }

    return <ILIDX visible={visible}/>
}