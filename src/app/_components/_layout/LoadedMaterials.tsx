'use client'

import BarSmall from "@/app/_components/_materials/BarSmall";
import BaseFullDiamond from "@/app/_components/_materials/BaseFullDiamond";
import FullDiamond from "@/app/_components/_materials/FullDiamond";
import BarDiamond from "@/app/_components/_materials/BarDiamond";
import FrameDiamond from "@/app/_components/_materials/FrameDiamond";
import FrameFull from "@/app/_components/_materials/FrameFull";
import StonesMaterial from "@/app/_components/_materials/StonesMaterial";
import BarFull from "@/app/_components/_materials/BarFull";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function LoadedMaterials() {
    return(
        <>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarSmall color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BaseFullDiamond color='gold'/>
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
                <FrameFull color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <StonesMaterial color='sapphire'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarFull color='gold'/>
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
                <DecalPave position={[0,0,0]} pave="round" stone="ruby"/>
            </mesh>
        </>
    )
}