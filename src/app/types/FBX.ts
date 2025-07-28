import * as THREE from 'three'
export default interface FBX {
    // INCISIVI CENTRALI
    icsdx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
    } | undefined,
    icssx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
    } | undefined,
    icidx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
    } | undefined,
    icisx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
    } | undefined,
    // INCISIVI LATERALI
    ilsdx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        },
    } | undefined,
    ilssx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
        },
        frame: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        },
    } | undefined,
    ilidx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
    } | undefined,
    ilisx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
        }
    } | undefined,
    // CANINI
    csdx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
    } | undefined,
    cssx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
    } | undefined,
    cidx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        }
    } | undefined,
    cisx: {
        full: THREE.BufferGeometry,
        stones: {
            marquise: THREE.Object3D,
            heart: THREE.Object3D,
            circle: THREE.Object3D,
            tear: THREE.Object3D,
            square: THREE.Object3D
        },
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
        bar: {
            full: THREE.BufferGeometry,
            diamond: {
                base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
            }
        }
    }  | undefined,
}