import React, {Ref, useEffect, useMemo, useRef} from "react";
import {Text3D, useGLTF, useTexture} from "@react-three/drei";
import {useTeethStore} from "@/app/_stores/teeth";
import * as THREE from 'three';
import {State} from "@/app/_types/State";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {Group} from "three";
import ShadowMaterial from "@/app/_components/_materials/ShadowMaterial";
import VelvetPatternMaterial from "@/app/_components/_materials/VelvetPatternMaterial";
import VelvetCavityMaterial from "@/app/_components/_materials/VelvetCavityMaterial";
import VelvetHingeMaterial from "@/app/_components/_materials/VelvetHingeMaterial";
import BoxMaterialSup from "@/app/_components/_materials/BoxMaterialSup";
import BoxMaterialInf from "@/app/_components/_materials/BoxMaterialInf";

export default function PremiumBox({ref} : {ref:Ref<Group|null>}) {

    const packaging = useTeethStore((state: State) => state.packaging);
    if(!packaging) return null;

    const firstTextRef = useRef(null);
    const customText = useTeethStore((state: State) => state.packaging!.text);
    const secondTextRef = useRef(null);

    const premiumBox = useMemo(() => {
        return useGLTF('/models/Packaging.glb')
    }, []);
    const lightDisks = useTexture('/textures/packaging/Light.webp');
    lightDisks.flipY = false;

    useEffect(() => {
        if(firstTextRef.current) {
            (firstTextRef.current as THREE.Mesh).geometry.center();
        }

        if(secondTextRef.current) {
            (secondTextRef.current as THREE.Mesh).geometry.center();
        }

    }, [customText])

    return(
        <>
            <group ref={ref}
                   // rotation={[0, Math.PI / 4, 0]}
                   // position={[-20.060500000193823, 0, -9.505650000058095]} per l'animazione
            >

                    <Text3D
                        font="/Archivo_Expanded_Bold.json"
                        size={0.039}
                        ref={firstTextRef}
                        scale={[3.5, 3.5, 1]}
                        rotation={[-0.65, 0, 0]}
                        position={customText.secondLine !== '' ? [0, 0, 0.05] : [0, -0.125, 0.15]}
                        visible={customText.firstLine !== ''}
                    >
                        {customText.firstLine}
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </Text3D>


                    <Text3D
                        font="/Archivo_Expanded_Bold.json"
                        size={0.039}
                        ref={secondTextRef}
                        rotation={[-0.65, 0, 0]}
                        scale={[3.5, 3.5, 1]}
                        position={customText.firstLine !== '' ? [0, -0.25, 0.25] : [0, -0.125, 0.15]}
                        visible={customText.secondLine !== ''}
                    >
                        {customText.secondLine}
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </Text3D>

                <group rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} scale={[3.5, 3.5, 3.5]}>

                    {/*TOP*/}
                    {/*Sportello*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[5].children[0] as THREE.Mesh).geometry}>
                        <BoxMaterialSup/>
                    </mesh>
                    {/*Stelle*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[5].children[1] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[5].children[2] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    {/*Loghi*/}
                    {/*esterno*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[0] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[1] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[2] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[3] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[4] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    {/*interno*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[0] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[1] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[2] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[3] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[4] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>

                    {/*FARETTI*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[3] as THREE.Mesh).geometry}>
                        <meshBasicMaterial
                            color={0xffffff}
                            map={lightDisks}
                            transparent={true}
                        />
                    </mesh>

                    {/*CERNIERA*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[0] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>

                    {/*BOTTOM*/}
                    {/*Pattern*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[4].children[1] as THREE.Mesh).geometry}>
                        <VelvetPatternMaterial/>
                    </mesh>
                    {/*Cassetti*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[4].children[0] as THREE.Mesh).geometry}>
                        <VelvetCavityMaterial/>
                    </mesh>
                    {/*Sportello*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[4].children[2] as THREE.Mesh).geometry}>
                        <BoxMaterialInf/>
                    </mesh>
                    {/*Stelle*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[4].children[3] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[4].children[4] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    {/*Cerniera*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[4].children[5] as THREE.Mesh).geometry}>
                        <VelvetHingeMaterial/>
                    </mesh>
                </group>

                <mesh position={[0, -4, 0.75]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 4]}/>
                    <ShadowMaterial/>
                </mesh>
            </group>
        </>
    )
}