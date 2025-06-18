import {memo, useState} from "react";
import FullMaterial from "@/app/components/FullMaterial";
import {useChosenOptions} from "@/app/contexts/ChosenOptionsContext";

export default function IlsDx({envMap, fbx}) {
    const {chosenOptions} = useChosenOptions();
    const [visible, setVisible] = useState<boolean>(false);
    const ILSDX = memo(({visible}) => {
        console.log('halo 2')
        return (
            <mesh geometry={fbx.ilsdx} onClick={log} visible={visible}>
                <FullMaterial envMap={envMap} color={chosenOptions.ilsdx}/>
            </mesh>
    )
    })

    console.log('render 2');

    function log() {
        setVisible(!visible);
    }

    return <ILSDX visible={visible}/>
}