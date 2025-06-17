import {memo, useMemo, useState} from "react";
import FullMaterial from "@/app/components/FullMaterial";
import teeth from "@/app/components/teeth";
export default function IlsDx({envMap}) {
    const [visible, setVisible] = useState<boolean>(false);
    const tooth = useMemo(() => teeth(), []);
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