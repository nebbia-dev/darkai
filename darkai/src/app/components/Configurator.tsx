'use client'
import {OrbitControls, useEnvironment, useFBX} from '@react-three/drei';
import Dentiera from "@/app/components/Dentiera";
import {useMemo} from "react";

export default function Configurator() {
    const envMap = useEnvironment({files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"})
    const fbx = useFBX('/models/MOD_Dentiera_Completa_180_Phong.fbx');
    console.log(fbx)
    const teeth = useMemo(() => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa_180_Phong.fbx');
        console.log(fbx);
        return {
            // INCISIVI CENTRALI
            icsdx: {
                full: fbx.children[0].children[5].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[0].geometry,
                    full: fbx.children[1].children[1].children[2].geometry
                }
            },
            icssx: {
                full: fbx.children[0].children[11].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[6].geometry,
                    full: fbx.children[1].children[1].children[8].geometry
                }
            },
            icidx: {
                full: fbx.children[0].children[4].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[2].geometry,
                    full: fbx.children[1].children[1].children[5].geometry
                }
            },
            icisx: {
                full: fbx.children[0].children[10].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[8].geometry,
                    full: fbx.children[1].children[1].children[11].geometry
                }
            },
            // INCISIVI LATERALI
            ilsdx: {
                full: fbx.children[0].children[0].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[1].geometry,
                    full: fbx.children[1].children[1].children[0].geometry
                },
                bar: {
                    full: {
                        left: fbx.children[3].children[2].children[0],
                        right: fbx.children[3].children[2].children[1],
                    },
                    // DA RIVEDERE, children[0].children[1] e children[1].children[1] SONO UGUALI
                    diamond: {
                        left:{
                            base: fbx.children[3].children[1].children[1].children[0].geometry,
                            full: fbx.children[3].children[1].children[0].children[1].geometry
                        },
                        right: {
                            base: fbx.children[3].children[1].children[0].children[0].geometry,
                            full: fbx.children[3].children[1].children[1].children[1].geometry
                        }
                    }
                }
            },
            ilssx: {
                full: fbx.children[0].children[6].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[7].geometry,
                    full: fbx.children[1].children[1].children[6].geometry
                },
                  bar: {
                    full: {
                        left: fbx.children[3].children[2].children[2],
                        right: fbx.children[3].children[2].children[3],
                    },
                      diamond: {
                        left:{
                            base: fbx.children[3].children[1].children[2].children[0].geometry,
                            full: fbx.children[3].children[1].children[2].children[1].geometry
                        },
                          right: {
                            base: fbx.children[3].children[1].children[3].children[0].geometry,
                            full: fbx.children[3].children[1].children[3].children[1].geometry
                        }
                    }
                }
            },
            ilidx: {
                full: fbx.children[0].children[1].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[5].geometry,
                    full: fbx.children[1].children[1].children[1].geometry
                }
            },
            ilisx: {
                full: fbx.children[0].children[7].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[11].geometry,
                    full: fbx.children[1].children[1].children[7].geometry
                }
            },
            // CANINI
            csdx: {
                full: fbx.children[0].children[2].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[4].geometry,
                    full: fbx.children[1].children[1].children[3].geometry
                },
                frame: {
                    full: fbx.children[2].children[1].geometry,
                    diamond: {
                        base: fbx.children[2].children[0].children[1].geometry,
                        full: fbx.children[2].children[0].children[0].children[0].geometry
                    }
                },
                stone: fbx.children[4].children[2].geometry,
            },
            cssx: {
                full: fbx.children[0].children[8].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[10].geometry,
                    full: fbx.children[1].children[1].children[9].geometry
                },
                frame: {
                    full: fbx.children[2].children[3].geometry,
                    diamond: {
                         base: fbx.children[2].children[0].children[3].geometry,
                         full: fbx.children[2].children[0].children[0].children[2].geometry
                    }
                },
                stone: fbx.children[4].children[1].geometry,
            },
            cidx: {
                full: fbx.children[0].children[3].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[3].geometry,
                    full: fbx.children[1].children[1].children[4].geometry
                },
                frame: {
                    full: fbx.children[2].children[2].geometry,
                    diamond: {
                        base: fbx.children[2].children[0].children[2].geometry,
                        full: fbx.children[2].children[0].children[0].children[1].geometry
                    }
                },
                stone: fbx.children[4].children[0].geometry,
                bar: {
                    full: fbx.children[3].children[3].geometry,
                    diamond: {
                        base: fbx.children[3].children[0].children[0].geometry,
                        full: fbx.children[3].children[0].children[1].geometry
                    }
                }
            },
            cisx: {
                full: fbx.children[0].children[9].geometry,
                fullDiamond: {
                    base: fbx.children[1].children[0].children[9].geometry,
                    full: fbx.children[1].children[1].children[10].geometry
                },
                frame: {
                    full: fbx.children[2].children[4].geometry,
                    diamond: {
                        base: fbx.children[2].children[0].children[4].geometry,
                        full: fbx.children[2].children[0].children[0].children[3].geometry
                    }
                },
                stone: fbx.children[4].children[3].geometry,
                bar: {
                    full: fbx.children[3].children[3].geometry,
                    diamond: {
                         base: fbx.children[3].children[0].children[0].geometry,
                         full: fbx.children[3].children[0].children[1].geometry
                    }
                }
            },
        }
    }, []);
    console.log('envMap');
    return (
        <>
            <OrbitControls/>
            <mesh geometry={fbx.children[3].children[1].children[0].children[0].geometry}>
                <meshBasicMaterial color='red'/>
            </mesh>
            <mesh geometry={fbx.children[3].children[1].children[0].children[1].geometry}>
                <meshBasicMaterial color='blue'/>
            </mesh>
            <Dentiera envMap={envMap}/>
        </>
    );
}