'use client'

import BarIlsdxL from "@/app/components/materials/BarIlsdxL";
import BarIlsdxR from "@/app/components/materials/BarIlsdxR";
import BarSmall from "@/app/components/materials/BarSmall";
import BarIlssxR from "@/app/components/materials/BarIlssxR";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import BarDiamond from "@/app/components/materials/BarDiamond";
import FrameDiamond from "@/app/components/materials/FrameDiamond";
import FrameFull from "@/app/components/materials/FrameFull";
import FrameCssx from "@/app/components/materials/FrameCssx";
import FrameCidx from "@/app/components/materials/FrameCidx";
import FrameCisx from "@/app/components/materials/FrameCisx";
import {useTeethStore} from "@/app/stores/teeth";
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import BarFull from "@/app/components/materials/BarFull";

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
        </>
    )
}