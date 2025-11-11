import {CubeTexture, Texture} from "three";
import FBX from "@/app/types/FBX";

interface Materials {
    // mettere i colori
    [key: string]: string
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

interface Enamel {
    // mettere i colori
    [key: string]: string |undefined
    icsdx: string | undefined,
    icssx: string | undefined,
    icidx: string | undefined,
    icisx: string | undefined,
    ilsdx: string | undefined,
    ilssx: string | undefined,
    ilidx: string | undefined,
    ilisx: string | undefined,
    csdx: string | undefined,
    cssx: string | undefined,
    cidx: string | undefined,
    cisx: string | undefined,
}

interface Finish {
    [key: string]: string
    icsdx: 'polished' | 'sandblasted' | 'diamond cut',
    icssx: 'polished' | 'sandblasted' | 'diamond cut',
    icidx: 'polished' | 'sandblasted' | 'diamond cut',
    icisx: 'polished' | 'sandblasted' | 'diamond cut',
    ilsdx: 'polished' | 'sandblasted' | 'diamond cut',
    ilssx: 'polished' | 'sandblasted' | 'diamond cut',
    ilidx: 'polished' | 'sandblasted' | 'diamond cut',
    ilisx: 'polished' | 'sandblasted' | 'diamond cut',
    csdx: 'polished' | 'sandblasted' | 'diamond cut',
    cssx: 'polished' | 'sandblasted' | 'diamond cut',
    cidx: 'polished' | 'sandblasted' | 'diamond cut',
    cisx: 'polished' | 'sandblasted' | 'diamond cut',
}
interface JewelTypes {
    // mettere i tipi di design
    [key: string]: string
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
interface Paves {
    [key: string]: Pave,
    icsdx: Pave,
    icssx: Pave,
    icidx: Pave,
    icisx: Pave,
    ilsdx: Pave,
    ilssx: Pave,
    ilidx: Pave,
    ilisx: Pave,
    csdx: Pave,
    cssx: Pave,
    cidx: Pave,
    cisx: Pave,
}

export interface Pave {
    shape: 'round' |  'princess' | 'baguette' | 'hex' | 'mosaic' | undefined,
    color: string | undefined
}
interface Prices {
    [key: string]: number
    icsdx: number,
    icssx: number,
    icidx: number,
    icisx: number,
    ilsdx: number,
    ilssx: number,
    ilidx: number,
    ilisx: number,
    csdx: number,
    cssx: number,
    cidx: number,
    cisx: number,
}
interface Visibility {
    [key: string]: boolean
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
export interface Stone {
    // aggiungere i colori
    shape: 'circle' |  'square' | 'baguette' | 'tear' | 'heart' | 'marquise' | undefined,
    color: string | undefined
}
interface Stones {
    [key: string]: Stone
    icsdx: Stone,
    icssx: Stone,
    icidx: Stone,
    icisx: Stone,
    ilsdx: Stone,
    ilssx: Stone,
    ilidx: Stone,
    ilisx: Stone,
    csdx: Stone,
    cssx: Stone,
    cidx: Stone,
    cisx: Stone,
}

export interface Preciousness {
    [key: string]: string | number | undefined,
    carats: number,
    diamonds: string | undefined
}
export interface History {
    material: Materials,
    stones: Stones,
    pave: Paves,
    type: JewelTypes,
    finish: Finish,
    enamel: Enamel,
    visible: Visibility,
    prices: Prices,
    preciousness: Preciousness | undefined
}

export interface State {
    envMap: Texture | CubeTexture | undefined,
    hovered: string|undefined,
    teethGeometry: FBX,
    teethMaterial: Materials,
    teethJewelType: JewelTypes,
    teethStones: Stones,
    teethVisibility: Visibility,
    teethPrices: Prices,
    teethFinish: Finish,
    history: History[][],
    currentHistory: number,
    activeDefault: string | undefined,
    currentTooth: string | undefined,
    lastActivatedTooth: string | undefined,
    teethTypeOptions: {
        [key: string]: string[]
        full: string[],
        fullDiamond: string[],
        bar: string[],
        barDiamond: string[],
        frame: string[],
        frameDiamond: string[],
        stones: string[]
    },
    teethEnamel: Enamel,
    teethPaves: Paves,
    activeButton: string|undefined,
    activeSubButton: string|undefined,
    loaded: boolean,
    prices: any[] | undefined | null,
    total: number,
    isScreenshotNeeded: boolean | undefined,
    resetControls: boolean | undefined,
    recap: boolean,
    teethPreciousness: Preciousness,
    setRecap: (bool:boolean) => void,
    setActiveButton: (button:string|undefined) => void,
    setActiveSubButton: (button:string|undefined) => void,
    setIsScreenshotNeeded: (value:boolean|undefined) => void,
    setResetControls: (value:boolean|undefined) => void,
    setEnvMap: (em: Texture | CubeTexture) => void,
    setHover: (tooth: string|undefined) => void,
    setGeometry: (fbx:FBX) => void,
    setMaterial: (tooth:string, color:string) => void,
    setType: (tooth:string, type:string) => void,
    setPave: (tooth:string, pave:string, color:string|undefined) => void,
    setStone: (tooth:string, shape:string, color:string) => void,
    setEnamel: (tooth:string, color:string) => void,
    setActiveTooth: (tooth:string|undefined) => void,
    setTeethPreciousness: (carats:number, diamonds:string|undefined) => void,
    unsetLastActivatedTooth: () => void,
    setDefaultConfig: (config:string, color:string) => void,
    setTooth: (tooth:string, type:string, color:string) => void,
    resetTooth: (tooth:string) => void,
    setActiveDefault: (active:string|undefined, color:string|undefined) => void,
    setLoaded: (bool:boolean) => void,
    fetchPrices: () => void,
    undo: () => void,
    redo: () => void,
    reset: () => void,
    calcTotal: (state:State) => void,
    setHistory: (state:State) => void
}