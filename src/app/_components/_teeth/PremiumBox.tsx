import {useMemo} from "react";
import {useGLTF} from "@react-three/drei";
import {useTeethStore} from "@/app/_stores/teeth";
import * as THREE from 'three';
import {State} from "@/app/_types/State";
import FullMaterial from "@/app/_components/_materials/FullMaterial";

export default function PremiumBox() {
    const premiumBox = useMemo(() => {
        return useGLTF('/models/Packaging.glb')
    }, []);

    console.log(premiumBox)

    const envMap = useTeethStore((state: State) => state.envMap);

    return(
        <>

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

            <mesh geometry={(premiumBox.scene.children[0].children[0] as THREE.Mesh).geometry}>
                <FullMaterial color="gold" finish="polished"/>
            </mesh>

            <mesh geometry={(premiumBox.scene.children[0].children[2].children[0] as THREE.Mesh).geometry}>
                <FullMaterial color="gold" finish="polished"/>
            </mesh>
            <mesh geometry={(premiumBox.scene.children[0].children[2].children[1] as THREE.Mesh).geometry}>
                <FullMaterial color="gold" finish="polished"/>
            </mesh>
            <mesh geometry={(premiumBox.scene.children[0].children[2].children[2] as THREE.Mesh).geometry}>
                <FullMaterial color="gold" finish="polished"/>
            </mesh>
        </>
    )
}