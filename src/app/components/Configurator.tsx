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
import FullMaterial from "@/app/components/materials/FullMaterial";

export default function Configurator() {
    const envMap = useEnvironment({
        files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"
    })
    const geometry = useTeethStore((state:State) => state.teethGeometry);
    const bars = useFBX('/models/MOD_Bars_Capsula (2).fbx');
    console.log(bars)
    // Se voglio piazzare anche l'fbx in LoadedMaterials, verosimilmente devo usare qui uno useEffect
    const teeth = useMemo((): FBX => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa_180_Phong_Scala_1 (1).fbx');
        // const stones = useFBX('/models/MOD_Stone.fbx');
        const stones = useFBX('/models/MOD_Stone (2).fbx');
        const frames = useFBX('/models/MOD_Frame_Capsula (2).fbx');
        const bigBar  = useFBX('/models/MOD_Full_Frame_Capsula.fbx');
        console.log(bigBar)
        if(!geometry.cisx){
            stones.children[0].children[0].children[1].matrix.makeScale(stones.children[0].children[0].children[1].scale.x/10, stones.children[0].children[0].children[1].scale.y/10, stones.children[0].children[0].children[1].scale.z/10);
            (stones.children[0].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[0].children[0].children[1].matrix);

            stones.children[1].children[0].children[1].matrix.makeScale(stones.children[1].children[0].children[1].scale.x/10, stones.children[1].children[0].children[1].scale.y/10, stones.children[1].children[0].children[1].scale.z/10);
            (stones.children[1].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[1].children[0].children[1].matrix);

            stones.children[2].children[0].children[1].matrix.makeScale(stones.children[2].children[0].children[1].scale.x/10, stones.children[2].children[0].children[1].scale.y/10, stones.children[2].children[0].children[1].scale.z/10);
            (stones.children[2].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[2].children[0].children[1].matrix);

            stones.children[3].children[0].children[1].matrix.makeScale(stones.children[3].children[0].children[1].scale.x/10, stones.children[3].children[0].children[1].scale.y/10, stones.children[3].children[0].children[1].scale.z/10);
            (stones.children[3].children[0].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[3].children[0].children[1].matrix);

            stones.children[0].children[1].children[1].matrix.makeScale(stones.children[0].children[1].children[1].scale.x/10, stones.children[0].children[1].children[1].scale.y/10, stones.children[0].children[1].children[1].scale.z/10);
            (stones.children[0].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[0].children[1].children[1].matrix);

            stones.children[1].children[1].children[1].matrix.makeScale(stones.children[1].children[1].children[1].scale.x/10, stones.children[1].children[1].children[1].scale.y/10, stones.children[1].children[1].children[1].scale.z/10);
            (stones.children[1].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[1].children[1].children[1].matrix);

            stones.children[2].children[1].children[1].matrix.makeScale(stones.children[2].children[1].children[1].scale.x/10, stones.children[2].children[1].children[1].scale.y/10, stones.children[2].children[1].children[1].scale.z/10);
            (stones.children[2].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[2].children[1].children[1].matrix);

            stones.children[3].children[1].children[1].matrix.makeScale(stones.children[3].children[1].children[1].scale.x/10, stones.children[3].children[1].children[1].scale.y/10, stones.children[3].children[1].children[1].scale.z/10);
            (stones.children[3].children[1].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[3].children[1].children[1].matrix);

            stones.children[0].children[2].children[1].matrix.makeScale(stones.children[0].children[2].children[1].scale.x/10, stones.children[0].children[2].children[1].scale.y/10, stones.children[0].children[2].children[1].scale.z/10);
            (stones.children[0].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[0].children[2].children[1].matrix);

            stones.children[1].children[2].children[1].matrix.makeScale(stones.children[1].children[2].children[1].scale.x/10, stones.children[1].children[2].children[1].scale.y/10, stones.children[1].children[2].children[1].scale.z/10);
            (stones.children[1].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[1].children[2].children[1].matrix);

            stones.children[2].children[2].children[1].matrix.makeScale(stones.children[2].children[2].children[1].scale.x/10, stones.children[2].children[2].children[1].scale.y/10, stones.children[2].children[2].children[1].scale.z/10);
            (stones.children[2].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[2].children[2].children[1].matrix);

            stones.children[3].children[2].children[1].matrix.makeScale(stones.children[3].children[2].children[1].scale.x/10, stones.children[3].children[2].children[1].scale.y/10, stones.children[3].children[2].children[1].scale.z/10);
            (stones.children[3].children[2].children[1] as THREE.Mesh).geometry.applyMatrix4(stones.children[3].children[2].children[1].matrix);

        }

        return {
            // INCISIVI CENTRALI
            icsdx: {
                full: (fbx.children[0].children[5] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[0].children[0],
                    heart: stones.children[0].children[0].children[1],
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
                full: (fbx.children[0].children[11] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[0].children[0],
                    heart: stones.children[1].children[0].children[1],
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
                full: (fbx.children[0].children[4] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[0].children[0],
                    heart: stones.children[2].children[0].children[1],
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
                full: (fbx.children[0].children[10] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[0].children[0],
                    heart: stones.children[3].children[0].children[1],
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
                full: (fbx.children[0].children[0] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[1].children[0],
                    heart: stones.children[0].children[1].children[1],
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
                full: (fbx.children[0].children[6] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[1].children[0],
                    heart: stones.children[1].children[1].children[1],
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
                full: (fbx.children[0].children[1] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[1].children[0],
                    heart: stones.children[2].children[1].children[1],
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
                full: (fbx.children[0].children[7] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[1].children[0],
                    heart: stones.children[3].children[1].children[1],
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
                full: (fbx.children[0].children[2] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[2].children[0],
                    heart: stones.children[0].children[2].children[1],
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
                full: (fbx.children[0].children[8] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[2].children[0],
                    heart: stones.children[1].children[2].children[1],
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
                full: (fbx.children[0].children[3] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[2].children[0],
                    heart: stones.children[2].children[2].children[1],
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
                full: (fbx.children[0].children[9] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[2].children[0],
                    heart: stones.children[3].children[2].children[1],
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
            <OrbitControls maxDistance={35} minDistance={10} minPolarAngle={Math.PI / 3}
                           maxPolarAngle={Math.PI - Math.PI / 3} ref={orbitRef}/>
            {savedEnvMap && <LoadedMaterials/>}
            {/*<primitive object={fbx} visible={false} position={[0, -10, 0]}/>*/}
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