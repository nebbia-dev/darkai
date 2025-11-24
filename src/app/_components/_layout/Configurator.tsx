'use client'
import {OrbitControls, useEnvironment, useFBX} from '@react-three/drei';
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
import {useFrame, useThree} from "@react-three/fiber";
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

export default function Configurator() {
    const envMap = useEnvironment({
        files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"
    })

    // Se voglio piazzare anche l'fbx in LoadedMaterials, verosimilmente devo usare qui uno useEffect
    const teeth = useMemo((): FBX => {
        const fbx = useFBX('/models/MOD_Dentiera_Completa_180_Phong_Scala_1 (1).fbx');
        const stones = useFBX('/models/MOD_Stone (3).fbx');
        const frames = useFBX('/models/MOD_Frame_Capsula (2).fbx');
        const bigBar  = useFBX('/models/MOD_Full_Frame_Capsula.fbx');
        const bars = useFBX('/models/MOD_Bars_Capsula (2).fbx');
        const hearts = useFBX('/models/MOD_Stone_Ametista.fbx');
        const paves = useFBX('/models/Pave_Separati.fbx');
        const otherFools = useFBX('/models/MOD_Full_All.fbx');
        const signatures = useFBX('/models/Gioielli_Separati_SI.fbx');

        console.log(bigBar);
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
                    base: (paves.children[20] as THREE.Mesh).geometry,
                    full: (paves.children[21] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[21])
                },
                bar: {
                    full: (bars.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[0] as THREE.Mesh).geometry,
                        full: (bars.children[0] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[0])
                    }
                },
                frame: {
                    full: (frames.children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[1] as THREE.Mesh).geometry,
                        full: (frames.children[1] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[1])
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
                    base: (paves.children[22] as THREE.Mesh).geometry,
                    full: (paves.children[23] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[23])
                },
                bar: {
                    full: (bars.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[0] as THREE.Mesh).geometry,
                        full: (bars.children[0] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[0])
                    }
                },
                frame: {
                    full: (frames.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[0] as THREE.Mesh).geometry,
                        full: (frames.children[0] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[0])
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
                    base: (paves.children[36] as THREE.Mesh).geometry,
                    full: (paves.children[37] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[37])
                },
                bar: {
                    full: (bars.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[3] as THREE.Mesh).geometry,
                        full: (bars.children[3] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[3])
                    }
                },
                frame: {
                    full: (frames.children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[6] as THREE.Mesh).geometry,
                        full: (frames.children[6] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[6])
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
                    base: (paves.children[38] as THREE.Mesh).geometry,
                    full: (paves.children[39] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[39])
                },
                bar: {
                    full: (bars.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[3] as THREE.Mesh).geometry,
                        full: (bars.children[3] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[3])
                    }
                },
                frame: {
                    full: (frames.children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[7] as THREE.Mesh).geometry,
                        full: (frames.children[7] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[7])
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
                    base: (paves.children[44] as THREE.Mesh).geometry,
                    full: (paves.children[45] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[45])
                },
                bar: {
                    full: (bars.children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[1] as THREE.Mesh).geometry,
                        full: (bars.children[1] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[1])
                    }
                },
                frame: {
                    full: (frames.children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[2] as THREE.Mesh).geometry,
                        full: (frames.children[2] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[2])
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
                    base: (paves.children[46] as THREE.Mesh).geometry,
                    full: (paves.children[47] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[47])
                },
                bar: {
                    full: (bars.children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[2] as THREE.Mesh).geometry,
                        full: (bars.children[2] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[2])
                    }
                },
                frame: {
                    full: (frames.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[3] as THREE.Mesh).geometry,
                        full: (frames.children[3] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[3])
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
                    base: (paves.children[32] as THREE.Mesh).geometry,
                    full: (paves.children[33] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[33])
                },
                bar: {
                    full: (bars.children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[4] as THREE.Mesh).geometry,
                        full: (bars.children[4] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[4])
                    }
                },
                frame: {
                    full: (frames.children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[8] as THREE.Mesh).geometry,
                        full: (frames.children[8] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[8])
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
                    base: (paves.children[34] as THREE.Mesh).geometry,
                    full: (paves.children[35] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[35])
                },
                bar: {
                    full: (bars.children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[5] as THREE.Mesh).geometry,
                        full: (bars.children[5] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[5])
                    }
                },
                frame: {
                    full: (frames.children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frames.children[9] as THREE.Mesh).geometry,
                        full: (frames.children[9] as THREE.Mesh).geometry,
                        position: getOrigin(frames.children[9])
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
                    base: (paves.children[41] as THREE.Mesh).geometry,
                    full: (paves.children[40] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[40])
                },
                bar: {
                    full: (bars.children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[6] as THREE.Mesh).geometry,
                        full: (bars.children[6] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[6])
                    }
                },
                frame: {
                    full: (frames.children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[1] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[0] as THREE.Mesh).geometry,
                        position: getOrigin(fbx.children[2].children[0].children[0].children[0])
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
                    base: (paves.children[43] as THREE.Mesh).geometry,
                    full: (paves.children[42] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[42])
                },
                bar: {
                    full: (bars.children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[7] as THREE.Mesh).geometry,
                        full: (bars.children[7] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[7])
                    }
                },
                frame: {
                    full: (frames.children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[3] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[2] as THREE.Mesh).geometry,
                        position: getOrigin(fbx.children[2].children[0].children[0].children[2])
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
                    base: (paves.children[28] as THREE.Mesh).geometry,
                    full: (paves.children[29] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[29])
                },
                frame: {
                    full: (frames.children[10] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[2] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[1] as THREE.Mesh).geometry,
                        position: getOrigin(fbx.children[2].children[0].children[0].children[1])
                    }
                },
                bar: {
                    full: (bars.children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[8] as THREE.Mesh).geometry,
                        full: (bars.children[8] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[8])
                    }
                },
                bigBar: {
                    full: (bigBar.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[3].children[0].children[0] as THREE.Mesh).geometry,
                        full: (fbx.children[3].children[0].children[1] as THREE.Mesh).geometry,
                        position: getOrigin(fbx.children[3].children[0].children[1])
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
                    base: (paves.children[30] as THREE.Mesh).geometry,
                    full: (paves.children[31] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[31])
                },
                frame: {
                    full: (frames.children[11] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[2].children[0].children[4] as THREE.Mesh).geometry,
                        full: (fbx.children[2].children[0].children[0].children[3] as THREE.Mesh).geometry,
                        position: getOrigin(fbx.children[2].children[0].children[0].children[3])
                    }
                },
                bar: {
                    full: (bars.children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bars.children[9] as THREE.Mesh).geometry,
                        full: (bars.children[9] as THREE.Mesh).geometry,
                        position: getOrigin(bars.children[9])
                    }
                },
                bigBar: {
                    full: (bigBar.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (fbx.children[3].children[0].children[0] as THREE.Mesh).geometry,
                        full: (fbx.children[3].children[0].children[1] as THREE.Mesh).geometry,
                        position: getOrigin(fbx.children[3].children[0].children[1])
                    }
                }
            },
            // PRIMI PREMOLARI
            pprsdx: {
                full: (otherFools.children[30] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[17] as THREE.Mesh).geometry,
                    full: (paves.children[16] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[16])
                },
            },
            pprssx: {
                full: (otherFools.children[20] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[19] as THREE.Mesh).geometry,
                    full: (paves.children[18] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[18])
                },
            },
            ppridx: {
                full: (otherFools.children[16] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[12] as THREE.Mesh).geometry,
                    full: (paves.children[13] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[13])
                },
            },
            pprisx: {
                full: (otherFools.children[19] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[14] as THREE.Mesh).geometry,
                    full: (paves.children[15] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[15])
                },
            },
            // SECONDI PREMOLARI
            sprsdx: {
                full: (otherFools.children[22] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[0] as THREE.Mesh).geometry,
                    full: (paves.children[1] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[1])
                },
            },
            sprssx: {
                full: (otherFools.children[12] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[2] as THREE.Mesh).geometry,
                    full: (paves.children[3] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[3])
                },
            },
            spridx: {
                full: (otherFools.children[14] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[8] as THREE.Mesh).geometry,
                    full: (paves.children[9] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[9])
                },
            },
            sprisx: {
                full: (otherFools.children[31] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[10] as THREE.Mesh).geometry,
                    full: (paves.children[11] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[11])
                },
            },
            // MOLARI
            msdx: {
                full: (otherFools.children[28] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[24] as THREE.Mesh).geometry,
                    full: (paves.children[25] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[25])
                },
            },
            mssx: {
                full: (otherFools.children[17] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[26] as THREE.Mesh).geometry,
                    full: (paves.children[27] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[27])
                },
            },
            midx: {
                full: (otherFools.children[27] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[4] as THREE.Mesh).geometry,
                    full: (paves.children[5] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[5])
                },
            },
            misx: {
                full: (otherFools.children[29] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (paves.children[6] as THREE.Mesh).geometry,
                    full: (paves.children[7] as THREE.Mesh).geometry,
                    position: getOrigin(paves.children[7])
                },
            },
            // SIGNATURE
            signature: {
                hammered: {
                    icidx: (signatures.children[0].children[0].children[0] as THREE.Mesh).geometry,
                    ilssx: (signatures.children[0].children[0].children[1] as THREE.Mesh).geometry,
                    ilsdx: (signatures.children[0].children[1].children[0] as THREE.Mesh).geometry,
                    ilisx: (signatures.children[0].children[1].children[1] as THREE.Mesh).geometry,
                },
                bubblegum: {
                    sup: (signatures.children[3] as THREE.Mesh).geometry,
                    position: signatures.children[3].position
                },
                cross: {
                    ics: (signatures.children[1] as THREE.Mesh).geometry,
                    position: signatures.children[1].position,
                },
                tribal: {
                    sup: (signatures.children[2] as THREE.Mesh).geometry,
                    position: signatures.children[2].position,
                },
                sprinkles: {
                    csdx: (signatures.children[4].children[0] as THREE.Mesh).geometry,
                    cssx: (signatures.children[4].children[1] as THREE.Mesh).geometry,
                    ilsdx: (signatures.children[4].children[2] as THREE.Mesh).geometry,
                    ilssx: (signatures.children[4].children[3] as THREE.Mesh).geometry
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
    const resetScreenShot = useTeethStore((state : State) => state.setIsScreenshotNeeded);
    const resetControls = useTeethStore((state : State) => state.resetControls);
    const doResetControls = useTeethStore((state : State) => state.setResetControls);
    const orbitRef = useRef<OrbitControlsImpl>(null);
    const groupRef = useRef<>(null)
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
            resetCameraPosition();
            // orbitRef.current.reset();
            doResetControls(undefined);
        }
    }, [resetControls])

    useEffect(() => {
        setTeeth(teeth);
        setEnvMap(envMap);
    }, []);

    // useFrame(() => {
        // LOL
        // if(groupRef.current
        //     && orbitRef.current
        //     && (orbitRef.current.getAzimuthalAngle() > -Math.PI / 2)
        //     && (orbitRef.current.getAzimuthalAngle() < Math.PI / 2)
        //     && groupRef.current.position.z < 3
        //     && groupRef.current.position.z > -3
        // ) {
        //     groupRef.current.position.z = Math.abs(orbitRef.current.getAzimuthalAngle() * 2);
        // }
    // });

    function resetCameraPosition() {
        if(orbitRef.current){
            orbitRef.current.setAzimuthalAngle(0);
            orbitRef.current.setPolarAngle(1.422);
        }
    }

    return (
        <>
            <OrbitControls
                maxDistance={35}
                // minDistance={25}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI - Math.PI / 3}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
                ref={orbitRef}
            />

            {savedEnvMap && <LoadedMaterials/>}
            {savedTeeth && savedEnvMap &&
                <group ref={groupRef} position={[0,0,3]}>
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