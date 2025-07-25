'use client'
import {OrbitControls, useEnvironment, useFBX} from '@react-three/drei';
import Dentiera from "@/app/components/Dentiera";
import {useTeethStore} from "@/app/stores/teeth";
import IlsDx from "@/app/components/teeth/IlsDx";
import IlsSx from "@/app/components/teeth/IlsSx";
import LoadedMaterials from "@/app/components/LoadedMaterials";
import {useEffect, useMemo, useRef} from "react";
import FBX from "@/app/types/FBX";
import IcsSx from "@/app/components/teeth/IcsSx";
import IcsDx from "@/app/components/teeth/IcsDx";
import IliSx from "@/app/components/teeth/IliSx";
import IliDx from "@/app/components/teeth/IliDx";
import IciSx from "@/app/components/teeth/IciSx";
import IciDx from "@/app/components/teeth/IciDx";
import CsDx from "@/app/components/teeth/CsDx";
import CsSx from "@/app/components/teeth/CsSx";
import CsDxStone from "@/app/components/teeth/CsDxStone";
import CsSxStone from "@/app/components/teeth/CsSxStone";
import CiDxStone from "@/app/components/teeth/CiDxStone";
import CiDx from "@/app/components/teeth/CiDx";
import CiSx from "@/app/components/teeth/CiSx";
import CiSxStone from "@/app/components/teeth/CiSxStone";
import State from "@/app/types/State";
import * as THREE from 'three'
import {useThree} from "@react-three/fiber";
import IlsSxStone from "@/app/components/teeth/IlsSxStone";
import IlsDxStone from "@/app/components/teeth/IlsDxStone";
import IcsSxStone from "@/app/components/teeth/IcsSxStone";
import IcsDxStone from "@/app/components/teeth/IcsDxStone";
import IliSxStone from "@/app/components/teeth/IliSxStone";
import IliDxStone from "@/app/components/teeth/IliDxStone";
import IciSxStone from "@/app/components/teeth/IciSxStone";
import IciDxStone from "@/app/components/teeth/IciDxStone";

export default function Configurator() {
    const envMap = useEnvironment({
        files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"
    })
    const geometry = useTeethStore((state:State) => state.teethGeometry);
    const upperFrame = useFBX('/models/MOD_Frame_Upper.fbx');
    // const fbx = useMemo(() => useFBX('/models/MOD_Dentiera_Completa_180_Phong.fbx'), []);
    // Se voglio piazzare anche l'fbx in LoadedMaterials, verosimilmente devo usare qui uno useEffect
    const teeth = useMemo((): FBX => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa_180_Phong_Scala_1 (1).fbx');
        const stones = useFBX('/models/MOD_Stone.fbx');
        // if(!geometry.cisx){
        //     stones.children[2].children[2].children[1].scale.set(1,1,1);
        //     stones.children[2].children[2].children[1].updateMatrix();
        //     stones.children[2].children[2].children[1].updateMatrixWorld();
        //     (stones.children[2].children[2].children[1].children[0] as THREE.Mesh).geometry.applyMatrix4(stones.children[2].children[2].children[1].matrix)
        // }
        console.log(stones.children[2])

        return {
            // INCISIVI CENTRALI
            icsdx: {
                full: (fbx.children[0].children[5] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[0].children[0].children[0],
                    heart: stones.children[0].children[0].children[1].children[0],
                    circle: stones.children[0].children[0].children[2].children[0],
                    tear: stones.children[0].children[0].children[3].children[0],
                    square: stones.children[0].children[0].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[0] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[2] as THREE.Mesh).geometry
                }
            },
            icssx: {
                full: (fbx.children[0].children[11] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[0].children[0].children[0],
                    heart: stones.children[1].children[0].children[1].children[0],
                    circle: stones.children[1].children[0].children[2].children[0],
                    tear: stones.children[1].children[0].children[3].children[0],
                    square: stones.children[1].children[0].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[6] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[8] as THREE.Mesh).geometry
                }
            },
            icidx: {
                full: (fbx.children[0].children[4] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[0].children[0].children[0],
                    heart: stones.children[2].children[0].children[1].children[0],
                    circle: stones.children[2].children[0].children[2].children[0],
                    tear: stones.children[2].children[0].children[3].children[0],
                    square: stones.children[2].children[0].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[2] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[5] as THREE.Mesh).geometry
                }
            },
            icisx: {
                full: (fbx.children[0].children[10] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[0].children[0].children[0],
                    heart: stones.children[3].children[0].children[1].children[0],
                    circle: stones.children[3].children[0].children[2].children[0],
                    tear: stones.children[3].children[0].children[3].children[0],
                    square: stones.children[3].children[0].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[8] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[11] as THREE.Mesh).geometry
                }
            },
            // INCISIVI LATERALI
            ilsdx: {
                full: (fbx.children[0].children[0] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[1].children[0].children[0],
                    heart: stones.children[0].children[1].children[1].children[0],
                    circle: stones.children[0].children[1].children[2].children[0],
                    tear: stones.children[0].children[1].children[3].children[0],
                    square: stones.children[0].children[1].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[1] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[0] as THREE.Mesh).geometry
                },
                bar: {
                    full: {
                        left: (fbx.children[3].children[2].children[0] as THREE.Mesh).geometry,
                        right: (fbx.children[3].children[2].children[1] as THREE.Mesh).geometry,
                    },
                    diamond: {
                        right:{
                            base: (fbx.children[3].children[1].children[0].children[0] as THREE.Mesh).geometry,
                            full: (fbx.children[3].children[1].children[0].children[1] as THREE.Mesh).geometry
                        },
                        left: {
                            base: (fbx.children[3].children[1].children[1].children[0] as THREE.Mesh).geometry,
                            full: (fbx.children[3].children[1].children[1].children[1] as THREE.Mesh).geometry
                        }
                    }
                }
            },
            ilssx: {
                full: (fbx.children[0].children[6] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[1].children[0].children[0],
                    heart: stones.children[1].children[1].children[1].children[0],
                    circle: stones.children[1].children[1].children[2].children[0],
                    tear: stones.children[1].children[1].children[3].children[0],
                    square: stones.children[1].children[1].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[7] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[6] as THREE.Mesh).geometry
                },
                bar: {
                    full: {
                        left: (fbx.children[3].children[2].children[2] as THREE.Mesh).geometry,
                        right: (fbx.children[3].children[2].children[3] as THREE.Mesh).geometry,
                    },
                    diamond: {
                        left:{
                            base: (fbx.children[3].children[1].children[2].children[0] as THREE.Mesh).geometry,
                            full: (fbx.children[3].children[1].children[2].children[1] as THREE.Mesh).geometry
                        },
                        right: {
                            base: (fbx.children[3].children[1].children[3].children[0] as THREE.Mesh).geometry,
                            full: (fbx.children[3].children[1].children[3].children[1] as THREE.Mesh).geometry
                        }
                    }
                }
            },
            ilidx: {
                full: (fbx.children[0].children[1] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[1].children[0],
                    heart: stones.children[2].children[1].children[1].children[0],
                    circle: stones.children[2].children[1].children[2].children[0],
                    tear: stones.children[2].children[1].children[3].children[0],
                    square: stones.children[2].children[1].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[5] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[1] as THREE.Mesh).geometry
                }
            },
            ilisx: {
                full: (fbx.children[0].children[7] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[1].children[0],
                    heart: stones.children[3].children[1].children[1].children[0],
                    circle: stones.children[3].children[1].children[2].children[0],
                    tear: stones.children[3].children[1].children[3].children[0],
                    square: stones.children[3].children[1].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[11] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[7] as THREE.Mesh).geometry
                }
            },
            // CANINI
            csdx: {
                full: (fbx.children[0].children[2] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[2].children[0].children[0],
                    heart: stones.children[0].children[2].children[1].children[0],
                    circle: stones.children[0].children[2].children[2].children[0],
                    tear: stones.children[0].children[2].children[3].children[0],
                    square: stones.children[0].children[2].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[4] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[3] as THREE.Mesh).geometry
                },
                frame: {
                    full: (fbx.children[2].children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[1] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[0] as THREE.Mesh).geometry
                    }
                }
            },
            cssx: {
                full: (fbx.children[0].children[8] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[2].children[0].children[0],
                    heart: stones.children[1].children[2].children[1].children[0],
                    circle: stones.children[1].children[2].children[2].children[0],
                    tear: stones.children[1].children[2].children[3].children[0],
                    square: stones.children[1].children[2].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[10] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[9] as THREE.Mesh).geometry
                },
                frame: {
                    full: (fbx.children[2].children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[3] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[2] as THREE.Mesh).geometry
                    }
                }
            },
            cidx: {
                full: (fbx.children[0].children[3] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[2].children[0].children[0],
                    heart: stones.children[2].children[2].children[1].children[0],
                    circle: stones.children[2].children[2].children[2].children[0],
                    tear: stones.children[2].children[2].children[3].children[0],
                    square: stones.children[2].children[2].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[3] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[4] as THREE.Mesh).geometry
                },
                frame: {
                    full: (fbx.children[2].children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[2] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[1] as THREE.Mesh).geometry
                    }
                },
                bar: {
                    full: (fbx.children[3].children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[3].children[0].children[0] as THREE.Mesh).geometry,
                        full: (fbx.children[3].children[0].children[1] as THREE.Mesh).geometry
                    }
                }
            },
            cisx: {
                full: (fbx.children[0].children[9] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[2].children[0].children[0],
                    heart: stones.children[3].children[2].children[1].children[0],
                    circle: stones.children[3].children[2].children[2].children[0],
                    tear: stones.children[3].children[2].children[3].children[0],
                    square: stones.children[3].children[2].children[4].children[0]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[9] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[10] as THREE.Mesh).geometry
                },
                frame: {
                    full: (fbx.children[2].children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[4] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[3] as THREE.Mesh).geometry
                    }
                },
                bar: {
                    full: (fbx.children[3].children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[3].children[0].children[0] as THREE.Mesh).geometry,
                        full: (fbx.children[3].children[0].children[1] as THREE.Mesh).geometry
                    }
                }
            }
        }
    }, []);
    const savedTeeth = useTeethStore((state : State) => state.teethGeometry);
    const setTeeth = useTeethStore((state : State) => state.setGeometry);
    const savedEnvMap = useTeethStore((state : State) => state.envMap);
    const setEnvMap = useTeethStore((state : State) => state.setEnvMap);
    const screenshot = useTeethStore((state : State) => state.isScreenshotNeeded);
    const resetScreenShot = useTeethStore((state : State) => state.setIsScreenshotNeeded);
    const resetControls = useTeethStore((state : State) => state.resetControls);
    const doResetControls = useTeethStore((state : State) => state.setResetControls);
    const orbitRef = useRef();
    const { gl, scene, camera } = useThree();

    useEffect(() => {
        if(screenshot) {
            console.log('say cheese')
            orbitRef.current.reset();
            setTimeout(() => {
                const link = document.createElement('a');
                link.setAttribute('download', 'canvas.png');
                gl.render(scene, camera);
                link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
                link.click();
                resetScreenShot(undefined);
            }, 200)
        }
    }, [screenshot]);

    useEffect(() => {
        if(resetControls) {
            orbitRef.current.reset();
            doResetControls(undefined);
        }
    }, [resetControls])

    useEffect(() => {
        setTeeth(teeth);
        setEnvMap(envMap);
    }, []);

    console.log('envMap');

    return (
        <>
            <OrbitControls maxDistance={35} minDistance={22} minPolarAngle={Math.PI / 3}
                           maxPolarAngle={Math.PI - Math.PI / 3} ref={orbitRef}/>
            {savedEnvMap && <LoadedMaterials/>}
            {/*<primitive object={fbx} visible={false} position={[0, -10, 0]}/>*/}
            {savedTeeth && savedEnvMap &&
                <>
                    {/*<primitive object={upperFrame}/>*/}
                    {/*DENTI SUPERIORI*/}
                    <IlsSx/>
                    <IlsSxStone/>
                    <IlsDx/>
                    <IlsDxStone/>
                    <IcsSx/>
                    <IcsSxStone/>
                    <IcsDx/>
                    <IcsDxStone/>
                    <CsDx/>
                    <CsDxStone/>
                    <CsSx/>
                    <CsSxStone/>
                    {/*DENTI INFERIORI*/}
                    <IliSx/>
                    <IliSxStone/>
                    <IliDx/>
                    <IliDxStone/>
                    <IciSx/>
                    <IciSxStone/>
                    <IciDx/>
                    <IciDxStone/>
                    <CiDx/>
                    <CiDxStone/>
                    <CiSx/>
                    <CiSxStone/>
                    {/*BASE*/}
                    <Dentiera/>
                </>
            }
        </>
    );
}