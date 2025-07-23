import { create } from 'zustand';
import {produce} from "immer";
import State from "@/app/types/State";
import {createClient} from "@/utils/supabase/client";

export const useTeethStore = create<State>((set, get) => ({

    // state and method to take a screenshot of the Canvas when needed
    // (the useThree hook needed to perform this task can be used only inside the Canvas)
    isScreenshotNeeded: undefined,
    setIsScreenshotNeeded: (value) => set({isScreenshotNeeded: value}),

    // state and method to reset OrbitControls when needed
    // (the useThree hook needed to perform this task can be used only inside the Canvas)
    resetControls: undefined,
    setResetControls: (value) => set({resetControls: value}),

    // state and method to change between the DEFAULT and the CUSTOM tab
    activeTab: 0,
    setActiveTab: (value) =>
        set(
            produce((state) => {
                state.activeTab = value;
                if(value === 0) {
                    state.currentTooth = undefined;
                }
            })
        ),

    // state and method to set the envMap when everything is loaded the first time
    envMap: undefined,
    setEnvMap: (em) => {
        set({envMap: em})
    },

    // state and method to set all the jewels geometries when everything is loaded the first time
    teethGeometry: {
        icsdx: undefined,
        icssx: undefined,
        icidx: undefined,
        icisx: undefined,
        ilsdx: undefined,
        ilssx: undefined,
        ilidx: undefined,
        ilisx: undefined,
        csdx: undefined,
        cssx: undefined,
        cidx: undefined,
        cisx: undefined,
    },
    setGeometry: (fbx) => {
        set({teethGeometry: fbx});
    },

    // state to save the visibility status of each tooth
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

    // state and method to set the material (gold, rose or white) of each jewel
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
    setMaterial: (tooth, color) =>
        set(
            produce((state) => {

                // update current history step
                if(state.currentHistory < state.history.length) {
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                // if the user is changing a bigBar material, both cisx and cidx materials are changed,
                // otherwise only the parameter tooth material is changed
                if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                    state.teethMaterial.cisx = color;
                    state.teethMaterial.cidx = color;

                } else {
                    state.teethMaterial[tooth] = color;

                    // if the user clicks on the material and the tooth isn't visible, the tooth becomes visible
                    // with a default full jewel type on it; if this happens on a lower tooth when  the lower canines
                    // already have a bigBar on them, the bigBar is deactivated and the lower canines reset
                    if(!state.teethVisibility[tooth]) {
                        state.teethVisibility[tooth] = true;
                        if((state.teethJewelType.cidx === 'bigBar' || state.teethJewelType.cidx === 'bigBarDiamond')
                            && (tooth === 'icidx' || tooth === 'icisx' || tooth === 'ilidx' || tooth === 'ilisx')
                        ) {
                            state.teethJewelType.cidx = 'full';
                            state.teethJewelType.cisx = 'full';
                            state.teethVisibility.cidx = false;
                            state.teethVisibility.cisx = false;
                            state.teethMaterial.cidx = 'base';
                            state.teethMaterial.cisx = 'base';
                        }
                    }
                }
                // the tooth for which a material is chosen becomes automatically the active tooth
                state.currentTooth = tooth;

                // calc total and set history step
                get().calcTotal(state);
            }),
        ),

    // state and methods to set the jewel type of each tooth
    // adding the diamonds changes the jewel type, not the material, since the gold base is needed anyway
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
    setType: (tooth, type) =>
        set(
            produce((state) => {

                // update current history step
                if(state.currentHistory < state.history.length) {
                    console.log(state.currentHistory, state.history.length)
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                // EXCEPTION: if the diamond version of a jewel type is active, clicking on the base jewel type removes that
                // config from the tooth, just like it were the diamondless version. If it's a bigBar, the configurations
                // of both teeth are removed. The function then RETURNS
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
                            state.teethStones.cidx = undefined;
                            state.teethStones.cisx = undefined;

                            // calc total and set history step
                            get().calcTotal(state);

                            return;
                        }

                        state.teethVisibility[tooth] = false;
                        state.teethJewelType[tooth] = 'full';
                        state.teethMaterial[tooth] = 'base';
                        state.teethStones[tooth] = undefined;

                        // calc total and set history step
                        get().calcTotal(state);

                        return;
                }

                // EXCEPTION: if the current jewel type has diamonds and the user chooses another jewel type,
                // the new jewel type will have diamonds too. The function then RETURNS
                if((state.teethJewelType[tooth] === 'fullDiamond' && type === 'frame')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'full')
                ) {
                    state.teethJewelType[tooth] = type + 'Diamond';
                    state.teethStones[tooth] = undefined;

                    // calc total
                    get().calcTotal(state);
                    return;
                }

                // EXCEPTION: if the current jewel type has diamonds and the user chooses another jewel type,
                // the new jewel type will have diamonds too (bigBar version). The function then RETURNS
                if((state.teethJewelType[tooth] === 'frameDiamond' && type === 'bigBar')
                || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bigBar')
                ) {
                    state.teethJewelType.cidx = type + 'Diamond';
                    state.teethJewelType.cisx = type + 'Diamond';
                    state.teethStones.cisx = undefined;
                    state.teethStones.cidx = undefined;
                    // calc total
                    get().calcTotal(state);
                    return;
                }

                // FIRST, it manages the bigBar/bigBarDiamond special case
                if(type === 'bigBar' || type === 'bigBarDiamond') {

                    state.currentTooth = tooth;
                    state.teethJewelType.cidx = type;
                    state.teethJewelType.cisx = type;
                    state.teethVisibility.cidx = true;
                    state.teethVisibility.cisx = true;
                    state.teethStones.cidx = undefined;
                    state.teethStones.cisx = undefined;
                    state.teethMaterial[tooth] = 'gold';

                    state.teethJewelType.icidx = 'full';
                    state.teethJewelType.icisx = 'full';
                    state.teethJewelType.ilidx = 'full';
                    state.teethJewelType.ilisx = 'full';
                    state.teethMaterial.icidx = 'base';
                    state.teethMaterial.icisx = 'base';
                    state.teethMaterial.ilidx = 'base';
                    state.teethMaterial.ilisx = 'base';
                    state.teethVisibility.icidx = false;
                    state.teethVisibility.icisx = false;
                    state.teethVisibility.ilidx = false;
                    state.teethVisibility.ilisx = false;

                    if(tooth === 'cidx') {
                        state.teethMaterial.cisx = state.teethMaterial.cidx;
                    }
                    if(tooth === 'cisx') {
                        state.teethMaterial.cidx = state.teethMaterial.cisx;
                    }
                // SECOND, it manages all the other cases
                } else {
                    // if the PREVIOUS jewel type of a tooth is a bigBar/bigBarDiamond...
                    if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                        switch(tooth) {
                            case 'cidx':

                                // ...first, it switches to the new jewel type after the diamond check
                                if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                    state.teethJewelType.cidx = type + 'Diamond';
                                } else {
                                    state.teethJewelType.cidx = type;
                                }

                                // ...second, it deactivates the other bigBar canine
                                state.teethJewelType.cisx = 'full';
                                state.teethVisibility.cisx = false;
                                state.teethMaterial.cisx = 'base';
                                break;
                            // the process is the same for both lower canines
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
                        // the new active tooth is set
                        state.currentTooth = tooth;

                    //  BUT, if the PREVIOUS jewel type of a tooth is NOT a bigBar/bigBarDiamond...
                    } else {
                        // STANDARD config setup
                        state.teethVisibility[tooth] = true;
                        state.teethJewelType[tooth] = type;
                        state.teethMaterial[tooth] = 'gold';

                        // if the tooth is not visible, it becomes the active tooth
                        if(!state.teethVisibility[tooth]) {
                            state.currentTooth = tooth;
                        } else {
                            // if the tooth is visible and the jewel type is not full/fullDiamond,
                            // eventual stones are removed
                            if(type !== 'full' && type !== 'fullDiamond') {
                                state.teethStones[tooth] = undefined;
                            }
                        }

                        // if the jewel type change happens on a lower tooth when the lower canines
                        // already have a bigBar on them, the bigBar is deactivated and the lower canines reset
                        if((state.teethJewelType.cidx === 'bigBar' || state.teethJewelType.cidx === 'bigBarDiamond')
                            && (tooth === 'icidx' || tooth === 'icisx' || tooth === 'ilidx' || tooth === 'ilisx')) {

                            state.teethJewelType.cidx = 'full';
                            state.teethJewelType.cisx = 'full';
                            state.teethVisibility.cidx = false;
                            state.teethVisibility.cisx = false;
                            state.teethMaterial.cidx = 'base';
                            state.teethMaterial.cisx = 'base';
                        }
                    }
                }

                // calc total and set history step
                get().calcTotal(state);
            }),
        ),
    setDiamond: (tooth) =>
        set(
            produce((state) => {

                // if the tooth is not visible or no material has been chosen, no diamond is set
                // (reinforce the disabled diamond toggler button)
                if(!state.teethVisibility[tooth] || state.teethMaterial[tooth] === 'base') {
                    return;
                }

                // update current history step
                if(state.currentHistory < state.history.length) {
                    console.log(state.currentHistory, state.history.length)
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                // diamond is then applied to the corresponding jewel type
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

                // calc total and set history step
                get().calcTotal(state);
            })
        ),

    // state and methods to set the gems
    teethStones: {
        csdx: undefined,
        cssx: undefined,
        cidx: undefined,
        cisx: undefined,
    },
    setStone: (tooth, stone) =>
        set(
            produce((state) => {
                // if the tooth is not visible or no material has been chosen, no diamond is set
                // (reinforce the disabled stone selector button)
                if(!state.teethVisibility[tooth] || state.teethMaterial[tooth] === 'base') {
                    return;
                }

                // update current history step
                if(state.currentHistory < state.history.length) {
                    console.log(state.currentHistory, state.history.length)
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                // stone toggler
                if(state.teethStones[tooth] === stone) {
                    state.teethStones[tooth] = undefined;
                } else {
                    state.teethStones[tooth] = stone;
                }

                // calc total and set history step
                get().calcTotal(state);
            }),
        ),

    // state and method to set the active tooth
    currentTooth: undefined,
    setActiveTooth: (tooth) =>
        set(
            produce((state) => {
                // if a tooth is selected when the default tab is active, the active tab becomes the custom one
                if(state.activeTab === 0) {
                    state.activeTab = 1;
                }

                // active tooth toggler
                if(state.currentTooth === tooth) {
                    state.currentTooth = undefined;
                } else {
                    state.currentTooth = tooth;
                }

            })
        ),

    // state and methods to set the active default configuration
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
                break;
            case 'caninesDiamond':
            case 'stonesDiamond':
                get().setTooth('csdx', 'fullDiamond', color);
                get().setTooth('cidx', 'fullDiamond', color);
                get().setTooth('cssx', 'fullDiamond', color);
                get().setTooth('cisx', 'fullDiamond', color);
                break;
        }
        set(
            produce((state) => {
            if(state.currentHistory < state.history.length) {
                state.history = state.history.splice(0, state.currentHistory);
            }
            state.currentHistory++;

            if(config === 'stonesDiamond' || config === 'stones') {
                state.teethStones.csdx = 'sapphire';
                state.teethStones.cidx = 'sapphire';
                state.teethStones.cssx = 'sapphire';
                state.teethStones.cisx = 'sapphire';
            }

            get().calcTotal(state);
            console.log(state.activeDefault, state.currentHistory, 'history: ', state.history)
        }))},
    activeDefault: undefined,
    setActiveDefault: (active, color) => {
        switch (active) {
            case undefined:
                set({activeDefault: undefined});
                break;
            default:
                set({activeDefault: active + color})
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

    // method to remove the configuration from a tooth
    resetTooth: (tooth) =>
        set(
            produce((state) => {
                if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                    state.teethJewelType.cidx = 'full';
                    state.teethJewelType.cisx = 'full';
                    state.teethMaterial.cidx = 'base';
                    state.teethMaterial.cisx = 'base';
                    state.teethVisibility.cidx = false;
                    state.teethVisibility.cisx = false;
                } else {
                    state.teethVisibility[tooth] = false;
                    state.teethMaterial[tooth] = 'base';
                    state.teethJewelType[tooth] = 'full';
                    if(state.teethStones[tooth]) {
                        state.teethStones[tooth] = undefined;
                    }
                }
                if(state.currentTooth === tooth) {
                    state.currentTooth = undefined;
                }

                get().calcTotal(state);
            })
        ),

    // state with the list of all the available jewel types for each tooth
    // method to copy the configuration from a tooth to another one
    teethTypeOptions: {
        full: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        fullDiamond: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        bar: ['ilsdx', 'ilssx'],
        barDiamond: ['ilsdx', 'ilssx'],
        frame: ['csdx', 'cssx', 'cidx', 'cisx'],
        frameDiamond: ['csdx', 'cssx', 'cidx', 'cisx'],
        stones: ['csdx', 'cssx', 'cidx', 'cisx']
    },
    setCopy: (copied, original) =>
        set(
            produce((state) => {
                if(state.currentHistory < state.history.length) {
                    console.log(state.currentHistory, state.history.length)
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                state.teethJewelType[copied] = state.teethJewelType[original];
                state.teethMaterial[copied] = state.teethMaterial[original];
                state.teethVisibility[copied] = state.teethVisibility[original];
                if(state.teethStones[original]) {
                    state.teethStones[copied] = state.teethStones[original];

                }

                get().calcTotal(state);
            })
        ),

    // state and method to manage the initial loading screens
    loaded: false,
    setLoaded: (bool) => set(() => ({loaded: bool})),

    // state and method to switch between desktop and mobile UIs
    ui: false,
    setUI: (bool) => set({ui: bool}),

    // states and method to fetch and save the prices from the db
    prices: undefined,
    pricesAdds: undefined,
    fetchPrices: async() => {
        const supabase = await createClient();
        let { data: base, error: errorBase } = await supabase
            .from('Prices_base')
            .select('*');
        let { data: addons, error: errorAddons } = await supabase
            .from('Prices_addons')
            .select('*');
        set({prices: base, pricesAdds: addons});
    },

    // states and methods to navigate among the various step of the user experience
    // the add of a new element in the history array is included in the calcTotal method below
    history: [],
    currentHistory: 0,
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
                get().calcTotal(state);
                console.log(state.currentHistory, state.history)
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
                get().calcTotal(state);
                console.log(state.currentHistory, state.history)
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
                csdx: undefined,
                cssx: undefined,
                cidx: undefined,
                cisx: undefined,
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
            currentTooth: undefined,
            activeDefault: undefined
        })
    },

    // states and method to calculate the total price of the current configuration
    // the method also saves a new History element
    teethPrices: {
        icsdx: 0,
        icssx: 0,
        icidx: 0,
        icisx: 0,
        ilsdx: 0,
        ilssx: 0,
        ilidx: 0,
        ilisx: 0,
        csdx: 0,
        cssx: 0,
        cidx: 0,
        cisx: 0,
    },
    total: 0,
    calcTotal: (state) => {
        for (const [key, value] of Object.entries(state.teethMaterial)) {
            if(value !== 'base' && state.prices) {
                const toothPriceList = state.prices.filter(el => el.tooth + 'sx' === key || el.tooth + 'dx' === key)[0];
                switch(state.teethJewelType[key]) {
                    case 'full':
                    case 'frame':
                    case 'bar':
                        state.teethPrices[key] = toothPriceList[state.teethJewelType[key] + value[0].toUpperCase() + value.slice(1)];
                        break;
                    case 'fullDiamond':
                    case 'frameDiamond':
                    case 'barDiamond':
                        const baseType = state.teethJewelType[key].slice();
                        state.teethPrices[key] = toothPriceList[baseType.split('D').shift() + value[0].toUpperCase() + value.slice(1)] + toothPriceList[state.teethJewelType[key]];
                        break;
                    case 'bigBar':
                        state.teethPrices.cidx = toothPriceList[state.teethJewelType[key] + value[0].toUpperCase() + value.slice(1)] / 2;
                        state.teethPrices.cisx = toothPriceList[state.teethJewelType[key] + value[0].toUpperCase() + value.slice(1)] / 2;
                        break;
                    case 'bigBarDiamond':
                        const barType = state.teethJewelType[key].slice();
                        state.teethPrices.cidx = toothPriceList[barType.split('D').shift() + value[0].toUpperCase() + value.slice(1)] / 2 + toothPriceList[state.teethJewelType[key]] / 2;
                        state.teethPrices.cisx = toothPriceList[barType.split('D').shift() + value[0].toUpperCase() + value.slice(1)] / 2 + toothPriceList[state.teethJewelType[key]] / 2;
                        break;
                }
            } else {
                state.teethPrices[key] = 0
            }
        }

        for (const [key, value] of Object.entries(state.teethStones)) {
            if(value && state.pricesAdds) {
                state.teethPrices[key] = state.teethPrices[key] + state.pricesAdds.filter(el => el.stone === value)[0].tearShape;
            }
        }

        state.total = 0;
        for (const [key, value] of Object.entries(state.teethPrices)) {
            state.total = state.total + value;
        }

        state.history = [...state.history,
            [{
                type: state.teethJewelType,
                material: state.teethMaterial,
                stones: state.teethStones,
                visible: state.teethVisibility,
                prices: state.teethPrices
            }]
        ];
    }
}))

// initial data fetch
useTeethStore.getState().fetchPrices();