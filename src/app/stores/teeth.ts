import { create } from 'zustand';
import {produce} from "immer";
import {AddonsPrices, BasePrices, State, Stone} from "@/app/types/State";
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

                // if the user is changing the upper/lower central incisor bar material, both teeth materials are changed,
                // otherwise only the parameter tooth material is changed
                } else if(state.teethJewelType[tooth] === 'bar' || state.teethJewelType[tooth] === 'barDiamond') {
                    switch(tooth) {
                        case 'icsdx':
                        case 'icssx':
                            state.teethMaterial.icsdx = color;
                            state.teethMaterial.icssx = color;
                            break;
                        case 'icidx':
                        case 'icisx':
                            state.teethMaterial.icidx = color;
                            state.teethMaterial.icisx = color;
                            break;
                        default:
                            state.teethMaterial[tooth] = color;
                            break;
                    }
                } else {
                    state.teethMaterial[tooth] = color;

                    // if the user clicks on the material and the tooth isn't visible, the tooth becomes visible
                    // with a default full jewel type on it; if this happens on a lower tooth when the lower canines
                    // already have a bigBar on them, the bigBar is deactivated and the lower canines reset
                    if(!state.teethVisibility[tooth]) {
                        state.teethVisibility[tooth] = true;

                        // ⚠️ TEMP DEACTIVATION ⚠️

                        // if((state.teethJewelType.cidx === 'bigBar' || state.teethJewelType.cidx === 'bigBarDiamond')
                        //     && (tooth === 'icidx' || tooth === 'icisx' || tooth === 'ilidx' || tooth === 'ilisx')
                        // ) {
                        //     state.teethJewelType.cidx = 'full';
                        //     state.teethJewelType.cisx = 'full';
                        //     state.teethVisibility.cidx = false;
                        //     state.teethVisibility.cisx = false;
                        //     state.teethMaterial.cidx = 'base';
                        //     state.teethMaterial.cisx = 'base';
                        // }
                    }
                }
                // the tooth for which a material is chosen becomes automatically the active tooth
                // NOT NEEDED ANYMORE?
                // state.currentTooth = tooth;

                // calc total and set history step
                get().calcTotal(state);
                get().setHistory(state);
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
                // config from the tooth, just like it were the diamondless version. The function then RETURNS
                if(state.teethVisibility[tooth] && (
                    (state.teethJewelType[tooth] === 'fullDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'bigBarDiamond' && type === 'bigBar')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'frame')
                    || state.teethJewelType[tooth] === type
                )) {
                    // If it's a bigBar, the configurations of both teeth are removed
                        if(type === 'bigBar') {
                            state.currentTooth = tooth;
                            state.teethVisibility.cidx = false;
                            state.teethVisibility.cisx = false;
                            state.teethJewelType.cidx = 'full';
                            state.teethJewelType.cisx = 'full';
                            state.teethMaterial.cidx = 'base';
                            state.teethMaterial.cisx = 'base';
                            state.teethStones.cidx = {shape: undefined, color: undefined};
                            state.teethStones.cisx = {shape: undefined, color: undefined};

                            // calc total and set history step
                            get().calcTotal(state);
                            get().setHistory(state);

                            return;
                        }

                    // If it's a upper/lower central incisor bar, the configurations of both teeth are removed, while if it's
                    // a regular bar, only the affected tooth configuration is removed
                        if(type === 'bar') {
                            switch(tooth) {
                                case 'icsdx':
                                case 'icssx':
                                    state.currentTooth = tooth;
                                    state.teethVisibility.icsdx = false;
                                    state.teethVisibility.icssx = false;
                                    state.teethJewelType.icsdx = 'full';
                                    state.teethJewelType.icssx = 'full';
                                    state.teethMaterial.icsdx = 'base';
                                    state.teethMaterial.icssx = 'base';
                                    state.teethStones.icsdx = {shape: undefined, color: undefined};
                                    state.teethStones.icssx = {shape: undefined, color: undefined};
                                    break;
                                case 'icidx':
                                case 'icisx':
                                    state.currentTooth = tooth;
                                    state.teethVisibility.icidx = false;
                                    state.teethVisibility.icisx = false;
                                    state.teethJewelType.icidx = 'full';
                                    state.teethJewelType.icisx = 'full';
                                    state.teethMaterial.icidx = 'base';
                                    state.teethMaterial.icisx = 'base';
                                    state.teethStones.icidx = {shape: undefined, color: undefined};
                                    state.teethStones.icisx = {shape: undefined, color: undefined};
                                    break;
                                default:
                                    state.teethVisibility[tooth] = false;
                                    state.teethJewelType[tooth] = 'full';
                                    state.teethMaterial[tooth] = 'base';
                                    state.teethStones[tooth] = {shape: undefined, color: undefined};
                            }

                            // calc total and set history step
                            get().calcTotal(state);
                            get().setHistory(state);

                            return;
                        }

                        state.teethVisibility[tooth] = false;
                        state.teethJewelType[tooth] = 'full';
                        state.teethMaterial[tooth] = 'base';
                        state.teethStones[tooth] = {shape: undefined, color: undefined};

                        // calc total and set history step
                        get().calcTotal(state);
                        get().setHistory(state);

                        return;
                }

                // EXCEPTION: if the current jewel type has diamonds and the user chooses another jewel type,
                // the new jewel type will have diamonds too. The function then RETURNS
                if((state.teethJewelType[tooth] === 'fullDiamond' && type === 'frame')
                    || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'frame')
                ) {
                    if((state.teethJewelType[tooth] === 'barDiamond' && type === 'full')
                        || (state.teethJewelType[tooth] === 'barDiamond' && type === 'frame')){
                        switch (tooth) {
                            case 'icsdx':
                                state.teethJewelType.icssx = 'full';
                                state.teethVisibility.icssx = false;
                                state.teethJewelType.icsdx = type + 'Diamond';
                                state.teethVisibility.icsdx = true;
                                break;
                            case 'icssx':
                                state.teethJewelType.icsdx = 'full';
                                state.teethVisibility.icsdx = false;
                                state.teethJewelType.icssx = type + 'Diamond';
                                state.teethVisibility.icssx = true;
                                break;
                            case 'icidx':
                                state.teethJewelType.icisx = 'full';
                                state.teethVisibility.icisx = false;
                                state.teethJewelType.icidx = type + 'Diamond';
                                state.teethVisibility.icidx = true;
                                break;
                            case 'icisx':
                                state.teethJewelType.icidx = 'full';
                                state.teethVisibility.icidx = false;
                                state.teethJewelType.icisx = type + 'Diamond';
                                state.teethVisibility.icisx = true;
                                break;
                        }
                    } else if(((state.teethJewelType[tooth] === 'frameDiamond' && type === 'bar')
                        || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bar')
                    && (tooth === 'icsdx' || tooth === 'icssx' || tooth === 'icidx' || tooth === 'icisx'))) {
                        switch (tooth) {
                            case 'icsdx':
                            case 'icssx':
                                state.teethJewelType.icsdx = type + 'Diamond';
                                state.teethJewelType.icssx = type + 'Diamond';
                                state.teethVisibility.icsdx = true;
                                state.teethVisibility.icssx = true;
                                state.teethStones.icsdx = {shape: undefined, color: undefined}
                                state.teethStones.icssx = {shape: undefined, color: undefined}
                                break;
                            case 'icidx':
                            case 'icisx':
                                state.teethJewelType.icidx = type + 'Diamond';
                                state.teethJewelType.icisx = type + 'Diamond';
                                state.teethVisibility.icidx = true;
                                state.teethVisibility.icisx = true;
                                state.teethStones.icidx = {shape: undefined, color: undefined}
                                state.teethStones.icisx = {shape: undefined, color: undefined}
                        }
                        if(state.teethMaterial[tooth] === 'base') state.teethMaterial[tooth]  = 'gold';
                        if (tooth === 'icsdx') {
                            state.teethMaterial.icssx = state.teethMaterial.icsdx;
                        }
                        if (tooth === 'icssx') {
                            state.teethMaterial.icsdx = state.teethMaterial.icssx;
                        }
                        if (tooth === 'icidx') {
                            state.teethMaterial.icisx = state.teethMaterial.icidx;
                        }
                        if (tooth === 'icisx') {
                            state.teethMaterial.icidx = state.teethMaterial.icisx;
                        }
                    } else {
                        state.teethJewelType[tooth] = type + 'Diamond';
                        state.teethStones[tooth] = {shape: undefined, color: undefined};
                    }

                    // calc total
                    get().calcTotal(state);
                    get().setHistory(state);
                    return;
                }

                // EXCEPTION: if the current jewel type has diamonds and the user chooses another jewel type,
                // the new jewel type will have diamonds too (bigBar version). The function then RETURNS
                if((state.teethJewelType[tooth] === 'frameDiamond' && type === 'bigBar')
                || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bigBar')
                || (state.teethJewelType[tooth] === 'barDiamond' && type === 'bigBar')
                ) {
                    state.teethVisibility.cidx = true;
                    state.teethVisibility.cisx = true;
                    state.teethMaterial.cidx = state.teethMaterial[tooth];
                    state.teethMaterial.cisx = state.teethMaterial[tooth];
                    state.teethJewelType.cidx = type + 'Diamond';
                    state.teethJewelType.cisx = type + 'Diamond';
                    state.teethPaves.cidx = state.teethPaves[tooth];
                    state.teethPaves.cisx = state.teethPaves[tooth];
                    state.teethStones.cisx = {shape: undefined, color: undefined};
                    state.teethStones.cidx = {shape: undefined, color: undefined};
                    // calc total
                    get().calcTotal(state);
                    get().setHistory(state);
                    return;
                }

                // FIRST, it manages the bigBar/bigBarDiamond special case
                if(type === 'bigBar' || type === 'bigBarDiamond') {

                    state.currentTooth = tooth;
                    state.teethJewelType.cidx = type;
                    state.teethJewelType.cisx = type;
                    state.teethVisibility.cidx = true;
                    state.teethVisibility.cisx = true;
                    state.teethStones.cidx = {shape: undefined, color: undefined};
                    state.teethStones.cisx = {shape: undefined, color: undefined};
                    state.teethEnamel.cidx = undefined;
                    state.teethEnamel.cisx = undefined;
                    if(state.teethMaterial[tooth] === 'base') state.teethMaterial[tooth]  = 'gold';

                    // ⚠️ TEMP DEACTIVATION ⚠️

                    // state.teethJewelType.icidx = 'full';
                    // state.teethJewelType.icisx = 'full';
                    // state.teethJewelType.ilidx = 'full';
                    // state.teethJewelType.ilisx = 'full';
                    // state.teethMaterial.icidx = 'base';
                    // state.teethMaterial.icisx = 'base';
                    // state.teethMaterial.ilidx = 'base';
                    // state.teethMaterial.ilisx = 'base';
                    // state.teethVisibility.icidx = false;
                    // state.teethVisibility.icisx = false;
                    // state.teethVisibility.ilidx = false;
                    // state.teethVisibility.ilisx = false;
                    // state.teethStones.icidx = {shape: undefined, color: undefined};
                    // state.teethStones.icisx = {shape: undefined, color: undefined};
                    // state.teethStones.ilidx = {shape: undefined, color: undefined};
                    // state.teethStones.ilisx = {shape: undefined, color: undefined};

                    if (tooth === 'cidx') {
                        state.teethMaterial.cisx = state.teethMaterial.cidx;
                    }
                    if (tooth === 'cisx') {
                        state.teethMaterial.cidx = state.teethMaterial.cisx;
                    }
                // SECOND, it manages the upper/lower central incisor bar/barDiamond special case
                } else if((type === 'bar' || type === 'barDiamond')
                    && (tooth === 'icsdx' || tooth === 'icssx' || tooth === 'icidx' || tooth === 'icisx')){
                    console.log('HEREEEEE')
                        state.currentTooth = tooth;
                        switch(tooth) {
                            case 'icsdx':
                            case 'icssx':
                                state.teethJewelType.icsdx = type;
                                state.teethJewelType.icssx = type;
                                state.teethVisibility.icsdx = true;
                                state.teethVisibility.icssx = true;
                                state.teethStones.icsdx = {shape: undefined, color: undefined};
                                state.teethStones.icssx = {shape: undefined, color: undefined};
                                state.teethEnamel.icsdx = undefined;
                                state.teethEnamel.icssx = undefined;
                                break;
                            case 'icidx':
                            case 'icisx':
                                state.teethJewelType.icidx = type;
                                state.teethJewelType.icisx = type;
                                state.teethVisibility.icidx = true;
                                state.teethVisibility.icisx = true;
                                state.teethStones.icidx = {shape: undefined, color: undefined};
                                state.teethStones.icisx = {shape: undefined, color: undefined};
                                state.teethEnamel.icidx = undefined;
                                state.teethEnamel.icisx = undefined;
                                break;
                        }
                        if(state.teethMaterial[tooth] === 'base') state.teethMaterial[tooth]  = 'gold';
                        if (tooth === 'icsdx') {
                            state.teethMaterial.icssx = state.teethMaterial.icsdx;
                        }
                        if (tooth === 'icssx') {
                            state.teethMaterial.icsdx = state.teethMaterial.icssx;
                        }
                        if (tooth === 'icidx') {
                            state.teethMaterial.icisx = state.teethMaterial.icidx;
                        }
                        if (tooth === 'icisx') {
                            state.teethMaterial.icidx = state.teethMaterial.icisx;
                        }
                // THIRD, it manages all the other cases
                } else {
                    // if the PREVIOUS jewel type of a tooth (nec. lower canine) is a bigBar/bigBarDiamond...
                    if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                        switch(tooth) {
                            case 'cidx':

                                // ...first, it switches to the new jewel type after the diamond check
                                if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                    state.teethJewelType.cidx = type + 'Diamond';
                                } else {
                                    state.teethJewelType.cidx = type;
                                }

                                if(type === 'bezel') {
                                    state.teethStones.cidx = {shape: 'circle', color: 'sapphire'};
                                }

                                if(type === 'enamel') {
                                    state.teethEnamel.cidx = 'blue';
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

                                if(type === 'bezel') {
                                    state.teethStones.cisx = {shape: 'circle', color: 'sapphire'};
                                }

                                if(type === 'enamel') {
                                    state.teethEnamel.cisx = 'blue';
                                }

                                state.teethJewelType.cidx = 'full';
                                state.teethVisibility.cidx = false;
                                state.teethMaterial.cidx = 'base';
                                break;
                        }
                        // the new active tooth is set
                        state.currentTooth = tooth;
                    // ... but, if the PREVIOUS jewel type of a upper/lower central incisor is a bar/barDiamond...
                    } else if((state.teethJewelType[tooth] === 'bar' || state.teethJewelType[tooth] === 'barDiamond')
                        && (tooth === 'icsdx' || tooth === 'icssx' || tooth === 'icidx' || tooth === 'icisx')) {
                        console.log('HALO')
                        switch(tooth) {
                        case 'icsdx':

                            // ...first, it switches to the new jewel type after the diamond check
                            if(state.teethJewelType[tooth] === 'barDiamond') {
                                state.teethJewelType.icsdx = type + 'Diamond';
                            } else {
                                state.teethJewelType.icsdx = type;
                            }

                            if(type === 'bezel') {
                                state.teethStones.icsdx = {shape: 'circle', color: 'sapphire'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icsdx = 'blue';
                            }

                            // ...second, it deactivates the other bar incisor
                            state.teethJewelType.icssx = 'full';
                            state.teethVisibility.icssx = false;
                            state.teethMaterial.icssx = 'base';
                            break;

                            // the process is the same for all 4 incisor
                        case 'icssx':
                            if(state.teethJewelType[tooth] === 'barDiamond') {
                                state.teethJewelType.icssx = type + 'Diamond';
                            } else {
                                state.teethJewelType.icssx = type;
                            }

                            if(type === 'bezel') {
                                state.teethStones.icssx = {shape: 'circle', color: 'sapphire'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icssx = 'blue';
                            }

                            state.teethJewelType.icsdx = 'full';
                            state.teethVisibility.icsdx = false;
                            state.teethMaterial.icsdx = 'base';
                            break;

                        case 'icidx':
                            if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                state.teethJewelType.icidx = type + 'Diamond';
                            } else {
                                state.teethJewelType.icidx = type;
                            }

                            if(type === 'bezel') {
                                state.teethStones.icidx = {shape: 'circle', color: 'sapphire'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icidx = 'blue';
                            }

                            state.teethJewelType.icisx = 'full';
                            state.teethVisibility.icisx = false;
                            state.teethMaterial.icisx = 'base';
                            break;

                        case 'icisx':
                            if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                state.teethJewelType.icisx = type + 'Diamond';
                            } else {
                                state.teethJewelType.icisx = type;
                            }

                            if(type === 'bezel') {
                                state.teethStones.icisx = {shape: 'circle', color: 'sapphire'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icisx = 'blue';
                            }

                            state.teethJewelType.icidx = 'full';
                            state.teethVisibility.icidx = false;
                            state.teethMaterial.icidx = 'base';
                            break;
                        }
                        // the new active tooth is set
                        state.currentTooth = tooth;
                    //  BUT, if the PREVIOUS jewel type of a tooth is NEITHER a bigBar/bigBarDiamond NOR a bar/barDiamond...
                    } else {
                        console.log('NOT HALO')
                        // STANDARD config setup
                        state.teethVisibility[tooth] = true;
                        state.teethJewelType[tooth] = type;
                        state.teethMaterial[tooth] = state.teethMaterial[tooth] === 'base' ? 'gold' : state.teethMaterial[tooth];

                        if(type === 'bezel') {
                            state.teethStones[tooth] = {shape: 'circle', color: 'sapphire'};
                        } else {
                            state.teethStones[tooth] = {shape: undefined, color: undefined};
                        }

                        if(type === 'enamel') {
                            state.teethEnamel[tooth] = 'blue';
                        } else {
                            state.teethEnamel[tooth] = undefined;
                        }

                        console.log(state.teethStones[tooth]);
                        // if the tooth is not visible, it becomes the active tooth
                        if(!state.teethVisibility[tooth]) {
                            state.currentTooth = tooth;
                        } else {
                            // if the tooth is visible and the jewel type is not full/fullDiamond,
                            // eventual stones are removed
                            // if(type !== 'full' && type !== 'fullDiamond') {
                            //     state.teethStones[tooth] = {shape: undefined, color: undefined};
                            // }
                        }

                        // if the jewel type change happens on a lower tooth when the lower canines
                        // already have a bigBar on them, the bigBar is deactivated and the lower canines reset

                        // ⚠️ TEMP DEACTIVATION ⚠️

                        // if((state.teethJewelType.cidx === 'bigBar' || state.teethJewelType.cidx === 'bigBarDiamond')
                        //     && (tooth === 'icidx' || tooth === 'icisx' || tooth === 'ilidx' || tooth === 'ilisx')) {
                        //
                        //     state.teethJewelType.cidx = 'full';
                        //     state.teethJewelType.cisx = 'full';
                        //     state.teethVisibility.cidx = false;
                        //     state.teethVisibility.cisx = false;
                        //     state.teethMaterial.cidx = 'base';
                        //     state.teethMaterial.cisx = 'base';
                        // }
                    }
                }

                // calc total and set history step
                get().calcTotal(state);
                get().setHistory(state);
            }),
        ),
    setPave: (tooth, pave: string) =>
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

                // diamond is then applied to the corresponding jewel type if a diamondless version is selected
                // and reset to the diamondless version if the same pave is selected
                switch (state.teethJewelType[tooth]) {
                    case 'full':
                        state.teethJewelType[tooth] = 'fullDiamond';
                        state.teethPaves[tooth] = {shape: 'round', color:'wDiamond'};
                        break;
                    case 'bar':
                        state.teethJewelType[tooth] = 'barDiamond';
                        state.teethPaves[tooth] = {shape: 'round', color:'wDiamond'};
                        if (tooth === 'icsdx') {
                            state.teethJewelType.icssx = 'barDiamond';
                            state.teethPaves.icssx = {shape: 'round', color:'wDiamond'};
                        }
                        if (tooth === 'icssx') {
                            state.teethJewelType.icsdx = 'barDiamond';
                            state.teethPaves.icsdx = {shape: 'round', color:'wDiamond'};
                        }
                        if (tooth === 'icidx') {
                            state.teethJewelType.icisx = 'barDiamond';
                            state.teethPaves.icisx = {shape: 'round', color:'wDiamond'};
                        }
                        if (tooth === 'icisx') {
                            state.teethJewelType.icidx = 'barDiamond';
                            state.teethPaves.icidx = {shape: 'round', color:'wDiamond'};
                        }
                        break;
                    case 'barDiamond':
                        if(state.teethPaves[tooth].shape === pave) {
                            state.teethJewelType[tooth] = 'bar';
                            state.teethPaves[tooth] = {shape: undefined, color: undefined};
                            if (tooth === 'icsdx') {
                                state.teethJewelType.icssx = 'bar';
                                state.teethJewelType.icssx = {shape: undefined, color: undefined};
                            }
                            if (tooth === 'icssx') {
                                state.teethJewelType.icsdx = 'bar';
                                state.teethJewelType.icsdx = {shape: undefined, color: undefined};
                            }
                            if (tooth === 'icidx') {
                                state.teethJewelType.icisx = 'bar';
                                state.teethJewelType.icisx = {shape: undefined, color: undefined};
                            }
                            if (tooth === 'icisx') {
                                state.teethJewelType.icidx = 'bar';
                                state.teethJewelType.icidx = {shape: undefined, color: undefined};
                            }
                        }
                        break;
                    case 'fullDiamond':
                        if(state.teethPaves[tooth].shape === pave) {
                            state.teethJewelType[tooth] = 'full';
                            state.teethPaves[tooth] = {shape: undefined, color: undefined};
                        }
                        break;
                    case 'bigBar':
                        state.teethJewelType.cidx = 'bigBarDiamond';
                        state.teethPaves.cidx = {shape: 'round', color:'wDiamond'};
                        state.teethJewelType.cisx = 'bigBarDiamond';
                        state.teethPaves.cisx = {shape: 'round', color:'wDiamond'};
                        break;
                    case 'bigBarDiamond':
                        if(state.teethPaves.cidx.shape === pave || state.teethPaves.cisx.shape === pave) {
                            state.teethJewelType.cidx = 'bigBar';
                            state.teethPaves.cidx = {shape: undefined, color: undefined};
                            state.teethJewelType.cisx = 'bigBar';
                            state.teethPaves.cisx = {shape: undefined, color: undefined};
                        }
                        break;
                    case 'frame':
                        state.teethJewelType[tooth] = 'frameDiamond';
                        state.teethPaves[tooth] = {shape: 'round', color:'wDiamond'};
                        break;
                    case 'frameDiamond':
                        if(state.teethPaves[tooth].shape === pave) {
                            state.teethJewelType[tooth] = 'frame';
                            state.teethPaves[tooth] = {shape: undefined, color: undefined};
                        }
                        break;
                }

                // if diamond design is already in place and a different pave is selected,
                // the new pave shape is then applied
                if((tooth === 'cidx' || tooth === 'cisx') && state.teethJewelType[tooth] === 'bigBarDiamond') {
                    state.teethPaves.cidx.shape = pave;
                    state.teethPaves.cisx.shape = pave;
                } else if ((tooth === 'icsdx' || tooth === 'icssx') && state.teethJewelType[tooth] === 'barDiamond') {
                    state.teethPaves.icsdx.shape = pave;
                    state.teethPaves.icssx.shape = pave;
                } else if ((tooth === 'icidx' || tooth === 'icisx') && state.teethJewelType[tooth] === 'barDiamond') {
                    state.teethPaves.icidx.shape = pave;
                    state.teethPaves.icisx.shape = pave;
                } else {
                    state.teethPaves[tooth].shape = pave;
                }

                // calc total and set history step
                get().calcTotal(state);
                get().setHistory(state);
            })
        ),

    // state and methods to set the gems
    teethStones: {
        icsdx: {
            shape: undefined,
            color: undefined
        },
        icssx: {
            shape: undefined,
            color: undefined
        },
        icidx: {
            shape: undefined,
            color: undefined
        },
        icisx: {
            shape: undefined,
            color: undefined
        },
        ilsdx: {
            shape: undefined,
            color: undefined
        },
        ilssx: {
            shape: undefined,
            color: undefined
        },
        ilidx: {
            shape: undefined,
            color: undefined
        },
        ilisx: {
            shape: undefined,
            color: undefined
        },
        csdx: {
            shape: undefined,
            color: undefined
        },
        cssx: {
            shape: undefined,
            color: undefined
        },
        cidx: {
            shape: undefined,
            color: undefined
        },
        cisx: {
            shape: undefined,
            color: undefined
        },
    },
    setStone: (tooth, shape, color) =>
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

                if(shape === 'prev') {
                    if(state.teethStones[tooth].shape === undefined) {
                        state.teethStones[tooth].shape = 'marquise';
                    }
                    state.teethStones[tooth].color = color;
                } else if(color === 'prev') {
                    if(state.teethStones[tooth].color === undefined) {
                        state.teethStones[tooth].color = 'sapphire';
                    }
                    state.teethStones[tooth].shape = shape;
                } else {
                    return;
                }

                // calc total and set history step
                get().calcTotal(state);
                get().setHistory(state);
            }),
        ),

    // state to keep track of enamel colors
    teethEnamel: {
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
    setEnamel: (tooth:string, color:string) =>
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

                // color toggler
                state.teethEnamel[tooth] = color;

                // calc total and set history step
                get().calcTotal(state);
                get().setHistory(state);
            }),
        ),

    // state to keep track of pave stones
    teethPaves: {
        icsdx: {shape: undefined, color: undefined},
        icssx: {shape: undefined, color: undefined},
        icidx: {shape: undefined, color: undefined},
        icisx: {shape: undefined, color: undefined},
        ilsdx: {shape: undefined, color: undefined},
        ilssx: {shape: undefined, color: undefined},
        ilidx: {shape: undefined, color: undefined},
        ilisx: {shape: undefined, color: undefined},
        csdx: {shape: undefined, color: undefined},
        cssx: {shape: undefined, color: undefined},
        cidx: {shape: undefined, color: undefined},
        cisx: {shape: undefined, color: undefined},
    },

    // state and method to set the active side button;
    activeButton: undefined,
    setActiveButton: (button:string|undefined) =>
        set(
            produce((state) => {
                // if a tooth is selected when the default tab is active, the active tab becomes the custom one
                if(button === state.activeButton) {
                    state.activeButton = undefined;
                } else {
                    state.activeButton = button;
                }

            })
        ),
    activeSubButton: undefined,
    setActiveSubButton: (button:string|undefined) =>
        set(
            produce((state) => {
                // if a tooth is selected when the default tab is active, the active tab becomes the custom one
                if(button === state.activeButton) {
                    state.activeSubButton = undefined;
                } else {
                    state.activeSubButton = button;
                }

            })
        ),
    // state and method to set the active tooth;
    // lastActivatedTooth and its setter/unsetter, to check whether a new tooth has been selected
    currentTooth: undefined,
    lastActivatedTooth: undefined,
    setActiveTooth: (tooth) =>
        set(
            produce((state) => {
                // if a tooth is selected when the default tab is active, the active tab becomes the custom one
                if(state.activeTab === 0) {
                    state.activeTab = 1;
                }

                // active tooth toggler
                if(state.currentTooth === tooth) {
                    state.activeButton = undefined;
                    state.activeSubButton = undefined;
                    state.currentTooth = undefined;
                    state.lastActivatedTooth = undefined;
                } else {
                    state.activeButton = '2';
                    state.activeSubButton = undefined;
                    state.currentTooth = tooth;
                    state.lastActivatedTooth = tooth;
                }

            })
        ),
    unsetLastActivatedTooth: () => set({lastActivatedTooth: undefined}),
    // state and methods to set the active default configuration
    setDefaultConfig: (config, color) => {
        get().reset();

        if(config.search(/(Diamond)/) >= 0) {
            const configName = config.replace('Diamond', '');
            get().setActiveDefault(configName, color + 'Diamond');
        } else {
            get().setActiveDefault(config, color);
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
                get().setTooth('csdx', config, color);
                get().setTooth('cssx', config, color);
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
                state.teethStones.icsdx = {shape: undefined, color: undefined};
                state.teethStones.icssx = {shape: undefined, color: undefined};
                state.teethStones.ilsdx = {shape: undefined, color: undefined};
                state.teethStones.ilssx = {shape: undefined, color: undefined};
                state.teethStones.icidx = {shape: undefined, color: undefined};
                state.teethStones.icisx = {shape: undefined, color: undefined};
                state.teethStones.ilidx = {shape: undefined, color: undefined};
                state.teethStones.ilisx = {shape: undefined, color: undefined};
                state.teethStones.csdx = {shape: 'marquise', color: 'sapphire'};
                state.teethStones.cidx = {shape: 'marquise', color: 'sapphire'};
                state.teethStones.cssx = {shape: 'marquise', color: 'sapphire'};
                state.teethStones.cisx = {shape: 'marquise', color: 'sapphire'};
            }

            get().calcTotal(state);
            get().setHistory(state);
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
                        state.teethStones[tooth] = {shape: undefined, color: undefined};
                    }
                }
                if(state.currentTooth === tooth) {
                    state.currentTooth = undefined;
                }

                get().calcTotal(state);
                get().setHistory(state);
            })
        ),

    // state with the list of all the available jewel types for each tooth
    // method to copy the configuration from a tooth to another one
    teethTypeOptions: {
        full: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        fullDiamond: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        bar: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        barDiamond: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        frame: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        frameDiamond: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx'],
        stones: ['icsdx', 'icssx', 'icidx', 'icisx', 'ilsdx', 'ilssx', 'ilidx', 'ilisx', 'csdx', 'cssx', 'cidx', 'cisx']
    },

    // state and method to manage the initial loading screens
    loaded: false,
    setLoaded: (bool) => set(() => ({loaded: bool})),

    // state and method to get back and forth the recap view
    recap: false,
    setRecap: (bool) => set({recap: bool}),

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
        set({prices: base as BasePrices[], pricesAdds: addons as AddonsPrices[]});
    },

    // states and methods to set the configuration steps history and
    // navigate among the various step of the user experience
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
                    for(const [key, value] of Object.entries(tooth.stones) as [string, Stone][]) {
                        state.teethStones[key].shape = value.shape;
                        state.teethStones[key].color = value.color;
                    }
                    for(const [key, value] of Object.entries(tooth.visible)) {
                        state.teethVisibility[key] = value;
                    }
                }
                get().calcTotal(state);
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
                    for(const [key, value] of Object.entries(tooth.stones) as [string, Stone][]) {
                        state.teethStones[key].shape = value.shape;
                        state.teethStones[key].color = value.color;
                    }
                    for(const [key, value] of Object.entries(tooth.visible)) {
                        state.teethVisibility[key] = value;
                    }
                }
                get().calcTotal(state);
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
                icsdx: {
                    shape: undefined,
                    color: undefined
                },
                icssx: {
                    shape: undefined,
                    color: undefined
                },
                icidx: {
                    shape: undefined,
                    color: undefined
                },
                icisx: {
                    shape: undefined,
                    color: undefined
                },
                ilsdx: {
                    shape: undefined,
                    color: undefined
                },
                ilssx: {
                    shape: undefined,
                    color: undefined
                },
                ilidx: {
                    shape: undefined,
                    color: undefined
                },
                ilisx: {
                    shape: undefined,
                    color: undefined
                },
                csdx: {
                    shape: undefined,
                    color: undefined
                },
                cssx: {
                    shape: undefined,
                    color: undefined
                },
                cidx: {
                    shape: undefined,
                    color: undefined
                },
                cisx: {
                    shape: undefined,
                    color: undefined
                },
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
            teethPaves: {
                icsdx: {shape: undefined, color: undefined},
                icssx: {shape: undefined, color: undefined},
                icidx: {shape: undefined, color: undefined},
                icisx: {shape: undefined, color: undefined},
                ilsdx: {shape: undefined, color: undefined},
                ilssx: {shape: undefined, color: undefined},
                ilidx: {shape: undefined, color: undefined},
                ilisx: {shape: undefined, color: undefined},
                csdx: {shape: undefined, color: undefined},
                cssx: {shape: undefined, color: undefined},
                cidx: {shape: undefined, color: undefined},
                cisx: {shape: undefined, color: undefined},
            },
            currentTooth: undefined,
            activeDefault: undefined,
            total: 0
        });
    },
    setHistory: (state) => {
        state.history = [...state.history,
            [{
                type: state.teethJewelType,
                material: state.teethMaterial,
                stones: state.teethStones,
                pave: state.teethPaves,
                visible: state.teethVisibility,
                prices: state.teethPrices,
                preciousness: state.teethPreciousness
            }]
        ];
        console.log(state.currentHistory, state.history)
    },

    // states and method to calculate the total price of the current configuration
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
                        state.teethPrices[key] = Number(toothPriceList[state.teethJewelType[key] + value[0].toUpperCase() + value.slice(1)]);
                        break;
                    case 'fullDiamond':
                    case 'frameDiamond':
                    case 'barDiamond':
                        const baseType = state.teethJewelType[key].slice();
                        state.teethPrices[key] = Number(toothPriceList[baseType.split('D').shift() + value[0].toUpperCase() + value.slice(1)]) + Number(toothPriceList[state.teethJewelType[key]]);
                        break;
                    case 'bigBar':
                        state.teethPrices.cidx = Number(toothPriceList[state.teethJewelType[key] + value[0].toUpperCase() + value.slice(1)]) / 2;
                        state.teethPrices.cisx = Number(toothPriceList[state.teethJewelType[key] + value[0].toUpperCase() + value.slice(1)]) / 2;
                        break;
                    case 'bigBarDiamond':
                        const barType = state.teethJewelType[key].slice();
                        state.teethPrices.cidx = Number(toothPriceList[barType.split('D').shift() + value[0].toUpperCase() + value.slice(1)]) / 2 + Number(toothPriceList[state.teethJewelType[key]]) / 2;
                        state.teethPrices.cisx = Number(toothPriceList[barType.split('D').shift() + value[0].toUpperCase() + value.slice(1)]) / 2 + Number(toothPriceList[state.teethJewelType[key]]) / 2;
                        break;
                }
            } else {
                state.teethPrices[key] = 0
            }
        }

        for (const [key, value] of Object.entries(state.teethStones)) {
            if(value?.shape && state.pricesAdds) {
                state.teethPrices[key] = state.teethPrices[key] + Number(state.pricesAdds.filter(el => el.stone === value.color)[0][state.teethStones[key].shape + 'Shape']);
            }
        }

        state.total = 0;
        for (const [key, value] of Object.entries(state.teethPrices)) {
            state.total = state.total + value;
        }
    },

    // state and method to calculate the preciousness of the materials used in the configuration
    // 0 is the starting price, with 14K gold and moissanite
    teethPreciousness: {
        carats: undefined,
        diamonds: undefined
    },
    totalPreciousness: 0,
    calcPreciousness: ((gold, diamond) =>
        set(
            produce((state) => {
                state.totalPreciousness = 0;

                if(gold !== '14k') {
                    const configTeeth = Object.keys(state.teethMaterial).filter(tooth => state.teethMaterial[tooth] !== 'base');
                    state.totalPreciousness += configTeeth.length * 300;
                }

                if(diamond && diamond !== 'mois') {
                    const configTeeth = Object.keys(state.teethJewelType).filter(tooth => state.teethJewelType[tooth].includes('Diamond'));
                    switch(diamond) {
                        case 'lab':
                            state.totalPreciousness += configTeeth.length * 500;
                           break;
                        case 'natural':
                            state.totalPreciousness += configTeeth.length * 1000;
                    }
                }

                state.teethPreciousness.carats = gold;
                state.teethPreciousness.diamonds = diamond;
                if(state.history.length > 0) {
                    state.history[state.history.length - 1][0].preciousness = state.teethPreciousness;
                }
            })
        )
    )
}))

// initial data fetch
// useTeethStore.getState().fetchPrices();