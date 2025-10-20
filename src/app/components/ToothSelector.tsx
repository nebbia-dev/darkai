import {Box, Tab, Tabs} from "@mui/material";
import {ReactNode, SyntheticEvent, useState} from "react";
import {useTeethStore} from "@/app/stores/teeth";
import SelectorButtonPill from "@/app/components/SelectorButtonPill";
import DiamondTogglerPill from "@/app/components/DiamondTogglerPill";
import StoneSelectorPill from "@/app/components/StoneSelectorPill";
import {Shape} from "@/app/components/icons/Shape";
import {Metal} from "@/app/components/icons/Metal";
import {Gem} from "@/app/components/icons/Gem";
import {State} from "@/app/types/State";
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}
export default function ToothSelector({tooth} : {tooth: string}) {
    const [value, setValue] = useState<number>(0);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const pave = useTeethStore((state: State) => state.teethPave[tooth]);
    const jewelType = useTeethStore((state: State) => state.teethJewelType[tooth]);
    const material = useTeethStore((state: State) => state.teethMaterial[tooth]);
    const stones = useTeethStore((state: State) => state.teethStones[tooth]);
    const visible = useTeethStore((state: State) => state.teethVisibility[tooth]);
    const changeJewelType = useTeethStore((state: State) => state.setType);
    const changeMaterial = useTeethStore((state: State) => state.setMaterial);
    const toggleDiamond = useTeethStore((state: State) => state.setDiamond);
    const changeStone = useTeethStore((state: State) => state.setStone);
    const setActiveDefault = useTeethStore((state: State) => state.setActiveDefault);


    function selectType(type: string) {
        setActiveDefault(undefined, undefined);
        changeJewelType(tooth, type);
    }

    function selectMaterial(material: string) {
        setActiveDefault(undefined, undefined);
        changeMaterial(tooth, material);
    }

    function selectDiamond() {
        toggleDiamond(tooth, pave);
    }

    function selectStone(stone: string) {
        changeStone(tooth, stone, 'prev');
    }
    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                className="w-full bg-stone-200 h-[calc(100%-48px-0.2rem)]"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{height: 1, display:'grid', gridTemplateColumns:`${ value === 2 && (tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') ? '15% 70% 15%' : '25% 50% 25%'}`}}>{children}</Box>}
            </div>
        );
    }
    return(

        <div className={`${activeTooth === tooth ? 'block h-full' : 'hidden'}`}>
            <CustomTabPanel value={value} index={0}>
                <div className="flex items-center justify-center gap-8 col-start-2 col-end-2">
                    <div className="w-full flex flex-col gap-2 justify-center h-full">
                        <SelectorButtonPill click={() => selectType('full')}
                                            disabled={false} selection="full" stones={false}
                                            active={visible && (jewelType === 'full' || jewelType === 'fullDiamond')}/>

                        {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                            <SelectorButtonPill click={() => selectType('bar')}
                                                disabled={false} selection="bar" stones={false}
                                                active={visible && (jewelType === 'bar' || jewelType === 'barDiamond')}/>
                        }
                        {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                            <SelectorButtonPill click={() => selectType('frame')}
                                                disabled={false} selection="frame" stones={false}
                                                active={visible && (jewelType === 'frame' || jewelType === 'frameDiamond')}/>
                        }
                        {(tooth === 'cidx' || tooth === 'cisx') &&
                            <SelectorButtonPill click={() => selectType('bigBar')}
                                                disabled={false} selection="bigBar" stones={false}
                                                active={visible && (jewelType === 'bigBar' || jewelType === 'bigBarDiamond')}/>
                        }
                    </div>
                </div>
                <div className="flex items-center justify-center gap-8 col-start-3 col-end-3">
                    <button className={`${!visible ? 'opacity-50' : ''} w-8 h-8 bg-gray-50 rounded-full`}
                            onClick={(e) => changeTab(e, 1)}
                            disabled={!visible}>&rarr;</button>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="flex items-center justify-center gap-8 col-start-1 col-end-1">
                    <button className="w-8 h-8 bg-gray-50 rounded-full"
                            onClick={(e) => changeTab(e, 0)}>&larr;</button>
                </div>
                <div className="flex items-center justify-center gap-8 col-start-2 col-end-2">
                    <div className="w-full flex flex-col gap-2 justify-center h-full">
                        <SelectorButtonPill disabled={false} selection="gold" active={visible && (material === 'gold')}
                                            click={() => selectMaterial('gold')} stones={false}/>
                        <SelectorButtonPill disabled={false} selection="rose" active={visible && (material === 'rose')}
                                            click={() => selectMaterial('rose')} stones={false}/>
                        <SelectorButtonPill disabled={false} selection="white"
                                            active={visible && (material === 'white')}
                                            click={() => selectMaterial('white')} stones={false}/>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-8 col-start-3 col-end-3">
                    <button className={`${material === 'base' ? 'opacity-50' : ''} w-8 h-8 bg-gray-50 rounded-full`}
                            onClick={(e) => changeTab(e, 2)}
                            disabled={material === 'base'}
                    >&rarr;</button>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className="flex items-center justify-center gap-8 col-start-1 col-end-1">
                    <button className="w-8 h-8 bg-gray-50 rounded-full"
                            onClick={(e) => changeTab(e, 1)}>&larr;</button>
                </div>
                <div
                    className={`flex items-center justify-center gap-8 col-start-2 col-end-2 ${tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx' ? 'h-full' : ''}`}>
                    <div className={`${tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx'
                        ? 'w-full grid grid-cols-2 h-[50%] gap-2 items-center justify-center'
                        : 'w-full flex flex-col gap-2 justify-center h-full'
                    }`}>
                        {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                            <>
                                <StoneSelectorPill tooth={tooth} stone="sapphire"
                                                   active={visible && (stones.color === 'sapphire')}
                                                   onclick={() => selectStone('sapphire')}/>
                                <StoneSelectorPill tooth={tooth} stone="ruby" active={visible && (stones.color === 'ruby')}
                                                   onclick={() => selectStone('ruby')}/>
                                <StoneSelectorPill tooth={tooth} stone="emerald"
                                                   active={visible && (stones.color === 'emerald')}
                                                   onclick={() => selectStone('emerald')}/>
                                <StoneSelectorPill tooth={tooth} stone="amethyst"
                                                   active={visible && (stones.color === 'amethyst')}
                                                   onclick={() => selectStone('amethyst')}/>
                            </>
                        }
                        <DiamondTogglerPill tooth={tooth} onclick={selectDiamond}
                                            stones={tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx'}
                                            active={visible && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>

                    </div>
                </div>

            </CustomTabPanel>
        </div>
    )
}