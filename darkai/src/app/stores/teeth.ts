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
    setGeometry: (fbx) => {
        set({teethGeometry: fbx});
    },
   setMaterial: (tooth, color) =>
        set(
            produce((state) => {
                state.teethMaterial[tooth] = color
            }),
        )
}))