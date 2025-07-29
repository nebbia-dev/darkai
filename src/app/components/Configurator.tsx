'use client'
import {Instance, Instances, OrbitControls, useEnvironment, useFBX} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
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
import {State} from "@/app/types/State";
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
import StonesMaterial from "@/app/components/materials/StonesMaterial";
import {MathUtils} from "three";

export default function Configurator() {
    const envMap = useEnvironment({
        files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"
    })

    // const geometry = useTeethStore((state:State) => state.teethGeometry);
    // Se voglio piazzare anche l'fbx in LoadedMaterials, verosimilmente devo usare qui uno useEffect
    const teeth = useMemo((): FBX => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa_180_Phong_Scala_1 (1).fbx');
        const fulls = useFBX('/models/MOD_Full_Capsula (2).fbx');
        const stones = useFBX('/models/MOD_Stone (3).fbx');
        const frames = useFBX('/models/MOD_Frame_Capsula (2).fbx');
        const bigBar  = useFBX('/models/MOD_Full_Frame_Capsula.fbx');
        const bars = useFBX('/models/MOD_Bars_Capsula (2).fbx');
        const hearts = useFBX('/models/MOD_Stone_Ametista.fbx');

        // if(!geometry.cisx) {
        //     stones.children[0].children[0].children[1].matrix.makeScale(stones.children[0].children[0].children[1].scale.x / 10, stones.children[0].children[0].children[1].scale.y / 10, stones.children[0].children[0].children[1].scale.z / 10);
        //     (stones.children[0].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[0].children[0].children[1].matrix);
        //
        //     stones.children[1].children[0].children[1].matrix.makeScale(stones.children[1].children[0].children[1].scale.x / 10, stones.children[1].children[0].children[1].scale.y / 10, stones.children[1].children[0].children[1].scale.z / 10);
        //     (stones.children[1].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[1].children[0].children[1].matrix);
        //
        //     stones.children[2].children[0].children[1].matrix.makeScale(stones.children[2].children[0].children[1].scale.x / 10, stones.children[2].children[0].children[1].scale.y / 10, stones.children[2].children[0].children[1].scale.z / 10);
        //     (stones.children[2].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[2].children[0].children[1].matrix);
        //
        //     stones.children[3].children[0].children[1].matrix.makeScale(stones.children[3].children[0].children[1].scale.x / 10, stones.children[3].children[0].children[1].scale.y / 10, stones.children[3].children[0].children[1].scale.z / 10);
        //     (stones.children[3].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[3].children[0].children[1].matrix);
        //
        //     stones.children[0].children[1].children[1].matrix.makeScale(stones.children[0].children[1].children[1].scale.x / 10, stones.children[0].children[1].children[1].scale.y / 10, stones.children[0].children[1].children[1].scale.z / 10);
        //     (stones.children[0].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[0].children[1].children[1].matrix);
        //
        //     stones.children[1].children[1].children[1].matrix.makeScale(stones.children[1].children[1].children[1].scale.x / 10, stones.children[1].children[1].children[1].scale.y / 10, stones.children[1].children[1].children[1].scale.z / 10);
        //     (stones.children[1].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[1].children[1].children[1].matrix);
        //
        //     stones.children[2].children[1].children[1].matrix.makeScale(stones.children[2].children[1].children[1].scale.x / 10, stones.children[2].children[1].children[1].scale.y / 10, stones.children[2].children[1].children[1].scale.z / 10);
        //     (stones.children[2].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[2].children[1].children[1].matrix);
        //
        //     stones.children[3].children[1].children[1].matrix.makeScale(stones.children[3].children[1].children[1].scale.x / 10, stones.children[3].children[1].children[1].scale.y / 10, stones.children[3].children[1].children[1].scale.z / 10);
        //     (stones.children[3].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[3].children[1].children[1].matrix);
        //
        //     stones.children[0].children[2].children[1].matrix.makeScale(stones.children[0].children[2].children[1].scale.x / 10, stones.children[0].children[2].children[1].scale.y / 10, stones.children[0].children[2].children[1].scale.z / 10);
        //     (stones.children[0].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[0].children[2].children[1].matrix);
        //
        //     stones.children[1].children[2].children[1].matrix.makeScale(stones.children[1].children[2].children[1].scale.x / 10, stones.children[1].children[2].children[1].scale.y / 10, stones.children[1].children[2].children[1].scale.z / 10);
        //     (stones.children[1].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[1].children[2].children[1].matrix);
        //
        //     stones.children[2].children[2].children[1].matrix.makeScale(stones.children[2].children[2].children[1].scale.x / 10, stones.children[2].children[2].children[1].scale.y / 10, stones.children[2].children[2].children[1].scale.z / 10);
        //     (stones.children[2].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[2].children[2].children[1].matrix);
        //
        //     stones.children[3].children[2].children[1].matrix.makeScale(stones.children[3].children[2].children[1].scale.x / 10, stones.children[3].children[2].children[1].scale.y / 10, stones.children[3].children[2].children[1].scale.z / 10);
        //     (stones.children[3].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[3].children[2].children[1].matrix);
        // }

        return {
            // INCISIVI CENTRALI
            icsdx: {
                full: (fulls.children[9] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[0].children[0],
                    heart: hearts.children[0],
                    circle: stones.children[0].children[0].children[2],
                    tear: stones.children[0].children[0].children[3],
                    square: stones.children[0].children[0].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[0] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[2] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[0] as THREE.Mesh).geometry,
                        full: (bars.children[0] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[1] as THREE.Mesh).geometry,
                        full: (frames.children[1] as THREE.Mesh).geometry
                    }
                }
            },
            icssx: {
                full: (fulls.children[4] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[0].children[0],
                    heart: hearts.children[3],
                    circle: stones.children[1].children[0].children[2],
                    tear: stones.children[1].children[0].children[3],
                    square: stones.children[1].children[0].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[6] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[8] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[0] as THREE.Mesh).geometry,
                        full: (bars.children[0] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[1] as THREE.Mesh).geometry,
                        full: (frames.children[1] as THREE.Mesh).geometry
                    }
                }
            },
            icidx: {
                full: (fulls.children[0] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[0].children[0],
                    heart: hearts.children[6],
                    circle: stones.children[2].children[0].children[2],
                    tear: stones.children[2].children[0].children[3],
                    square: stones.children[2].children[0].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[2] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[5] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[3] as THREE.Mesh).geometry,
                        full: (bars.children[3] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[6] as THREE.Mesh).geometry,
                        full: (frames.children[6] as THREE.Mesh).geometry
                    }
                }
            },
            icisx: {
                full: (fulls.children[2] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[0].children[0],
                    heart: hearts.children[9],
                    circle: stones.children[3].children[0].children[2],
                    tear: stones.children[3].children[0].children[3],
                    square: stones.children[3].children[0].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[8] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[11] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[3] as THREE.Mesh).geometry,
                        full: (bars.children[3] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[7] as THREE.Mesh).geometry,
                        full: (frames.children[7] as THREE.Mesh).geometry
                    }
                }
            },
            // INCISIVI LATERALI
            ilsdx: {
                full: (fulls.children[8] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[1].children[0],
                    heart: hearts.children[1],
                    circle: stones.children[0].children[1].children[2],
                    tear: stones.children[0].children[1].children[3],
                    square: stones.children[0].children[1].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[1] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[0] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[1] as THREE.Mesh).geometry,
                        full: (bars.children[1] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[2] as THREE.Mesh).geometry,
                        full: (frames.children[2] as THREE.Mesh).geometry
                    }
                }
            },
            ilssx: {
                full: (fulls.children[11] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[1].children[0],
                    heart: hearts.children[4],
                    circle: stones.children[1].children[1].children[2],
                    tear: stones.children[1].children[1].children[3],
                    square: stones.children[1].children[1].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[7] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[6] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[2] as THREE.Mesh).geometry,
                        full: (bars.children[2] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[3] as THREE.Mesh).geometry,
                        full: (frames.children[3] as THREE.Mesh).geometry
                    }
                }
            },
            ilidx: {
                full: (fulls.children[1] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[1].children[0],
                    heart: hearts.children[7],
                    circle: stones.children[2].children[1].children[2],
                    tear: stones.children[2].children[1].children[3],
                    square: stones.children[2].children[1].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[5] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[1] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[4] as THREE.Mesh).geometry,
                        full: (bars.children[4] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[8] as THREE.Mesh).geometry,
                        full: (frames.children[8] as THREE.Mesh).geometry
                    }
                }
            },
            ilisx: {
                full: (fulls.children[3] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[1].children[0],
                    heart: hearts.children[10],
                    circle: stones.children[3].children[1].children[2],
                    tear: stones.children[3].children[1].children[3],
                    square: stones.children[3].children[1].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[11] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[7] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[5] as THREE.Mesh).geometry,
                        full: (bars.children[5] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[9] as THREE.Mesh).geometry,
                        full: (frames.children[9] as THREE.Mesh).geometry
                    }
                }
            },
            // CANINI
            csdx: {
                full: (fulls.children[7] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[2].children[0],
                    heart: hearts.children[2],
                    circle: stones.children[0].children[2].children[2],
                    tear: stones.children[0].children[2].children[3],
                    square: stones.children[0].children[2].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[4] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[3] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[6] as THREE.Mesh).geometry,
                        full: (bars.children[6] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[1] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[0] as THREE.Mesh).geometry
                    }
                }
            },
            cssx: {
                full: (fulls.children[10] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[2].children[0],
                    heart: hearts.children[5],
                    circle: stones.children[1].children[2].children[2],
                    tear: stones.children[1].children[2].children[3],
                    square: stones.children[1].children[2].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[10] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[9] as THREE.Mesh).geometry
                },
                bar: {
                    full: (bars.children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[7] as THREE.Mesh).geometry,
                        full: (bars.children[7] as THREE.Mesh).geometry
                    }
                },
                frame: {
                    full: (frames.children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[3] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[2] as THREE.Mesh).geometry
                    }
                }
            },
            cidx: {
                full: (fulls.children[5] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[2].children[0],
                    heart: hearts.children[8],
                    circle: stones.children[2].children[2].children[2],
                    tear: stones.children[2].children[2].children[3],
                    square: stones.children[2].children[2].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[3] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[4] as THREE.Mesh).geometry
                },
                frame: {
                    full: (frames.children[10] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[2] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[1] as THREE.Mesh).geometry
                    }
                },
                bar: {
                    full: (bars.children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[8] as THREE.Mesh).geometry,
                        full: (bars.children[8] as THREE.Mesh).geometry
                    }
                },
                bigBar: {
                    full: (bigBar.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[3].children[0].children[0] as THREE.Mesh).geometry,
                        full: (fbx.children[3].children[0].children[1] as THREE.Mesh).geometry
                    }
                }
            },
            cisx: {
                full: (fulls.children[6] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[2].children[0],
                    heart: hearts.children[11],
                    circle: stones.children[3].children[2].children[2],
                    tear: stones.children[3].children[2].children[3],
                    square: stones.children[3].children[2].children[4]
                },
                fullDiamond: {
                    base: (fbx.children[1].children[0].children[9] as THREE.Mesh).geometry,
                    full: (fbx.children[1].children[1].children[10] as THREE.Mesh).geometry
                },
                frame: {
                    full: (frames.children[11] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[4] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[3] as THREE.Mesh).geometry
                    }
                },
                bar: {
                    full: (bars.children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[9] as THREE.Mesh).geometry,
                        full: (bars.children[9] as THREE.Mesh).geometry
                    }
                },
                bigBar: {
                    full: (bigBar.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[3].children[0].children[0] as THREE.Mesh).geometry,
                        full: (fbx.children[3].children[0].children[1] as THREE.Mesh).geometry
                    }
                }
            }
        }

    }, [])
    const savedTeeth = useTeethStore((state : State) => state.teethGeometry);
    const setTeeth = useTeethStore((state : State) => state.setGeometry);
    const savedEnvMap = useTeethStore((state : State) => state.envMap);
    const setEnvMap = useTeethStore((state : State) => state.setEnvMap);
    const screenshot = useTeethStore((state : State) => state.isScreenshotNeeded);
    const resetScreenShot = useTeethStore((state : State) => state.setIsScreenshotNeeded);
    const resetControls = useTeethStore((state : State) => state.resetControls);
    const doResetControls = useTeethStore((state : State) => state.setResetControls);
    const orbitRef = useRef<OrbitControlsImpl>(null);
    const { gl, scene, camera } = useThree();

    useEffect(() => {
        if(screenshot && orbitRef.current) {
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
        if(resetControls && orbitRef.current) {
            orbitRef.current.reset();
            doResetControls(undefined);
        }
    }, [resetControls])

    useEffect(() => {
        setTeeth(teeth);
        setEnvMap(envMap);
    }, []);

    console.log('envMap');


    // Instances prova
    // const particles = Array.from({length: 250}, () => ({
    //     factor: MathUtils.randInt(20, 100),
    //     speed: MathUtils.randFloat(0.01, 0.75),
    //     xFactor: MathUtils.randFloatSpread(40),
    //     yFactor: MathUtils.randFloatSpread(10),
    //     zFactor: MathUtils.randFloatSpread(10)
    // }))
    // function Bubbles() {
    //     const diamond = useFBX('/models/MOD_Diamante.fbx');
    //     return (
    //         <Instances limit={particles.length} position={[0,0.25,0]} scale={[0.001, 0.001, 0.001]}>
    //             <bufferGeometry>
    //                 <bufferAttribute
    //                     attach='attributes-position'
    //                     array={diamond.children[0].geometry.attributes.position.array}
    //                     count={diamond.children[0].geometry.attributes.position.array.length / 3}
    //                     itemSize={3}
    //                 ></bufferAttribute>
    //                 <bufferAttribute
    //                     attach='attributes-normal'
    //                     array={diamond.children[0].geometry.attributes.normal.array}
    //                     count={diamond.children[0].geometry.attributes.normal.array.length / 3}
    //                     itemSize={3}
    //                 ></bufferAttribute>
    //                 <bufferAttribute
    //                     attach='attributes-uv'
    //                     array={diamond.children[0].geometry.attributes.uv.array}
    //                     count={diamond.children[0].geometry.attributes.uv.array.length / 3}
    //                     itemSize={3}
    //                 ></bufferAttribute>
    //             </bufferGeometry>
    //             <StonesMaterial color="sapphire"/>
    //             {particles.map((data, i) => (
    //                 <Instance key={i} position={[
    //                     Math.random() * 10000,
    //                     Math.random() * 10000,
    //                     Math.random() * 10000]} />
    //             ))}
    //         </Instances>
    //     )
    // }

    return (
        <>
            <OrbitControls
                maxDistance={35}
                minDistance={22}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI - Math.PI / 3}
                ref={orbitRef}/>


            {/*{savedEnvMap && <Bubbles/>}*/}
            {savedEnvMap && <LoadedMaterials/>}
            {savedTeeth && savedEnvMap &&
                <>
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