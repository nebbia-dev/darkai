'use client'
import * as THREE from 'three';
import {Outlines, useFBX, useTexture} from "@react-three/drei";
import {JSX, memo, useEffect, useMemo, useState} from "react";
import {useTeethStore} from "@/app/stores/teeth";
import State from "@/app/types/State";

export default function Dentiera() {
    const fbx = useMemo(() => {
        console.log('dentiera')
        return useFBX('/models/Dentiera_Separata.fbx')
    }, []);
    const envMap = useTeethStore((state: State) => state.envMap);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const props = useTexture({
        map: 'textures/dentieraBase/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/dentieraBase/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/dentieraBase/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/dentieraBase/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/dentieraBase/DefaultMaterial_Mixed_AO.webp',
    });
    const [hovered, setHover] = useState<string|null>(null);
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

    function log(e) {
        switch(e.object.name) {
            case "Dente_01":
                setActive('icisx');
                break;
            case "Dente_02":
                setActive('icidx');
                break;
            case "Dente_03":
                setActive('ilisx');
                break;
            case "Dente_04":
                setActive('ilidx');
                break;
            case "Dente_05":
                setActive('cisx');
                break;
            case "Dente_06":
                setActive('cidx');
                break;
            case "Dente_07":
                setActive('cssx');
                break;
            case "Dente_08":
                setActive('ilssx');
                break;
            case "Dente_09":
                setActive('icssx');
                break;
            case "Dente_10":
                setActive('csdx');
                break;
            case "Dente_11":
                setActive('ilsdx');
                break;
            case "Dente_12":
                setActive('icsdx');
                break;
        }
    }

    const Icsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icsdx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[11].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[11].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icssx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[8].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[8].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icisx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[0].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[0].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icidx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[1].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[1].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Csdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('csdx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[9].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[9].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('cssx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[6].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[6].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('cisx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[4].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[4].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('cidx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[5].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[5].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Ilsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilsdx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[10].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[10].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilssx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[7].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[7].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilisx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[2].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[2].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilidx')} onPointerOut={() => setHover(null)}
                  geometry={fbx.children[0].children[3].geometry}
                  material={dentieraMaterial}
                  name={fbx.children[0].children[3].name}>
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
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

            <Icisx outline={activeTooth === 'icisx'} hovered={hovered === 'icisx'}/>
            <Icidx outline={activeTooth === 'icidx'} hovered={hovered === 'icidx'}/>
            <Icssx outline={activeTooth === 'icssx'} hovered={hovered === 'icssx'}/>
            <Icsdx outline={activeTooth === 'icsdx'} hovered={hovered === 'icsdx'}/>

            <Ilisx outline={activeTooth === 'ilisx'} hovered={hovered === 'ilisx'}/>
            <Ilidx outline={activeTooth === 'ilidx'} hovered={hovered === 'ilidx'}/>
            <Ilssx outline={activeTooth === 'ilssx'} hovered={hovered === 'ilssx'}/>
            <Ilsdx outline={activeTooth === 'ilsdx'} hovered={hovered === 'ilsdx'}/>

            <Cisx outline={activeTooth === 'cisx'} hovered={hovered === 'cisx'}/>
            <Cidx outline={activeTooth === 'cidx'} hovered={hovered === 'cidx'}/>
            <Cssx outline={activeTooth === 'cssx'} hovered={hovered === 'cssx'}/>
            <Csdx outline={activeTooth === 'csdx'} hovered={hovered === 'csdx'}/>
        </>
    )
}