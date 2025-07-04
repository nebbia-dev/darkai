import {Box, Tab, Tabs} from "@mui/material";
import {ReactNode, SyntheticEvent, useState} from "react";
import {useTeethStore} from "@/app/stores/teeth";
import elabToothName from "@/app/helpers/elabToothName";
import SelectorButtonPill from "@/app/components/SelectorButtonPill";
import DiamondTogglerPill from "@/app/components/DiamondTogglerPill";
import StoneSelectorPill from "@/app/components/StoneSelectorPill";
import {Copy} from "@/app/components/icons/Copy";
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}
export default function ToothSelector({tooth}) {
    const [value, setValue] = useState<number>(0);
    const activeTooth = useTeethStore((state) => state.currentTooth);

    const jewelType = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const stones = useTeethStore((state) => state.teethStones[tooth]);
    const visible = useTeethStore((state) => state.teethVisibility[tooth]);
    const changeJewelType = useTeethStore((state) => state.setType);
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    const toggleDiamond = useTeethStore((state) => state.setDiamond);
    const changeStone = useTeethStore((state) => state.setStone);
    const setActiveDefault = useTeethStore((state) => state.setActiveDefault);


    function selectType(type) {
        setActiveDefault(null, null);
        changeJewelType(tooth, type);
    }

    function selectMaterial(material) {
        setActiveDefault(null, null);
        changeMaterial(tooth, material);
    }

    function selectDiamond() {
        toggleDiamond(tooth);
    }

    function selectStone(stone) {
        changeStone(tooth, stone);
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
                {value === index && <Box sx={{height: 1, display:'grid', gridTemplateRows:'80% 10% 10%', gridTemplateColumns:'25% 50% 25%'}}>{children}</Box>}
            </div>
        );
    }
    return(

        <div className={`${activeTooth === tooth ? 'block h-full' : 'hidden'}`}>
            <div className="w-full">
                <Tabs
                    value={value} onChange={changeTab} aria-label="tabs" sx={{
                    width: 1,
                    '& .MuiTabs-indicator': {top: 0, backgroundColor: '#030712', height: '0.2rem'},
                    borderBottom: '1px solid #9ca3af',
                    borderTop: '1px solid #9ca3af',
                    backgroundColor: '#f9fafb',
                    '& .Mui-selected': {color: '#030712 !important'}
                }}>
                    <Tab label="Tipo" sx={{width: 0.33, maxWidth: 1}}/>
                    <Tab label="Metallo" sx={{width: 0.33, maxWidth: 1}}/>
                    <Tab label="Pietre" sx={{width: 0.33, maxWidth: 1}}/>
                </Tabs>
            </div>

            <CustomTabPanel value={value} index={0}>
                {/*<div className={`${visible && material !== 'base' ? 'flex' : 'hidden'} relative items-center justify-center col-start-1 col-end-1 row-start-1 row-end-1`}>*/}
                {/*    <button className=" rounded-full border p-2 cursor-pointer w-fit"*/}
                {/*            onClick={() => setShowCopy((prev) => !prev)}>*/}
                {/*        <Copy className="w-8 h-8"/>*/}
                {/*    </button>*/}
                {/*    <div*/}
                {/*        className={`${showCopy && availableTypes[jewelType] ? 'block' : 'hidden'} absolute border p-4 rounded mt-2 bg-gray-50 z-10 top-[-75%] max-h-[100px] overflow-y-auto`}>*/}
                {/*        <ul>*/}
                {/*            {availableTypes[jewelType] && availableTypes[(stones ? 'stones' : jewelType)].map((data, i) => {*/}
                {/*                const opt = elabToothName(data, false);*/}

                {/*                return (*/}
                {/*                    <li key={data + tooth + i}>*/}
                {/*                        {data !== tooth &&*/}
                {/*                            <button onClick={() => setCopy(data, tooth)}>*/}
                {/*                                {opt}*/}
                {/*                            </button>*/}
                {/*                        }*/}
                {/*                    </li>*/}
                {/*                )*/}
                {/*            })*/}
                {/*            }*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="flex items-center justify-center gap-8 col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="flex gap-2">
                        <SelectorButtonPill adjust={true} click={() => selectType('full')}
                                            disabled={false} selection="full"
                                            active={visible && (jewelType === 'full' || jewelType === 'fullDiamond')}/>

                        {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                            <SelectorButtonPill adjust={true} click={() => selectType('bar')}
                                                disabled={false} selection="bar"
                                                active={visible && (jewelType === 'bar' || jewelType === 'barDiamond')}/>
                        }
                        {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                            <SelectorButtonPill adjust={true} click={() => selectType('frame')}
                                                disabled={false} selection="frame"
                                                active={visible && (jewelType === 'frame' || jewelType === 'frameDiamond')}/>
                        }
                        {(tooth === 'cidx' || tooth === 'cisx') &&
                            <SelectorButtonPill adjust={true} click={() => selectType('bigBar')}
                                                disabled={false} selection="bigBar"
                                                active={visible && (jewelType === 'bigBar' || jewelType === 'bigBarDiamond')}/>
                        }
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="flex items-center justify-center gap-8 col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="flex gap-2">
                        <SelectorButtonPill disabled={false} selection="gold" active={visible && (material === 'gold')}
                                            click={() => selectMaterial('gold')}/>
                        <SelectorButtonPill disabled={false} selection="rose" active={visible && (material === 'rose')}
                                            click={() => selectMaterial('rose')}/>
                        <SelectorButtonPill disabled={false} selection="white"
                                            active={visible && (material === 'white')}
                                            click={() => selectMaterial('white')}/>
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className="flex items-center justify-center gap-8 col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="flex gap-4">
                        <DiamondTogglerPill tooth={tooth} onclick={selectDiamond}
                                            active={visible && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                        {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                            <div className="flex gap-2">
                                <StoneSelectorPill tooth={tooth} stone="sapphire"
                                               active={visible && (stones === 'sapphire')}
                                               onclick={() => selectStone('sapphire')}/>
                                <StoneSelectorPill tooth={tooth} stone="ruby" active={visible && (stones === 'ruby')}
                                               onclick={() => selectStone('ruby')}/>
                                <StoneSelectorPill tooth={tooth} stone="emerald"
                                               active={visible && (stones === 'emerald')}
                                               onclick={() => selectStone('emerald')}/>
                                <StoneSelectorPill tooth={tooth} stone="amethyst"
                                               active={visible && (stones === 'amethyst')}
                                               onclick={() => selectStone('amethyst')}/>
                            </div>
                        }
                    </div>
                </div>

            </CustomTabPanel>
        </div>
    )
}