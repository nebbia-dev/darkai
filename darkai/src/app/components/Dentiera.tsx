'use client'
import * as THREE from 'three';
import {useFBX, useTexture} from "@react-three/drei";
import {JSX, memo, useMemo} from "react";
import {useTeethStore} from "@/app/stores/teeth";

export default function Dentiera() {
    const fbx = useMemo(() => {
        console.log('dentiera')
        return useFBX('/models/Dentiera_Separata.fbx')
    }, []);
    const envMap = useTeethStore((state) => state.envMap);
    const toggleVisibility = useTeethStore((state) => state.setVisibility);
    const activeTooth = useTeethStore((state) => state.currentTooth);
    const props = useTexture({
        map: 'textures/dentieraBase/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/dentieraBase/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/dentieraBase/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/dentieraBase/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/dentieraBase/DefaultMaterial_Mixed_AO.webp',
    });

    const dentieraMaterial = useMemo(() => {
        console.log('material')
        return new THREE.MeshStandardMaterial({
            map: props.map,
            normalMap: props.normalMap,
            metalnessMap: props.metalnessMap,
            roughnessMap: props.roughnessMap,
            aoMap: props.aoMap,
            metalness: 0.5,
            roughness: 0.7,
            envMap: envMap
        })
    }, []);
    const baseMaterial = useMemo(() => new THREE.MeshBasicMaterial({color: '#fff'}), [])

    function log(e) {
        switch(e.object.name) {
            case "Dente_01":
                toggleVisibility('icisx');
                break;
            case "Dente_02":
                toggleVisibility('icidx');
                break;
            case "Dente_03":
                toggleVisibility('ilisx');
                break;
            case "Dente_04":
                toggleVisibility('ilidx');
                break;
            case "Dente_05":
                toggleVisibility('cisx');
                break;
            case "Dente_06":
                toggleVisibility('cidx');
                break;
            case "Dente_07":
                toggleVisibility('cssx');
                break;
            case "Dente_08":
                toggleVisibility('ilssx');
                break;
            case "Dente_09":
                toggleVisibility('icssx');
                break;
            case "Dente_10":
                toggleVisibility('csdx');
                break;
            case "Dente_11":
                toggleVisibility('ilsdx');
                break;
            case "Dente_12":
                toggleVisibility('icsdx');
                break;
        }
    }

    const Icsdx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[11].geometry}
                  material={material}
                  name={fbx.children[0].children[11].name}>
            </mesh>
        )
    })
    const Icssx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[8].geometry}
                  material={material}
                  name={fbx.children[0].children[8].name}>
            </mesh>
        )
    })
    const Icisx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[0].geometry}
                  material={material}
                  name={fbx.children[0].children[0].name}>
            </mesh>
        )
    })
    const Icidx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[1].geometry}
                  material={material}
                  name={fbx.children[0].children[1].name}>
            </mesh>
        )
    })

    const Csdx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[9].geometry}
                  material={material}
                  name={fbx.children[0].children[9].name}>
            </mesh>
        )
    })
    const Cssx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[6].geometry}
                  material={material}
                  name={fbx.children[0].children[6].name}>
            </mesh>
        )
    })
    const Cisx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[4].geometry}
                  material={material}
                  name={fbx.children[0].children[4].name}>
            </mesh>
        )
    })
    const Cidx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[5].geometry}
                  material={material}
                  name={fbx.children[0].children[5].name}>
            </mesh>
        )
    })

    const Ilsdx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[10].geometry}
                  material={material}
                  name={fbx.children[0].children[10].name}>
            </mesh>
        )
    })
    const Ilssx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[7].geometry}
                  material={material}
                  name={fbx.children[0].children[7].name}>
            </mesh>
        )
    })
    const Ilisx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[2].geometry}
                  material={material}
                  name={fbx.children[0].children[2].name}>
            </mesh>
        )
    })
    const Ilidx = memo(({material} : {material: THREE.MeshBasicMaterial | THREE.MeshStandardMaterial}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  geometry={fbx.children[0].children[3].geometry}
                  material={material}
                  name={fbx.children[0].children[3].name}>
            </mesh>
        )
    })

    const Base = memo(() : JSX.Element => {
        console.log('base')
        return (
            <>
                <mesh geometry={fbx.children[1].geometry} material={dentieraMaterial}>
                </mesh>
                <mesh geometry={fbx.children[2].geometry} material={dentieraMaterial}>
                </mesh>
            </>
    )
    })

    return (
        <>
            <Base/>

            <Icisx material={activeTooth === 'icisx' ? baseMaterial : dentieraMaterial}/>
            <Icidx material={activeTooth === 'icidx' ? baseMaterial : dentieraMaterial}/>
            <Icssx material={activeTooth === 'icssx' ? baseMaterial : dentieraMaterial}/>
            <Icsdx material={activeTooth === 'icsdx' ? baseMaterial : dentieraMaterial}/>

            <Ilisx material={activeTooth === 'ilisx' ? baseMaterial : dentieraMaterial}/>
            <Ilidx material={activeTooth === 'ilidx' ? baseMaterial : dentieraMaterial}/>
            <Ilssx material={activeTooth === 'ilssx' ? baseMaterial : dentieraMaterial}/>
            <Ilsdx material={activeTooth === 'ilsdx' ? baseMaterial : dentieraMaterial}/>

            <Cisx material={activeTooth === 'cisx' ? baseMaterial : dentieraMaterial}/>
            <Cidx material={activeTooth === 'cidx' ? baseMaterial : dentieraMaterial}/>
            <Cssx material={activeTooth === 'cssx' ? baseMaterial : dentieraMaterial}/>
            <Csdx material={activeTooth === 'csdx' ? baseMaterial : dentieraMaterial}/>
        </>
    )
}