'use client'
import {OrbitControls, useEnvironment, useFBX, useGLTF} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Dentiera from "@/app/_components/_teeth/Dentiera";
import {useTeethStore} from "@/app/_stores/teeth";
import IlsDx from "@/app/_components/_teeth/_lateral-incisors/IlsDx";
import IlsSx from "@/app/_components/_teeth/_lateral-incisors/IlsSx";
import LoadedMaterials from "@/app/_components/_layout/LoadedMaterials";
import {useEffect, useMemo, useRef} from "react";
import FBX from "@/app/_types/FBX";
import IcsSx from "@/app/_components/_teeth/_central-incisors/IcsSx";
import IcsDx from "@/app/_components/_teeth/_central-incisors/IcsDx";
import IliSx from "@/app/_components/_teeth/_lateral-incisors/IliSx";
import IliDx from "@/app/_components/_teeth/_lateral-incisors/IliDx";
import IciSx from "@/app/_components/_teeth/_central-incisors/IciSx";
import IciDx from "@/app/_components/_teeth/_central-incisors/IciDx";
import CsDx from "@/app/_components/_teeth/_canines/CsDx";
import CsSx from "@/app/_components/_teeth/_canines/CsSx";
import CsDxStone from "@/app/_components/_teeth/_canines/CsDxStone";
import CsSxStone from "@/app/_components/_teeth/_canines/CsSxStone";
import CiDxStone from "@/app/_components/_teeth/_canines/CiDxStone";
import CiDx from "@/app/_components/_teeth/_canines/CiDx";
import CiSx from "@/app/_components/_teeth/_canines/CiSx";
import CiSxStone from "@/app/_components/_teeth/_canines/CiSxStone";
import {State} from "@/app/_types/State";
import * as THREE from 'three'
import {invalidate, useFrame, useThree} from "@react-three/fiber";
import IlsSxStone from "@/app/_components/_teeth/_lateral-incisors/IlsSxStone";
import IlsDxStone from "@/app/_components/_teeth/_lateral-incisors/IlsDxStone";
import IcsSxStone from "@/app/_components/_teeth/_central-incisors/IcsSxStone";
import IcsDxStone from "@/app/_components/_teeth/_central-incisors/IcsDxStone";
import IliSxStone from "@/app/_components/_teeth/_lateral-incisors/IliSxStone";
import IliDxStone from "@/app/_components/_teeth/_lateral-incisors/IliDxStone";
import IciSxStone from "@/app/_components/_teeth/_central-incisors/IciSxStone";
import IciDxStone from "@/app/_components/_teeth/_central-incisors/IciDxStone";
import PprsDx from "@/app/_components/_teeth/_first-premolars/PprsDx";
import PprsSx from "@/app/_components/_teeth/_first-premolars/PprsSx";
import PpriDx from "@/app/_components/_teeth/_first-premolars/PpriDx";
import PpriSx from "@/app/_components/_teeth/_first-premolars/PpriSx";
import SprsDx from "@/app/_components/_teeth/_second-premolars/SprsDx";
import SprsSx from "@/app/_components/_teeth/_second-premolars/SprsSx";
import SpriDx from "@/app/_components/_teeth/_second-premolars/SpriDx";
import SpriSx from "@/app/_components/_teeth/_second-premolars/SpriSx";
import MsDx from "@/app/_components/_teeth/_molars/MsDx";
import MiSx from "@/app/_components/_teeth/_molars/MiSx";
import MsSx from "@/app/_components/_teeth/_molars/MsSx";
import MiDx from "@/app/_components/_teeth/_molars/MiDx";
import Vamp from "@/app/_components/_teeth/_signature/Vamp";
import Sprinkles from "@/app/_components/_teeth/_signature/Sprinkles";
import BubbleGum from "@/app/_components/_teeth/_signature/BubbleGum";
import Braces from "@/app/_components/_teeth/_signature/Braces";
import Tribals from "@/app/_components/_teeth/_signature/Tribals";
import Hammered from "@/app/_components/_teeth/_signature/Hammered";
import Cross from "@/app/_components/_teeth/_signature/Cross";
import {Group} from "three";
import FullMaterial from "@/app/_components/_materials/FullMaterial";
import DecalPave from "@/app/_components/_materials/DecalPave";

export default function Configurator() {
    const envMap = useEnvironment({
        files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"
    })
    // const fullDiamond = useFBX('/models/Full_Pave.fbx');
    // const fullPaveGlb = useGLTF('/models/Full_Pave.glb');
    // console.log(fullPaveGlb)
    // const otherFools = useFBX('/models/MOD_Full_All.fbx');
    // Se voglio piazzare anche l'fbx in LoadedMaterials, verosimilmente devo usare qui uno useEffect

    const teeth = useMemo((): FBX => {
        const fullDiamond = useGLTF('/models/Full_Pave.glb');
        const frameDiamond = useFBX('/models/Frame_Pave.fbx');
        const barDiamond = useFBX('/models/Bar_Pave.fbx');
        const stones = useFBX('/models/MOD_Stone (3).fbx');
        const frames = useFBX('/models/MOD_Frame_Capsula (2).fbx');
        const bigBar  = useFBX('/models/MOD_Full_Frame_Capsula.fbx');
        const bars = useFBX('/models/MOD_Bars_Capsula (2).fbx');
        const hearts = useFBX('/models/MOD_Stone_Ametista.fbx');
        const otherFools = useFBX('/models/MOD_Full_All.fbx');
        const signatures = useFBX('/models/Signatures.fbx');
        const bubbglegum = useFBX('/models/BGum.fbx');
        const sprinkles = useFBX('/models/Sprinkles_FREEZE_COORDINATE.fbx');
        function getOrigin(mesh:any) {
            const box = new THREE.Box3().setFromObject(mesh);
            return box.getCenter(new THREE.Vector3());
        }

        return {

            // INCISIVI CENTRALI
            icsdx: {
                full: (otherFools.children[5] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[0].children[0],
                    heart: hearts.children[0],
                    circle: stones.children[0].children[0].children[2],
                    tear: stones.children[0].children[0].children[3],
                    square: stones.children[0].children[0].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[44] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[45] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[45])
                },
                bar: {
                    full: (bars.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[0].children[0] as THREE.Mesh).geometry,
                        basePosition: barDiamond.children[0].children[0].position,
                        full: (barDiamond.children[0].children[1] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.children[0].children[1].position,
                        diamondPosition: getOrigin(barDiamond.children[0].children[1])
                    }
                },
                frame: {
                    full: (frames.children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[0].children[0] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[0].children[2] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[0].children[2])
                    }
                }
            },
            icssx: {
                full: (otherFools.children[2] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[0].children[0],
                    heart: hearts.children[3],
                    circle: stones.children[1].children[0].children[2],
                    tear: stones.children[1].children[0].children[3],
                    square: stones.children[1].children[0].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[46] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[47] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[47])
                },
                bar: {
                    full: (bars.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[0].children[0] as THREE.Mesh).geometry,
                        basePosition: barDiamond.children[0].children[0].position,
                        full: (barDiamond.children[0].children[1] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.children[0].children[1].position,
                        diamondPosition: getOrigin(barDiamond.children[0].children[1])
                    }
                },
                frame: {
                    full: (frames.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[0].children[1] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[0].children[3] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[0].children[3])
                    }
                }
            },
            icidx: {
                full: (otherFools.children[7] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[0].children[0],
                    heart: hearts.children[6],
                    circle: stones.children[2].children[0].children[2],
                    tear: stones.children[2].children[0].children[3],
                    square: stones.children[2].children[0].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[17] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[19] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[19])
                },
                bar: {
                    full: (bars.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[0].children[2] as THREE.Mesh).geometry,
                        basePosition: barDiamond.children[0].children[2].position,
                        full: (barDiamond.children[0].children[3] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.children[0].children[3].position,
                        diamondPosition: getOrigin(barDiamond.children[0].children[3])
                    }
                },
                frame: {
                    full: (frames.children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[1].children[0] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[1].children[2] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[1].children[2])
                    }
                }
            },
            icisx: {
                full: (otherFools.children[6] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[0].children[0],
                    heart: hearts.children[9],
                    circle: stones.children[3].children[0].children[2],
                    tear: stones.children[3].children[0].children[3],
                    square: stones.children[3].children[0].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[9] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[30] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[30])
                },
                bar: {
                    full: (bars.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[0].children[2] as THREE.Mesh).geometry,
                        basePosition: barDiamond.children[0].children[2].position,
                        full: (barDiamond.children[0].children[3] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.children[0].children[3].position,
                        diamondPosition: getOrigin(barDiamond.children[0].children[3])
                    }
                },
                frame: {
                    full: (frames.children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[1].children[1] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[1].children[3] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[1].children[3])
                    }
                }
            },
            // INCISIVI LATERALI
            ilsdx: {
                full: (otherFools.children[4] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[1].children[0],
                    heart: hearts.children[1],
                    circle: stones.children[0].children[1].children[2],
                    tear: stones.children[0].children[1].children[3],
                    square: stones.children[0].children[1].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[22] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[23] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[23])
                },
                bar: {
                    full: (bars.children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[0] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[2] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[2])
                    }
                },
                frame: {
                    full: (frames.children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[0].children[4] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[0].children[6] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[0].children[6])
                    }
                }
            },
            ilssx: {
                full: (otherFools.children[1] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[1].children[0],
                    heart: hearts.children[4],
                    circle: stones.children[1].children[1].children[2],
                    tear: stones.children[1].children[1].children[3],
                    square: stones.children[1].children[1].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[33] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[34] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[34])
                },
                bar: {
                    full: (bars.children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[1] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[3] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[3])
                    }
                },
                frame: {
                    full: (frames.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[0].children[5] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[0].children[7] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[0].children[7])
                    }
                }
            },
            ilidx: {
                full: (otherFools.children[9] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[1].children[0],
                    heart: hearts.children[7],
                    circle: stones.children[2].children[1].children[2],
                    tear: stones.children[2].children[1].children[3],
                    square: stones.children[2].children[1].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[15] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[16] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[16])
                },
                bar: {
                    full: (bars.children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[4] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[6] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[6])
                    }
                },
                frame: {
                    full: (frames.children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[1].children[4] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[1].children[6] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[1].children[6])
                    }
                }
            },
            ilisx: {
                full: (otherFools.children[8] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[1].children[0],
                    heart: hearts.children[10],
                    circle: stones.children[3].children[1].children[2],
                    tear: stones.children[3].children[1].children[3],
                    square: stones.children[3].children[1].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[7] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[8] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[8])
                },
                bar: {
                    full: (bars.children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[5] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[7] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[7])
                    }
                },
                frame: {
                    full: (frames.children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[1].children[5] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[1].children[7] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[1].children[7])
                    }
                }
            },
            // CANINI
            csdx: {
                full: (otherFools.children[3] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[0].children[2].children[0],
                    heart: hearts.children[2],
                    circle: stones.children[0].children[2].children[2],
                    tear: stones.children[0].children[2].children[3],
                    square: stones.children[0].children[2].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[21] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[20] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[20])
                },
                bar: {
                    full: (bars.children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[8] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[10] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[10])
                    }
                },
                frame: {
                    full: (frames.children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[0].children[8] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[0].children[10] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[0].children[10])
                    }
                }
            },
            cssx: {
                full: (otherFools.children[0] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[1].children[2].children[0],
                    heart: hearts.children[5],
                    circle: stones.children[1].children[2].children[2],
                    tear: stones.children[1].children[2].children[3],
                    square: stones.children[1].children[2].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[32] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[31] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[31])
                },
                bar: {
                    full: (bars.children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[9] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[11] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[11])
                    }
                },
                frame: {
                    full: (frames.children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[0].children[9] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[0].children[11] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[0].children[11])
                    }
                }
            },
            cidx: {
                full: (otherFools.children[11] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[2].children[2].children[0],
                    heart: hearts.children[8],
                    circle: stones.children[2].children[2].children[2],
                    tear: stones.children[2].children[2].children[3],
                    square: stones.children[2].children[2].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[13] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[14] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[14])
                },
                frame: {
                    full: (frames.children[10] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[1].children[8] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[1].children[10] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[1].children[10])
                    }
                },
                bar: {
                    full: (bars.children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[12] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[14] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[14])
                    }
                },
                bigBar: {
                    full: (bigBar.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[2].children[0] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[2].children[1] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[2].children[1])
                    }
                }
            },
            cisx: {
                full: (otherFools.children[10] as THREE.Mesh).geometry,
                stones: {
                    marquise: stones.children[3].children[2].children[0],
                    heart: hearts.children[11],
                    circle: stones.children[3].children[2].children[2],
                    tear: stones.children[3].children[2].children[3],
                    square: stones.children[3].children[2].children[4]
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[5] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[6] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[6])
                },
                frame: {
                    full: (frames.children[11] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[1].children[9] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[1].children[11] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[1].children[11])
                    }
                },
                bar: {
                    full: (bars.children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.children[1].children[13] as THREE.Mesh).geometry,
                        full: (barDiamond.children[1].children[15] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.children[1].children[15])
                    }
                },
                bigBar: {
                    full: (bigBar.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.children[2].children[0] as THREE.Mesh).geometry,
                        full: (frameDiamond.children[2].children[1] as THREE.Mesh).geometry,
                        position: getOrigin(frameDiamond.children[2].children[1])
                    }
                }
            },
            // PRIMI PREMOLARI
            pprsdx: {
                full: (otherFools.children[30] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[10] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[28] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[28])
                },
            },
            pprssx: {
                full: (otherFools.children[20] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[2] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[39] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[39])
                },
            },
            ppridx: {
                full: (otherFools.children[16] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[26] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[27] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[27])
                },
            },
            pprisx: {
                full: (otherFools.children[19] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[37] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[38] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[38])
                },
            },
            // SECONDI PREMOLARI
            sprsdx: {
                full: (otherFools.children[22] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[1] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[18] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[18])
                },
            },
            sprssx: {
                full: (otherFools.children[12] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[0] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[29]as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[29])
                },
            },
            spridx: {
                full: (otherFools.children[14] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[40] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[41] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[41])
                },
            },
            sprisx: {
                full: (otherFools.children[31] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[42] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[43] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[43])
                },
            },
            // MOLARI
            msdx: {
                full: (otherFools.children[28] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[11] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[12] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[12])
                },
            },
            mssx: {
                full: (otherFools.children[17] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[3] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[4] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[4])
                },
            },
            midx: {
                full: (otherFools.children[27] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[24] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[25] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[25])
                },
            },
            misx: {
                full: (otherFools.children[29] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[35] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[36] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[36])
                },
            },
            // SIGNATURE
            signature: {
                hammered: {
                    icidx: (signatures.children[0].children[0].children[1] as THREE.Mesh).geometry,
                    ilssx: (signatures.children[0].children[0].children[0] as THREE.Mesh).geometry,
                    ilsdx: (signatures.children[0].children[1].children[0] as THREE.Mesh).geometry,
                    ilisx: (signatures.children[0].children[1].children[1] as THREE.Mesh).geometry,
                },
                bubblegum: {
                    base: (bubbglegum.children[0] as THREE.Mesh).geometry,
                    positionBase: new THREE.Vector3(bubbglegum.children[0].position.x, bubbglegum.children[0].position.y, bubbglegum.children[0].position.z + 0.02),
                    pave: (bubbglegum.children[1] as THREE.Mesh).geometry,
                    positionPave: new THREE.Vector3(bubbglegum.children[0].position.x, bubbglegum.children[0].position.y, bubbglegum.children[0].position.z + 0.02)
                },
                cross: {
                    full: (signatures.children[3].children[0] as THREE.Mesh).geometry,
                    base: (signatures.children[3].children[0] as THREE.Mesh).geometry,
                    pave: (signatures.children[3].children[0] as THREE.Mesh).geometry,
                    position: signatures.children[3].position,
                },
                tribal: {
                    hangs: (signatures.children[2].children[0] as THREE.Mesh).geometry,
                    frame: (signatures.children[2].children[1] as THREE.Mesh).geometry,
                    back: (signatures.children[2].children[2] as THREE.Mesh).geometry,
                    pave: (signatures.children[2].children[3] as THREE.Mesh).geometry,
                    position: signatures.children[2].position,
                },
                sprinkles: {
                    base: (sprinkles.children[0] as THREE.Mesh).geometry,
                    csdx: {
                        n: {
                            frame: (sprinkles.children[1].children[6] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[6] as THREE.Mesh).geometry
                        },
                        ne: {
                            frame: (sprinkles.children[1].children[10] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[10] as THREE.Mesh).geometry
                        },
                        se: {
                            frame: (sprinkles.children[1].children[8] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[8] as THREE.Mesh).geometry
                        },
                        s: {
                            frame: (sprinkles.children[1].children[4] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[4] as THREE.Mesh).geometry
                        },
                        o: {
                            frame: (sprinkles.children[1].children[12] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[12] as THREE.Mesh).geometry
                        }
                    },
                    cssx: {
                        n: {
                            frame: (sprinkles.children[1].children[7] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[7] as THREE.Mesh).geometry
                        },
                        no: {
                            frame: (sprinkles.children[1].children[11] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[11] as THREE.Mesh).geometry
                        },
                        so: {
                            frame: (sprinkles.children[1].children[9] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[9] as THREE.Mesh).geometry
                        },
                        s: {
                            frame: (sprinkles.children[1].children[5] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[5] as THREE.Mesh).geometry
                        },
                        e: {
                            frame: (sprinkles.children[1].children[13] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[13] as THREE.Mesh).geometry
                        }
                    },
                    ilsdx: {
                        ne: {
                            frame: (sprinkles.children[1].children[16] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[16] as THREE.Mesh).geometry
                        },
                        e: {
                            frame: (sprinkles.children[1].children[2] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[2] as THREE.Mesh).geometry
                        },
                        se: {
                            frame: (sprinkles.children[1].children[18] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[18] as THREE.Mesh).geometry
                        },
                        c: {
                            frame: (sprinkles.children[1].children[0] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[0] as THREE.Mesh).geometry
                        },
                        so: {
                            frame: (sprinkles.children[1].children[14] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[14] as THREE.Mesh).geometry
                        },
                        no: {
                            frame: (sprinkles.children[1].children[20] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[20] as THREE.Mesh).geometry
                        }
                    },
                    ilssx: {
                        ne: {
                            frame: (sprinkles.children[1].children[21] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[21] as THREE.Mesh).geometry
                        },
                        c: {
                            frame: (sprinkles.children[1].children[1] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[1] as THREE.Mesh).geometry
                        },
                        se: {
                            frame: (sprinkles.children[1].children[15] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[15] as THREE.Mesh).geometry
                        },
                        so: {
                            frame: (sprinkles.children[1].children[19] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[19] as THREE.Mesh).geometry
                        },
                        o: {
                            frame: (sprinkles.children[1].children[3] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[3] as THREE.Mesh).geometry
                        },
                        no: {
                            frame: (sprinkles.children[1].children[17] as THREE.Mesh).geometry,
                            stone: (sprinkles.children[2].children[17] as THREE.Mesh).geometry
                        }
                    }
                },
                vamp: {
                    csdx: {
                        base: {
                            geometry: (signatures.children[6].children[1] as THREE.Mesh).geometry,
                            position: signatures.children[6].children[1].position
                        },
                        pave: {
                            geometry: (signatures.children[6].children[0] as THREE.Mesh).geometry,
                            position: getOrigin(signatures.children[6].children[0])
                        }
                    },
                    cssx: {
                        base: {
                            geometry: (signatures.children[6].children[3] as THREE.Mesh).geometry,
                            position: signatures.children[6].children[3].position
                        },
                        pave: {
                            geometry: (signatures.children[6].children[2] as THREE.Mesh).geometry,
                            position: getOrigin(signatures.children[6].children[2])
                        }
                    }
                },
                braces: {
                    structure: {
                        geometry: (signatures.children[5].children[0] as THREE.Mesh).geometry,
                        position: signatures.children[5].position
                    },
                    pave: {
                        geometry: (signatures.children[5].children[1] as THREE.Mesh).geometry,
                        position: signatures.children[5].position,
                    },
                    stones: {
                        geometry: (signatures.children[5].children[2] as THREE.Mesh).geometry,
                        position: signatures.children[5].position
                    },
                    outline: {
                        geometry: (signatures.children[5].children[3] as THREE.Mesh).geometry,
                        position: signatures.children[5].position
                    }
                },
            }

        }

    }, [])

    const savedTeeth = useTeethStore((state : State) => state.teethGeometry);
    const setTeeth = useTeethStore((state : State) => state.setGeometry);
    const savedEnvMap = useTeethStore((state : State) => state.envMap);
    const setEnvMap = useTeethStore((state : State) => state.setEnvMap);
    const screenshot = useTeethStore((state : State) => state.isScreenshotNeeded);
    const nextStep = useTeethStore((state : State) => state.nextStep);
    const resetScreenShot = useTeethStore((state : State) => state.setIsScreenshotNeeded);
    const resetControls = useTeethStore((state : State) => state.resetControls);
    const doResetControls = useTeethStore((state : State) => state.setResetControls);
    const orbitRef = useRef<OrbitControlsImpl>(null);
    const groupRef = useRef<Group>(null)
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
        if(orbitRef.current) {
            resetCameraPosition();
            doResetControls(undefined);
        }
    }, [resetControls, nextStep]);

    useEffect(() => {
        setTeeth(teeth);
        setEnvMap(envMap);
    }, []);

    useFrame((state, delta) => {
        if(groupRef.current && nextStep) {
            invalidate();
            if(groupRef.current.position.x > -3) {
                groupRef.current.position.x -= delta * 2;
                camera.position.x -= delta * 2;
            }
        } else if(groupRef.current && !nextStep) {
            invalidate();
            if(groupRef.current.position.x < 0) {
                groupRef.current.position.x += delta * 2;
                camera.position.x += delta * 2;
            }
        }
    })

    function resetCameraPosition() {
        if(groupRef.current && orbitRef.current){
            if(groupRef.current.position.x < 0) {
                orbitRef.current.setAzimuthalAngle(-0.12);
            } else {
                orbitRef.current.setAzimuthalAngle(0);
            }
            orbitRef.current.setPolarAngle(1.422);
        }
    }

    function getOriginGlb(mesh:any) {
        const box = new THREE.Box3().setFromObject(mesh);
        const vec3 = box.getCenter(new THREE.Vector3())
        const vec = new THREE.Vector3(vec3.x * 100, vec3.z * 100, vec3.y * -100)
        return vec;
    }

    return (
        <>
            <OrbitControls
                // maxDistance={35}
                // minDistance={25}
                minPolarAngle={nextStep ? Math.PI / 2.1 : Math.PI / 3 }
                maxPolarAngle={nextStep ? Math.PI - Math.PI / 2.1 : Math.PI - Math.PI / 3}
                minAzimuthAngle={nextStep ? -Math.PI / 4 : -Math.PI / 2}
                maxAzimuthAngle={nextStep ? Math.PI / 7 : Math.PI / 2}
                ref={orbitRef}
            />

            {savedEnvMap && <LoadedMaterials/>}
            {savedTeeth && savedEnvMap &&
                <group ref={groupRef} position={[0, 0, 3]}>

                    {/*<mesh geometry={fullPaveGlb.scene.children[1].children[47].geometry}>*/}
                    {/*    <FullMaterial color="gold" finish="polished"/>*/}
                    {/*    <DecalPave position={getOriginGlb(fullPaveGlb.scene.children[1].children[47])} pave="round" stone="ruby"/>*/}

                    {/*</mesh>*/}

                    {/*SIGNATURE*/}
                    <Vamp/>
                    <Sprinkles/>
                    <BubbleGum/>
                    <Braces/>
                    <Tribals/>
                    <Cross/>
                    <Hammered/>
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
                    {/*MOLARI E PREMOLARI*/}
                    <PprsDx/>
                    <PprsSx/>
                    <PpriDx/>
                    <PpriSx/>
                    <SprsDx/>
                    <SprsSx/>
                    <SpriDx/>
                    <SpriSx/>
                    <MsDx/>
                    <MsSx/>
                    <MiDx/>
                    <MiSx/>
                    {/*BASE*/}
                    <Dentiera/>
                </group>
            }
        </>
    );
}