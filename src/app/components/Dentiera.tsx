'use client'
import * as THREE from 'three';
import {Outlines, useFBX, useTexture} from "@react-three/drei";
import React, {JSX, memo, useEffect, useMemo, useState} from "react";
import {useTeethStore} from "@/app/stores/teeth";
import State from "@/app/types/State";

export default function Dentiera() {
    const fbx2 = useMemo(() => {
        console.log('dentiera')
        return useFBX('/models/MOD_Denti_Freeze_PSR.fbx')
    }, []);
    // const fbx = useMemo(() => {
    //     return useFBX('/models/Dentiera_Separata.fbx')
    // }, []);
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
    const [touch, setTouch] = useState<boolean>(false);
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

    useEffect(() => {
        if('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setTouch(true);
            console.log('touch!')
        }
    }, []);

    function log(e: any) {
        switch(e.object.name) {
            case "Incisivo_C_SX_1":
                setActive('icisx');
                break;
            case "Incisivo_C_DX_1":
                setActive('icidx');
                break;
            case "Incisivo_L_SX_1":
                setActive('ilisx');
                break;
            case "Incisivo_L_DX_1":
                setActive('ilidx');
                break;
            case "Canino_SX_1":
                setActive('cisx');
                break;
            case "Canino_DX_1":
                setActive('cidx');
                break;
            case "Canino_SX":
                setActive('cssx');
                break;
            case "Incisivo_L_SX":
                setActive('ilssx');
                break;
            case "Incisivo_C_SX":
                setActive('icssx');
                break;
            case "Canino_DX":
                setActive('csdx');
                break;
            case "Incisivo_L_DX":
                setActive('ilsdx');
                break;
            case "Incisivo_C_DX":
                setActive('icsdx');
                break;
        }
    }

    // hover
    const Icsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icsdx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[11] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[11].name}
                  geometry={(fbx2.children[1].children[5] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[5].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icssx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[8] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[8].name}
                  geometry={(fbx2.children[1].children[2] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[2].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icisx')} onPointerOut={() => setHover(null)}
                  // name={fbx.children[0].children[0].name}
                  // geometry={(fbx.children[0].children[0] as THREE.Mesh).geometry}
                  geometry={(fbx2.children[2].children[0] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[0].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('icidx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[1] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[1].name}
                  geometry={(fbx2.children[2].children[1] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[1].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Csdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('csdx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[9] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[9].name}
                  geometry={(fbx2.children[1].children[3] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[3].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('cssx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[6] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[6].name}
                  geometry={(fbx2.children[1].children[0] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[0].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('cisx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[4] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[4].name}
                  geometry={(fbx2.children[2].children[4] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[4].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('cidx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[5] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[5].name}
                  geometry={(fbx2.children[2].children[5] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[5].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Ilsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilsdx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[10] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[10].name}
                  geometry={(fbx2.children[1].children[4] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[4].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilssx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[7] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[7].name}
                  geometry={(fbx2.children[1].children[1] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[1].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilisx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[2] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[2].name}
                  geometry={(fbx2.children[2].children[2] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[2].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerOver={() => setHover('ilidx')} onPointerOut={() => setHover(null)}
                  // geometry={(fbx.children[0].children[3] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[3].name}
                  geometry={(fbx2.children[2].children[3] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[3].name}
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    // no hover
    const NoHoverIcsdx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[11] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[11].name}
                  geometry={(fbx2.children[1].children[5] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[5].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverIcssx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[8] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[8].name}
                  geometry={(fbx2.children[1].children[2] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[2].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverIcisx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[0] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[0].name}
                  geometry={(fbx2.children[2].children[0] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[0].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverIcidx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[1] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[1].name}
                  geometry={(fbx2.children[2].children[1] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[1].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })

    const NoHoverCsdx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[9] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[9].name}
                  geometry={(fbx2.children[1].children[3] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[3].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverCssx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[6] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[6].name}
                  geometry={(fbx2.children[1].children[0] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[0].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverCisx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[4] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[4].name}
                  geometry={(fbx2.children[2].children[4] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[4].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverCidx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[5] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[5].name}
                  geometry={(fbx2.children[2].children[5] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[5].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })

    const NoHoverIlsdx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[10] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[10].name}
                  geometry={(fbx2.children[1].children[4] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[4].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverIlssx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[7] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[7].name}
                  geometry={(fbx2.children[1].children[1] as THREE.Mesh).geometry}
                  name={fbx2.children[1].children[1].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverIlisx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[2] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[2].name}
                  geometry={(fbx2.children[2].children[2] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[2].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })
    const NoHoverIlidx = memo(({outline} : {outline: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log}
                  // geometry={(fbx.children[0].children[3] as THREE.Mesh).geometry}
                  // name={fbx.children[0].children[3].name}
                  geometry={(fbx2.children[2].children[3] as THREE.Mesh).geometry}
                  name={fbx2.children[2].children[3].name}
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
            </mesh>
        )
    })


    const Base = memo(() : JSX.Element => {
        console.log('base')
        return (
            <>
                <mesh geometry={(fbx2.children[0] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh geometry={(fbx2.children[3] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
            </>
        )
    })

    return (
        <>
            <Base/>

            {!touch
                ? <>
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
                : <>
                    <NoHoverIcisx outline={activeTooth === 'icisx'}/>
                    <NoHoverIcidx outline={activeTooth === 'icidx'}/>
                    <NoHoverIcssx outline={activeTooth === 'icssx'}/>
                    <NoHoverIcsdx outline={activeTooth === 'icsdx'}/>

                    <NoHoverIlisx outline={activeTooth === 'ilisx'}/>
                    <NoHoverIlidx outline={activeTooth === 'ilidx'}/>
                    <NoHoverIlssx outline={activeTooth === 'ilssx'}/>
                    <NoHoverIlsdx outline={activeTooth === 'ilsdx'}/>

                    <NoHoverCisx outline={activeTooth === 'cisx'} />
                    <NoHoverCidx outline={activeTooth === 'cidx'} />
                    <NoHoverCssx outline={activeTooth === 'cssx'} />
                    <NoHoverCsdx outline={activeTooth === 'csdx'} />
                </>
            }
        </>
    )
}