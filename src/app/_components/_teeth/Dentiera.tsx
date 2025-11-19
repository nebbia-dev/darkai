'use client'
import * as THREE from 'three';
import {Outlines, useFBX, useTexture} from "@react-three/drei";
import React, {JSX, memo, useMemo} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function Dentiera() {
    const fbx = useMemo(() => {
        return useFBX('/models/Dentiera.fbx')
    }, []);


    const envMap = useTeethStore((state: State) => state.envMap);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const setRecap = useTeethStore((state:State) => state.setRecap);
    const props = useTexture({
        map: 'textures/dentieraBase/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/dentieraBase/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/dentieraBase/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/dentieraBase/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/dentieraBase/DefaultMaterial_Mixed_AO.webp',
    });

    const shadow = useTexture({
        map: 'textures/dentiera_ombra.webp',
    });


    const hovered = useTeethStore((state: State) => state.hovered);
    const setHover = useTeethStore((state: State) => state.setHover);
    const dentieraMaterial = useMemo(() => {

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
    const shadowMaterial = useMemo(() => {

        return new THREE.MeshBasicMaterial({
            map: shadow.map,
            transparent: true,
            opacity: 0.65
        })
    }, []);

    function hover(e:any, tooth:string|undefined) {
        e.stopPropagation();
        setHover(tooth);
    }

    function hoverBase(e:any) {
        e.stopPropagation();
        if(hovered) {
            setHover(undefined);
        }
    }

    function log(e: any) {
        // fondamentale. Altrimenti, con visuale frontale, cliccando sui primi premolari vengono
        // selezionati i secondi premolari o i molari
        e.stopPropagation();

        switch(e.object.name) {
            case "Incisivo_C_I_SX":
                setActive('icisx');
                break;
            case "Incisivo_C_I_DX":
                setActive('icidx');
                break;
            case "Incisivo_L_I_SX":
                setActive('ilisx');
                break;
            case "Incisivo_L_I_DX":
                setActive('ilidx');
                break;
            case "Canino_I_SX":
                setActive('cisx');
                break;
            case "Canino_I_DX":
                setActive('cidx');
                break;
            case "Canino_S_SX":
                setActive('cssx');
                break;
            case "Incisivo_L_S_SX":
                setActive('ilssx');
                break;
            case "Incisivo_C_S_SX":
                setActive('icssx');
                break;
            case "Canino_S_DX":
                setActive('csdx');
                break;
            case "Incisivo_L_S_DX":
                setActive('ilsdx');
                break;
            case "Incisivo_C_S_DX":
                setActive('icsdx');
                break;
            //
            case "Premolare_1_S_DX":
                setActive('pprsdx');
                break;
            case "Premolare_2_S_DX":
                setActive('sprsdx');
                break;
            case "Molare_S_DX":
                setActive('msdx');
                break;
            case "Premolare_1_S_SX":
                setActive('pprssx');
                break;
            case "Premolare_2_S_SX":
                setActive('sprssx');
                break;
            case "Molare_S_SX":
                setActive('mssx');
                break;
            case "Premolare_1_I_DX":
                setActive('ppridx');
                break;
            case "Premolare_2_I_DX":
                setActive('spridx');
                break;
            case "Molare_I_DX":
                setActive('midx');
                break;
            case "Premolare_1_I_SX":
                setActive('pprisx');
                break;
            case "Premolare_2_I_SX":
                setActive('sprisx');
                break;
            case "Molare_I_SX":
                setActive('misx');
                break;
        }
        setRecap(false);
    }

    // hover
    const Icsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'icsdx')}
                  geometry={(fbx.children[1].children[5] as THREE.Mesh).geometry}
                  name="Incisivo_C_S_DX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'icssx')}
                  geometry={(fbx.children[1].children[2] as THREE.Mesh).geometry}
                  name="Incisivo_C_S_SX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'icisx')}
                  geometry={(fbx.children[1].children[6] as THREE.Mesh).geometry}
                  name="Incisivo_C_I_SX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Icidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'icidx')}
                  geometry={(fbx.children[1].children[7] as THREE.Mesh).geometry}
                  name="Incisivo_C_I_DX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Csdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'csdx')}
                  geometry={(fbx.children[1].children[3] as THREE.Mesh).geometry}
                  name="Canino_S_DX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'cssx')}
                  geometry={(fbx.children[1].children[0] as THREE.Mesh).geometry}
                  name="Canino_S_SX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'cisx')}
                  geometry={(fbx.children[1].children[10] as THREE.Mesh).geometry}
                  name="Canino_I_SX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Cidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'cidx')}
                  geometry={(fbx.children[1].children[11] as THREE.Mesh).geometry}
                  name="Canino_I_DX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Ilsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'ilsdx')}
                  geometry={(fbx.children[1].children[4] as THREE.Mesh).geometry}
                  name="Incisivo_L_S_DX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'ilssx')}
                  geometry={(fbx.children[1].children[1] as THREE.Mesh).geometry}
                  name="Incisivo_L_S_SX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'ilisx')}
                  geometry={(fbx.children[1].children[8] as THREE.Mesh).geometry}
                  name="Incisivo_L_I_SX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Ilidx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'ilidx')}
                  geometry={(fbx.children[1].children[9] as THREE.Mesh).geometry}
                  name="Incisivo_L_I_DX"
                  material={dentieraMaterial}
            >
                  {outline && <Outlines thickness={10} color="hotpink"/>}
                  {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Pprsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'pprsdx')}
                  geometry={(fbx.children[1].children[30] as THREE.Mesh).geometry}
                  name="Premolare_1_S_DX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Sprsdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'sprsdx')}
                  geometry={(fbx.children[1].children[22] as THREE.Mesh).geometry}
                  name="Premolare_2_S_DX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Msdx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'msdx')}
                  geometry={(fbx.children[1].children[28] as THREE.Mesh).geometry}
                  name="Molare_S_DX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Pprssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'pprssx')}
                  geometry={(fbx.children[1].children[20] as THREE.Mesh).geometry}
                  name="Premolare_1_S_SX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Sprssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'sprssx')}
                  geometry={(fbx.children[1].children[12] as THREE.Mesh).geometry}
                  name="Premolare_2_S_SX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Mssx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'mssx')}
                  geometry={(fbx.children[1].children[17] as THREE.Mesh).geometry}
                  name="Molare_S_SX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Ppridx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'ppridx')}
                  geometry={(fbx.children[1].children[16] as THREE.Mesh).geometry}
                  name="Premolare_1_I_DX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Spridx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'spridx')}
                  geometry={(fbx.children[1].children[14] as THREE.Mesh).geometry}
                  name="Premolare_2_I_DX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Midx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'midx')}
                  geometry={(fbx.children[1].children[27] as THREE.Mesh).geometry}
                  name="Molare_I_DX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Pprisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'pprisx')}
                  geometry={(fbx.children[1].children[19] as THREE.Mesh).geometry}
                  name="Premolare_1_I_SX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Sprisx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'sprisx')}
                  geometry={(fbx.children[1].children[31] as THREE.Mesh).geometry}
                  name="Premolare_2_I_SX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })
    const Misx = memo(({outline, hovered} : {outline: boolean, hovered: boolean}) : JSX.Element => {
        return (
            <mesh onClick={log} onPointerLeave={(e) => hover(e,undefined)} onPointerEnter={(e) => hover(e,'misx')}
                  geometry={(fbx.children[1].children[29] as THREE.Mesh).geometry}
                  name="Molare_I_SX"
                  material={dentieraMaterial}
            >
                {outline && <Outlines thickness={10} color="hotpink"/>}
                {hovered && <Outlines thickness={10} color="yellow"/>}
            </mesh>
        )
    })

    const Base = memo(() : JSX.Element => {
        return (
            <>
                <mesh onPointerLeave={(e) => hoverBase(e)} onPointerEnter={(e) => hoverBase(e)}
                      geometry={(fbx.children[0] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[13] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[15] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[18] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[21] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[23] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[24] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[25] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh onPointerLeave={(e) => hover(e, undefined)} onPointerEnter={(e) => hover(e, undefined)}
                      geometry={(fbx.children[1].children[26] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>

                <mesh material={shadowMaterial} position={[0, -4, -4]} rotation={[-Math.PI/2, 0, 0]}>
                    <planeGeometry args={[7.5, 7.5]}/>
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

            <Pprsdx outline={activeTooth === 'pprsdx'} hovered={hovered === 'pprsdx'}/>
            <Pprssx outline={activeTooth === 'pprssx'} hovered={hovered === 'pprssx'}/>
            <Ppridx outline={activeTooth === 'ppridx'} hovered={hovered === 'ppridx'}/>
            <Pprisx outline={activeTooth === 'pprisx'} hovered={hovered === 'pprisx'}/>

            <Sprsdx outline={activeTooth === 'sprsdx'} hovered={hovered === 'sprsdx'}/>
            <Sprssx outline={activeTooth === 'sprssx'} hovered={hovered === 'sprssx'}/>
            <Spridx outline={activeTooth === 'spridx'} hovered={hovered === 'spridx'}/>
            <Sprisx outline={activeTooth === 'sprisx'} hovered={hovered === 'sprisx'}/>

            <Msdx outline={activeTooth === 'msdx'} hovered={hovered === 'msdx'}/>
            <Mssx outline={activeTooth === 'mssx'} hovered={hovered === 'mssx'}/>
            <Midx outline={activeTooth === 'midx'} hovered={hovered === 'midx'}/>
            <Misx outline={activeTooth === 'misx'} hovered={hovered === 'misx'}/>
        </>
    )
}