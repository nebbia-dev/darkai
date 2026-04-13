export type EnamelColor = "blue" | "turquoise" | "green" | "yellow" | "orange" | "red" | "pink" | "purple" | "ivory" | "brown" | "black" | undefined

export type Material = 'base' | 'gold' | 'white' | 'rose' | 'black'

export type FinishType = 'polished' | 'sandblasted' | 'diamond_cut'

export type Design = 'signature' | 'full' | 'frame' | 'enamel' | 'bar' | 'bigBar' | 'bezel' | 'fullDiamond' | 'frameDiamond' | 'barDiamond' | 'bigBarDiamond' | 'bezelDiamond'

export interface Pave {
    shape: 'round' |  'princess' | 'baguette' | 'hexagon' | 'mosaic' | undefined,
    color: string | undefined
}
export interface Stone {
    // aggiungere i colori
    shape: 'round' |  'princess' | 'baguette' | 'drop' | 'heart' | 'marquise' | undefined,
    color: string | undefined
}

export interface Materials {
    [key: string]: Material
    icsdx: Material,
    icssx: Material,
    icidx: Material,
    icisx: Material,
    ilsdx: Material,
    ilssx: Material,
    ilidx: Material,
    ilisx: Material,
    csdx: Material,
    cssx: Material,
    cidx: Material,
    cisx: Material,

    pprsdx: Material,
    pprssx: Material,
    ppridx: Material,
    pprisx: Material,

    sprsdx: Material,
    sprssx: Material,
    spridx: Material,
    sprisx: Material,

    msdx: Material,
    mssx: Material,
    midx: Material,
    misx: Material
}

export interface Enamel {
    // mettere i colori
    [key: string]: EnamelColor
    icsdx: EnamelColor,
    icssx: EnamelColor,
    icidx: EnamelColor,
    icisx: EnamelColor,
    ilsdx: EnamelColor,
    ilssx: EnamelColor,
    ilidx: EnamelColor,
    ilisx: EnamelColor,
    csdx: EnamelColor,
    cssx: EnamelColor,
    cidx: EnamelColor,
    cisx: EnamelColor,
    pprsdx: EnamelColor,
    pprssx: EnamelColor,
    ppridx: EnamelColor,
    pprisx: EnamelColor,
    sprsdx: EnamelColor,
    sprssx: EnamelColor,
    spridx: EnamelColor,
    sprisx: EnamelColor,
    msdx: EnamelColor,
    mssx: EnamelColor,
    midx: EnamelColor,
    misx: EnamelColor
}
export interface Finish {
    [key: string]: FinishType
    icsdx: FinishType,
    icssx: FinishType,
    icidx: FinishType,
    icisx: FinishType,
    ilsdx: FinishType,
    ilssx: FinishType,
    ilidx: FinishType,
    ilisx: FinishType,
    csdx: FinishType,
    cssx: FinishType,
    cidx: FinishType,
    cisx: FinishType,
    pprsdx: FinishType,
    pprssx: FinishType,
    ppridx: FinishType,
    pprisx: FinishType,

    sprsdx: FinishType,
    sprssx: FinishType,
    spridx: FinishType,
    sprisx: FinishType,

    msdx: FinishType,
    mssx: FinishType,
    midx: FinishType,
    misx: FinishType
}
export interface JewelTypes {
    [key: string]: Design
    icsdx: Design,
    icssx: Design,
    icidx: Design,
    icisx: Design,
    ilsdx: Design,
    ilssx: Design,
    ilidx: Design,
    ilisx: Design,
    csdx: Design,
    cssx: Design,
    cidx: Design,
    cisx: Design,

    pprsdx: Design,
    pprssx: Design,
    ppridx: Design,
    pprisx: Design,

    sprsdx: Design,
    sprssx: Design,
    spridx: Design,
    sprisx: Design,

    msdx: Design,
    mssx: Design,
    midx: Design,
    misx: Design

}
export interface Paves {
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
    pprsdx: Pave,
    pprssx: Pave,
    ppridx: Pave,
    pprisx: Pave,

    sprsdx: Pave,
    sprssx: Pave,
    spridx: Pave,
    sprisx: Pave,

    msdx: Pave,
    mssx: Pave,
    midx: Pave,
    misx: Pave
}
export interface Stones {
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
    pprsdx: Stone,
    pprssx: Stone,
    ppridx: Stone,
    pprisx: Stone,
    sprsdx: Stone,
    sprssx: Stone,
    spridx: Stone,
    sprisx: Stone,
    msdx: Stone,
    mssx: Stone,
    midx: Stone,
    misx: Stone
}
export interface Prices {
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

    pprsdx: number,
    pprssx: number,
    ppridx: number,
    pprisx: number,

    sprsdx: number,
    sprssx: number,
    spridx: number,
    sprisx: number,

    msdx: number,
    mssx: number,
    midx: number,
    misx: number,

    signature: number
}
export interface Visibility {
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

    pprsdx: boolean,
    pprssx: boolean,
    ppridx: boolean,
    pprisx: boolean,

    sprsdx: boolean,
    sprssx: boolean,
    spridx: boolean,
    sprisx: boolean,

    msdx: boolean,
    mssx: boolean,
    midx: boolean,
    misx: boolean
}
export interface SignMaterial {
    [key: string]: string | undefined,
    vamp: 'base_white' | 'pave_lab' | 'pave_nat' | 'base_black' | undefined,
    hammered: 'base_white' | 'base_gold' | 'base_black' | undefined,
    cross: 'base_white' | 'pave_lab' | 'pave_nat' | 'base_rose' | 'base_gold' | undefined,
    bubblegum: 'pink' | 'blue' | 'green' | undefined,
    sprinkles: 'white_lab' | 'gold_lab' | 'rose_lab' | 'white_nat' | 'gold_nat' | 'rose_nat' | undefined,
    tribal: 'base_white' | 'pave_lab' | 'pave_nat' | 'base_gold' | undefined,
    braces: 'base_white' | 'pave_lab' | undefined
}
export interface SignatureTeeth {
    [key: string]: string[],
    vamp: string[],
    hammered: string[],
    cross: string[],
    bubblegum: string[],
    sprinkles: string[],
    tribal: string[],
    braces: string[]
}
export interface SignVisibility {
    [key: string]: boolean,
    vamp: boolean,
    hammered: boolean,
    cross: boolean,
    bubblegum: boolean,
    sprinkles: boolean,
    tribal: boolean,
    braces: boolean
}

export interface Preciousness {
    [key: string]: number,
    carats: number,
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
    preciousness: Preciousness | undefined,
    signatureVisible: SignVisibility,
    signatureMaterial: SignMaterial
}
export interface HistoryPack {
    packaging: Packaging
}
export interface Neighbours {
    [key: string]: undefined|string
    icsdx: undefined|string,
    icssx: undefined|string,
    icidx: undefined|string,
    icisx: undefined|string,
    ilsdx: undefined|string,
    ilssx: undefined|string,
    ilidx: undefined|string,
    ilisx: undefined|string,
    csdx: undefined|string,
    cssx: undefined|string,
    cidx: undefined|string,
    cisx: undefined|string,
}
export interface Packaging {
    [key: string]: boolean|string|{firstLine: string, secondLine: string}
    premium: boolean,
    out: string,
    in: string,
    details: string,
    text: {firstLine: string, secondLine: string}
}