import { create } from 'zustand';
import {produce} from "immer";
import State from "@/app/types/State";

export const useTeethStore = create<State>((set, get) => ({
    envMap: null,
    teethGeometry: {
        icsdx: null,
        icssx: null,
        icidx: null,
        icisx: null,
        ilsdx: null,
        ilssx: null,
        ilidx: null,
        ilisx: null,
        csdx: null,
        cssx: null,
        cidx: null,
        cisx: null,
    },
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
    activeDefault: null,
    currentTooth: null,
    ui: false,
    teethTypeOptions: {
        full: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        fullDiamond: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        bar: ['ilsdx', 'ilssx'],
        barDiamond: ['ilsdx', 'ilssx'],
        frame: ['csdx', 'cssx', 'cidx', 'cisx'],
        frameDiamond: ['csdx', 'cssx', 'cidx', 'cisx'],
        stones: ['csdx', 'cssx', 'cidx', 'cisx']
    },
    activeTab: 0,
    loaded: false,
    setActiveTab: (value) =>
        set(
            produce((state) => {
                state.activeTab = value;
                if(value === 0) {
                    state.currentTooth = null;
                }
            })
        ),
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

                } else {
                    state.teethMaterial[tooth] = color;

                    if(!state.teethVisibility[tooth]) {
                        state.teethVisibility[tooth] = true;
                    }
                }
                state.currentTooth = tooth;

                state.history = [...state.history,
                    [{
                        type: state.teethJewelType,
                        material: state.teethMaterial,
                        stones: state.teethStones,
                        visible: state.teethVisibility
                    }]
                ];

                if(!state.ui){
                    setTimeout(() => {
                        const box = document.getElementById(tooth);
                        if(box) {
                            box.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                        }
                    }, 300)
                }

                console.log(state.history, state.currentHistory)
            }),
        ),
    // SETTARE IL TIPO ATTIVA/DISATTIVA LA VISIBILITA', MA NON CAMBIA L'ACTIVE TOOTH
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
                            state.currentTooth = tooth;
                            state.teethVisibility.cidx = false;
                            state.teethVisibility.cisx = false;
                            state.teethJewelType.cidx = 'full';
                            state.teethJewelType.cisx = 'full';
                            state.teethMaterial.cidx = 'base';
                            state.teethMaterial.cisx = 'base';

                            state.history = [...state.history,
                                [{
                                    type: state.teethJewelType,
                                    material: state.teethMaterial,
                                    stones: state.teethStones,
                                    visible: state.teethVisibility
                                }]
                            ];

                            return;
                        }

                        state.teethVisibility[tooth] = false;
                        state.teethJewelType[tooth] = 'full';
                        state.teethMaterial[tooth] = 'base';
                        state.teethStones[tooth] = null;

                        state.history = [...state.history,
                            [{
                                type: state.teethJewelType,
                                material: state.teethMaterial,
                                stones: state.teethStones,
                                visible: state.teethVisibility
                            }]
                        ];

                        return;
                }

                if((state.teethJewelType[tooth] === 'fullDiamond' && type === 'frame')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'full')
                ) {
                    state.teethJewelType[tooth] = type + 'Diamond';
                    state.history = [...state.history,
                        [{
                            type: state.teethJewelType,
                            material: state.teethMaterial,
                            stones: state.teethStones,
                            visible: state.teethVisibility
                        }]
                    ];
                    return;
                }

                if((state.teethJewelType[tooth] === 'frameDiamond' && type === 'bigBar')
                || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bigBar')
                ) {
                    state.teethJewelType.cidx = type + 'Diamond';
                    state.teethJewelType.cisx = type + 'Diamond';
                    state.history = [...state.history,
                        [{
                            type: state.teethJewelType,
                            material: state.teethMaterial,
                            stones: state.teethStones,
                            visible: state.teethVisibility
                        }]
                    ];
                    return;
                }

                if(type === 'bigBar' || type === 'bigBarDiamond') {

                    state.currentTooth = tooth;
                    state.teethJewelType.cidx = type;
                    state.teethJewelType.cisx = type;
                    state.teethVisibility.cidx = true;
                    state.teethVisibility.cisx = true;
                    state.teethStones.cidx = null;
                    state.teethStones.cisx = null;
                    if(tooth === 'cidx') {
                        state.teethMaterial.cisx = state.teethMaterial.cidx;
                    }
                    if(tooth === 'cisx') {
                        state.teethMaterial.cidx = state.teethMaterial.cisx;
                    }

                } else {
                    if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                        switch(tooth) {
                            case 'cidx':
                                if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                    state.teethJewelType.cidx = type + 'Diamond';
                                } else {
                                    state.teethJewelType.cidx = type;
                                }
                                state.teethJewelType.cisx = 'full';
                                state.teethVisibility.cisx = false;
                                state.teethMaterial.cisx = 'base';
                                break;
                            case 'cisx':
                                if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                    state.teethJewelType.cisx = type + 'Diamond';
                                } else {
                                    state.teethJewelType.cisx = type;
                                }
                                state.teethJewelType.cidx = 'full';
                                state.teethVisibility.cidx = false;
                                state.teethMaterial.cidx = 'base';
                                break;
                        }
                        state.currentTooth = tooth;
                    } else {
                        state.teethVisibility[tooth] = true;
                        state.teethJewelType[tooth] = type;

                        if(!state.teethVisibility[tooth]) {
                            state.currentTooth = tooth;
                            state.teethVisibility[tooth] = true;
                            state.teethMaterial[tooth] = 'gold';

                        } else {
                            if(type !== 'full' && type !== 'fullDiamond') {
                                state.teethStones[tooth] = null;
                            }
                        }
                    }
                }

                if(!state.ui){
                    setTimeout(() => {
                        const box = document.getElementById(tooth);
                        if(box) {
                            box.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                        }
                    }, 300)
                }

                state.history = [...state.history,
                    [{
                        type: state.teethJewelType,
                        material: state.teethMaterial,
                        stones: state.teethStones,
                        visible: state.teethVisibility
                    }]
                ];
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
                        break;
                    case 'bar':
                        state.teethJewelType[tooth] = 'barDiamond';
                        break;
                    case 'barDiamond':
                        state.teethJewelType[tooth] = 'bar';
                        break;
                    case 'fullDiamond':
                        state.teethJewelType[tooth] = 'full';
                        break;
                    case 'bigBar':
                        state.teethJewelType.cidx = 'bigBarDiamond';
                        state.teethJewelType.cisx = 'bigBarDiamond';
                        break;
                    case 'bigBarDiamond':
                        state.teethJewelType.cidx = 'bigBar';
                        state.teethJewelType.cisx = 'bigBar';
                        break;
                    case 'frame':
                        state.teethJewelType[tooth] = 'frameDiamond';
                        break;
                    case 'frameDiamond':
                        state.teethJewelType[tooth] = 'frame';
                        break;
                }

                state.history = [...state.history,
                    [{
                        type: state.teethJewelType,
                        material: state.teethMaterial,
                        stones: state.teethStones,
                        visible: state.teethVisibility
                    }]
                ];
                console.log(state.history, state.currentHistory)
            })
        ),
    setStone: (tooth, stone) =>
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

                if(state.teethStones[tooth] === stone) {
                    state.teethStones[tooth] = null;
                } else {
                    state.teethStones[tooth] = stone;
                }

                state.history = [...state.history,
                    [{
                        type: state.teethJewelType,
                        material: state.teethMaterial,
                        stones: state.teethStones,
                        visible: state.teethVisibility
                    }]
                ];
                console.log(state.history, state.currentHistory)
            }),
        ),
    setActiveTooth: (tooth) =>
        set(
            produce((state) => {
                if(state.activeTab === 0) {
                    state.activeTab = 1;
                }

                if(state.currentTooth === tooth) {
                    state.currentTooth = null;
                } else {
                    state.currentTooth = tooth;
                }

                if(!state.ui){
                    setTimeout(() => {
                        const box = document.getElementById(tooth);
                        if(box) {
                            box.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                        }
                    }, 300)
                }

            })
        ),
    setDefaultConfig: (config, color) => {
        get().reset();

        if(config.search(/(Diamond)/) >= 0) {
            const configName = config.replace('Diamond', '');
            get().setActiveDefault(configName, 'diamond');
            console.log('quaso')
        } else {
            get().setActiveDefault(config, color);
            console.log('halo')
        }

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
                get().setTooth('csdx', config, color);
                get().setTooth('cidx', config, color);
                get().setTooth('cssx', config, color);
                get().setTooth('cisx', config, color);
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
                if (config === 'stonesDiamond') {
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
    setActiveDefault: (active, color) => {
        switch (active) {
            case null:
                set({activeDefault: null});
                break;
            default:
                set({activeDefault: active + color})
        }
    },
    setCopy: (copied, original) =>
        set(
            produce((state) => {
                state.teethJewelType[copied] = state.teethJewelType[original];
                state.teethMaterial[copied] = state.teethMaterial[original];
                state.teethVisibility[copied] = state.teethVisibility[original];
                if(state.teethStones[original]) {
                    state.teethStones[copied] = state.teethStones[original];

                }
            })
        ),
    setLoaded: (bool) => set(() => ({loaded: bool})),
    setUI: (bool) => set({ui: bool}),
    undo: () =>
        set(
            produce((state) => {
                state.currentHistory = state.currentHistory - 1;
                for(const tooth of state.history[state.currentHistory - 1]) {
                    for(const [key, value] of Object.entries(tooth.type)) {
                        state.teethJewelType[key] = value;
                    }
                    for(const [key, value] of Object.entries(tooth.material)) {
                        state.teethMaterial[key] = value;
                    }
                    for(const [key, value] of Object.entries(tooth.stones)) {
                        state.teethStones[key] = value;
                    }
                    for(const [key, value] of Object.entries(tooth.visible)) {
                        state.teethVisibility[key] = value;
                    }
                }
            })
        ),
    redo: () =>
        set(
            produce((state) => {
                state.currentHistory = state.currentHistory + 1;
                for(const tooth of state.history[state.currentHistory - 1]) {
                    for(const [key, value] of Object.entries(tooth.type)) {
                        state.teethJewelType[key] = value;
                    }
                    for(const [key, value] of Object.entries(tooth.material)) {
                        state.teethMaterial[key] = value;
                    }
                    for(const [key, value] of Object.entries(tooth.stones)) {
                        state.teethStones[key] = value;
                    }
                    for(const [key, value] of Object.entries(tooth.visible)) {
                        state.teethVisibility[key] = value;
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
            currentTooth: null,
            activeDefault: null
        })
    }
}))