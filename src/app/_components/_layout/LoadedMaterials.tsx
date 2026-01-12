'use client'

import StonesMaterial from "@/app/_components/_materials/StonesMaterial";
import FullEnamel from "@/app/_components/_materials/FullEnamel";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import FullMaterial_ICS from "@/app/_components/_materials/FullMaterial_ICS";
import Pave from "@/app/_components/_materials/Pave";
import RoundPaveBase from "@/app/_components/_materials/RoundPaveBase";
import PaveFrame from "@/app/_components/_materials/PaveFrame";
import RoundPaveBaseFrame from "@/app/_components/_materials/RoundPaveBaseFrame";
import PaveBigBar from "@/app/_components/_materials/PaveBigBar";
import RoundPaveBaseBigBar from "@/app/_components/_materials/RoundPaveBaseBigBar";
import RoundPaveBaseBar from "@/app/_components/_materials/RoundPaveBaseBar";
import PaveBar from "@/app/_components/_materials/PaveBar";
import {useEffect} from "react";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";

export default function LoadedMaterials() {

    const setLoaded = useTeethStore((state: State) => state.setLoaded);

    useEffect(() => {
        setLoaded(true);
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if(loader) {
                loader.style.display = 'none';
            }
        }, 1500);
    }, []);

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
                <StonesMaterial color='sapphire'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <FullEnamel color='blue'/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <Pave pave="hexagon" stone="ruby"/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <RoundPaveBase stone="whD" color="gold" pave="round"/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <PaveFrame stone="ruby" pave="round"/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <RoundPaveBaseFrame color="gold"/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <PaveBigBar pave="round" stone="ruby"/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <RoundPaveBaseBigBar type="round" color="gold"/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <PaveBar pave="round" stone="ruby"/>
            </mesh>
            <mesh position={[0, -10, 0]} visible={false}>
                <planeGeometry args={[1, 1]}/>
                <RoundPaveBaseBar type="round" color="gold"/>
            </mesh>
        </>
    )
}