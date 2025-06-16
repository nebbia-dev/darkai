import * as THREE from 'three';
import {useFBX, useTexture} from "@react-three/drei";

export default function Teeth({envMap}) {
    const fbx = useFBX('/models/MOD_Dentiera_Completa.fbx');
    // FULL
    const propsYGoldFull = useTexture({
        map: 'textures/full/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/full/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/full/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/full/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/full/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGoldFull.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGoldFull = useTexture({
        map: 'textures/full/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGoldFull.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGoldFull = useTexture({
        map: 'textures/full/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGoldFull.map.colorSpace = THREE.SRGBColorSpace;
    const yGoldFullMaterial = new THREE.MeshStandardMaterial({
        map: propsYGoldFull.map,
        normalMap: propsYGoldFull.normalMap,
        metalnessMap: propsYGoldFull.metalnessMap,
        roughnessMap: propsYGoldFull.roughnessMap,
        aoMap: propsYGoldFull.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGoldFullMaterial = new THREE.MeshStandardMaterial({
        map: propsRGoldFull.map,
        normalMap: propsYGoldFull.normalMap,
        metalnessMap: propsYGoldFull.metalnessMap,
        roughnessMap: propsYGoldFull.roughnessMap,
        aoMap: propsYGoldFull.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGoldFullMaterial = new THREE.MeshStandardMaterial({
        map: propsWGoldFull.map,
        normalMap: propsYGoldFull.normalMap,
        metalnessMap: propsYGoldFull.metalnessMap,
        roughnessMap: propsYGoldFull.roughnessMap,
        aoMap: propsYGoldFull.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // FULL DIAMOND
    const propsYGDiamondFull = useTexture({
        map: 'textures/diamondFull/Difuse_Diamanti.webp',
        normalMap: 'textures/diamondFull/Normal_Diamanti.webp',
        metalnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
        roughnessMap: 'textures/diamondFull/Metalness_Diamanti.webp',
        aoMap: 'textures/diamondFull/MixedAO_Diamanti.webp',
    });
    propsYGDiamondFull.map.colorSpace = THREE.SRGBColorSpace;
    propsYGDiamondFull.map.wrapS = propsYGDiamondFull.map.wrapT = THREE.RepeatWrapping;
    propsYGDiamondFull.map.repeat.set(1,1);
    propsYGDiamondFull.normalMap.wrapS = propsYGDiamondFull.normalMap.wrapT = THREE.RepeatWrapping;
    propsYGDiamondFull.normalMap.repeat.set(1,1);
    propsYGDiamondFull.metalnessMap.wrapS = propsYGDiamondFull.metalnessMap.wrapT = THREE.RepeatWrapping;
    propsYGDiamondFull.metalnessMap.repeat.set(1,1);
    const yGDiamondFullMaterial = new THREE.MeshStandardMaterial({
        map: propsYGDiamondFull.map,
        normalMap: propsYGDiamondFull.normalMap,
        metalnessMap: propsYGDiamondFull.metalnessMap,
        roughnessMap: propsYGDiamondFull.roughnessMap,
        metalness: 1,
        roughness: 0
 ,
    envMap: envMap});

    // FRAME 01
    const propsYGFrame01 = useTexture({
        map: 'textures/frame/01/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/frame/01/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/frame/01/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/frame/01/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/frame/01/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGFrame01.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGFrame01 = useTexture({
        map: 'textures/frame/01/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGFrame01.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGFrame01 = useTexture({
        map: 'textures/frame/01/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGFrame01.map.colorSpace = THREE.SRGBColorSpace;
    const yGFrame01Material = new THREE.MeshStandardMaterial({
        map: propsYGFrame01.map,
        normalMap: propsYGFrame01.normalMap,
        metalnessMap: propsYGFrame01.metalnessMap,
        roughnessMap: propsYGFrame01.roughnessMap,
        aoMap: propsYGFrame01.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGFrame01Material = new THREE.MeshStandardMaterial({
        map: propsRGFrame01.map,
        normalMap: propsYGFrame01.normalMap,
        metalnessMap: propsYGFrame01.metalnessMap,
        roughnessMap: propsYGFrame01.roughnessMap,
        aoMap: propsYGFrame01.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGFrame01Material = new THREE.MeshStandardMaterial({
        map: propsRGFrame01.map,
        normalMap: propsYGFrame01.normalMap,
        metalnessMap: propsYGFrame01.metalnessMap,
        roughnessMap: propsYGFrame01.roughnessMap,
        aoMap: propsYGFrame01.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // FRAME 02
    const propsYGFrame02 = useTexture({
        map: 'textures/frame/02/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/frame/02/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/frame/02/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/frame/02/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/frame/02/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGFrame02.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGFrame02 = useTexture({
        map: 'textures/frame/02/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGFrame02.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGFrame02 = useTexture({
        map: 'textures/frame/02/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGFrame02.map.colorSpace = THREE.SRGBColorSpace;
    const yGFrame02Material = new THREE.MeshStandardMaterial({
        map: propsYGFrame02.map,
        normalMap: propsYGFrame02.normalMap,
        metalnessMap: propsYGFrame02.metalnessMap,
        roughnessMap: propsYGFrame02.roughnessMap,
        aoMap: propsYGFrame02.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGFrame02Material = new THREE.MeshStandardMaterial({
        map: propsRGFrame02.map,
        normalMap: propsYGFrame02.normalMap,
        metalnessMap: propsYGFrame02.metalnessMap,
        roughnessMap: propsYGFrame02.roughnessMap,
        aoMap: propsYGFrame02.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGFrame02Material = new THREE.MeshStandardMaterial({
        map: propsWGFrame02.map,
        normalMap: propsYGFrame02.normalMap,
        metalnessMap: propsYGFrame02.metalnessMap,
        roughnessMap: propsYGFrame02.roughnessMap,
        aoMap: propsYGFrame02.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // FRAME 03
    const propsYGFrame03 = useTexture({
        map: 'textures/frame/03/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/frame/03/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/frame/03/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/frame/03/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/frame/03/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGFrame03.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGFrame03 = useTexture({
        map: 'textures/frame/03/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGFrame03.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGFrame03 = useTexture({
        map: 'textures/frame/03/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGFrame03.map.colorSpace = THREE.SRGBColorSpace;
    const yGFrame03Material = new THREE.MeshStandardMaterial({
        map: propsYGFrame03.map,
        normalMap: propsYGFrame03.normalMap,
        metalnessMap: propsYGFrame03.metalnessMap,
        roughnessMap: propsYGFrame03.roughnessMap,
        aoMap: propsYGFrame03.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGFrame03Material = new THREE.MeshStandardMaterial({
        map: propsRGFrame03.map,
        normalMap: propsYGFrame03.normalMap,
        metalnessMap: propsYGFrame03.metalnessMap,
        roughnessMap: propsYGFrame03.roughnessMap,
        aoMap: propsYGFrame03.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGFrame03Material = new THREE.MeshStandardMaterial({
        map: propsWGFrame03.map,
        normalMap: propsYGFrame03.normalMap,
        metalnessMap: propsYGFrame03.metalnessMap,
        roughnessMap: propsYGFrame03.roughnessMap,
        aoMap: propsYGFrame03.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // FRAME 04
    const propsYGFrame04 = useTexture({
        map: 'textures/frame/04/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/frame/04/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/frame/04/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/frame/04/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/frame/04/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGFrame04.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGFrame04 = useTexture({
        map: 'textures/frame/04/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGFrame04.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGFrame04 = useTexture({
        map: 'textures/frame/04/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGFrame04.map.colorSpace = THREE.SRGBColorSpace;
    const yGFrame04Material = new THREE.MeshStandardMaterial({
        map: propsYGFrame04.map,
        normalMap: propsYGFrame04.normalMap,
        metalnessMap: propsYGFrame04.metalnessMap,
        roughnessMap: propsYGFrame04.roughnessMap,
        aoMap: propsYGFrame04.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGFrame04Material = new THREE.MeshStandardMaterial({
        map: propsRGFrame04.map,
        normalMap: propsYGFrame04.normalMap,
        metalnessMap: propsYGFrame04.metalnessMap,
        roughnessMap: propsYGFrame04.roughnessMap,
        aoMap: propsYGFrame04.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGFrame04Material = new THREE.MeshStandardMaterial({
        map: propsWGFrame04.map,
        normalMap: propsYGFrame04.normalMap,
        metalnessMap: propsYGFrame04.metalnessMap,
        roughnessMap: propsYGFrame04.roughnessMap,
        aoMap: propsYGFrame04.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // BAR FULL
    const propsYGBarFull = useTexture({
        map: 'textures/bar/full/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/bar/full/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/bar/full/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/bar/full/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/bar/full/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGBarFull.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGBarFull = useTexture({
        map: 'textures/bar/full/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGBarFull.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGBarFull = useTexture({
        map: 'textures/bar/full/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGBarFull.map.colorSpace = THREE.SRGBColorSpace;
    const yGBarFullMaterial = new THREE.MeshStandardMaterial({
        map: propsYGBarFull.map,
        normalMap: propsYGBarFull.normalMap,
        metalnessMap: propsYGBarFull.metalnessMap,
        roughnessMap: propsYGBarFull.roughnessMap,
        aoMap: propsYGBarFull.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGBarFullMaterial = new THREE.MeshStandardMaterial({
        map: propsRGBarFull.map,
        normalMap: propsYGBarFull.normalMap,
        metalnessMap: propsYGBarFull.metalnessMap,
        roughnessMap: propsYGBarFull.roughnessMap,
        aoMap: propsYGBarFull.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGBarFullMaterial = new THREE.MeshStandardMaterial({
        map: propsWGBarFull.map,
        normalMap: propsYGBarFull.normalMap,
        metalnessMap: propsYGBarFull.metalnessMap,
        roughnessMap: propsYGBarFull.roughnessMap,
        aoMap: propsYGBarFull.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // BAR 01
    const propsYGBar01 = useTexture({
        map: 'textures/bar/01/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/bar/01/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/bar/01/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/bar/01/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/bar/01/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGBar01.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGBar01 = useTexture({
        map: 'textures/bar/01/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGBar01.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGBar01 = useTexture({
        map: 'textures/bar/01/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGBar01.map.colorSpace = THREE.SRGBColorSpace;
    const yGBar01Material = new THREE.MeshStandardMaterial({
        map: propsYGBar01.map,
        normalMap: propsYGBar01.normalMap,
        metalnessMap: propsYGBar01.metalnessMap,
        roughnessMap: propsYGBar01.roughnessMap,
        aoMap: propsYGBar01.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGBar01Material = new THREE.MeshStandardMaterial({
        map: propsRGBar01.map,
        normalMap: propsYGBar01.normalMap,
        metalnessMap: propsYGBar01.metalnessMap,
        roughnessMap: propsYGBar01.roughnessMap,
        aoMap: propsYGBar01.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGBar01Material = new THREE.MeshStandardMaterial({
        map: propsRGBar01.map,
        normalMap: propsYGBar01.normalMap,
        metalnessMap: propsYGBar01.metalnessMap,
        roughnessMap: propsYGBar01.roughnessMap,
        aoMap: propsYGBar01.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // BAR 02
    const propsYGBar02 = useTexture({
        map: 'textures/bar/02/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/bar/02/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/bar/02/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/bar/02/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/bar/02/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGBar02.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGBar02 = useTexture({
        map: 'textures/bar/02/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGBar02.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGBar02 = useTexture({
        map: 'textures/bar/02/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGBar02.map.colorSpace = THREE.SRGBColorSpace;
    const yGBar02Material = new THREE.MeshStandardMaterial({
        map: propsYGBar02.map,
        normalMap: propsYGBar02.normalMap,
        metalnessMap: propsYGBar02.metalnessMap,
        roughnessMap: propsYGBar02.roughnessMap,
        aoMap: propsYGBar02.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGBar02Material = new THREE.MeshStandardMaterial({
        map: propsRGBar02.map,
        normalMap: propsYGBar02.normalMap,
        metalnessMap: propsYGBar02.metalnessMap,
        roughnessMap: propsYGBar02.roughnessMap,
        aoMap: propsYGBar02.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGBar02Material = new THREE.MeshStandardMaterial({
        map: propsWGBar02.map,
        normalMap: propsYGBar02.normalMap,
        metalnessMap: propsYGBar02.metalnessMap,
        roughnessMap: propsYGBar02.roughnessMap,
        aoMap: propsYGBar02.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // BAR 03
    const propsYGBar03 = useTexture({
        map: 'textures/bar/03/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/bar/03/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/bar/03/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/bar/03/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/bar/03/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGBar03.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGBar03 = useTexture({
        map: 'textures/bar/03/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGBar03.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGBar03 = useTexture({
        map: 'textures/bar/03/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGBar03.map.colorSpace = THREE.SRGBColorSpace;
    const yGBar03Material = new THREE.MeshStandardMaterial({
        map: propsYGBar03.map,
        normalMap: propsYGBar03.normalMap,
        metalnessMap: propsYGBar03.metalnessMap,
        roughnessMap: propsYGBar03.roughnessMap,
        aoMap: propsYGBar03.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGBar03Material = new THREE.MeshStandardMaterial({
        map: propsRGBar03.map,
        normalMap: propsYGBar03.normalMap,
        metalnessMap: propsYGBar03.metalnessMap,
        roughnessMap: propsYGBar03.roughnessMap,
        aoMap: propsYGBar03.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGBar03Material = new THREE.MeshStandardMaterial({
        map: propsWGBar03.map,
        normalMap: propsYGBar03.normalMap,
        metalnessMap: propsYGBar03.metalnessMap,
        roughnessMap: propsYGBar03.roughnessMap,
        aoMap: propsYGBar03.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // BAR 04
    const propsYGBar04 = useTexture({
        map: 'textures/bar/04/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/bar/04/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/bar/04/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/bar/04/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/bar/04/DefaultMaterial_Mixed_AO.webp',
    });
    propsYGBar04.map.colorSpace = THREE.SRGBColorSpace;
    const propsRGBar04 = useTexture({
        map: 'textures/bar/04/DefaultMaterial_Base_colorRose.webp',
    });
    propsRGBar04.map.colorSpace = THREE.SRGBColorSpace;
    const propsWGBar04 = useTexture({
        map: 'textures/bar/04/DefaultMaterial_Base_colorWhite.webp',
    });
    propsWGBar04.map.colorSpace = THREE.SRGBColorSpace;
    const yGBar04Material = new THREE.MeshStandardMaterial({
        map: propsYGBar04.map,
        normalMap: propsYGBar04.normalMap,
        metalnessMap: propsYGBar04.metalnessMap,
        roughnessMap: propsYGBar04.roughnessMap,
        aoMap: propsYGBar04.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const rGBar04Material = new THREE.MeshStandardMaterial({
        map: propsRGBar04.map,
        normalMap: propsYGBar04.normalMap,
        metalnessMap: propsYGBar04.metalnessMap,
        roughnessMap: propsYGBar04.roughnessMap,
        aoMap: propsYGBar04.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });
    const wGBar04Material = new THREE.MeshStandardMaterial({
        map: propsWGBar04.map,
        normalMap: propsYGBar04.normalMap,
        metalnessMap: propsYGBar04.metalnessMap,
        roughnessMap: propsYGBar04.roughnessMap,
        aoMap: propsYGBar04.aoMap,
        metalness: 1,
        roughness: 0.5,
        envMap: envMap
    });

    // STONES: SAPPHIRE
    const sapphire = new THREE.MeshBasicMaterial({
        color: 0x5773ff,
        reflectivity: 1,
        refractionRatio: 1,
        envMap: envMap
    })
    // STONES: RUBY
    const ruby = new THREE.MeshBasicMaterial({
        color: 0x9d0633,
        reflectivity: 1,
        refractionRatio: 1,
        envMap: envMap
    })
    // STONES: EMERALD
    const emerald = new THREE.MeshBasicMaterial({
        color: 0x0f6151,
        reflectivity: 1,
        refractionRatio: 1,
        envMap: envMap
    })
    // STONES: AMETHYST
    const amethyst = new THREE.MeshBasicMaterial({
        color: 0x6c2593,
        reflectivity: 1,
        refractionRatio: 1,
        envMap: envMap
    })

    console.log(fbx);

    return (
        <>
            <mesh geometry={fbx.children[0].children[2].geometry} material={yGoldFullMaterial}/>
            <mesh geometry={fbx.children[0].children[5].geometry} material={yGoldFullMaterial} visible={false} onClick={()=>console.log('quaso')}/>
        </>
    )
}