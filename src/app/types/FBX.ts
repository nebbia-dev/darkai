import * as THREE from 'three'
export default interface FBX {
    // INCISIVI CENTRALI
    icsdx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        }
    } | null,
    icssx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        }
    } | null,
    icidx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        }
    } | null,
    icisx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        }
    } | null,
    // INCISIVI LATERALI
    ilsdx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        },
        bar: {
            full: {
                left: THREE.BufferGeometry,
                right: THREE.BufferGeometry,
            },
            diamond: {
                right:{
                    base: THREE.BufferGeometry,
                    full: THREE.BufferGeometry
                },
                left: {
                    base: THREE.BufferGeometry,
                    full: THREE.BufferGeometry
                }
            }
        }
    } | null,
    ilssx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        },
        bar: {
            full: {
                left: THREE.BufferGeometry,
                    right: THREE.BufferGeometry,
            },
            diamond: {
                left:{
                    base: THREE.BufferGeometry,
                        full: THREE.BufferGeometry
                },
                right: {
                    base: THREE.BufferGeometry,
                        full: THREE.BufferGeometry
                }
            }
        }
    } | null,
    ilidx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        }
    } | null,
    ilisx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        }
    } | null,
    // CANINI
    csdx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        },
        stone: THREE.Object3D,
    } | null,
    cssx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        },
        stone: THREE.Object3D,
    } | null,
    cidx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        },
        stone: THREE.Object3D ,
            bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        }
    } | null,
    cisx: {
        full: THREE.BufferGeometry,
        fullDiamond: {
            base: THREE.BufferGeometry,
            full: THREE.BufferGeometry
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        },
        stone: THREE.Object3D,
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        }
    }  | null
}