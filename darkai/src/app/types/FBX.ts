import * as THREE from 'three'
export default interface FBX {
    // INCISIVI CENTRALI
    icsdx: {
        full: THREE.BufferGeometry,
            fullDiamond: {
            base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
        }
    },
    icssx: {
        full: THREE.BufferGeometry,
            fullDiamond: {
            base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
        }
    },
    icidx: {
        full: THREE.BufferGeometry,
            fullDiamond: {
            base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
        }
    },
    icisx: {
        full: THREE.BufferGeometry,
            fullDiamond: {
            base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
        }
    },
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
    },
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
    },
    ilidx: {
        full: THREE.BufferGeometry,
            fullDiamond: {
            base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
        }
    },
    ilisx: {
        full: THREE.BufferGeometry,
            fullDiamond: {
            base: THREE.BufferGeometry,
                full: THREE.BufferGeometry
        }
    },
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
        stone: THREE.BufferGeometry,
    },
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
        stone: THREE.BufferGeometry,
    },
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
        stone: THREE.BufferGeometry,
            bar: {
            full: THREE.BufferGeometry,
                diamond: {
                    base: THREE.BufferGeometry,
                    full: THREE.BufferGeometry
            }
        }
    },
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
        stone: THREE.BufferGeometry,
            bar: {
            full: THREE.BufferGeometry,
                diamond: {
                base: THREE.BufferGeometry,
                    full: THREE.BufferGeometry
            }
        }
    }
}