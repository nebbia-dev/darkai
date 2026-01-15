import {Ref, useMemo} from "react";
import {useGLTF} from "@react-three/drei";
import {useTeethStore} from "@/app/_stores/teeth";
import * as THREE from 'three';
import {State} from "@/app/_types/State";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import {Group} from "three";

export default function PremiumBox({ref} : {ref:Ref<Group|null>}) {
    const premiumBox = useMemo(() => {
        return useGLTF('/models/Packaging.glb')
    }, []);

    const envMap = useTeethStore((state: State) => state.envMap);

    return(
        <>
            <group ref={ref} rotation={[0, Math.PI/4, 0]} position={[-20.060500000193823, 0.4, -9.505650000058095]}>
                <group rotation={[Math.PI/2, Math.PI, Math.PI/2]} scale={[3, 3, 3]}>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[0] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[1] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[2].children[2] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>

                    <mesh geometry={(premiumBox.scene.children[0].children[0] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>

                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[0] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[1] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[2] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[3] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>
                    <mesh geometry={(premiumBox.scene.children[0].children[1].children[4] as THREE.Mesh).geometry}>
                        <FullMaterial color="gold" finish="polished"/>
                    </mesh>
                </group>
            </group>
        </>
    )
}