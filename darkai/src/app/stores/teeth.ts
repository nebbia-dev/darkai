import { create } from 'zustand';
import {produce} from "immer";

export const useTeethStore = create((set, get) => ({
    envMap: null,
    teethGeometry: null,
    teethMaterial: {
        icsdx: 'base',
        icssx: 'base',
        icidx: 'base',
        icisx: 'base',
        ilsdx: 'base',
        ilssx: 'base',
        ilidx: 'base',
        ilisx: 'base',
        csdx: 'base',
        cssx: 'base',
        cidx: 'base',
        cisx: 'base',
    },
    teethJewelType: {
        icsdx: 'full',
        icssx: 'full',
        icidx: 'full',
        icisx: 'full',
        ilsdx: 'full',
        ilssx: 'full',
        ilidx: 'full',
        ilisx: 'full',
        csdx: 'full',
        cssx: 'full',
        cidx: 'full',
        cisx: 'full',
    },
    teethStones: {
        csdx: null,
        cssx: null,
        cidx: null,
        cisx: null,
    },
    teethVisibility: {
        icsdx: false,
        icssx: false,
        icidx: false,
        icisx: false,
        ilsdx: false,
        ilssx: false,
        ilidx: false,
        ilisx: false,
        csdx: false,
        cssx: false,
        cidx: false,
        cisx: false,
    },
    history: [],
    currentHistory: 0,
    setEnvMap: (em) => {
        set({envMap: em})
    },
    setGeometry: (fbx) => {
        set({teethGeometry: fbx});
    },
    setMaterial: (tooth, color) =>
        set(
            produce((state) => {
                if(state.currentHistory < state.history.length) {
                    state.history.splice(state.currentHistory - 1);
                }
                state.currentHistory++;

                if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                    state.teethMaterial.cisx = color;
                    state.teethMaterial.cidx = color;
                    state.history = [...state.history,
                        [{
                            tooth: 'cisx',
                            type: state.teethJewelType[tooth],
                            material: color,
                            stones: state.teethStones[tooth],
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        },
                        {
                            tooth: 'cidx',
                            type: state.teethJewelType[tooth],
                            material: color,
                            stones: state.teethStones[tooth],
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        }]
                    ];

                } else {
                    state.teethMaterial[tooth] = color;

                    if(!state.teethVisibility[tooth]) {
                        state.teethVisibility[tooth] = true;
                        state.history = [...state.history,  [{
                            tooth: tooth,
                            type: 'full',
                            material: color,
                            stones: state.teethStones[tooth] ?? null,
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        }]];
                    } else {
                        state.history = [...state.history,  [{
                            tooth: tooth,
                            type: state.teethJewelType[tooth],
                            material: color,
                            stones: state.teethStones[tooth] ?? null,
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        }]];
                    }
                }
                console.log(state.history, state.currentHistory)
            }),
        ),
    setType: (tooth, type) =>
        set(
            produce((state) => {
                if(state.currentHistory < state.history.length) {
                    console.log(state.currentHistory, state.history.length)
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                if(state.teethVisibility[tooth] && (
                    (state.teethJewelType[tooth] === 'fullDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'bigBarDiamond' && type === 'bigBar')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'frame')
                    || state.teethJewelType[tooth] === type
                )) {
                        if(type === 'bigBar') {
                            state.teethVisibility.cidx = false;
                            state.teethVisibility.cisx = false;
                            state.teethJewelType.cidx = 'full';
                            state.teethJewelType.cisx = 'full';

                            state.history = [...state.history,
                                [{
                                    tooth: 'cisx',
                                    type: 'full',
                                    material: 'base',
                                    stones: null,
                                    visibility: false,
                                    visibleTeeth: state.teethVisibility
                                }, {
                                    tooth: 'cidx',
                                    type: 'full',
                                    material: 'base',
                                    stones: null,
                                    visibility: false,
                                    visibleTeeth: state.teethVisibility
                                }]
                            ];

                            return;
                        }

                        state.teethVisibility[tooth] = false;
                        state.teethJewelType[tooth] = 'full';

                        state.history = [...state.history,
                            [{
                                tooth: tooth,
                                type: 'full',
                                material: 'base',
                                stones: null,
                                visibility: false,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];

                        return;
                }

                if(type === 'bigBar' || type === 'bigBarDiamond') {

                    state.history = [...state.history,
                        [{
                            tooth: 'cidx',
                            type: type,
                            material: state.teethMaterial.cidx === 'base' ? 'gold' : state.teethMaterial.cidx,
                            stones: null,
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        }, {
                            tooth: 'cisx',
                            type: type,
                            material: state.teethMaterial.cisx === 'base' ? 'gold' : state.teethMaterial.cisx,
                            stones: null,
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        }]
                    ];

                    state.teethJewelType.cidx = type;
                    state.teethJewelType.cisx = type;
                    state.teethStones.cidx = null;
                    state.teethStones.cisx = null;
                    if(!state.teethVisibility.cidx) {
                        state.teethVisibility.cidx = true;
                        state.teethMaterial.cidx = 'gold';
                    }
                    if(!state.teethVisibility.cisx) {
                        state.teethVisibility.cisx = true;
                        state.teethMaterial.cisx = 'gold';
                    }

                } else {
                    if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                        switch(tooth) {
                            case 'cidx':
                                state.teethJewelType.cidx = type;
                                state.teethJewelType.cisx = 'full';
                                state.teethVisibility.cisx = false;
                                state.teethMaterial.cisx = 'base';

                                state.history = [...state.history,
                                    [{
                                        tooth: 'cidx',
                                        type: type,
                                        material: state.teethMaterial.cidx,
                                        stones: null,
                                        visibility: true,
                                        visibleTeeth: state.teethVisibility
                                    }, {
                                        tooth: 'cisx',
                                        type: 'full',
                                        material: 'base',
                                        stones: null,
                                        visibility: false,
                                        visibleTeeth: state.teethVisibility
                                    }]
                                ];
                                break;
                            case 'cisx':
                                state.teethJewelType.cisx = type;
                                state.teethJewelType.cidx = 'full';
                                state.teethVisibility.cidx = false;
                                state.teethMaterial.cidx = 'base';
                                state.history = [...state.history,
                                    [{
                                        tooth: 'cisx',
                                        type: type,
                                        material: state.teethMaterial.cisx,
                                        stones: null,
                                        visibility: true,
                                        visibleTeeth: state.teethVisibility
                                    }, {
                                        tooth: 'cidx',
                                        type: 'full',
                                        material: 'base',
                                        stones: null,
                                        visibility: false,
                                        visibleTeeth: state.teethVisibility
                                    }]
                                ];
                                break;
                        }
                    } else {
                        state.teethJewelType[tooth] = type;

                        if(!state.teethVisibility[tooth]) {
                            state.teethVisibility[tooth] = true;
                            state.teethMaterial[tooth] = 'gold';

                            state.history = [...state.history,
                                [{
                                    tooth: tooth,
                                    type: type,
                                    material: 'gold',
                                    stones: state.teethStones[tooth] ?? null,
                                    visibility: true,
                                    visibleTeeth: state.teethVisibility
                                }]
                            ];

                        } else {
                            if(type !== 'full' && type !== 'fullDiamond') {
                                state.teethStones[tooth] = null;

                                state.history = [...state.history,
                                    [{
                                        tooth: tooth,
                                        material: state.teethMaterial[tooth],
                                        type: type,
                                        stones: null,
                                        visibility: true,
                                        visibleTeeth: state.teethVisibility
                                    }]
                                ];

                            } else {
                                state.history = [...state.history,
                                    [{
                                        tooth: tooth,
                                        type: type,
                                        material: state.teethMaterial[tooth],
                                        stones: state.teethStones[tooth] ?? null,
                                        visibility: true,
                                        visibleTeeth: state.teethVisibility
                                    }]
                                ];
                            }
                        }
                    }
                }
                console.log(state.history, state.currentHistory)
            }),
        ),
    setDiamond: (tooth) =>
        set(
            produce((state) => {
                if(!state.teethVisibility[tooth] || state.teethMaterial[tooth] === 'base') {
                    return;
                }
                if(state.currentHistory < state.history.length) {
                    console.log(state.currentHistory, state.history.length)
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                switch (state.teethJewelType[tooth]) {
                    case 'full':
                        state.teethJewelType[tooth] = 'fullDiamond';
                        state.history = [...state.history,
                            [{
                                tooth: tooth,
                                type: 'fullDiamond',
                                material: state.teethMaterial[tooth],
                                stones: state.teethStones[tooth] ?? null,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                    case 'bar':
                        state.teethJewelType[tooth] = 'barDiamond';
                        state.history = [...state.history,
                            [{
                                tooth: tooth,
                                type: 'barDiamond',
                                material: state.teethMaterial[tooth],
                                stones: state.teethStones[tooth] ?? null,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                    case 'barDiamond':
                        state.teethJewelType[tooth] = 'bar';
                        state.history = [...state.history,
                            [{
                                tooth: tooth,
                                type: 'bar',
                                material: state.teethMaterial[tooth],
                                stones: state.teethStones[tooth] ?? null,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                    case 'fullDiamond':
                        state.teethJewelType[tooth] = 'full';
                        state.history = [...state.history,
                            [{
                                tooth: tooth,
                                type: 'full',
                                material: state.teethMaterial[tooth],
                                stones: state.teethStones[tooth] ?? null,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                    case 'bigBar':
                        state.teethJewelType.cidx = 'bigBarDiamond';
                        state.teethJewelType.cisx = 'bigBarDiamond';
                        state.history = [...state.history,
                            [{
                                tooth: 'cisx',
                                type: 'bigBarDiamond',
                                material: state.teethMaterial.cisx,
                                stones: state.teethStones.cisx,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }, {
                                tooth: 'cidx',
                                type: 'bigBarDiamond',
                                material: state.teethMaterial.cidx,
                                stones: state.teethStones.cidx,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                    case 'bigBarDiamond':
                        state.teethJewelType.cidx = 'bigBar';
                        state.teethJewelType.cisx = 'bigBar';
                        state.history = [...state.history,
                            [{
                                tooth: 'cisx',
                                type: 'bigBar',
                                material: state.teethMaterial.cisx,
                                stones: state.teethStones.cisx,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }, {
                                tooth: 'cidx',
                                type: 'bigBar',
                                material: state.teethMaterial.cidx,
                                stones: state.teethStones.cidx,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                    case 'frame':
                        state.teethJewelType[tooth] = 'frameDiamond';
                        state.history = [...state.history,
                            [{
                                tooth: tooth,
                                type: 'frameDiamond',
                                material: state.teethMaterial[tooth],
                                stones: state.teethStones[tooth] ?? null,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                    case 'frameDiamond':
                        state.teethJewelType[tooth] = 'frame';
                        state.history = [...state.history,
                            [{
                                tooth: tooth,
                                type: 'frame',
                                material: state.teethMaterial[tooth],
                                stones: state.teethStones[tooth] ?? null,
                                visibility: true,
                                visibleTeeth: state.teethVisibility
                            }]
                        ];
                        break;
                }
            })
        ),
    setStone: (tooth, stone) =>
        set(
            produce((state) => {
                if(state.teethStones[tooth] === stone) {
                    state.teethStones[tooth] = null;
                    state.history = [...state.history,
                        [{
                            tooth: tooth,
                            material: state.teethMaterial[tooth],
                            type: state.teethJewelType[tooth],
                            stones: null,
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        }]
                    ];
                } else {
                    state.teethStones[tooth] = stone;
                    state.history = [...state.history,
                        [{
                            tooth: tooth,
                            material: state.teethMaterial[tooth],
                            type: state.teethJewelType[tooth],
                            stones: stone,
                            visibility: true,
                            visibleTeeth: state.teethVisibility
                        }]
                    ];
                }
            }),
        ),
    setVisibility: (tooth) =>
        set(
            produce((state) => {
                state.teethVisibility[tooth] = !state.teethVisibility[tooth];
            }),
        ),
    setDefaultConfig: (config, color) => {
        get().reset();
        switch (config) {
            case 'full':
            case 'fullDiamond':
                get().setTooth('icsdx', config, color);
                get().setTooth('icidx', config, color);
                get().setTooth('ilsdx', config, color);
                get().setTooth('ilidx', config, color);
                get().setTooth('csdx', config, color);
                get().setTooth('cidx', config, color);
                get().setTooth('icssx', config, color);
                get().setTooth('icisx', config, color);
                get().setTooth('ilssx', config, color);
                get().setTooth('ilisx', config, color);
                get().setTooth('cssx', config, color);
                get().setTooth('cisx', config, color);
                break;
            case 'bar':
            case 'barDiamond':
                get().setTooth('ilsdx', config, color);
                get().setTooth('ilssx', config, color);
                if (config === 'bar') {
                    get().setTooth('cidx', 'bigBar', color);
                    get().setTooth('cisx', 'bigBar', color);
                } else {
                    get().setTooth('cidx', 'bigBarDiamond', color);
                    get().setTooth('cisx', 'bigBarDiamond', color);
                }
                break;
            case 'frame':
            case 'frameDiamond':
                get().setTooth('csdx', 'full', color);
                get().setTooth('cidx', 'full', color);
                get().setTooth('cssx', 'full', color);
                get().setTooth('cisx', 'full', color);
                break;
            case 'canines':
            case 'stones':
                get().setTooth('csdx', 'full', color);
                get().setTooth('cidx', 'full', color);
                get().setTooth('cssx', 'full', color);
                get().setTooth('cisx', 'full', color);
                if (config === 'stones') {
                    get().setStone('csdx', 'sapphire');
                    get().setStone('cidx', 'sapphire');
                    get().setStone('cssx', 'sapphire');
                    get().setStone('cisx', 'sapphire')
                }
                break;
            case 'caninesDiamond':
            case 'stonesDiamond':
                get().setTooth('csdx', 'fullDiamond', color);
                get().setTooth('cidx', 'fullDiamond', color);
                get().setTooth('cssx', 'fullDiamond', color);
                get().setTooth('cisx', 'fullDiamond', color);
                if (config === 'stones') {
                    get().setStone('csdx', 'sapphire');
                    get().setStone('cidx', 'sapphire');
                    get().setStone('cssx', 'sapphire');
                    get().setStone('cisx', 'sapphire')
                }
                break;
        }
    },
    setTooth: (tooth, type, color) =>
        set(
            produce((state) => {
                state.teethVisibility[tooth] = true;
                state.teethMaterial[tooth] = color;
                state.teethJewelType[tooth] = type;
            })
        ),
    undo: () =>
        set(
            produce((state) => {
                state.currentHistory = state.currentHistory - 1;
                for(const tooth of state.history[state.currentHistory - 1]) {
                    if(tooth.type) {
                        state.teethJewelType[tooth.tooth] = tooth.type;
                    }
                    if(tooth.material) {
                        state.teethMaterial[tooth.tooth] = tooth.material;
                    }
                    if(tooth.stones) {
                        state.teethStones[tooth.tooth] = tooth.stones;
                    }
                    for(const [key, value] of Object.entries(tooth.visibleTeeth)) {
                        state.teethVisibility[key] = value
                    }
                }
            })
        ),
    redo: () =>
        set(
            produce((state) => {
                state.currentHistory = state.currentHistory + 1;
                for(const tooth of state.history[state.currentHistory - 1]) {
                    if(tooth.type) {
                        state.teethJewelType[tooth.tooth] = tooth.type;
                    }
                    if(tooth.material) {
                        state.teethMaterial[tooth.tooth] = tooth.material;
                    }
                    if(tooth.stones) {
                        state.teethStones[tooth.tooth] = tooth.stones;
                    }
                    for(const [key, value] of Object.entries(tooth.visibleTeeth)) {
                        state.teethVisibility[key] = value
                    }
                }
            })
        ),
    reset: () => {
        set({
            teethMaterial: {
                icsdx: 'base',
                icssx: 'base',
                icidx: 'base',
                icisx: 'base',
                ilsdx: 'base',
                ilssx: 'base',
                ilidx: 'base',
                ilisx: 'base',
                csdx: 'base',
                cssx: 'base',
                cidx: 'base',
                cisx: 'base',
            },
            teethJewelType: {
                icsdx: 'full',
                icssx: 'full',
                icidx: 'full',
                icisx: 'full',
                ilsdx: 'full',
                ilssx: 'full',
                ilidx: 'full',
                ilisx: 'full',
                csdx: 'full',
                cssx: 'full',
                cidx: 'full',
                cisx: 'full',
            },
            teethStones: {
                csdx: null,
                cssx: null,
                cidx: null,
                cisx: null,
            },
            teethVisibility: {
                icsdx: false,
                icssx: false,
                icidx: false,
                icisx: false,
                ilsdx: false,
                ilssx: false,
                ilidx: false,
                ilisx: false,
                csdx: false,
                cssx: false,
                cidx: false,
                cisx: false,
            },
        })
    }
    // setWholeTooth: (tooth, color, type) =>
    //     set(
    //     produce((state) => {
    //         if(type !== 'full' && type !== 'fullDiamond') {
    //             state.teethStones[tooth] = null;
    //         }
    //
    //         if(type === 'bigBar' || type === 'bigBarDiamond') {
    //             state.teethJewelType.cidx = type;
    //             state.teethJewelType.cisx = type;
    //             state.teethMaterial.cisx = color;
    //             state.teethMaterial.cidx = color;
    //             if(!state.teethVisibility.cidx) {
    //                 state.teethVisibility.cidx = true;
    //                 state.teethMaterial.cidx = 'gold';
    //             }
    //             if(!state.teethVisibility.cisx) {
    //                 state.teethVisibility.cisx = true;
    //                 state.teethMaterial.cisx = 'gold';
    //             }
    //         } else {
    //             if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
    //                 switch(tooth) {
    //                     case 'cidx':
    //                         state.teethMaterial.cidx = color;
    //                         state.teethJewelType.cidx = type;
    //                         state.teethJewelType.cisx = 'full';
    //                         state.teethVisibility.cisx = false;
    //                         state.teethMaterial.cisx = 'base';
    //                         break;
    //                     case 'cisx':
    //                         state.teethMaterial.cisx = color;
    //                         state.teethJewelType.cisx = type;
    //                         state.teethJewelType.cidx = 'full';
    //                         state.teethVisibility.cidx = false;
    //                         state.teethMaterial.cidx = 'base';
    //                         break;
    //                 }
    //             } else {
    //                 if(state.teethJewelType[tooth] !== type) {
    //                     state.teethJewelType[tooth] = type;
    //                 }
    //                 if(state.teethMaterial[tooth] !== color) {
    //                     state.teethMaterial[tooth] = color;
    //                 }
    //                 if(!state.teethVisibility[tooth]) {
    //                     state.teethVisibility[tooth] = true;
    //                     state.teethMaterial[tooth] = 'gold';
    //                 }
    //             }
    //         }
    //     }),
    // ),
}))