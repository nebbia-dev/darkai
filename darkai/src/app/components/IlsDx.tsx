import {useFBX} from "@react-three/drei";
import {memo, useMemo, useState} from "react";
import FullMaterial from "@/app/components/FullMaterial";
export default function IlsDx({envMap}) {
    const tooth = useMemo(() => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa.fbx');
        console.log('dentifbx 2')
        return {
            ilsdx: fbx.children[0].children[0].geometry,
        };
    }, []);
    const [visible, setVisible] = useState<boolean>(false);
    const ILSDX = memo(({visible}) => {
        console.log('halo 2')
        return (
            <mesh geometry={tooth.ilsdx} onClick={log}>
                {visible? <FullMaterial envMap={envMap} color="gold"/> : <FullMaterial envMap={envMap} color="base"/>}
            </mesh>
    )
    })

    console.log('render 2');

    function log() {
        setVisible(!visible);
    }

    return <ILSDX visible={visible}/>
}