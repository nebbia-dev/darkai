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

interface Pave {
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
    [key: string]: string | undefined,
    carats: string | undefined,
    diamonds: string | undefined
}
export interface History {
    material: Materials,
    stones: Stones,
    pave: Paves,
    type: JewelTypes,
    visible: Visibility,
    prices: Prices,
    preciousness: Preciousness | undefined
}
export interface BasePrices {
    [key: string]: any,
    barDiamond: number | null,
    barGold: number | null,
    barRose: number | null,
    barWhite: number | null,
    bigBarDiamond: number | null,
    bigBarGold: number | null,
    bigBarRose: number | null,
    bigBarWhite: number | null,
    created_at: Date,
    frameDiamond: number | null,
    frameGold: number | null,
    frameRose: number | null,
    frameWhite: number | null,
    fullDiamond: number | null,
    fullGold: number | null,
    fullRose: number | null,
    fullWhite: number | null,
    id: number,
    tooth: string
}

export interface AddonsPrices {
    [key: string]: any,
    marquiseShape: number | null,
    tearShape: number | null,
    diamondShape: number | null,
    heartShape: number | null,
    circleShape: number | null,
    created_at: Date,
    id: number,
    stone: string
}

export interface State {
    envMap: Texture | CubeTexture | undefined,
    teethGeometry: FBX,
    teethMaterial: Materials,
    teethJewelType: JewelTypes,
    teethStones: Stones,
    teethVisibility: Visibility,
    teethPrices: Prices,
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
    activeTab: number,
    loaded: boolean,
    prices: BasePrices[] | undefined,
    pricesAdds: AddonsPrices[] | undefined,
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
    setActiveTab: (value:number) => void,
    setEnvMap: (em: Texture | CubeTexture) => void,
    setGeometry: (fbx:FBX) => void,
    setMaterial: (tooth:string, color:string) => void,
    setType: (tooth:string, type:string) => void,
    setPave: (tooth:string, pave:string) => void,
    setStone: (tooth:string, shape:string, color:string) => void,
    setEnamel: (tooth:string, color:string) => void,
    setActiveTooth: (tooth:string|undefined) => void,
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