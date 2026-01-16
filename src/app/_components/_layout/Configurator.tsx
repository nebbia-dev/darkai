'use client'
import {OrbitControls, useEnvironment, useFBX, useGLTF} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Dentiera from "@/app/_components/_teeth/Dentiera";
import {useTeethStore} from "@/app/_stores/teeth";
import IlsDx from "@/app/_components/_teeth/_lateral-incisors/IlsDx";
import IlsSx from "@/app/_components/_teeth/_lateral-incisors/IlsSx";
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
import * as THREE from 'three';
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
import PremiumBox from "@/app/_components/_teeth/PremiumBox";
import FullMaterial from "@/app/_components/_materials/FullMaterial";

export default function Configurator() {
    const envMap = useEnvironment({
        files: "envMaps/HDR_Light_Studio_Free_HDRI_Design_13.exr"
    })

    const teeth = useMemo((): FBX => {

        const fullDiamond = useGLTF('/models/Full_Pave.glb');
        const enamel = useGLTF('/models/Enamel.glb');
        const frameDiamond = useGLTF('/models/Frame_Pave.glb');
        const barDiamond = useGLTF('/models/Bar_Pave.glb');
        const stones = useGLTF('/models/Stones.glb')
        const frames = useGLTF('/models/Frames.glb');
        const bigBar  = useGLTF('/models/BigBar.glb');
        const bars = useGLTF('/models/Bars.glb');
        const full = useGLTF('/models/Full.glb');
        const signatures = useGLTF('/models/Signatures.glb');
        const bubblegum = useGLTF('/models/BGum.glb');
        const sprinkles = useGLTF('/models/Sprinkles.glb');

        return {

            // INCISIVI CENTRALI
            icsdx: {
                full: (full.scene.children[0].children[20] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[1].children[3].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[3].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[3].children[2].children[0]),
                            getOrigin(stones.scene.children[1].children[3].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[3].children[2],
                            stones.scene.children[1].children[3].children[2]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[1].children[2].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[2].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[2].children[2].children[0]),
                            getOrigin(stones.scene.children[1].children[2].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[2].children[2],
                            stones.scene.children[1].children[2].children[2]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[1].children[5].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[5].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[5].children[2].children[0]),
                            getOrigin(stones.scene.children[1].children[5].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[5].children[2],
                            stones.scene.children[1].children[5].children[2]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[1].children[1].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[1].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[1].children[2].children[0]),
                            getOrigin(stones.scene.children[1].children[1].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[1].children[2],
                            stones.scene.children[1].children[1].children[2]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[1].children[4].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[4].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[4].children[2].children[0]),
                            getOrigin(stones.scene.children[1].children[4].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[4].children[2],
                            stones.scene.children[1].children[4].children[2]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[1].children[0].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[0].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[0].children[2].children[0]),
                            getOrigin(stones.scene.children[1].children[0].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[0].children[2],
                            stones.scene.children[1].children[0].children[2]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[44] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[45] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[45], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[0].children[2] as THREE.Mesh).geometry,
                        basePosition: barDiamond.scene.children[0].children[2].position,
                        full: (barDiamond.scene.children[0].children[3] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.scene.children[0].children[3].position,
                        diamondPosition: getOrigin(barDiamond.scene.children[0].children[3])
                    }
                },
                frame: {
                    full: (frames.scene.children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[0].children[5] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[0].children[7] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[0].children[7], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[8] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[8], 1)
                }
            },
            icssx: {
                full: (full.scene.children[0].children[14] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[1].children[3].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[3].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[3].children[5].children[0]),
                            getOrigin(stones.scene.children[1].children[3].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[3].children[5],
                            stones.scene.children[1].children[3].children[5]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[1].children[2].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[2].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[2].children[5].children[0]),
                            getOrigin(stones.scene.children[1].children[2].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[2].children[5],
                            stones.scene.children[1].children[2].children[5]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[1].children[5].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[5].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[5].children[5].children[0]),
                            getOrigin(stones.scene.children[1].children[5].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[5].children[5],
                            stones.scene.children[1].children[5].children[5]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[1].children[1].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[1].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[1].children[5].children[0]),
                            getOrigin(stones.scene.children[1].children[1].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[1].children[5],
                            stones.scene.children[1].children[1].children[5]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[1].children[4].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[4].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[4].children[5].children[0]),
                            getOrigin(stones.scene.children[1].children[4].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[4].children[5],
                            stones.scene.children[1].children[4].children[5]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[1].children[0].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[0].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[0].children[5].children[0]),
                            getOrigin(stones.scene.children[1].children[0].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[0].children[5],
                            stones.scene.children[1].children[0].children[5]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[46] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[47] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[47], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[0].children[2] as THREE.Mesh).geometry,
                        basePosition: barDiamond.scene.children[0].children[2].position,
                        full: (barDiamond.scene.children[0].children[3] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.scene.children[0].children[3].position,
                        diamondPosition: getOrigin(barDiamond.scene.children[0].children[3])
                    }
                },
                frame: {
                    full: (frames.scene.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[0].children[4] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[0].children[6] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[0].children[6], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[9] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[9], 1)
                }
            },
            icidx: {
                full: (full.scene.children[0].children[22] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[0].children[3].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[3].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[3].children[2].children[0]),
                            getOrigin(stones.scene.children[0].children[3].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[3].children[2],
                            stones.scene.children[0].children[3].children[2]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[0].children[2].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[2].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[2].children[2].children[0]),
                            getOrigin(stones.scene.children[0].children[2].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[2].children[2],
                            stones.scene.children[0].children[2].children[2]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[0].children[5].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[5].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[5].children[2].children[0]),
                            getOrigin(stones.scene.children[0].children[5].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[5].children[2],
                            stones.scene.children[0].children[5].children[2]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[0].children[1].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[1].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[1].children[2].children[0]),
                            getOrigin(stones.scene.children[0].children[1].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[1].children[2],
                            stones.scene.children[0].children[1].children[2]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[0].children[4].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[4].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[4].children[2].children[0]),
                            getOrigin(stones.scene.children[0].children[4].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[4].children[2],
                            stones.scene.children[0].children[4].children[2]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[0].children[0].children[2].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[0].children[2] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[0].children[2].children[0]),
                            getOrigin(stones.scene.children[0].children[0].children[2].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[0].children[2],
                            stones.scene.children[0].children[0].children[2]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[17] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[19] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[19], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[0].children[0] as THREE.Mesh).geometry,
                        basePosition: barDiamond.scene.children[0].children[0].position,
                        full: (barDiamond.scene.children[0].children[1] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.scene.children[0].children[1].position,
                        diamondPosition: getOrigin(barDiamond.scene.children[0].children[1])
                    }
                },
                frame: {
                    full: (frames.scene.children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[1].children[5] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[1].children[7] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[1].children[7], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[0] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[0], 1)
                }
            },
            icisx: {
                full: (full.scene.children[0].children[21] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[0].children[3].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[3].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[3].children[5].children[0]),
                            getOrigin(stones.scene.children[0].children[3].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[3].children[5],
                            stones.scene.children[0].children[3].children[5]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[0].children[2].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[2].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[2].children[5].children[0]),
                            getOrigin(stones.scene.children[0].children[2].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[2].children[5],
                            stones.scene.children[0].children[2].children[5]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[0].children[5].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[5].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[5].children[5].children[0]),
                            getOrigin(stones.scene.children[0].children[5].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[5].children[5],
                            stones.scene.children[0].children[5].children[5]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[0].children[1].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[1].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[1].children[5].children[0]),
                            getOrigin(stones.scene.children[0].children[1].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[1].children[5],
                            stones.scene.children[0].children[1].children[5]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[0].children[4].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[4].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[4].children[5].children[0]),
                            getOrigin(stones.scene.children[0].children[4].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[4].children[5],
                            stones.scene.children[0].children[4].children[5]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[0].children[0].children[5].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[0].children[5] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[0].children[5].children[0]),
                            getOrigin(stones.scene.children[0].children[0].children[5].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[0].children[5],
                            stones.scene.children[0].children[0].children[5]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[9] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[30] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[30], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[0].children[0] as THREE.Mesh).geometry,
                        basePosition: barDiamond.scene.children[0].children[0].position,
                        full: (barDiamond.scene.children[0].children[1] as THREE.Mesh).geometry,
                        fullPosition: barDiamond.scene.children[0].children[1].position,
                        diamondPosition: getOrigin(barDiamond.scene.children[0].children[1])
                    }
                },
                frame: {
                    full: (frames.scene.children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[1].children[4] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[1].children[6] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[1].children[6], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[1] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[1], 1)
                }
            },
            // INCISIVI LATERALI
            ilsdx: {
                full: (full.scene.children[0].children[19] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[1].children[3].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[3].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[3].children[1].children[0]),
                            getOrigin(stones.scene.children[1].children[3].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[3].children[1],
                            stones.scene.children[1].children[3].children[1]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[1].children[2].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[2].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[2].children[1].children[0]),
                            getOrigin(stones.scene.children[1].children[2].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[2].children[1],
                            stones.scene.children[1].children[2].children[1]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[1].children[5].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[5].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[5].children[1].children[0]),
                            getOrigin(stones.scene.children[1].children[5].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[5].children[1],
                            stones.scene.children[1].children[5].children[1]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[1].children[1].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[1].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[1].children[1].children[0]),
                            getOrigin(stones.scene.children[1].children[1].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[1].children[1],
                            stones.scene.children[1].children[1].children[1]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[1].children[4].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[4].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[4].children[1].children[0]),
                            getOrigin(stones.scene.children[1].children[4].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[4].children[1],
                            stones.scene.children[1].children[4].children[1]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[1].children[0].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[0].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[0].children[1].children[0]),
                            getOrigin(stones.scene.children[1].children[0].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[0].children[1],
                            stones.scene.children[1].children[0].children[1]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[22] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[23] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[23], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[13] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[15] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[15])
                    }
                },
                frame: {
                    full: (frames.scene.children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[0].children[9] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[0].children[11] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[0].children[11], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[4] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[4], 1)
                }
            },
            ilssx: {
                full: (full.scene.children[0].children[8] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[1].children[3].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[3].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[3].children[4].children[0]),
                            getOrigin(stones.scene.children[1].children[3].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[3].children[4],
                            stones.scene.children[1].children[3].children[4]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[1].children[2].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[2].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[2].children[4].children[0]),
                            getOrigin(stones.scene.children[1].children[2].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[2].children[4],
                            stones.scene.children[1].children[2].children[4]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[1].children[5].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[5].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[5].children[4].children[0]),
                            getOrigin(stones.scene.children[1].children[5].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[5].children[4],
                            stones.scene.children[1].children[5].children[4]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[1].children[1].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[1].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[1].children[4].children[0]),
                            getOrigin(stones.scene.children[1].children[1].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[1].children[4],
                            stones.scene.children[1].children[1].children[4]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[1].children[4].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[4].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[4].children[4].children[0]),
                            getOrigin(stones.scene.children[1].children[4].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[4].children[4],
                            stones.scene.children[1].children[4].children[4]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[1].children[0].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[0].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[0].children[4].children[0]),
                            getOrigin(stones.scene.children[1].children[0].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[0].children[4],
                            stones.scene.children[1].children[0].children[4]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[33] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[34] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[34], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[12] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[14] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[14])
                    }
                },
                frame: {
                    full: (frames.scene.children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[0].children[8] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[0].children[10] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[0].children[10], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[5] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[5], 1)
                }
            },
            ilidx: {
                full: (full.scene.children[0].children[1] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[0].children[3].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[3].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[3].children[1].children[0]),
                            getOrigin(stones.scene.children[0].children[3].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[3].children[1],
                            stones.scene.children[0].children[3].children[1]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[0].children[2].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[2].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[2].children[1].children[0]),
                            getOrigin(stones.scene.children[0].children[2].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[2].children[1],
                            stones.scene.children[0].children[2].children[1]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[0].children[5].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[5].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[5].children[1].children[0]),
                            getOrigin(stones.scene.children[0].children[5].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[5].children[1],
                            stones.scene.children[0].children[5].children[1]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[0].children[1].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[1].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[1].children[1].children[0]),
                            getOrigin(stones.scene.children[0].children[1].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[1].children[1],
                            stones.scene.children[0].children[1].children[1]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[0].children[4].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[4].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[4].children[1].children[0]),
                            getOrigin(stones.scene.children[0].children[4].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[4].children[1],
                            stones.scene.children[0].children[4].children[1]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[0].children[0].children[1].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[0].children[1] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[0].children[1].children[0]),
                            getOrigin(stones.scene.children[0].children[0].children[1].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[0].children[1],
                            stones.scene.children[0].children[0].children[1]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[15] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[16] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[16], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[6] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[9] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[11] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[11])
                    }
                },
                frame: {
                    full: (frames.scene.children[8] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[1].children[9] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[1].children[11] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[1].children[11], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[6] as THREE.Mesh).geometry,
                    position: new THREE.Vector3(enamel.scene.children[0].children[6].position.x, enamel.scene.children[0].children[6].position.y, enamel.scene.children[0].children[6].position.z * 14)
                }
            },
            ilisx: {
                full: (full.scene.children[0].children[23] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[0].children[3].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[3].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[3].children[4].children[0]),
                            getOrigin(stones.scene.children[0].children[3].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[3].children[4],
                            stones.scene.children[0].children[3].children[4]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[0].children[2].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[2].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[2].children[4].children[0]),
                            getOrigin(stones.scene.children[0].children[2].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[2].children[4],
                            stones.scene.children[0].children[2].children[4]
                        ]
                    },
                    circle:{
                        geometries: [
                            (stones.scene.children[0].children[5].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[5].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[5].children[4].children[0]),
                            getOrigin(stones.scene.children[0].children[5].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[5].children[4],
                            stones.scene.children[0].children[5].children[4]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[0].children[1].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[1].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[1].children[4].children[0]),
                            getOrigin(stones.scene.children[0].children[1].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[1].children[4],
                            stones.scene.children[0].children[1].children[4]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[0].children[4].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[4].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[4].children[4].children[0]),
                            getOrigin(stones.scene.children[0].children[4].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[4].children[4],
                            stones.scene.children[0].children[4].children[4]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[0].children[0].children[4].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[0].children[4] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[0].children[4].children[0]),
                            getOrigin(stones.scene.children[0].children[0].children[4].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[0].children[4],
                            stones.scene.children[0].children[0].children[4]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[7] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[8] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[8], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[7] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[8] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[10] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[10])
                    }
                },
                frame: {
                    full: (frames.scene.children[9] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[1].children[8] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[1].children[10] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[1].children[10], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[7] as THREE.Mesh).geometry,
                    position: new THREE.Vector3(enamel.scene.children[0].children[7].position.x, enamel.scene.children[0].children[7].position.y, enamel.scene.children[0].children[7].position.z * 14)
                }
            },
            // CANINI
            csdx: {
                full: (full.scene.children[0].children[18] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[1].children[3].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[3].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[3].children[0].children[0]),
                            getOrigin(stones.scene.children[1].children[3].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[3].children[0],
                            stones.scene.children[1].children[3].children[0]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[1].children[2].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[2].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[2].children[0].children[0]),
                            getOrigin(stones.scene.children[1].children[2].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[2].children[0],
                            stones.scene.children[1].children[2].children[0]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[1].children[5].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[5].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[5].children[0].children[0]),
                            getOrigin(stones.scene.children[1].children[5].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[5].children[0],
                            stones.scene.children[1].children[5].children[0]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[1].children[1].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[1].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[1].children[0].children[0]),
                            getOrigin(stones.scene.children[1].children[1].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[1].children[0],
                            stones.scene.children[1].children[1].children[0]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[1].children[4].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[4].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[4].children[0].children[0]),
                            getOrigin(stones.scene.children[1].children[4].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[4].children[0],
                            stones.scene.children[1].children[4].children[0]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[1].children[0].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[0].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[0].children[0].children[0]),
                            getOrigin(stones.scene.children[1].children[0].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[0].children[0],
                            stones.scene.children[1].children[0].children[0]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[21] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[20] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[20], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[2] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[5] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[7] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[7])
                    }
                },
                frame: {
                    full: (frames.scene.children[4] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[0].children[1] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[0].children[3] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[0].children[3], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[2] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[2], 1)
                }
            },
            cssx: {
                full: (full.scene.children[0].children[0] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[1].children[3].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[3].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[3].children[3].children[0]),
                            getOrigin(stones.scene.children[1].children[3].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[3].children[3],
                            stones.scene.children[1].children[3].children[3]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[1].children[2].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[2].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[2].children[3].children[0]),
                            getOrigin(stones.scene.children[1].children[2].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[2].children[3],
                            stones.scene.children[1].children[2].children[3]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[1].children[5].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[5].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[5].children[3].children[0]),
                            getOrigin(stones.scene.children[1].children[5].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[5].children[3],
                            stones.scene.children[1].children[5].children[3]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[1].children[1].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[1].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[1].children[3].children[0]),
                            getOrigin(stones.scene.children[1].children[1].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[1].children[3],
                            stones.scene.children[1].children[1].children[3]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[1].children[4].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[4].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[4].children[3].children[0]),
                            getOrigin(stones.scene.children[1].children[4].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[4].children[3],
                            stones.scene.children[1].children[4].children[3]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[1].children[0].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[1].children[0].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[1].children[0].children[3].children[0]),
                            getOrigin(stones.scene.children[1].children[0].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[1].children[0].children[3],
                            stones.scene.children[1].children[0].children[3]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[32] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[31] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[31], 1)
                },
                bar: {
                    full: (bars.scene.children[0].children[3] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[4] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[6] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[6])
                    }
                },
                frame: {
                    full: (frames.scene.children[5] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[0].children[0] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[0].children[2] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[0].children[2], 1)
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[3] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[3], 1)
                }
            },
            cidx: {
                full: (full.scene.children[0].children[3] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[0].children[3].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[3].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[3].children[0].children[0]),
                            getOrigin(stones.scene.children[0].children[3].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[3].children[0],
                            stones.scene.children[0].children[3].children[0]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[0].children[2].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[2].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[2].children[0].children[0]),
                            getOrigin(stones.scene.children[0].children[2].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[2].children[0],
                            stones.scene.children[0].children[2].children[0]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[0].children[5].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[5].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[5].children[0].children[0]),
                            getOrigin(stones.scene.children[0].children[5].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[5].children[0],
                            stones.scene.children[0].children[5].children[0]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[0].children[1].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[1].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[1].children[0].children[0]),
                            getOrigin(stones.scene.children[0].children[1].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[1].children[0],
                            stones.scene.children[0].children[1].children[0]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[0].children[4].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[4].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[4].children[0].children[0]),
                            getOrigin(stones.scene.children[0].children[4].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[4].children[0],
                            stones.scene.children[0].children[4].children[0]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[0].children[0].children[0].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[0].children[0] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[0].children[0].children[0]),
                            getOrigin(stones.scene.children[0].children[0].children[0].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[0].children[0],
                            stones.scene.children[0].children[0].children[0]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[13] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[14] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[14], 1)
                },
                frame: {
                    full: (frames.scene.children[10] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[1].children[1] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[1].children[3] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[1].children[3], 1)
                    }
                },
                bar: {
                    full: (bars.scene.children[0].children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[1] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[3] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[3])
                    }
                },
                bigBar: {
                    full: (bigBar.scene.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bigBar.scene.children[1] as THREE.Mesh).geometry,
                        full: (bigBar.scene.children[2] as THREE.Mesh).geometry,
                        position: getOrigin(bigBar.scene.children[2])
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[10] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[10], 1)
                }
            },
            cisx: {
                full: (full.scene.children[0].children[2] as THREE.Mesh).geometry,
                stones: {
                    marquise: {
                        geometries: [
                            (stones.scene.children[0].children[3].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[3].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[3].children[3].children[0]),
                            getOrigin(stones.scene.children[0].children[3].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[3].children[3],
                            stones.scene.children[0].children[3].children[3]
                        ]
                    },
                    heart: {
                        geometries: [
                            (stones.scene.children[0].children[2].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[2].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[2].children[3].children[0]),
                            getOrigin(stones.scene.children[0].children[2].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[2].children[3],
                            stones.scene.children[0].children[2].children[3]
                        ]
                    },
                    circle: {
                        geometries: [
                            (stones.scene.children[0].children[5].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[5].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[5].children[3].children[0]),
                            getOrigin(stones.scene.children[0].children[5].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[5].children[3],
                            stones.scene.children[0].children[5].children[3]
                        ]
                    },
                    tear: {
                        geometries: [
                            (stones.scene.children[0].children[1].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[1].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[1].children[3].children[0]),
                            getOrigin(stones.scene.children[0].children[1].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[1].children[3],
                            stones.scene.children[0].children[1].children[3]
                        ]
                    },
                    square: {
                        geometries: [
                            (stones.scene.children[0].children[4].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[4].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[4].children[3].children[0]),
                            getOrigin(stones.scene.children[0].children[4].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[4].children[3],
                            stones.scene.children[0].children[4].children[3]
                        ]
                    },
                    baguette: {
                        geometries: [
                            (stones.scene.children[0].children[0].children[3].children[0] as THREE.Mesh).geometry,
                            (stones.scene.children[0].children[0].children[3] as THREE.Mesh).geometry,
                        ],
                        positions: [
                            getOrigin(stones.scene.children[0].children[0].children[3].children[0]),
                            getOrigin(stones.scene.children[0].children[0].children[3].children[0])
                        ],
                        quaternions: [
                            stones.scene.children[0].children[0].children[3],
                            stones.scene.children[0].children[0].children[3]
                        ]
                    }
                },
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[5] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[6] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[6], 1)
                },
                frame: {
                    full: (frames.scene.children[11] as THREE.Mesh).geometry,
                    diamond: {
                        base: (frameDiamond.scene.children[1].children[0] as THREE.Mesh).geometry,
                        full: (frameDiamond.scene.children[1].children[2] as THREE.Mesh).geometry,
                        position: getOriginGlb(frameDiamond.scene.children[1].children[2], 1)
                    }
                },
                bar: {
                    full: (bars.scene.children[0].children[1] as THREE.Mesh).geometry,
                    diamond: {
                        base: (barDiamond.scene.children[1].children[0] as THREE.Mesh).geometry,
                        full: (barDiamond.scene.children[1].children[2] as THREE.Mesh).geometry,
                        position: getOrigin(barDiamond.scene.children[1].children[2])
                    }
                },
                bigBar: {
                    full: (bigBar.scene.children[0] as THREE.Mesh).geometry,
                    diamond: {
                        base: (bigBar.scene.children[1] as THREE.Mesh).geometry,
                        full: (bigBar.scene.children[2] as THREE.Mesh).geometry,
                        position: getOrigin(bigBar.scene.children[2])
                    }
                },
                enamel: {
                    geometry: (enamel.scene.children[0].children[11] as THREE.Mesh).geometry,
                    position: getOriginGlb(enamel.scene.children[0].children[11], 1)
                }
            },
            // PRIMI PREMOLARI
            pprsdx: {
                full: (full.scene.children[0].children[16] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[10] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[28] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[28], 1)
                },
            },
            pprssx: {
                full: (full.scene.children[0].children[10] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[2] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[39] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[39], 1)
                },
            },
            ppridx: {
                full: (full.scene.children[0].children[6] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[26] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[27] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[27], 1)
                },
            },
            pprisx: {
                full: (full.scene.children[0].children[9] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[37] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[38] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[38], 1)
                },
            },
            // SECONDI PREMOLARI
            sprsdx: {
                full: (full.scene.children[0].children[11] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[1] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[18] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[18], 1)
                },
            },
            sprssx: {
                full: (full.scene.children[0].children[4] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[0] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[29]as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[29], 1)
                },
            },
            spridx: {
                full: (full.scene.children[0].children[5] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[40] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[41] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[41], 1)
                },
            },
            sprisx: {
                full: (full.scene.children[0].children[17] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[42] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[43] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[43], 1)
                },
            },
            // MOLARI
            msdx: {
                full: (full.scene.children[0].children[13] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[11] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[12] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[12], 1)
                },
            },
            mssx: {
                full: (full.scene.children[0].children[7] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[3] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[4] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[4], 1)
                },
            },
            midx: {
                full: (full.scene.children[0].children[12] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[24] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[25] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[25], 1)
                },
            },
            misx: {
                full: (full.scene.children[0].children[15] as THREE.Mesh).geometry,
                fullDiamond: {
                    base: (fullDiamond.scene.children[1].children[35] as THREE.Mesh).geometry,
                    full: (fullDiamond.scene.children[1].children[36] as THREE.Mesh).geometry,
                    position: getOriginGlb(fullDiamond.scene.children[1].children[36], 1)
                },
            },
            // SIGNATURE
            signature: {
                hammered: {
                    icidx: (signatures.scene.children[0].children[1].children[1] as THREE.Mesh).geometry,
                    ilssx: (signatures.scene.children[0].children[1].children[0] as THREE.Mesh).geometry,
                    ilsdx: (signatures.scene.children[0].children[0].children[0] as THREE.Mesh).geometry,
                    ilisx: (signatures.scene.children[0].children[0].children[1] as THREE.Mesh).geometry,
                },
                bubblegum: {
                    base: (bubblegum.scene.children[0] as THREE.Mesh).geometry,
                    position: new THREE.Vector3(getOriginGlb(bubblegum.scene.children[0], 1.2).x, getOriginGlb(bubblegum.scene.children[0], 1.2).y - 0.31, getOriginGlb(bubblegum.scene.children[0], 1.2).z),
                    pave: (bubblegum.scene.children[1] as THREE.Mesh).geometry,
                },
                cross: {
                    full: (signatures.scene.children[2].children[1] as THREE.Mesh).geometry,
                    base: (signatures.scene.children[2].children[0] as THREE.Mesh).geometry,
                    pave: (signatures.scene.children[2].children[2] as THREE.Mesh).geometry,
                    position: getOriginGlb(signatures.scene.children[2], 1.4),
                },
                tribal: {
                    hangs: (signatures.scene.children[1].children[0] as THREE.Mesh).geometry,
                    full: (signatures.scene.children[1].children[2] as THREE.Mesh).geometry,
                    frame: (signatures.scene.children[1].children[1] as THREE.Mesh).geometry,
                    pave: (signatures.scene.children[1].children[3] as THREE.Mesh).geometry,
                    positionHangs: getOriginGlb(signatures.scene.children[1].children[0], 1),
                    positionFull: getOriginGlb(signatures.scene.children[1], 1.5),
                },
                sprinkles: {
                    base: (sprinkles.scene.children[0].children[2] as THREE.Mesh).geometry,
                    frames: [
                        (sprinkles.scene.children[0].children[0].children[6] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[10] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[8] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[4] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[12] as THREE.Mesh).geometry,

                        (sprinkles.scene.children[0].children[0].children[7] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[11] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[9] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[5] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[13] as THREE.Mesh).geometry,

                        (sprinkles.scene.children[0].children[0].children[16] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[2] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[18] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[0] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[14] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[20] as THREE.Mesh).geometry,

                        (sprinkles.scene.children[0].children[0].children[21] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[1] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[15] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[19] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[3] as THREE.Mesh).geometry,
                        (sprinkles.scene.children[0].children[0].children[17] as THREE.Mesh).geometry,
                    ],
                    csdx: {
                        n: (sprinkles.scene.children[0].children[1].children[6] as THREE.Mesh).geometry,
                        ne: (sprinkles.scene.children[0].children[1].children[10] as THREE.Mesh).geometry,
                        se: (sprinkles.scene.children[0].children[1].children[8] as THREE.Mesh).geometry,
                        s: (sprinkles.scene.children[0].children[1].children[4] as THREE.Mesh).geometry,
                        o: (sprinkles.scene.children[0].children[1].children[12] as THREE.Mesh).geometry
                    },
                    cssx: {
                        n:  (sprinkles.scene.children[0].children[1].children[7] as THREE.Mesh).geometry,
                        no: (sprinkles.scene.children[0].children[1].children[11] as THREE.Mesh).geometry,
                        so: (sprinkles.scene.children[0].children[1].children[9] as THREE.Mesh).geometry,
                        s: (sprinkles.scene.children[0].children[1].children[5] as THREE.Mesh).geometry,
                        e: (sprinkles.scene.children[0].children[1].children[13] as THREE.Mesh).geometry
                    },
                    ilsdx: {
                        ne: (sprinkles.scene.children[0].children[1].children[16] as THREE.Mesh).geometry,
                        e: (sprinkles.scene.children[0].children[1].children[2] as THREE.Mesh).geometry,
                        se:  (sprinkles.scene.children[0].children[1].children[18] as THREE.Mesh).geometry,
                        c: (sprinkles.scene.children[0].children[1].children[0] as THREE.Mesh).geometry,
                        so: (sprinkles.scene.children[0].children[1].children[14] as THREE.Mesh).geometry,
                        no: (sprinkles.scene.children[0].children[1].children[20] as THREE.Mesh).geometry
                    },
                    ilssx: {
                        ne: (sprinkles.scene.children[0].children[1].children[21] as THREE.Mesh).geometry,
                        c: (sprinkles.scene.children[0].children[1].children[1] as THREE.Mesh).geometry,
                        se: (sprinkles.scene.children[0].children[1].children[15] as THREE.Mesh).geometry,
                        so: (sprinkles.scene.children[0].children[1].children[19] as THREE.Mesh).geometry,
                        o: (sprinkles.scene.children[0].children[1].children[3] as THREE.Mesh).geometry,
                        no: (sprinkles.scene.children[0].children[1].children[17] as THREE.Mesh).geometry
                    }
                },
                vamp: {
                    csdx: {
                        base: (signatures.scene.children[4].children[0] as THREE.Mesh).geometry,
                        pave: {
                            geometry: (signatures.scene.children[4].children[2] as THREE.Mesh).geometry,
                            position: getOriginGlb(signatures.scene.children[4].children[2], 1)
                        }
                    },
                    cssx: {
                        base: (signatures.scene.children[4].children[1] as THREE.Mesh).geometry,
                        pave: {
                            geometry: (signatures.scene.children[4].children[3] as THREE.Mesh).geometry,
                            position: getOriginGlb(signatures.scene.children[4].children[3], 1)
                        }
                    }
                },
                braces: {
                    structure: (signatures.scene.children[3].children[0] as THREE.Mesh).geometry,
                    stoneBases: (signatures.scene.children[3].children[5] as THREE.Mesh).geometry,
                    stoneBasePosition: getOriginGlb(signatures.scene.children[3].children[5], 1),
                    paveDx: (signatures.scene.children[3].children[3] as THREE.Mesh).geometry,
                    paveSx: (signatures.scene.children[3].children[4] as THREE.Mesh).geometry,
                    stones: (signatures.scene.children[3].children[2] as THREE.Mesh).geometry,
                    outline: (signatures.scene.children[3].children[1] as THREE.Mesh).geometry,
                    position: new THREE.Vector3(-0.46473254221912974, 1.76660383113165, -0.15407294943985753)
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
    const groupRef = useRef<Group>(null);
    const packagingRef = useRef<Group>(null);
    const { gl, scene, camera } = useThree();
    const setLoaded = useTeethStore((state: State) => state.setLoaded);
    const packagingScene = useTeethStore((state: State) => state.packagingScene);

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
        setTimeout(() => {
            setLoaded(true);
        }, 1500);
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if(loader) {
                loader.style.display = 'none';
            }
        }, 3000);
    }, []);

    useFrame((state, delta) => {
        if(groupRef.current && nextStep) {

            invalidate();
            if(groupRef.current.position.x > -3.3) {
                groupRef.current.position.x -= delta * 2;
                camera.position.x -= delta * 2;
            }

        } else if(groupRef.current && packagingRef.current && packagingScene) {
            invalidate();

            if(groupRef.current.position.x < 20) {
                groupRef.current.position.x += (delta + 0.02) * 2.5;
                groupRef.current.position.z -= (delta + 0.05) * 0.75;
                groupRef.current.visible = true;
            } else {
                groupRef.current.visible = false;
            }

            if(packagingRef.current.position.x < 0) {
                packagingRef.current.position.x += (delta + 0.02) * 2.5;
            }

            if(packagingRef.current.position.z < 0) {
                packagingRef.current.position.z += (delta + 0.05) * 0.575;
            }

            if(packagingRef.current.position.x <= -20 || packagingRef.current.position.z <= -9 ) {
                packagingRef.current.visible = false;
            } else {
                packagingRef.current.visible = true;
            }


        } else if(groupRef.current && packagingRef.current && !packagingScene) {

            invalidate();

            groupRef.current.visible = true;

            if(groupRef.current.position.x > 0) {
                groupRef.current.position.x -= (delta + 0.02) * 2.5;
                groupRef.current.position.z += (delta + 0.05) * 0.75;
            }

            if(packagingRef.current.position.x > -20) {
                packagingRef.current.position.x -= (delta + 0.02) * 2.5;
            }

            if(packagingRef.current.position.z > -9) {
                packagingRef.current.position.z -= (delta + 0.05) * 0.575;
            }

            if(packagingRef.current.position.x <= -20 || packagingRef.current.position.z <= -9 ) {
                packagingRef.current.visible = false;
            } else {
                packagingRef.current.visible = true;
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

    function getOrigin(mesh:any) {
        const box = new THREE.Box3().setFromObject(mesh);
        return box.getCenter(new THREE.Vector3());
    }

    function getOriginGlb(mesh:any, factor:number) {
        const box = new THREE.Box3().setFromObject(mesh);
        const vec3 = box.getCenter(new THREE.Vector3());
        return new THREE.Vector3((vec3.x * 100), (vec3.z * 100), vec3.y * -(100 * factor));
    }

    // Instances prova
    // const particles = Array.from({length: 15}, () => ({
    //     factor: MathUtils.randInt(20, 100),
    //     speed: MathUtils.randFloat(0.01, 0.75),
    //     xFactor: MathUtils.randFloatSpread(40),
    //     yFactor: MathUtils.randFloatSpread(10),
    //     zFactor: MathUtils.randFloatSpread(10)
    // }))

    // function Bubbles() {
    //     const diamond = useFBX('/models/MOD_Diamante_LOD.fbx');
    //     const fullDiamond = useGLTF('/models/Full_Pave.glb');
    //     const pos = [];
    //     for(let i = 0; i < 627; i++) {
    //         pos.push([
    //             fullDiamond.scene.children[1].children[45].geometry.attributes.position.array[i],
    //             fullDiamond.scene.children[1].children[45].geometry.attributes.position.array[i+1],
    //             fullDiamond.scene.children[1].children[45].geometry.attributes.position.array[i+2]
    //         ])
    //     }
    //
    //     return (
    //         <Instances limit={particles.length}
    //                    scale={[0.0005, 0.0005, 0.0005]} rotation={[Math.PI/2, 0, 0]}
    //         >
    //             {/*<boxGeometry/>*/}
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
    //                     count={diamond.children[0].geometry.attributes.uv.array.length / 2}
    //                     itemSize={2}
    //                 ></bufferAttribute>
    //             </bufferGeometry>
    //            <FullMaterial color="gold" finish="polished"/>
    //             {particles.map((data, i) => (
    //                 <Instance key={i} position={[
    //                     pos[i][0] * 300,
    //                     pos[i][1] * 300,
    //                     pos[i][2] * 300
    //                 ]} />
    //             ))}
    //         </Instances>
    //     )
    // }

    return (
        <>
            <OrbitControls
                maxDistance={35}
                minDistance={20}
                enablePan={false}
                minPolarAngle={nextStep ? Math.PI / 2.1 : Math.PI / 3 }
                maxPolarAngle={nextStep ? Math.PI - Math.PI / 2.1 : Math.PI - Math.PI / 3}
                minAzimuthAngle={packagingScene ? -Infinity : nextStep ? -Math.PI / 4 : -Math.PI / 2}
                maxAzimuthAngle={packagingScene ? -Infinity : nextStep ? Math.PI / 7 : Math.PI / 2}
                ref={orbitRef}
            />
            {savedTeeth && savedEnvMap &&
                <>
                    <PremiumBox ref={packagingRef}/>
                    <group ref={groupRef} position={[0, 0, 3]}>

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
                </>

            }
        </>
    );
}