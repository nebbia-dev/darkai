import {useFBX} from "@react-three/drei";
import {memo, useMemo, useState} from "react";
import FullMaterial from "@/app/components/FullMaterial";
import teeth from "@/app/components/teeth";

export default function IliDx({envMap}) {
    const [visible, setVisible] = useState<boolean>(false);
    const tooth = useMemo(() => teeth(), []);
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