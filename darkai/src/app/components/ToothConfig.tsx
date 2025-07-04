import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectorButton from "@/app/components/SelectorButton";
import {Copy} from "@/app/components/icons/Copy";
import {useState} from "react";
import elabToothName from "@/app/helpers/elabToothName";

export default function ToothConfig({tooth}) {
    const jewelType = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const stones = useTeethStore((state) => state.teethStones[tooth]);
    const visible = useTeethStore((state) => state.teethVisibility[tooth]);
    const availableTypes = useTeethStore((state) => state.teethTypeOptions);
    const changeJewelType = useTeethStore((state) => state.setType);
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    const toggleDiamond = useTeethStore((state) => state.setDiamond);
    const changeStone = useTeethStore((state) => state.setStone);
    const copy = useTeethStore((state) => state.setCopy);
    const setActiveDefault = useTeethStore((state) => state.setActiveDefault);
    const firstChild = tooth === 'icsdx' ? '' : '1px solid #9ca3af';
    const [showCopy, setShowCopy] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const title = elabToothName(tooth, false);

    function selectType(type) {
        setActiveDefault(null, null);
        setShowCopy(false);
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

    console.log('oh no');

    return (
        <Accordion elevation={0} sx={{backgroundColor: '#f9fafb', '&:before': {height: '0px'}}}
                   expanded={visible || expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{height: '100px', borderTop: firstChild, px: 8}}
                              onClick={() => setExpanded((prev) => !prev)} id={tooth}>
                {title}
            </AccordionSummary>
            <AccordionDetails sx={{borderTop: '1px solid #9ca3af'}}>
                <div className="w-full flex flex-col gap-8 relative text-right">
                    <div className={`${visible && material !== 'base' ? 'block' : 'hidden'} absolute top-4 right-4`}>
                        <button className=" rounded-full border p-2 cursor-pointer w-fit"
                                onClick={() => setShowCopy((prev) => !prev)}>
                            <Copy className="w-8 h-8"/>
                        </button>
                        <div
                            className={`${showCopy && availableTypes[jewelType] ? 'block' : 'hidden'} border p-4 rounded mt-2`}>
                            <ul>
                                {availableTypes[jewelType] && availableTypes[(stones ? 'stones' : jewelType)].map((data, i) => {
                                    const opt = elabToothName(data, false);

                                    return (
                                        <li key={data + tooth + i}>
                                            {data !== tooth &&
                                                <button onClick={() => copy(data, tooth)}>
                                                    {opt}
                                                </button>
                                            }
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="text-left">Jewel type</p>
                        <div className="flex gap-2">
                            <SelectorButton adjust={true} click={() => selectType('full')}
                                            disabled={false} selection="full"
                                            active={visible && (jewelType === 'full' || jewelType === 'fullDiamond')}/>

                            {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                                <SelectorButton adjust={true} click={() => selectType('bar')}
                                                disabled={false} selection="bar"
                                                active={visible && (jewelType === 'bar' || jewelType === 'barDiamond')}/>
                            }
                            {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                <SelectorButton adjust={true} click={() => selectType('frame')}
                                                disabled={false} selection="frame"
                                                active={visible && (jewelType === 'frame' || jewelType === 'frameDiamond')}/>
                            }
                            {(tooth === 'cidx' || tooth === 'cisx') &&
                                <SelectorButton adjust={true} click={() => selectType('bigBar')}
                                                disabled={false} selection="bigBar"
                                                active={visible && (jewelType === 'bigBar' || jewelType === 'bigBarDiamond')}/>
                            }
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="text-left">Material</p>
                        <div className="flex gap-2">
                            <SelectorButton disabled={false} selection="gold" active={visible && (material === 'gold')}
                                            click={() => selectMaterial('gold')}/>
                            <SelectorButton disabled={false} selection="rose" active={visible && (material === 'rose')}
                                            click={() => selectMaterial('rose')}/>
                            <SelectorButton disabled={false} selection="white"
                                            active={visible && (material === 'white')}
                                            click={() => selectMaterial('white')}/>
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="text-left">Stones</p>
                        <div className="flex gap-4">
                            <DiamondToggler tooth={tooth} onclick={selectDiamond}
                                            active={visible && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                            {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                <div className="flex gap-2">
                                    <StoneSelector tooth={tooth} stone="sapphire"
                                                   active={visible && (stones === 'sapphire')}
                                                   onclick={() => selectStone('sapphire')}/>
                                    <StoneSelector tooth={tooth} stone="ruby" active={visible && (stones === 'ruby')}
                                                   onclick={() => selectStone('ruby')}/>
                                    <StoneSelector tooth={tooth} stone="emerald"
                                                   active={visible && (stones === 'emerald')}
                                                   onclick={() => selectStone('emerald')}/>
                                    <StoneSelector tooth={tooth} stone="amethyst"
                                                   active={visible && (stones === 'amethyst')}
                                                   onclick={() => selectStone('amethyst')}/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
