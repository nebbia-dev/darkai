import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectorButton from "@/app/components/SelectorButton";
import {Copy} from "@/app/components/icons/Copy";
import {useState} from "react";
import elabToothName from "@/app/helpers/elabToothName";
import State from "@/app/types/State";

export default function ToothConfig({tooth} : {tooth: string}) {
    const prices = useTeethStore((state: State) => state.prices);
    const pricesAdds = useTeethStore((state: State) => state.pricesAdds);
    const jewelType = useTeethStore((state: State) => state.teethJewelType[tooth]);
    const material = useTeethStore((state: State) => state.teethMaterial[tooth]);
    const stones = useTeethStore((state: State) => state.teethStones[tooth]);
    const visible = useTeethStore((state: State) => state.teethVisibility[tooth]);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const availableTypes = useTeethStore((state: State) => state.teethTypeOptions);
    const changeJewelType = useTeethStore((state: State) => state.setType);
    const changeMaterial = useTeethStore((state: State) => state.setMaterial);
    const toggleDiamond = useTeethStore((state: State) => state.setDiamond);
    const changeStone = useTeethStore((state: State) => state.setStone);
    const copy = useTeethStore((state: State) => state.setCopy);
    const setActiveDefault = useTeethStore((state: State) => state.setActiveDefault);
    const firstChild = tooth === 'icsdx' ? '' : '1px solid #9ca3af';
    const [showCopy, setShowCopy] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const title = elabToothName(tooth, false);

    function selectType(type: string) {
        setActiveDefault(undefined, undefined);
        setShowCopy(false);
        changeJewelType(tooth, type);
    }

    function selectMaterial(material: string) {
        setActiveDefault(undefined, undefined);
        changeMaterial(tooth, material);
    }

    function selectDiamond() {
        toggleDiamond(tooth);
    }

    function selectStone(stone: string) {
        changeStone(tooth, stone);
    }
    function setCopy(newTooth: string, oldTooth: string) {
        copy(newTooth, oldTooth);
        setShowCopy(false);
    }

    console.log('oh no');

    return (
        <Accordion elevation={0} sx={{backgroundColor: '#f9fafb', '&:before': {height: '0px'}}}
                   expanded={activeTooth === tooth || expanded}>
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
                            className={`${showCopy && availableTypes[jewelType] ? 'block' : 'hidden'} border bg-gray-50 rounded mt-2`}>
                            <h3 className="bg-gray-950 p-4 text-gray-50">Copia su...</h3>
                            <ul className="pb-2">
                                {availableTypes[jewelType] && availableTypes[(stones ? 'stones' : jewelType)].map((data, i) => {
                                    const opt = elabToothName(data, false);

                                    return (
                                        <li className="hover:bg-stone-200 hover:rounded px-4 py-1"
                                            key={data + tooth + i}>
                                            {data !== tooth &&
                                                <button className="cursor-pointer"
                                                        onClick={() => setCopy(data, tooth)}>
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
                            <div className="text-center">
                                <SelectorButton disabled={false} selection="gold" active={visible && (material === 'gold')}
                                            click={() => selectMaterial('gold')} adjust={false}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ? <p key={price.tooth + '_' + jewelType + 'G'} >{price[jewelType.slice().split('D').shift() + 'Gold']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <SelectorButton disabled={false} selection="rose" active={visible && (material === 'rose')}
                                            click={() => selectMaterial('rose')} adjust={false}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ? <p key={price.tooth + '_' + jewelType + 'R'}>{price[jewelType.slice().split('D').shift() + 'Rose']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <SelectorButton disabled={false} selection="white"
                                            active={visible && (material === 'white')}
                                            click={() => selectMaterial('white')} adjust={false}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ? <p key={price.tooth + '_' + jewelType + 'W'}>{price[jewelType.slice().split('D').shift() + 'White']}€</p> : null)}
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="text-left">Stones</p>
                        <div className="flex gap-2">
                            <div className="text-center">
                                <DiamondToggler tooth={tooth} onclick={selectDiamond}
                                                active={visible && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ? <p key={price.tooth + '_' + jewelType + 'D'}>+ {price[jewelType.includes('Diamond') ? jewelType : jewelType + 'Diamond']}€</p> : null)}
                            </div>
                        </div>
                    </div>
                            {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                <div className="p-4">
                                    <p className="text-left">Gems</p>
                                    <div className="flex gap-2">
                                        <div className="text-center">
                                            <StoneSelector tooth={tooth} stone="sapphire"
                                                           active={visible && (stones === 'sapphire')}
                                                           onclick={() => selectStone('sapphire')}/>
                                            {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'sapphire' ?
                                                <p key={stone + '_' + tooth}>+ {stone.tearShape}€</p> : null)}
                                        </div>
                                        <div className="text-center">
                                            <StoneSelector tooth={tooth} stone="ruby"
                                                       active={visible && (stones === 'ruby')}
                                                       onclick={() => selectStone('ruby')}/>
                                            {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'ruby' ?
                                                <p key={stone + '_' + tooth}>+ {stone.tearShape}€</p> : null)}
                                        </div>
                                        <div className="text-center">
                                            <StoneSelector tooth={tooth} stone="emerald"
                                                       active={visible && (stones === 'emerald')}
                                                       onclick={() => selectStone('emerald')}/>
                                            {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'emerald' ?
                                                <p key={stone + '_' + tooth}>+ {stone.tearShape}€</p> : null)}
                                        </div>
                                        <div className="text-center">
                                            <StoneSelector tooth={tooth} stone="amethyst"
                                                       active={visible && (stones === 'amethyst')}
                                                       onclick={() => selectStone('amethyst')}/>
                                            {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'amethyst' ?
                                                <p key={stone + '_' + tooth}>+ {stone.tearShape}€</p> : null)}
                                        </div>
                                    </div>
                                </div>
                            }
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
{/*E' ESPANSO SE COINCIDE L'ACTIVE TOOTH, NON SE IL DENTE E' VISIBILE*/}
