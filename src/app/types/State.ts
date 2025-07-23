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
interface Stones {
    [key: string]: string | undefined
    csdx: string | undefined,
    cssx: string | undefined,
    cidx: string | undefined,
    cisx: string | undefined,
}
interface History {
    material: Materials,
    stones: Stones,
    type: JewelTypes,
    visible: Visibility,
    prices: Prices
}
interface BasePrices {
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

interface AddonsPrices {
    tearShape: number | null,
    diamondShape: number | null,
    heartShape: number | null,
    circleShape: number | null,
    created_at: Date,
    id: number,
    stone: string
}

export default interface State {
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
    activeTab: number,
    loaded: boolean,
    prices: BasePrices[] | undefined,
    pricesAdds: AddonsPrices[] | undefined,
    total: number,
    isScreenshotNeeded: boolean | undefined,
    setIsScreenshotNeeded: (value:boolean|undefined) => void,
    resetControls: boolean | undefined,
    setResetControls: (value:boolean|undefined) => void,
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
    resetTooth: (tooth:string) => void,
    setActiveDefault: (active:string|undefined, color:string|undefined) => void,
    setCopy: (copied:string, original:string|undefined) =>void,
    setLoaded: (bool:boolean) => void,
    setUI: (bool:boolean) => void,
    fetchPrices: () => void,
    undo: () => void,
    redo: () => void,
    reset: () => void,
    calcTotal: (state:State) => void
}