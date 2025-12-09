import * as THREE from 'three'
interface Stone {
    geometries: THREE.BufferGeometry[],
    positions: THREE.Vector3[],
    quaternions: THREE.Object3D[]
}
interface Stones {
    marquise: Stone,
    heart: Stone,
    circle: Stone,
    tear: Stone,
    square: Stone,
    baguette: Stone
}
export default interface FBX {
    // INCISIVI CENTRALI
    icsdx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                basePosition: THREE.Vector3,
                full: THREE.BufferGeometry,
                fullPosition: THREE.Vector3,
                diamondPosition: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    icssx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                basePosition: THREE.Vector3,
                full: THREE.BufferGeometry,
                fullPosition: THREE.Vector3,
                diamondPosition: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    icidx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                basePosition: THREE.Vector3,
                full: THREE.BufferGeometry,
                fullPosition: THREE.Vector3,
                diamondPosition: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    icisx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                basePosition: THREE.Vector3,
                full: THREE.BufferGeometry,
                fullPosition: THREE.Vector3,
                diamondPosition: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    // INCISIVI LATERALI
    ilsdx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    ilssx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    ilidx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    ilisx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        }
    } | undefined,
    // CANINI
    csdx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    cssx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
    } | undefined,
    cidx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        bigBar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        }
    } | undefined,
    cisx: {
        full: THREE.BufferGeometry,
        stones: Stones,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        },
        bigBar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry,
                position: THREE.Vector3
            }
        }
    }  | undefined,
    // PRIMI PREMOLARI
    pprsdx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    pprssx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    ppridx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    pprisx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    // SECONDI PREMOLARI
    sprsdx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    sprssx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    spridx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    sprisx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    // MOLARI
    msdx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    mssx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    midx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    misx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            position: THREE.Vector3
        }
    } | undefined,
    // SIGNATURE
    signature: {
        hammered: {
            icidx: THREE.BufferGeometry,
            ilssx: THREE.BufferGeometry,
            ilsdx: THREE.BufferGeometry,
            ilisx: THREE.BufferGeometry,
        },
        bubblegum: {
            base: THREE.BufferGeometry,
            pave: THREE.BufferGeometry,
            position: THREE.Vector3,
        },
        cross: {
            full: THREE.BufferGeometry,
            base: THREE.BufferGeometry,
            pave: THREE.BufferGeometry,
            position: THREE.Vector3,
        },
        tribal: {
            hangs: THREE.BufferGeometry,
            frame: THREE.BufferGeometry,
            full: THREE.BufferGeometry,
            pave: THREE.BufferGeometry,
            positionHangs: THREE.Vector3,
            positionFull: THREE.Vector3
        },
        sprinkles: {
            base: THREE.BufferGeometry,
            frames: THREE.BufferGeometry[],
            // stones names are their position on a compass (+ c = centre)
            csdx: {
                n: THREE.BufferGeometry,
                ne: THREE.BufferGeometry,
                se: THREE.BufferGeometry,
                s: THREE.BufferGeometry,
                o: THREE.BufferGeometry
            },
            cssx: {
                n: THREE.BufferGeometry,
                no: THREE.BufferGeometry,
                so: THREE.BufferGeometry,
                s: THREE.BufferGeometry,
                e: THREE.BufferGeometry
            },
            ilsdx: {
                ne: THREE.BufferGeometry,
                e: THREE.BufferGeometry,
                se: THREE.BufferGeometry,
                c: THREE.BufferGeometry,
                so: THREE.BufferGeometry,
                no: THREE.BufferGeometry
            },
            ilssx: {
                ne: THREE.BufferGeometry,
                c: THREE.BufferGeometry,
                se: THREE.BufferGeometry,
                so: THREE.BufferGeometry,
                o: THREE.BufferGeometry,
                no: THREE.BufferGeometry
            }
        },
        vamp: {
            csdx: {
                base: THREE.BufferGeometry,
                pave: {
                    geometry: THREE.BufferGeometry,
                    position: THREE.Vector3
                },
            },
            cssx: {
                base: THREE.BufferGeometry,
                pave: {
                    geometry: THREE.BufferGeometry,
                    position: THREE.Vector3
                },
            }
        },
        braces: {
            position: THREE.Vector3
            structure: THREE.BufferGeometry,
            pave: THREE.BufferGeometry,
            stones: THREE.BufferGeometry,
            outline: THREE.BufferGeometry,
        },
    } | undefined
}