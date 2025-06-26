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
                state.teethMaterial[tooth] = color;
                if(!state.teethVisibility[tooth]) {
                    state.teethVisibility[tooth] = true;
                }
            }),
        ),
    setType: (tooth, type) =>
        set(
            produce((state) => {
                state.teethJewelType[tooth] = type;
                if(!state.teethVisibility[tooth]) {
                    state.teethVisibility[tooth] = true;
                    state.teethMaterial[tooth] = 'gold';
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
}))