'use client'
import {useTeethStore} from "@/app/stores/teeth";

export default function BarDiamond({color} : {color: string}) {

    const envMap = useTeethStore((state) => state.envMap);

    let gold;

    switch(color) {
        case 'gold':
            gold = 0xfaff8b;
            break;
        case 'pink':
            gold = 0xe8aec5;
            break;
        case 'black':
            gold = 0x2c2d18;
            break;
        case 'white':
            gold = 0xedeee2;
            break;
        default:
            gold = 0xfaff8b;
    }

    // Base
    // const baseProps = useTexture({
    //     normalMap: 'textures/diamondFull/Normal_Diamanti.webp',
    //     metalnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
    //     roughnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
    // });
    //
    // baseProps.normalMap.wrapS = baseProps.normalMap.wrapT = THREE.RepeatWrapping;
    // baseProps.normalMap.repeat.set(20,20);
    // baseProps.metalnessMap.wrapS = baseProps.metalnessMap.wrapT = THREE.RepeatWrapping;
    // baseProps.metalnessMap.repeat.set(20,20);

        // return (<meshStandardMaterial
        //     map={pairs.get(pave+firstCapital(stone)) ?? undefined}
        //     normalMap={color !== 'base' ? baseProps.normalMap : undefined}
        //     metalnessMap = {color !== 'base' ? baseProps.metalnessMap : undefined}
        //     roughnessMap = {color !== 'base' ? baseProps.roughnessMap : undefined}
        //     metalness = {color !== 'base' ? 1 : 0}
        //     roughness = {color !== 'base' ? 0.5 : 1}
        //     envMap = {envMap}
        //     color={color !== 'base' ? undefined : 'grey'}
        //     onUpdate={(self) => (self.needsUpdate = true)}
        //     attach='material'
        // />)

    return (<meshBasicMaterial
        reflectivity={1}
        refractionRatio={1}
        envMap = {envMap}
        color={gold}
        onUpdate={(self) => (self.needsUpdate = true)}
        attach='material'
    />)
    }