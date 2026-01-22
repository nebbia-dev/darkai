export interface Materials {
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

    pprsdx: string,
    pprssx: string,
    ppridx: string,
    pprisx: string,

    sprsdx: string,
    sprssx: string,
    spridx: string,
    sprisx: string,

    msdx: string,
    mssx: string,
    midx: string,
    misx: string
}
export interface Enamel {
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
export interface Finish {
    [key: string]: string
    icsdx: 'polished' | 'sandblasted' | 'diamond_cut',
    icssx: 'polished' | 'sandblasted' | 'diamond_cut',
    icidx: 'polished' | 'sandblasted' | 'diamond_cut',
    icisx: 'polished' | 'sandblasted' | 'diamond_cut',
    ilsdx: 'polished' | 'sandblasted' | 'diamond_cut',
    ilssx: 'polished' | 'sandblasted' | 'diamond_cut',
    ilidx: 'polished' | 'sandblasted' | 'diamond_cut',
    ilisx: 'polished' | 'sandblasted' | 'diamond_cut',
    csdx: 'polished' | 'sandblasted' | 'diamond_cut',
    cssx: 'polished' | 'sandblasted' | 'diamond_cut',
    cidx: 'polished' | 'sandblasted' | 'diamond_cut',
    cisx: 'polished' | 'sandblasted' | 'diamond_cut',
    pprsdx: 'polished' | 'sandblasted' | 'diamond_cut',
    pprssx: 'polished' | 'sandblasted' | 'diamond_cut',
    ppridx: 'polished' | 'sandblasted' | 'diamond_cut',
    pprisx: 'polished' | 'sandblasted' | 'diamond_cut',

    sprsdx: 'polished' | 'sandblasted' | 'diamond_cut',
    sprssx: 'polished' | 'sandblasted' | 'diamond_cut',
    spridx: 'polished' | 'sandblasted' | 'diamond_cut',
    sprisx: 'polished' | 'sandblasted' | 'diamond_cut',

    msdx: 'polished' | 'sandblasted' | 'diamond_cut',
    mssx: 'polished' | 'sandblasted' | 'diamond_cut',
    midx: 'polished' | 'sandblasted' | 'diamond_cut',
    misx: 'polished' | 'sandblasted' | 'diamond_cut'
}
export interface JewelTypes {
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

    pprsdx: string,
    pprssx: string,
    ppridx: string,
    pprisx: string,

    sprsdx: string,
    sprssx: string,
    spridx: string,
    sprisx: string,

    msdx: string,
    mssx: string,
    midx: string,
    misx: string

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
export interface Pave {
    shape: 'round' |  'princess' | 'baguette' | 'hexagon' | 'mosaic' | undefined,
    color: string | undefined
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
    vamp: 'white' | 'pave' | 'black' | undefined,
    hammered: 'white' | 'gold' | 'black' | undefined,
    cross: 'white' | 'pave' | 'rose' | 'black' | undefined,
    bubblegum: 'pink' | 'blue' | 'green' | undefined,
    sprinkles: 'white' | 'gold' | 'rose' | undefined,
    tribal: 'white' | 'pave' | 'gold' | undefined,
    braces: 'emerald' | 'ruby' | undefined
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
export interface Stone {
    // aggiungere i colori
    shape: 'circle' |  'square' | 'baguette' | 'tear' | 'heart' | 'marquise' | undefined,
    color: string | undefined
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
    [key: string]: boolean|string
    premium: boolean,
    out: string,
    in: string,
    details: string,
    text: string
}