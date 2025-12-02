import { create } from 'zustand';
import {produce} from "immer";
import {State} from "@/app/_types/State";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";
import json from "@/utils/prices.json";
import {Pave, Stone} from "@/app/_types/TeethOptions";

export const useTeethStore = create<State>((set, get) => ({

    // state and method to take a screenshot of the Canvas when needed
    // (the useThree hook needed to perform this task can be used only inside the Canvas)
    isScreenshotNeeded: undefined,
    setIsScreenshotNeeded: (value) => set({isScreenshotNeeded: value}),

    // state and method to reset OrbitControls when needed
    // (the useThree hook needed to perform this task can be used only inside the Canvas)
    resetControls: undefined,
    setResetControls: (value) => set({resetControls: value}),

    // state and method to set the envMap when everything is loaded the first time
    envMap: undefined,
    setEnvMap: (em) => {
        set({envMap: em})
    },

    hovered: undefined,
    setHover: (tooth) => {
        set({hovered: tooth});
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
        pprsdx: undefined,
        pprssx: undefined,
        ppridx: undefined,
        pprisx: undefined,
        sprsdx: undefined,
        sprssx: undefined,
        spridx: undefined,
        sprisx: undefined,
        msdx: undefined,
        mssx: undefined,
        midx: undefined,
        misx: undefined,
        signature: undefined
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
        pprsdx: false,
        pprssx: false,
        ppridx: false,
        pprisx: false,
        sprsdx: false,
        sprssx: false,
        spridx: false,
        sprisx: false,
        msdx: false,
        mssx: false,
        midx: false,
        misx: false
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
        pprsdx: 'base',
        pprssx: 'base',
        ppridx: 'base',
        pprisx: 'base',
        sprsdx: 'base',
        sprssx: 'base',
        spridx: 'base',
        sprisx: 'base',
        msdx: 'base',
        mssx: 'base',
        midx: 'base',
        misx: 'base'
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
        pprsdx: 'full',
        pprssx: 'full',
        ppridx: 'full',
        pprisx: 'full',
        sprsdx: 'full',
        sprssx: 'full',
        spridx: 'full',
        sprisx: 'full',
        msdx: 'full',
        mssx: 'full',
        midx: 'full',
        misx: 'full'
    },
    setType: (tooth, type) =>
        set(
            produce((state) => {

                // update current history step
                if(state.currentHistory < state.history.length) {
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                // if the jewel type corresponds to a signature design, that signature design
                // visibility and material are reset. Then, the design type of all the teeth
                // included in the signature array is reset to 'full'
                if(Object.keys(state.teethSignature).includes(state.teethJewelType[tooth])) {
                    state.signatureMaterial[state.teethJewelType[tooth]] = undefined;
                    state.signatureVisibility[state.teethJewelType[tooth]] = false;

                    for(let value of Object.values(state.teethSignature[state.teethJewelType[tooth]])) {
                        state.teethJewelType[value as string] = 'full'
                    }
                }

                // EXCEPTION: if the diamond version of a jewel type is active, clicking on the base jewel type removes that
                // config from the tooth, just like it were the diamondless version. The function then RETURNS
                if(state.teethVisibility[tooth] && (
                    (state.teethJewelType[tooth] === 'fullDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'bezelDiamond' && type === 'bezel')
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
                            state.teethPaves.cidx = {shape: undefined, color: undefined};
                            state.teethPaves.cisx = {shape: undefined, color: undefined};

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
                                    state.teethPaves.icsdx = {shape: undefined, color: undefined};
                                    state.teethPaves.icssx = {shape: undefined, color: undefined};
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
                                    state.teethPaves.icidx = {shape: undefined, color: undefined};
                                    state.teethPaves.icisx = {shape: undefined, color: undefined};
                                    break;
                                default:
                                    state.teethVisibility[tooth] = false;
                                    state.teethJewelType[tooth] = 'full';
                                    state.teethMaterial[tooth] = 'base';
                                    state.teethStones[tooth] = {shape: undefined, color: undefined};
                                    state.teethPaves[tooth] = {shape: undefined, color: undefined};
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
                        state.teethPaves[tooth] = {shape: undefined, color: undefined};

                        console.log(JSON.stringify(state.teethPaves), JSON.stringify(state.teethJewelType));
                        // calc total and set history step
                        get().calcTotal(state);
                        get().setHistory(state);
                        return;
                }

                // EXCEPTION: if the current jewel type has diamonds and the user chooses another jewel type,
                // the new jewel type will have diamonds too. The function then RETURNS
                if((state.teethJewelType[tooth] === 'fullDiamond' && type === 'frame')
                    || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bezel')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'bar')
                    || (state.teethJewelType[tooth] === 'frameDiamond' && type === 'bezel')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'frame')
                    || (state.teethJewelType[tooth] === 'barDiamond' && type === 'bezel')
                    || (state.teethJewelType[tooth] === 'bezelDiamond' && type === 'full')
                    || (state.teethJewelType[tooth] === 'bezelDiamond' && type === 'frame')
                    || (state.teethJewelType[tooth] === 'bezelDiamond' && type === 'bar')
                ) {

                    if(((state.teethJewelType[tooth] === 'barDiamond' && type === 'full')
                        || (state.teethJewelType[tooth] === 'barDiamond' && type === 'frame')
                        || (state.teethJewelType[tooth] === 'barDiamond' && type === 'bezel'))
                        && (tooth === 'icsdx' || tooth === 'icssx' || tooth === 'icidx' || tooth === 'icisx')){

                        switch (tooth) {
                            case 'icsdx':
                                state.teethJewelType.icssx = 'full';
                                state.teethVisibility.icssx = false;
                                state.teethPaves.icssx = {shape: undefined, color: undefined};
                                state.teethJewelType.icsdx = type + 'Diamond';
                                state.teethVisibility.icsdx = true;
                                if(type === 'bezel') {
                                    state.teethStones.icsdx = {shape: 'circle', color: 'bSapph'};
                                    state.teethPaves.icsdx = {shape: state.teethPaves[tooth].shape, color: 'ruby'};
                                }
                                break;
                            case 'icssx':
                                state.teethJewelType.icsdx = 'full';
                                state.teethVisibility.icsdx = false;
                                state.teethPaves.icsdx = {shape: undefined, color: undefined};
                                state.teethJewelType.icssx = type + 'Diamond';
                                state.teethVisibility.icssx = true;
                                if(type === 'bezel') {
                                    state.teethStones.icssx = {shape: 'circle', color: 'bSapph'};
                                    state.teethPaves.icssx = {shape: state.teethPaves[tooth].shape, color: 'ruby'};
                                }
                                break;
                            case 'icidx':
                                state.teethJewelType.icisx = 'full';
                                state.teethVisibility.icisx = false;
                                state.teethPaves.icisx = {shape: undefined, color: undefined};
                                state.teethJewelType.icidx = type + 'Diamond';
                                state.teethVisibility.icidx = true;
                                if(type === 'bezel') {
                                    state.teethStones.icidx = {shape: 'circle', color: 'bSapph'};
                                    state.teethPaves.icidx = {shape: state.teethPaves[tooth].shape, color: 'ruby'};
                                }
                                break;
                            case 'icisx':
                                state.teethJewelType.icidx = 'full';
                                state.teethVisibility.icidx = false;
                                state.teethPaves.icidx = {shape: undefined, color: undefined};
                                state.teethJewelType.icisx = type + 'Diamond';
                                state.teethVisibility.icisx = true;
                                if(type === 'bezel') {
                                    state.teethStones.icisx = {shape: 'circle', color: 'bSapph'};
                                    state.teethPaves.icisx = {shape: state.teethPaves[tooth].shape, color: 'ruby'};
                                }
                                break;
                        }

                    } else if(((state.teethJewelType[tooth] === 'frameDiamond' && type === 'bar')
                        || (state.teethJewelType[tooth] === 'fullDiamond' && type === 'bar')
                        || (state.teethJewelType[tooth] === 'bezelDiamond' && type === 'bar'))
                    && (tooth === 'icsdx' || tooth === 'icssx' || tooth === 'icidx' || tooth === 'icisx')) {

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
                                state.teethStones.icidx = {shape: undefined, color: undefined};
                                state.teethStones.icisx = {shape: undefined, color: undefined};
                                break;
                        }

                        if(state.teethMaterial[tooth] === 'base') {
                            state.teethMaterial[tooth] = 'gold';
                        }

                        // if you switch to a spacer, the pave type can be only round
                        state.teethPaves[tooth].shape = 'round';

                        switch (tooth) {
                            case 'icsdx':
                                state.teethMaterial.icssx = state.teethMaterial.icsdx;
                                state.teethPaves.icssx = state.teethPaves.icsdx;
                                break;
                            case 'icssx':
                                state.teethMaterial.icsdx = state.teethMaterial.icssx;
                                state.teethPaves.icsdx = state.teethPaves.icssx;
                                break;
                            case 'icidx':
                                state.teethMaterial.icisx = state.teethMaterial.icidx;
                                state.teethPaves.icisx = state.teethPaves.icidx;
                                break;
                            case 'icisx':
                                state.teethMaterial.icidx = state.teethMaterial.icisx;
                                state.teethPaves.icidx = state.teethPaves.icisx;
                                break;
                        }

                    } else {
                        state.teethJewelType[tooth] = type + 'Diamond';
                        if(type === 'frame' || type === 'bar') {
                            state.teethPaves[tooth].shape = 'round';
                        }
                        if(type === 'bezel') {
                            state.teethStones[tooth] = {shape: 'circle', color: 'bSapph'};
                            state.teethPaves[tooth] = {shape: state.teethPaves[tooth].shape, color: 'ruby'};
                        } else {
                            state.teethStones[tooth] = {shape: undefined, color: undefined};
                        }
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
                    || (state.teethJewelType[tooth] === 'bezelDiamond' && type === 'bigBar')
                ) {
                    state.teethVisibility.cidx = true;
                    state.teethVisibility.cisx = true;
                    state.teethMaterial.cidx = state.teethMaterial[tooth];
                    state.teethMaterial.cisx = state.teethMaterial[tooth];
                    state.teethJewelType.cidx = type + 'Diamond';
                    state.teethJewelType.cisx = type + 'Diamond';
                    state.teethPaves[tooth].shape = 'round';
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
                                    state.teethPaves.cidx = {shape: 'round', color: 'ruby'};
                                } else {
                                    state.teethJewelType.cidx = type;
                                }

                                if(type === 'bezel' || type === 'bezelDiamond') {
                                    state.teethStones.cidx = {shape: 'circle', color: 'bSapph'};
                                }

                                if(type === 'enamel') {
                                    state.teethEnamel.cidx = 'blue';
                                }

                                // ...second, it deactivates the other bigBar canine
                                state.teethJewelType.cisx = 'full';
                                state.teethVisibility.cisx = false;
                                state.teethMaterial.cisx = 'base';
                                state.teethPaves.cisx = {shape: undefined, color: undefined};
                                break;
                            // the process is the same for both lower canines
                            case 'cisx':
                                if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                    state.teethJewelType.cisx = type + 'Diamond';
                                    state.teethPaves.cisx = {shape: 'round', color: 'ruby'};
                                } else {
                                    state.teethJewelType.cisx = type;
                                }

                                if(type === 'bezel' || type === 'bezelDiamond') {
                                    state.teethStones.cisx = {shape: 'circle', color: 'bSapph'};
                                }

                                if(type === 'enamel') {
                                    state.teethEnamel.cisx = 'blue';
                                }

                                state.teethJewelType.cidx = 'full';
                                state.teethVisibility.cidx = false;
                                state.teethMaterial.cidx = 'base';
                                state.teethPaves.cidx = {shape: undefined, color: undefined};
                                break;
                        }
                        // the new active tooth is set
                        state.currentTooth = tooth;
                    // ... but, if the PREVIOUS jewel type of a upper/lower central incisor is a bar/barDiamond...
                    } else if((state.teethJewelType[tooth] === 'bar' || state.teethJewelType[tooth] === 'barDiamond')
                        && (tooth === 'icsdx' || tooth === 'icssx' || tooth === 'icidx' || tooth === 'icisx')) {
                        switch(tooth) {
                        case 'icsdx':

                            // ...first, it switches to the new jewel type after the diamond check
                            if(state.teethJewelType[tooth] === 'barDiamond') {
                                state.teethJewelType.icsdx = type + 'Diamond';
                                state.teethPaves.icsdx = {shape: 'round', color: 'ruby'};
                            } else {
                                state.teethJewelType.icsdx = type;
                            }

                            if(type === 'bezel' || type === 'bezelDiamond') {
                                state.teethStones.icsdx = {shape: 'circle', color: 'bSapph'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icsdx = 'blue';
                            }

                            // ...second, it deactivates the other bar incisor
                            state.teethJewelType.icssx = 'full';
                            state.teethVisibility.icssx = false;
                            state.teethMaterial.icssx = 'base';
                            state.teethPaves.icssx = {shape: undefined, color: undefined};
                            break;

                            // the process is the same for all 4 incisor
                        case 'icssx':
                            if(state.teethJewelType[tooth] === 'barDiamond') {
                                state.teethJewelType.icssx = type + 'Diamond';
                                state.teethPaves.icssx = {shape: 'round', color: 'ruby'};
                            } else {
                                state.teethJewelType.icssx = type;
                            }

                            if(type === 'bezel' || type === 'bezelDiamond') {
                                state.teethStones.icssx = {shape: 'circle', color: 'bSapph'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icssx = 'blue';
                            }

                            state.teethJewelType.icsdx = 'full';
                            state.teethVisibility.icsdx = false;
                            state.teethMaterial.icsdx = 'base';
                            state.teethPaves.icsdx = {shape: undefined, color: undefined};
                            break;

                        case 'icidx':
                            if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                state.teethJewelType.icidx = type + 'Diamond';
                                state.teethPaves.icidx = {shape: 'round', color: 'ruby'};
                            } else {
                                state.teethJewelType.icidx = type;
                            }

                            if(type === 'bezel' || type === 'bezelDiamond') {
                                state.teethStones.icidx = {shape: 'circle', color: 'bSapph'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icidx = 'blue';
                            }

                            state.teethJewelType.icisx = 'full';
                            state.teethVisibility.icisx = false;
                            state.teethMaterial.icisx = 'base';
                            state.teethPaves.icisx = {shape: undefined, color: undefined};
                            break;

                        case 'icisx':
                            if(state.teethJewelType[tooth] === 'bigBarDiamond') {
                                state.teethJewelType.icisx = type + 'Diamond';
                                state.teethPaves.icisx = {shape: 'round', color: 'ruby'};
                            } else {
                                state.teethJewelType.icisx = type;
                            }

                            if(type === 'bezel' || type === 'bezelDiamond') {
                                state.teethStones.icisx = {shape: 'circle', color: 'bSapph'};
                            }

                            if(type === 'enamel') {
                                state.teethEnamel.icisx = 'blue';
                            }

                            state.teethJewelType.icidx = 'full';
                            state.teethVisibility.icidx = false;
                            state.teethMaterial.icidx = 'base';
                            state.teethPaves.icidx = {shape: undefined, color: undefined};
                            break;
                        }
                        // the new active tooth is set
                        state.currentTooth = tooth;
                    //  BUT, if the PREVIOUS jewel type of a tooth is NEITHER a bigBar/bigBarDiamond NOR a bar/barDiamond...
                    } else {
                        // STANDARD config setup
                        state.teethVisibility[tooth] = true;
                        state.teethJewelType[tooth] = type;
                        state.teethMaterial[tooth] = state.teethMaterial[tooth] === 'base' ? 'gold' : state.teethMaterial[tooth];

                        if(type === 'bezel' || type === 'bezelDiamond') {
                            state.teethStones[tooth] = {shape: 'circle', color: 'bSapph'};
                        } else {
                            state.teethStones[tooth] = {shape: undefined, color: undefined};
                        }

                        if(type === 'enamel') {
                            state.teethEnamel[tooth] = 'blue';
                        } else {
                            state.teethEnamel[tooth] = undefined;
                        }

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
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                // stone toggler

                if(shape === 'prev') {
                    if(state.teethStones[tooth].shape === undefined) {
                        state.teethStones[tooth].shape = 'marquise';
                    }
                    state.teethStones[tooth].color = color;

                    if((color === 'whD' || color === 'brD' || color === 'blD') && !state.teethPreciousness.diamonds) {
                        state.teethPreciousness.diamonds = 'lab';
                    }
                    if(!get().checkDiamonds(state)) {
                        state.teethPreciousness.diamonds = undefined;
                    }
                } else if(color === 'prev') {
                    if(state.teethStones[tooth].color === undefined) {
                        state.teethStones[tooth].color = 'bSapph';
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

    teethFinish: {
        icsdx: 'polished',
        icssx: 'polished',
        icidx: 'polished',
        icisx: 'polished',
        ilsdx: 'polished',
        ilssx: 'polished',
        ilidx: 'polished',
        ilisx: 'polished',
        csdx: 'polished',
        cssx: 'polished',
        cidx: 'polished',
        cisx: 'polished',
        pprsdx: 'polished',
        pprssx: 'polished',
        ppridx: 'polished',
        pprisx: 'polished',
        sprsdx: 'polished',
        sprssx: 'polished',
        spridx: 'polished',
        sprisx: 'polished',
        msdx: 'polished',
        mssx: 'polished',
        midx: 'polished',
        misx: 'polished'
    },

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
        pprsdx: {shape: undefined, color: undefined},
        pprssx: {shape: undefined, color: undefined},
        ppridx: {shape: undefined, color: undefined},
        pprisx: {shape: undefined, color: undefined},
        sprsdx: {shape: undefined, color: undefined},
        sprssx: {shape: undefined, color: undefined},
        spridx: {shape: undefined, color: undefined},
        sprisx: {shape: undefined, color: undefined},
        msdx: {shape: undefined, color: undefined},
        mssx: {shape: undefined, color: undefined},
        midx: {shape: undefined, color: undefined},
        misx: {shape: undefined, color: undefined}
    },
    setPave: (tooth, pave: string, color:string|undefined) =>
        set(
            produce((state) => {

                // if the tooth is not visible or no material has been chosen, no diamond is set
                // (reinforce the disabled diamond toggler button)
                if(!state.teethVisibility[tooth] || state.teethMaterial[tooth] === 'base') {
                    return;
                }

                // update current history step
                if(state.currentHistory < state.history.length) {
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                // if pave === 'nopave', reset the design to the diamondless version
                if(pave.includes('nopave')) {
                    switch (state.teethJewelType[tooth]) {
                        case 'barDiamond':
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
                            break;
                        case 'fullDiamond':
                            state.teethJewelType[tooth] = 'full';
                            state.teethPaves[tooth] = {shape: undefined, color: undefined};
                            break;
                        case 'frameDiamond':
                            state.teethJewelType[tooth] = 'frame';
                            state.teethPaves[tooth] = {shape: undefined, color: undefined};
                            break;
                        case 'bigBarDiamond':
                            state.teethJewelType.cidx = 'bigBar';
                            state.teethPaves.cidx = {shape: undefined, color: undefined};
                            state.teethJewelType.cisx = 'bigBar';
                            state.teethPaves.cisx = {shape: undefined, color: undefined};
                            break;
                        case 'bezelDiamond':
                            state.teethJewelType[tooth] = 'bezel';
                            state.teethPaves[tooth] = {shape: undefined, color: undefined};
                            break;
                    }

                    if(!get().checkDiamonds(state)){
                        state.teethPreciousness.diamonds = undefined;
                    }

                    switch(pave) {
                        case 'nopave-pol':
                            state.teethFinish[tooth] = 'polished';
                            break;
                        case 'nopave-sblast':
                            state.teethFinish[tooth] = 'sandblasted';
                            break;
                        case 'nopave-dcut':
                            state.teethFinish[tooth] = 'diamond_cut';
                            break;
                        default:
                            state.teethFinish[tooth] = 'polished';
                    }
                    // if color === 'prev', it means you're changing the shape
                } else if(color === 'prev') {
                    // diamond is then applied to the corresponding jewel type if a diamondless version is currently selected

                    state.teethFinish[tooth] = 'polished';

                    if(!state.teethPaves[tooth].shape) {
                        state.teethPaves[tooth] = {shape: 'round', color:'ruby'};
                    }

                    switch (state.teethJewelType[tooth]) {
                        case 'full':
                            state.teethJewelType[tooth] = 'fullDiamond';
                            break;
                        case 'bar':
                            state.teethJewelType[tooth] = 'barDiamond';
                            if (tooth === 'icsdx') {
                                state.teethJewelType.icssx = 'barDiamond';
                                state.teethFinish.icssx = 'polished';
                                if(!state.teethPaves.icssx.shape) {
                                    state.teethPaves.icssx = {shape: 'round', color:'ruby'};
                                }
                            }
                            if (tooth === 'icssx') {
                                state.teethJewelType.icsdx = 'barDiamond';
                                state.teethFinish.icsdx = 'polished';
                                if(!state.teethPaves.icsdx.shape) {
                                    state.teethPaves.icsdx = {shape: 'round', color:'ruby'};
                                }
                            }
                            if (tooth === 'icidx') {
                                state.teethJewelType.icisx = 'barDiamond';
                                state.teethFinish.icisx = 'polished';
                                if(!state.teethPaves.icisx.shape) {
                                    state.teethPaves.icisx = {shape: 'round', color:'ruby'};
                                }
                            }
                            if (tooth === 'icisx') {
                                state.teethJewelType.icidx = 'barDiamond';
                                state.teethFinish.icidx = 'polished';
                                if(!state.teethPaves.icidx.shape) {
                                    state.teethPaves.icidx = {shape: 'round', color:'ruby'};
                                }
                            }
                            break;
                        case 'bigBar':
                            state.teethJewelType.cidx = 'bigBarDiamond';
                            if(!state.teethPaves.cidx.shape || !state.teethPaves.cisx.shape) {
                                state.teethPaves.cidx = {shape: 'round', color:'ruby'};
                                state.teethPaves.cisx = {shape: 'round', color:'ruby'};
                            }
                            state.teethFinish.cidx = 'polished';
                            state.teethJewelType.cisx = 'bigBarDiamond';
                            state.teethFinish.cisx = 'polished';
                            break;
                        case 'frame':
                            state.teethJewelType[tooth] = 'frameDiamond';
                            break;
                        case 'bezel':
                            state.teethJewelType[tooth] = 'bezelDiamond';
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
                    // instead, if shape === 'prev', it means you're changing the gem color
                } else if(pave === 'prev') {

                    if((tooth === 'cidx' || tooth === 'cisx') && state.teethJewelType[tooth] === 'bigBarDiamond') {
                        state.teethPaves.cidx.color = color;
                        state.teethPaves.cisx.color = color;
                    } else if ((tooth === 'icsdx' || tooth === 'icssx') && state.teethJewelType[tooth] === 'barDiamond') {
                        state.teethPaves.icsdx.color = color;
                        state.teethPaves.icssx.color = color;
                    } else if ((tooth === 'icidx' || tooth === 'icisx') && state.teethJewelType[tooth] === 'barDiamond') {
                        state.teethPaves.icidx.color = color;
                        state.teethPaves.icisx.color = color;
                    } else {
                        state.teethPaves[tooth].color = color;
                    }

                    if((color === 'whD' || color === 'brD' || color === 'blD') && !state.teethPreciousness.diamonds) {
                        state.teethPreciousness.diamonds = 'lab';
                    } else if(color !== 'whD' && color !== 'brD' && color !== 'blD' && !get().checkDiamonds(state)){
                        state.teethPreciousness.diamonds = undefined;
                    }
                }

                // calc total and set history step
                    get().calcTotal(state);
                    get().setHistory(state);
            })
        ),

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
                if(button === state.activeSubButton) {
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
    signatureMaterial: {
        vamp: undefined,
        hammered: undefined,
        cross: undefined,
        bubblegum: undefined,
        sprinkles: undefined,
        tribal: undefined,
        braces: undefined
    },
    signatureVisibility: {
        vamp: false,
        hammered: false,
        cross: false,
        bubblegum: false,
        sprinkles: false,
        tribal: false,
        braces: false
    },
    teethSignature: {
        vamp: ['csdx', 'cssx'],
        hammered: ['icsdx', 'icssx', 'ilsdx', 'ilssx', 'icidx', 'icisx', 'ilidx', 'ilisx'],
        cross: ['icsdx', 'icssx'],
        bubblegum: ['icsdx', 'icssx', 'ilsdx', 'ilssx'],
        sprinkles: ['csdx', 'cssx', 'ilsdx', 'ilssx'],
        tribal: ['icsdx', 'icssx', 'ilsdx', 'ilssx'],
        braces: ['icsdx', 'icssx', 'ilsdx', 'ilssx', 'csdx', 'cssx']
    },
    setSignature: (signature, material, mainMenu) =>
        set(
            produce((state) => {

                // update current history step
                if(state.currentHistory < state.history.length) {
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                if(!state.signatureVisibility[signature]) {

                    // first, you need to check if another signature is selected;
                    // in that case, you need to reset those teeth's design type to 'full'
                    for(let [key, value] of Object.entries(state.teethJewelType)) {
                        if(Object.keys(state.teethSignature).includes(value as string)) {
                            state.teethJewelType[key] = 'full';
                        }
                    }
                    // second, reset all the teeth included in the signature array
                    for(let value of Object.values(state.teethSignature[signature])) {
                        get().resetList(state, (value as string));
                        state.teethJewelType[value as string] = signature;
                    }

                    for(let key of Object.keys(state.signatureVisibility)) {
                        if(key === signature) {
                            state.signatureVisibility[key] = true;
                            state.signatureMaterial[key] = material;
                        } else {
                            state.signatureVisibility[key] = false;
                            state.signatureMaterial[key] = undefined;
                        }
                    }

                } else if(state.signatureVisibility[signature] && mainMenu){

                    state.signatureVisibility[signature] = false;
                    state.signatureMaterial[signature] = undefined;

                } else {

                    state.signatureMaterial[signature] = material;

                }

                if(material === 'pave') {
                    state.teethPreciousness.diamonds = 'lab';
                } else if(material !== 'pave' && !get().checkDiamonds(state)) {
                    state.teethPreciousness.diamonds = undefined;
                }

                get().calcTotal(state);
                get().setHistory(state);
            })
        ),

    // method to remove the configuration from a tooth
    resetList(state, tooth) {
        if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
            state.teethJewelType.cidx = 'full';
            state.teethJewelType.cisx = 'full';
            state.teethMaterial.cidx = 'base';
            state.teethMaterial.cisx = 'base';
            state.teethVisibility.cidx = false;
            state.teethVisibility.cisx = false;
            state.teethFinish.cidx = 'polished';
            state.teethFinish.cisx = 'polished';
            state.teethPaves.cisx = {shape: undefined, color: undefined};
            state.teethPaves.cidx = {shape: undefined, color: undefined};
        } else if((state.teethJewelType[tooth] === 'bar' || state.teethJewelType[tooth] === 'barDiamond') && (tooth === 'icsdx' || tooth === 'icssx')) {
            state.teethJewelType.icsdx = 'full';
            state.teethJewelType.icssx = 'full';
            state.teethMaterial.icsdx = 'base';
            state.teethMaterial.icssx = 'base';
            state.teethVisibility.icsdx = false;
            state.teethVisibility.icssx = false;
            state.teethFinish.icsdx = 'polished';
            state.teethFinish.icssx = 'polished';
            state.teethPaves.icssx = {shape: undefined, color: undefined};
            state.teethPaves.icsdx = {shape: undefined, color: undefined};
        } else if((state.teethJewelType[tooth] === 'bar' || state.teethJewelType[tooth] === 'barDiamond') && (tooth === 'icidx' || tooth === 'icisx')) {
            state.teethJewelType.icidx = 'full';
            state.teethJewelType.icisx = 'full';
            state.teethMaterial.icidx = 'base';
            state.teethMaterial.icisx = 'base';
            state.teethVisibility.icidx = false;
            state.teethVisibility.icisx = false;
            state.teethFinish.icidx = 'polished';
            state.teethFinish.icisx = 'polished';
            state.teethPaves.icisx = {shape: undefined, color: undefined};
            state.teethPaves.icidx = {shape: undefined, color: undefined};
        } else {

            state.teethVisibility[tooth] = false;
            state.teethMaterial[tooth] = 'base';
            state.teethJewelType[tooth] = 'full';
            state.teethEnamel[tooth] = undefined;
            state.teethFinish[tooth] = 'polished';
            state.teethPaves[tooth] = {shape: undefined, color: undefined};
            state.teethStones[tooth] = {shape: undefined, color: undefined};
        }

        if(state.currentTooth === tooth) {
            state.currentTooth = undefined;
        }

        if(!get().checkDiamonds(state)) {
            state.teethPreciousness.diamonds = undefined;
        }
    },
    resetTooth: (tooth) =>
        set(
            produce((state) => {

                // update current history step
                if (state.currentHistory < state.history.length) {
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                get().resetList(state, tooth);
                state.activeSubButton = undefined;
                get().calcTotal(state);
                get().setHistory(state);
            })
        ),
    resetSignature: (signature) =>
        set(
            produce((state) => {
                state.signatureMaterial[signature] = undefined;
                state.signatureVisibility[signature] = false;

                for(let [key, value] of Object.entries(state.teethJewelType)) {
                    if(value === signature) {
                        state.teethJewelType[key] = 'full';
                    }
                }

                if(!get().checkDiamonds(state)) {
                    state.teethPreciousness.diamonds = undefined;
                }
                state.activeSubButton = undefined;
                get().calcTotal(state);
                get().setHistory(state);
            })

        ),
    // state and method to manage the initial loading screens
    loaded: false,
    setLoaded: (bool) => set(() => ({loaded: bool})),

    // state and method to check if the user has clicked on the "Continue" button
    nextStep: false,
    setNextStep: (bool) => set(() => ({nextStep: bool})),

    // state and method to get back and forth the recap view
    recap: false,
    setRecap: (bool) => set({recap: bool}),

    // states and method to fetch and save the prices from the db
    prices: {base: json.base, bezel: json.bezel, pave: json.pave, finish: json.finish, signature: json.signature},
    fetchPrices: async() => {
        // const supabase = createClient();
        // let { data: base, error: errorBase } = await supabase
        //     .from('No_Stone')
        //     .select('*');
        // let { data: bezels, error: errorBezel } = await supabase
        //     .from('Bezel')
        //     .select('*');
        // let { data: paves, error: errorPave } = await supabase
        //     .from('Pave')
        //     .select('*');
        // let { data: finish, error: errorFinish } = await supabase
        //     .from('Finish')
        //     .select('*');
        // let { data: signature, error: errorSignature } = await supabase
        //     .from('Signature')
        //     .select('*');

        //
        // const [whDLab_b, whDNat_b, brDLab_b, brDNat_b, blDLab_b, blDNat_b, ruby_b, emerald_b, ameth_b, aqua_b, bSapph_b, ySapph_b, pSapph_b] = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
        // const [whDLab_p, whDNat_p, brDLab_p, brDNat_p, blDLab_p, blDNat_p, ruby_p, emerald_p, ameth_p, aqua_p, bSapph_p, ySapph_p, pSapph_p, camo, glitch] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        //
        // for(let bezel of bezels!) {
        //     switch(bezel.stone) {
        //         case 'white_diamond_lab':
        //             whDLab_b.push(bezel);
        //             break;
        //         case 'white_diamond_nat':
        //             whDNat_b.push(bezel);
        //             break;
        //         case 'brown_diamond_lab':
        //             brDLab_b.push(bezel);
        //             break;
        //         case 'brown_diamond_nat':
        //             brDNat_b.push(bezel);
        //             break;
        //         case 'black_diamond_lab':
        //             blDLab_b.push(bezel);
        //             break;
        //         case 'black_diamond_nat':
        //             blDNat_b.push(bezel);
        //             break;
        //         case 'emerald_lab':
        //             emerald_b.push(bezel);
        //             break;
        //         case 'ruby_lab':
        //             ruby_b.push(bezel);
        //             break;
        //         case 'blue_sapphire_lab':
        //             bSapph_b.push(bezel);
        //             break;
        //         case 'yellow_sapphire_lab':
        //             ySapph_b.push(bezel);
        //             break;
        //         case 'pink_sapphire_lab':
        //             pSapph_b.push(bezel);
        //             break;
        //         case 'aquamarine_lab':
        //             aqua_b.push(bezel);
        //             break;
        //         case 'amethyst_lab':
        //             ameth_b.push(bezel);
        //             break;
        //     }
        // }
        // for(let pave of paves!) {
        //     switch(pave.stone) {
        //         case 'white_diamond_lab':
        //             whDLab_p.push(pave);
        //             break;
        //         case 'white_diamond_nat':
        //             whDNat_p.push(pave);
        //             break;
        //         case 'brown_diamond_lab':
        //             brDLab_p.push(pave);
        //             break;
        //         case 'brown_diamond_nat':
        //             brDNat_p.push(pave);
        //             break;
        //         case 'black_diamond_lab':
        //             blDLab_p.push(pave);
        //             break;
        //         case 'black_diamond_nat':
        //             blDNat_p.push(pave);
        //             break;
        //         case 'emerald_lab':
        //             emerald_p.push(pave);
        //             break;
        //         case 'ruby_lab':
        //             ruby_p.push(pave);
        //             break;
        //         case 'blue_sapphire_lab':
        //             bSapph_p.push(pave);
        //             break;
        //         case 'yellow_sapphire_lab':
        //             ySapph_p.push(pave);
        //             break;
        //         case 'pink_sapphire_lab':
        //             pSapph_p.push(pave);
        //             break;
        //         case 'aquamarine_lab':
        //             aqua_p.push(pave);
        //             break;
        //         case 'amethyst_lab':
        //             ameth_p.push(pave);
        //             break;
        //         case 'camo':
        //             camo.push(pave);
        //             break;
        //         case 'glitch_lab':
        //             glitch.push(pave);
        //             break;
        //     }
        // }
        //
        // set({prices: {'base': base, 'bezel': {
        //             whDLab_b, whDNat_b, brDLab_b, brDNat_b, blDLab_b, blDNat_b, ruby_b, emerald_b, ameth_b, aqua_b, bSapph_b, ySapph_b, pSapph_b
        //         }, 'pave': {
        //             whDLab_p, whDNat_p, brDLab_p, brDNat_p, blDLab_p, blDNat_p, ruby_p, emerald_p, ameth_p, aqua_p, bSapph_p, ySapph_p, pSapph_p, camo, glitch
        //         }, 'finish':finish}});
    },

    // states and methods to set the configuration steps history and
    // navigate among the various step of the user experience
    history: [],
    currentHistory: 0,
    undo: () =>
        set(
            produce((state) => {
                state.currentHistory = state.currentHistory - 1;
                get().resetHistoryStep(state);
                get().calcTotal(state);
            })
        ),
    redo: () =>
        set(
            produce((state) => {
                state.currentHistory = state.currentHistory + 1;
                get().resetHistoryStep(state);
                get().calcTotal(state);
            })
        ),
    resetHistoryStep: (state) => {
        for(const tooth of state.history[state.currentHistory - 1]) {
            for(const [key, value] of Object.entries(tooth.type)) {
                state.teethJewelType[key] = value;
            }

            for(const [key, value] of Object.entries(tooth.material)) {
                state.teethMaterial[key] = value;
            }

            for(const [key, value] of Object.entries(tooth.finish)) {
                state.teethFinish[key] = value;
            }

            for(const [key, value] of Object.entries(tooth.stones) as [string, Stone][]) {
                state.teethStones[key].shape = value.shape;
                state.teethStones[key].color = value.color;
            }

            for(const [key, value] of Object.entries(tooth.pave) as [string, Pave][]) {
                state.teethPaves[key].shape = value.shape;
                state.teethPaves[key].color = value.color;
            }

            for(const [key, value] of Object.entries(tooth.enamel)) {
                state.teethEnamel[key] = value;
            }

            for(const [key, value] of Object.entries(tooth.visible)) {
                state.teethVisibility[key] = value;
            }

            for(const [key, value] of Object.entries(tooth.preciousness!)) {
                state.teethPreciousness[key] = value;
            }

            for(const [key, value] of Object.entries(tooth.signatureVisible)) {
                state.signatureVisibility[key] = value;
            }

            for(const [key, value] of Object.entries(tooth.signatureMaterial)) {
                state.signatureMaterial[key] = value;
            }
        }
    },
    reset: () => {
        set(
            produce((state) => {
                // update current history step
                if(state.currentHistory < state.history.length) {
                    state.history = state.history.splice(0, state.currentHistory);
                }
                state.currentHistory++;

                state.teethMaterial = {
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
                            pprsdx: 'base',
                            pprssx: 'base',
                            ppridx: 'base',
                            pprisx: 'base',
                            sprsdx: 'base',
                            sprssx: 'base',
                            spridx: 'base',
                            sprisx: 'base',
                            msdx: 'base',
                            mssx: 'base',
                            midx: 'base',
                            misx: 'base'
                    };
                state.teethJewelType = {
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
                                pprsdx: 'full',
                                pprssx: 'full',
                                ppridx: 'full',
                                pprisx: 'full',
                                sprsdx: 'full',
                                sprssx: 'full',
                                spridx: 'full',
                                sprisx: 'full',
                                msdx: 'full',
                                mssx: 'full',
                                midx: 'full',
                                misx: 'full'
                        };
                state.teethStones = {
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
                        };
                state.teethVisibility = {
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
                                pprsdx: false,
                                pprssx: false,
                                ppridx: false,
                                pprisx: false,
                                sprsdx: false,
                                sprssx: false,
                                spridx: false,
                                sprisx: false,
                                msdx: false,
                                mssx: false,
                                midx: false,
                                misx: false
                        };
                state.teethPaves = {
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
                            pprsdx: {shape: undefined, color: undefined},
                            pprssx: {shape: undefined, color: undefined},
                            ppridx: {shape: undefined, color: undefined},
                            pprisx: {shape: undefined, color: undefined},
                            sprsdx: {shape: undefined, color: undefined},
                            sprssx: {shape: undefined, color: undefined},
                            spridx: {shape: undefined, color: undefined},
                            sprisx: {shape: undefined, color: undefined},
                            msdx: {shape: undefined, color: undefined},
                            mssx: {shape: undefined, color: undefined},
                            midx: {shape: undefined, color: undefined},
                            misx: {shape: undefined, color: undefined}
                        };
                state.teethEnamel = {
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
                        };
                state.currentTooth = undefined;
                state.activeDefault = undefined;
                state.teethPreciousness = {carats: 10, diamonds: undefined};
                state.teethFinish = {
                    icsdx: 'polished',
                    icssx: 'polished',
                    icidx: 'polished',
                    icisx: 'polished',
                    ilsdx: 'polished',
                    ilssx: 'polished',
                    ilidx: 'polished',
                    ilisx: 'polished',
                    csdx: 'polished',
                    cssx: 'polished',
                    cidx: 'polished',
                    cisx: 'polished',
                    pprsdx: 'polished',
                    pprssx: 'polished',
                    ppridx: 'polished',
                    pprisx: 'polished',
                    sprsdx: 'polished',
                    sprssx: 'polished',
                    spridx: 'polished',
                    sprisx: 'polished',
                    msdx: 'polished',
                    mssx: 'polished',
                    midx: 'polished',
                    misx: 'polished'
                };
                state.signatureVisibility = {
                    vamp: false,
                    hammered: false,
                    cross: false,
                    bubblegum: false,
                    sprinkles: false,
                    tribal: false,
                    braces: false
                };
                state.signatureMaterial = {
                    vamp: undefined,
                    hammered: undefined,
                    cross: undefined,
                    bubblegum: undefined,
                    sprinkles: undefined,
                    tribal: undefined,
                    braces: undefined
                };
                state.teethPrices = {
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
                    pprsdx: 0,
                    pprssx: 0,
                    ppridx: 0,
                    pprisx: 0,
                    sprsdx: 0,
                    sprssx: 0,
                    spridx: 0,
                    sprisx: 0,
                    msdx: 0,
                    mssx: 0,
                    midx: 0,
                    misx: 0,
                    signature: 0
                };
                state.total = 0;
                get().setHistory(state);
            })
        );
    },
    setHistory: (state) => {
        state.history = [...state.history,
            [{
                type: state.teethJewelType,
                material: state.teethMaterial,
                stones: state.teethStones,
                pave: state.teethPaves,
                enamel: state.teethEnamel,
                finish: state.teethFinish,
                visible: state.teethVisibility,
                prices: state.teethPrices,
                preciousness: state.teethPreciousness,
                signatureVisible: state.signatureVisibility,
                signatureMaterial: state.signatureMaterial
            }]
        ];
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
        pprsdx: 0,
        pprssx: 0,
        ppridx: 0,
        pprisx: 0,
        sprsdx: 0,
        sprssx: 0,
        spridx: 0,
        sprisx: 0,
        msdx: 0,
        mssx: 0,
        midx: 0,
        misx: 0,
        signature: 0
    },
    total: 0,
    calcTotal: (state) => {
        if(state.prices){
            state.total = 0;
            for (let [tooth, visibility] of Object.entries(state.teethVisibility)) {
                if (visibility) {
                    let priceToFind;
                    let diamonds;
                    switch (state.teethJewelType[tooth]) {
                        case 'full':
                        case 'frame':
                        case 'enamel':
                        case 'bar':
                        case 'bigBar':
                            priceToFind = state.prices.base.filter(p => p.type === state.teethJewelType[tooth] && p.carats === state.teethPreciousness.carats);
                            if ((state.teethJewelType[tooth] === 'bar' && (tooth === 'icsdx' || tooth === 'icssx'))
                                || (state.teethJewelType[tooth] === 'bar' && (tooth === 'icidx' || tooth === 'icisx'))
                                || (state.teethJewelType[tooth] === 'bigBar' && (tooth === 'cidx' || tooth === 'cisx'))
                            ) {
                                state.teethPrices[tooth] = priceToFind[0].price / 2;
                                state.total += priceToFind[0].price / 2;
                            } else {
                                state.teethPrices[tooth] = priceToFind[0].price;
                                state.total += priceToFind[0].price;
                            }
                            break;
                        case 'bezel':
                            if (state.teethStones[tooth].color === 'whD' || state.teethStones[tooth].color === 'brD' || state.teethStones[tooth].color === 'blD') {
                                diamonds = firstCapital(state.teethPreciousness.diamonds as string);
                            } else {
                                diamonds = '';
                            }
                            const bezelStone = state.prices.bezel[state.teethStones[tooth].color + diamonds + '_b'];
                            priceToFind = bezelStone.filter(p => p.carats === state.teethPreciousness.carats && !p.pave && p.shape === state.teethStones[tooth].shape);
                            state.teethPrices[tooth] = priceToFind[0].price;
                            state.total += priceToFind[0].price;
                            break;
                        case 'fullDiamond':
                        case 'frameDiamond':
                        case 'barDiamond':
                        case 'bigBarDiamond':
                            const prevType = state.teethJewelType[tooth].slice();
                            const realType = prevType.replace('Diamond', '');
                            if (state.teethPaves[tooth].color === 'whD' || state.teethPaves[tooth].color === 'brD' || state.teethPaves[tooth].color === 'blD') {
                                diamonds = firstCapital(state.teethPreciousness.diamonds as string);
                            } else {
                                diamonds = '';
                            }
                            const paveStone = state.prices.pave[state.teethPaves[tooth].color + diamonds + '_p'];
                            priceToFind = paveStone.filter(p => p.type === realType && p.carats === state.teethPreciousness.carats && p.shape === state.teethPaves[tooth].shape);
                            if ((state.teethJewelType[tooth] === 'barDiamond' && (tooth === 'icsdx' || tooth === 'icssx'))
                                || (state.teethJewelType[tooth] === 'barDiamond' && (tooth === 'icidx' || tooth === 'icisx'))
                                || (state.teethJewelType[tooth] === 'bigBarDiamond' && (tooth === 'cidx' || tooth === 'cisx'))
                            ) {
                                state.teethPrices[tooth] = priceToFind[0].price / 2;
                                state.total += priceToFind[0].price / 2;
                            } else {
                                state.teethPrices[tooth] = priceToFind[0].price;
                                state.total += priceToFind[0].price;
                            }
                            break;
                        case 'bezelDiamond':
                            let bezelDiamonds;
                            if (state.teethPaves[tooth].color === 'whD' || state.teethPaves[tooth].color === 'brD' || state.teethPaves[tooth].color === 'blD') {
                                diamonds = firstCapital(state.teethPreciousness.diamonds as string);
                            } else {
                                diamonds = '';
                            }
                            if (state.teethStones[tooth].color === 'whD' || state.teethStones[tooth].color === 'brD' || state.teethStones[tooth].color === 'blD') {
                                bezelDiamonds = firstCapital(state.teethPreciousness.diamonds as string);
                            } else {
                                bezelDiamonds = '';
                            }
                            const paveStoneP = state.prices.pave[state.teethPaves[tooth].color + diamonds + '_p'];
                            const bezelStoneP = state.prices.bezel[state.teethStones[tooth].color + bezelDiamonds + '_b'];
                            priceToFind = paveStoneP.filter(p => p.carats === state.teethPreciousness.carats && p.type === 'full' && p.shape === state.teethPaves[tooth].shape);
                            let addonBezel = bezelStoneP.filter(p => p.carats === state.teethPreciousness.carats && p.pave && p.shape === state.teethStones[tooth].shape);
                            state.teethPrices[tooth] = priceToFind[0].price + addonBezel[0].price;
                            state.total += priceToFind[0].price + addonBezel[0].price;
                            break;
                    }

                    if (state.teethFinish[tooth] !== 'polished') {
                        const priceFinish = state.prices.finish.filter(p => p.carats === state.teethPreciousness.carats && p.type === state.teethFinish[tooth]);
                        if ((state.teethJewelType[tooth] === 'bar' && (tooth === 'icsdx' || tooth === 'icssx'))
                            || (state.teethJewelType[tooth] === 'bar' && (tooth === 'icidx' || tooth === 'icisx'))
                            || (state.teethJewelType[tooth] === 'bigBar' && (tooth === 'cidx' || tooth === 'cisx'))
                        ) {
                            state.teethPrices[tooth] += priceFinish[0].price / 2;
                            state.total += priceFinish[0].price / 2;
                        } else {
                            state.teethPrices[tooth] += priceFinish[0].price;
                            state.total += priceFinish[0].price;
                        }
                    }
                }
            }
            for (let [signature, visibility] of Object.entries(state.signatureVisibility)) {
                if (visibility) {
                    let signatureToFind;
                    let chosenSignature;
                    switch (signature) {
                        // "_" to differentiate variants w/ or w/o pave (base, lab, nat)
                        case 'vamp':
                        case 'cross':
                        case 'braces':
                        case 'tribal':
                            signatureToFind = state.prices.signature.filter(p => p.type.includes(signature) && p.carats === state.teethPreciousness.carats);
                            if (state.signatureMaterial[signature] !== 'pave') {
                                chosenSignature = signatureToFind.filter(p => p.type.includes('_base'));
                            } else {
                                chosenSignature = signatureToFind.filter(p => p.type.includes('_' + state.teethPreciousness.diamonds));
                            }
                            state.teethPrices.signature = chosenSignature[0].price;
                            state.total += chosenSignature[0].price;
                            break;
                        // no paves
                        case 'bubblegum':
                        case 'sprinkles':
                        case 'hammered':
                            signatureToFind = state.prices.signature.filter(p => p.type === signature && p.carats === state.teethPreciousness.carats);
                            state.teethPrices.signature = signatureToFind[0].price;
                            state.total += signatureToFind[0].price;
                            break;
                    }
                }
            }
            if (state.hovered) {
                state.hovered = undefined;
            }
        }
    },

    // state of the preciousness of the materials used in the configuration
    teethPreciousness: {
        carats: 10,
        diamonds: undefined
    },
    setTeethPreciousness: (carats:number, diamonds:string|undefined) =>
        set(
            produce((state) => {
                state.teethPreciousness.carats = carats;
                state.teethPreciousness.diamonds = diamonds;
                get().calcTotal(state);
            })
        ),
    // utilities
    checkDiamonds: (state) => {
        let counter = 0;
        for(let pave of Object.values(state.teethPaves)) {
            if(pave.color === 'whD' || pave.color === 'brD' || pave.color === 'blD') {
                counter++;
            }
        }
        for(let stone of Object.values(state.teethStones)) {
            if(stone.color === 'whD' || stone.color === 'brD' || stone.color === 'blD') {
                counter++;
            }
        }

        for(let material of Object.values(state.signatureMaterial)) {
            if(material === 'pave') {
                counter++;
            }
        }
        return counter > 0;
    },
}))

// initial data fetch
// useTeethStore.getState().fetchPrices();