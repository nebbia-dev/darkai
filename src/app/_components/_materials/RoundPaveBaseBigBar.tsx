import {useEnvironment, useTexture} from "@react-three/drei";
import * as THREE from "three";
import {useTeethStore} from "@/app/_stores/teeth";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";

export default function RoundPaveBaseBigBar({color, type} : {color: string|undefined, type:string|undefined}) {

    if(!color || !type) return;

    // const envMap = useTeethStore((state) => state.envMap);
    const envMap = useEnvironment({
        // files: "envMaps/rosendal_park_sunset_puresky_1k.exr"
        files: "envMaps/Diamond_HDRI_Schiarita.hdr"
        // files: "envMaps/Diamond_HDRI.hdr"
    })

    const pairs = new Map();

    //ROUND NORMAL
    const roundNormal = useTexture({
        normalMap: 'textures/bar/bigBar/BigBar_Round_Struttura_Normal.webp',
    });
    roundNormal.normalMap.flipY = false;
    pairs.set('roundNormal', roundNormal.normalMap);


    //ROUND COLORS
    const roundGold = useTexture({
        map: 'textures/bar/bigBar/BigBar_Round_Struttura_YG.webp',
    });
    roundGold.map.colorSpace = THREE.SRGBColorSpace;
    roundGold.map.flipY = false;
    pairs.set('roundGold', roundGold.map);

    const roundRose = useTexture({
        map: 'textures/bar/bigBar/BigBar_Round_Struttura_RG.webp',
    });
    roundRose.map.colorSpace = THREE.SRGBColorSpace;
    roundRose.map.flipY = false;
    pairs.set('roundRose', roundRose.map);

    const roundWhite = useTexture({
        map: 'textures/bar/bigBar/BigBar_Round_Struttura_WG.webp',
    });
    roundWhite.map.colorSpace = THREE.SRGBColorSpace;
    roundWhite.map.flipY = false;
    pairs.set('roundWhite', roundWhite.map);

    const roundBlack = useTexture({
        map: 'textures/bar/bigBar/BigBar_Round_Struttura_BG.webp',
    });
    roundBlack.map.colorSpace = THREE.SRGBColorSpace;
    roundBlack.map.flipY = false;
    pairs.set('roundBlack', roundBlack.map);

        return (
            <>
            <meshStandardMaterial
                transparent={true}
                map={pairs.get(type + firstCapital(color))}
                normalMap={pairs.get(type + 'Normal')}
                metalness={0.6}
                roughness={0.1}
                envMap={envMap}
            />

            </>
        )
}