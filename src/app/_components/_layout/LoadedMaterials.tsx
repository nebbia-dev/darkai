'use client'

import FullDiamond from "@/app/_components/_materials/FullDiamond";
import BarDiamond from "@/app/_components/_materials/BarDiamond";
import FrameDiamond from "@/app/_components/_materials/FrameDiamond";
import StonesMaterial from "@/app/_components/_materials/StonesMaterial";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import DecalPave from "@/app/_components/_materials/DecalPave";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";

export default function LoadedMaterials() {
    return(
        <>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FullMaterial color='gold' finish='polished'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FullMaterial_ICS color='gold' finish='polished'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FullDiamond color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarDiamond color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameDiamond color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <StonesMaterial color='sapphire'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarDiamond color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FullEnamel color='blue'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <DecalPave position={[0, 0, 0]} pave="round" stone="ruby"/>
            </mesh>
        </>
    )
}