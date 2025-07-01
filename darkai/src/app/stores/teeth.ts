import { create } from 'zustand';
import {produce} from "immer";

export const useTeethStore = create((set) => ({
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
    setEnvMap: (em) => {
        set({envMap: em})
    },
    setGeometry: (fbx) => {
        set({teethGeometry: fbx});
    },
    setMaterial: (tooth, color) =>
        set(
            produce((state) => {
                if(state.teethJewelType[tooth] === 'bigBar' || state.teethJewelType[tooth] === 'bigBarDiamond') {
                    state.teethMaterial.cisx = color;
                    state.teethMaterial.cidx = color;
                } else {
                    state.teethMaterial[tooth] = color;
                    if(!state.teethVisibility[tooth]) {
                        state.teethVisibility[tooth] = true;
                    }
                }
            }),
        ),
    setType: (tooth, type) =>
        set(
            produce((state) => {
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
                        return;
                    }
                    state.teethVisibility[tooth] = false;
                    state.teethJewelType[tooth] = 'full';
                    return;
                }

                if(type !== 'full' && type !== 'fullDiamond') {
                    state.teethStones[tooth] = null;
                }

                if(type === 'bigBar' || type === 'bigBarDiamond') {
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
                                break;
                            case 'cisx':
                                state.teethJewelType.cisx = type;
                                state.teethJewelType.cidx = 'full';
                                state.teethVisibility.cidx = false;
                                state.teethMaterial.cidx = 'base';
                                break;
                        }
                    } else {
                        state.teethJewelType[tooth] = type;
                        if(!state.teethVisibility[tooth]) {
                            state.teethVisibility[tooth] = true;
                            state.teethMaterial[tooth] = 'gold';
                        }
                    }
                }
            }),
        ),
    setDiamond: (tooth) =>
        set(
            produce((state) => {
                if(!state.teethVisibility[tooth] || state.teethMaterial[tooth] === 'base') {
                    return;
                }

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
            })
        ),
    setStone: (tooth, stone) =>
        set(
            produce((state) => {
                if(state.teethStones[tooth] === stone) {
                    state.teethStones[tooth] = null
                } else {
                    state.teethStones[tooth] = stone;
                }
            }),
        ),
    setVisibility: (tooth) =>
        set(
            produce((state) => {
                state.teethVisibility[tooth] = !state.teethVisibility[tooth];
            }),
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