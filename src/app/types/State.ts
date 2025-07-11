import {CubeTexture, Texture} from "three";
import FBX from "@/app/types/FBX";

interface Materials {
    icsdx: string,
    icssx: string,
    icidx: string,
    icisx: string,
    ilsdx: string,
    ilssx: string,
    ilidx: string,
    ilisx: string,
    csdx: string,
    cssx: string,
    cidx: string,
    cisx: string,
}
interface JewelTypes {
    icsdx: string,
    icssx: string,
    icidx: string,
    icisx: string,
    ilsdx: string,
    ilssx: string,
    ilidx: string,
    ilisx: string,
    csdx: string,
    cssx: string,
    cidx: string,
    cisx: string,
}
interface Visibility {
    icsdx: boolean,
    icssx: boolean,
    icidx: boolean,
    icisx: boolean,
    ilsdx: boolean,
    ilssx: boolean,
    ilidx: boolean,
    ilisx: boolean,
    csdx: boolean,
    cssx: boolean,
    cidx: boolean,
    cisx: boolean,
}
interface Stones {
    csdx: string | null,
    cssx: string | null,
    cidx: string | null,
    cisx: string | null,
}
interface History {
    material: Materials,
    stones: Stones,
    type: JewelTypes,
    visible: Visibility
}

export default interface State {
    envMap: Texture | CubeTexture | null,
    teethGeometry: FBX | null,
    teethMaterial: Materials,
    teethJewelType: JewelTypes,
    teethStones: Stones,
    teethVisibility: Visibility,
    history: History[][],
    currentHistory: number,
    activeDefault: string | null,
    currentTooth: string| null,
    ui: boolean,
    teethTypeOptions: {
        full: string[],
        fullDiamond: string[],
        bar: string[],
        barDiamond: string[],
        frame: string[],
        frameDiamond: string[],
        stones: string[]
    },
    activeTab: number,
    loaded: boolean,
    setActiveTab: (value:number) => void,
    setEnvMap: (em: Texture | CubeTexture) => void,
    setGeometry: (fbx:FBX) => void,
    setMaterial: (tooth:string, color:string) => void,
    setType: (tooth:string, type:string) => void,
    setDiamond: (tooth:string) => void,
    setStone: (tooth:string, stone:string) => void,
    setActiveTooth: (tooth:string) => void,
    setDefaultConfig: (config:string, color:string) => void,
    setTooth: (tooth:string, type:string, color:string) => void,
    setActiveDefault: (active:string|null, color:string|null) => void,
    setCopy: (copied:string, original:string) =>void,
    setLoaded: (bool:boolean) => void,
    setUI: (bool:boolean) => void,
    undo: () => void,
    redo: () => void,
    reset: () => void
}