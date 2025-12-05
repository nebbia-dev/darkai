import {useEnvironment, useTexture} from "@react-three/drei";
import * as THREE from "three";
import {useTeethStore} from "@/app/_stores/teeth";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";

export default function RoundPaveBaseFrame({color} : {color: string|undefined}) {
    if(!color) return;

    // const envMap = useTeethStore((state) => state.envMap);
    const envMap = useEnvironment({
        // files: "envMaps/rosendal_park_sunset_puresky_1k.exr"
        files: "envMaps/Diamond_HDRI_Schiarita.hdr"
        // files: "envMaps/Diamond_HDRI.hdr"
    })

    const pairs = new Map();

    //FRAME NORMAL
    const frameNormal = useTexture({
        normalMap: 'textures/frame/Frame_Round_Texture_Struttura_Normal.webp',
    });
    frameNormal.normalMap.flipY = false;


    //FRAME COLORS
    const frameGold = useTexture({
        map: 'textures/frame/Frame_Round_Texture_Struttura_Oro_Giallo.webp',
    });
    frameGold.map.colorSpace = THREE.SRGBColorSpace;
    frameGold.map.flipY = false;
    pairs.set('frameGold', frameGold.map);

    const frameRose = useTexture({
        map: 'textures/frame/Frame_Round_Texture_Struttura_Oro_Rosa.webp',
    });
    frameRose.map.colorSpace = THREE.SRGBColorSpace;
    frameRose.map.flipY = false;
    pairs.set('frameRose', frameRose.map);

    const frameWhite = useTexture({
        map: 'textures/frame/Frame_Round_Texture_Struttura_Oro_Bianco.webp',
    });
    frameWhite.map.colorSpace = THREE.SRGBColorSpace;
    frameWhite.map.flipY = false;
    pairs.set('frameWhite', frameWhite.map);

    const frameBlack = useTexture({
        map: 'textures/frame/Frame_Round_Texture_Struttura_Oro_Nero.webp',
    });
    frameBlack.map.colorSpace = THREE.SRGBColorSpace;
    frameBlack.map.flipY = false;
    pairs.set('frameBlack', frameBlack.map);

        return (
            <>
            <meshStandardMaterial
                transparent={true}
                map={pairs.get('frame' + firstCapital(color))}
                normalMap={frameNormal.normalMap}
                metalness={0.6}
                roughness={0.1}
                envMap={envMap}
            />

            </>
        )
}