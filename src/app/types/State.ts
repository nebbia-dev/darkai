import {CubeTexture, Texture} from "three";
import FBX from "@/app/types/FBX";

interface Materials {
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
interface JewelTypes {
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
interface Pave {
    [key: string]: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    icsdx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    icssx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    icidx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    icisx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    ilsdx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    ilssx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    ilidx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    ilisx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    csdx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    cssx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    cidx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
    cisx: 'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'base',
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
    shape: string | undefined,
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

interface Preciousness {
    [key: string]: string | undefined,
    carats: string | undefined,
    diamonds: string | undefined
}
interface History {
    material: Materials,
    stones: Stones,
    pave: Pave,
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
    ui: boolean,
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
    teethPave: Pave,
    activeTab: number,
    loaded: boolean,
    prices: BasePrices[] | undefined,
    pricesAdds: AddonsPrices[] | undefined,
    total: number,
    isScreenshotNeeded: boolean | undefined,
    resetControls: boolean | undefined,
    recap: boolean,
    teethPreciousness: Preciousness,
    totalPreciousness: number,
    calcPreciousness: (gold:string, diamond:string|undefined) => void,
    setRecap: (bool:boolean) => void,
    setIsScreenshotNeeded: (value:boolean|undefined) => void,
    setResetControls: (value:boolean|undefined) => void,
    setActiveTab: (value:number) => void,
    setEnvMap: (em: Texture | CubeTexture) => void,
    setGeometry: (fbx:FBX) => void,
    setMaterial: (tooth:string, color:string) => void,
    setType: (tooth:string, type:string) => void,
    setDiamond: (tooth:string, pave:string) => void,
    setStone: (tooth:string, shape:string, color:string) => void,
    setActiveTooth: (tooth:string|undefined) => void,
    setDefaultConfig: (config:string, color:string) => void,
    setTooth: (tooth:string, type:string, color:string) => void,
    resetTooth: (tooth:string) => void,
    setActiveDefault: (active:string|undefined, color:string|undefined) => void,
    setCopy: (copied:string, original:string) =>void,
    setLoaded: (bool:boolean) => void,
    setUI: (bool:boolean) => void,
    fetchPrices: () => void,
    undo: () => void,
    redo: () => void,
    reset: () => void,
    calcTotal: (state:State) => void,
    setHistory: (state:State) => void
}