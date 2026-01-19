import React, {Ref, useMemo} from "react";
import {useGLTF} from "@react-three/drei";
import {useTeethStore} from "@/app/_stores/teeth";
import * as THREE from 'three';
import {State} from "@/app/_types/State";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {Group} from "three";
import ShadowMaterial from "@/app/_components/_materials/ShadowMaterial";
import BoxMaterial from "@/app/_components/_materials/BoxMaterial";
import VelvetMaterial from "@/app/_components/_materials/VelvetMaterial";
import VelvetPatternMaterial from "@/app/_components/_materials/VelvetPatternMaterial";

export default function PremiumBox({ref} : {ref:Ref<Group|null>}) {
    const premiumBox = useMemo(() => {
        return useGLTF('/models/Packaging.glb')
    }, []);

    const packaging = useTeethStore((state: State) => state.packaging);

    return(
        <>
            <group ref={ref}
                   // rotation={[0, Math.PI / 4, 0]}
                   // position={[-20.060500000193823, 0, -9.505650000058095]} per l'animazione
            >
                <group rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} scale={[3.5, 3.5, 3.5]}>

                    {/*TOP*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[0] as THREE.Mesh).geometry}>
                        <BoxMaterial/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[1] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[2] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>

                    {/*MID*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[0] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>

                    {/*BOTTOM*/}
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[0] as THREE.Mesh).geometry}>
                        <VelvetPatternMaterial/>
                        <VelvetMaterial/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[1] as THREE.Mesh).geometry}>
                        <VelvetMaterial/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[2] as THREE.Mesh).geometry}>
                        <BoxMaterial/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[3] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[4] as THREE.Mesh).geometry}>
                        <FullMaterial color={packaging.details} finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[5] as THREE.Mesh).geometry}>
                        <VelvetMaterial/>
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