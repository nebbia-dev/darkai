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

export default function LoadedMaterials({envMap}) {

    return(
        <>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarIlsdxL envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarIlsdxR envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarIlssxL envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarIlssxR envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BaseFullDiamond envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FullDiamond envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <BarDiamond envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameDiamond envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameCsdx envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameCssx envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameCidx envMap={envMap} color='gold'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FrameCisx envMap={envMap} color='gold'/>
            </mesh>
        </>
    )
}