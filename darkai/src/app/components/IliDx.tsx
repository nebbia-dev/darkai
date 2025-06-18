import {memo, useState} from "react";
import FullMaterial from "@/app/components/FullMaterial";
import {useChosenOptions} from "@/app/contexts/ChosenOptionsContext";

export default function IliDx({envMap, fbx}) {
    const {chosenOptions} = useChosenOptions();
    const [visible, setVisible] = useState<boolean>(false);
    const ILIDX = memo(({visible}) => {
        console.log('halo 1')
        return (
            <mesh geometry={fbx.ilidx} onClick={log} visible={visible}>
                <FullMaterial envMap={envMap} color={chosenOptions.ilidx}/>
            </mesh>
    )
    })

    console.log('render 1');

    function log() {
        setVisible(!visible);
    }

    return <ILIDX visible={visible}/>
}