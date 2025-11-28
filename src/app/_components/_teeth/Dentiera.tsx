'use client'
import * as THREE from 'three';
import {Outlines, useFBX, useGLTF, useTexture} from "@react-three/drei";
import React, {JSX, memo, useMemo, useRef, useState} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {useFrame, useThree} from "@react-three/fiber";

export default function Dentiera() {
    const dentiera = useMemo(() => {
        return useGLTF('/models/Dentiera.glb')
    }, []);

    const { clock } = useThree();
    const [lastHover, setLastHover] = useState<number>(0);
    const envMap = useTeethStore((state: State) => state.envMap);
    const setActive = useTeethStore((state: State) => state.setActiveTooth);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const setRecap = useTeethStore((state:State) => state.setRecap);
    const props = useTexture({
        map: 'textures/dentiera/DefaultMaterial_Base_color.webp',
        normalMap: 'textures/dentiera/DefaultMaterial_Normal.webp',
        metalnessMap: 'textures/dentiera/DefaultMaterial_Metallic.webp',
        roughnessMap: 'textures/dentiera/DefaultMaterial_Roughness.webp',
        aoMap: 'textures/dentiera/DefaultMaterial_Mixed_AO.webp',
    });
    props.map.flipY = false;
    props.normalMap.flipY = false;
    props.metalnessMap.flipY = false;
    props.roughnessMap.flipY = false;
    props.aoMap.flipY = false;

    const shadow = useTexture({
        map: 'textures/dentiera_ombra.webp',
    });

    const nextStep = useTeethStore((state) => state.nextStep);
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
        if((clock.getElapsedTime() - lastHover < 0.1) && hovered) {
            return;
        }
        setHover(tooth);
        setLastHover(clock.getElapsedTime());
    }

    function hoverBase(e:any) {
        e.stopPropagation();
        if(clock.getElapsedTime() - lastHover > 0.1 && hovered) {
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'icsdx')}
                  geometry={(dentiera.scene.children[1].children[2] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'icssx')}
                  geometry={(dentiera.scene.children[1].children[3] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'icisx')}
                  geometry={(dentiera.scene.children[2].children[3] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'icidx')}
                  geometry={(dentiera.scene.children[2].children[2] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'csdx')}
                  geometry={(dentiera.scene.children[1].children[0] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'cssx')}
                  geometry={(dentiera.scene.children[1].children[1] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'cisx')}
                  geometry={(dentiera.scene.children[2].children[1] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'cidx')}
                  geometry={(dentiera.scene.children[2].children[0] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'ilsdx')}
                  geometry={(dentiera.scene.children[1].children[4] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'ilssx')}
                  geometry={(dentiera.scene.children[1].children[5] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'ilisx')}
                  geometry={(dentiera.scene.children[2].children[5] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'ilidx')}
                  geometry={(dentiera.scene.children[2].children[4] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'pprsdx')}
                  geometry={(dentiera.scene.children[3].children[10] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'sprsdx')}
                  geometry={(dentiera.scene.children[3].children[2] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'msdx')}
                  geometry={(dentiera.scene.children[3].children[8] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'pprssx')}
                  geometry={(dentiera.scene.children[3].children[17] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'sprssx')}
                  geometry={(dentiera.scene.children[3].children[0] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'mssx')}
                  geometry={(dentiera.scene.children[3].children[14] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'ppridx')}
                  geometry={(dentiera.scene.children[3].children[13] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'spridx')}
                  geometry={(dentiera.scene.children[3].children[19] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'midx')}
                  geometry={(dentiera.scene.children[3].children[7] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'pprisx')}
                  geometry={(dentiera.scene.children[3].children[16] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'sprisx')}
                  geometry={(dentiera.scene.children[3].children[18] as THREE.Mesh).geometry}
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
            <mesh onClick={log} onPointerOut={(e) => hover(e,undefined)} onPointerOver={(e) => hover(e,'misx')}
                  geometry={(dentiera.scene.children[3].children[9] as THREE.Mesh).geometry}
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
            <group onPointerOut={(e) => hoverBase(e)} onPointerOver={(e) => hoverBase(e)}>
                <mesh
                      geometry={(dentiera.scene.children[0] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[3] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[4] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[12] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[15] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[1] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[5] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[6] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>
                <mesh
                      geometry={(dentiera.scene.children[3].children[11] as THREE.Mesh).geometry} material={dentieraMaterial}>
                </mesh>

                <mesh material={shadowMaterial} position={[0, -4, -4]} rotation={[-Math.PI/2, 0, 0]}>
                    <planeGeometry args={[7.5, 7.5]}/>
                </mesh>
            </group>
        )
    })

    return (
        <>
            <Base/>

            <Icisx outline={!nextStep && activeTooth === 'icisx'} hovered={!nextStep && hovered === 'icisx'}/>
            <Icidx outline={!nextStep && activeTooth === 'icidx'} hovered={!nextStep && hovered === 'icidx'}/>
            <Icssx outline={!nextStep && activeTooth === 'icssx'} hovered={!nextStep && hovered === 'icssx'}/>
            <Icsdx outline={!nextStep && activeTooth === 'icsdx'} hovered={!nextStep && hovered === 'icsdx'}/>

            <Ilisx outline={!nextStep && activeTooth === 'ilisx'} hovered={!nextStep && hovered === 'ilisx'}/>
            <Ilidx outline={!nextStep && activeTooth === 'ilidx'} hovered={!nextStep && hovered === 'ilidx'}/>
            <Ilssx outline={!nextStep && activeTooth === 'ilssx'} hovered={!nextStep && hovered === 'ilssx'}/>
            <Ilsdx outline={!nextStep && activeTooth === 'ilsdx'} hovered={!nextStep && hovered === 'ilsdx'}/>

            <Cisx outline={!nextStep && activeTooth === 'cisx'} hovered={!nextStep && hovered === 'cisx'}/>
            <Cidx outline={!nextStep && activeTooth === 'cidx'} hovered={!nextStep && hovered === 'cidx'}/>
            <Cssx outline={!nextStep && activeTooth === 'cssx'} hovered={!nextStep && hovered === 'cssx'}/>
            <Csdx outline={!nextStep && activeTooth === 'csdx'} hovered={!nextStep && hovered === 'csdx'}/>

            <Pprsdx outline={!nextStep && activeTooth === 'pprsdx'} hovered={!nextStep && hovered === 'pprsdx'}/>
            <Pprssx outline={!nextStep && activeTooth === 'pprssx'} hovered={!nextStep && hovered === 'pprssx'}/>
            <Ppridx outline={!nextStep && activeTooth === 'ppridx'} hovered={!nextStep && hovered === 'ppridx'}/>
            <Pprisx outline={!nextStep && activeTooth === 'pprisx'} hovered={!nextStep && hovered === 'pprisx'}/>

            <Sprsdx outline={!nextStep && activeTooth === 'sprsdx'} hovered={!nextStep && hovered === 'sprsdx'}/>
            <Sprssx outline={!nextStep && activeTooth === 'sprssx'} hovered={!nextStep && hovered === 'sprssx'}/>
            <Spridx outline={!nextStep && activeTooth === 'spridx'} hovered={!nextStep && hovered === 'spridx'}/>
            <Sprisx outline={!nextStep && activeTooth === 'sprisx'} hovered={!nextStep && hovered === 'sprisx'}/>

            <Msdx outline={!nextStep && activeTooth === 'msdx'} hovered={!nextStep && hovered === 'msdx'}/>
            <Mssx outline={!nextStep && activeTooth === 'mssx'} hovered={!nextStep && hovered === 'mssx'}/>
            <Midx outline={!nextStep && activeTooth === 'midx'} hovered={!nextStep && hovered === 'midx'}/>
            <Misx outline={!nextStep && activeTooth === 'misx'} hovered={!nextStep && hovered === 'misx'}/>
        </>
    )
}