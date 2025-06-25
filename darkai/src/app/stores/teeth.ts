import { create } from 'zustand';
import {produce} from "immer";

export const useTeethStore = create((set) => ({
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
    setGeometry: (fbx) => {
        set({teethGeometry: fbx});
    },
   setMaterial: (tooth, color) =>
        set(
            produce((state) => {
                state.teethMaterial[tooth] = color
            }),
        ),
    setType: (tooth, type) =>
        set(
            produce((state) => {
                state.teethJewelType[tooth] = type;
            }),
        ),
    setVisibility: (tooth) =>
        set(
            produce((state) => {
                state.teethVisibility[tooth] = !state.teethVisibility[tooth];
            }),
        ),
}))