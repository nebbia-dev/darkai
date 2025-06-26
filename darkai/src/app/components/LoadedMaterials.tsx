'use client'

import BarIlsdxL from "@/app/components/materials/BarIlsdxL";
import BarIlsdxR from "@/app/components/materials/BarIlsdxR";
import BarIlssxL from "@/app/components/materials/BarIlssxL";
import BarIlssxR from "@/app/components/materials/BarIlssxR";
import BaseFullDiamond from "@/app/components/materials/BaseFullDiamond";
import FullDiamond from "@/app/components/materials/FullDiamond";
import BarDiamond from "@/app/components/materials/BarDiamond";
import FrameDiamond from "@/app/components/materials/FrameDiamond";
import FrameCsdx from "@/app/components/materials/FrameCsdx";
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
                <BarIlsdxL color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarIlsdxR color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarIlssxL color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarIlssxR color='gold'/>
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
                <FrameCsdx color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameCssx color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameCidx color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameCisx color='gold'/>
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