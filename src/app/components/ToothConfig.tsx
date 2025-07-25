import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectorButton from "@/app/components/SelectorButton";
import {Copy} from "@/app/components/icons/Copy";
import {Close} from "@/app/components/icons/Close";
import {RefObject, useEffect, useState} from "react";
import elabToothName from "@/app/helpers/elabToothName";
import State from "@/app/types/State";
import ShapeSelector from "@/app/components/ShapeSelector";

export default function ToothConfig({tooth, ref, position} : {tooth: string, ref:RefObject<any>, position:RefObject<any>}) {
    const prices = useTeethStore((state: State) => state.prices);
    const pricesAdds = useTeethStore((state: State) => state.pricesAdds);
    const jewelType = useTeethStore((state: State) => state.teethJewelType[tooth]);
    const material = useTeethStore((state: State) => state.teethMaterial[tooth]);
    const stones = useTeethStore((state: State) => state.teethStones[tooth]);
    const pave = useTeethStore((state: State) => state.teethPave[tooth]);
    const visible = useTeethStore((state: State) => state.teethVisibility[tooth]);
    const activeTooth = useTeethStore((state: State) => state.currentTooth);
    const availableTypes = useTeethStore((state: State) => state.teethTypeOptions);
    const setActiveTooth = useTeethStore((state: State) => state.setActiveTooth);
    const resetTooth = useTeethStore((state: State) => state.resetTooth);
    const changeJewelType = useTeethStore((state: State) => state.setType);
    const changeMaterial = useTeethStore((state: State) => state.setMaterial);
    const toggleDiamond = useTeethStore((state: State) => state.setDiamond);
    const changeStone = useTeethStore((state: State) => state.setStone);
    const copy = useTeethStore((state: State) => state.setCopy);
    const setActiveDefault = useTeethStore((state: State) => state.setActiveDefault);
    const [showCopy, setShowCopy] = useState<boolean>(false);
    const title = elabToothName(tooth, false);

    useEffect(() => {
        if (position.current !== null && ref.current) {
            ref.current.scrollTop = position.current;
            position.current = null;
        }
    }, [jewelType, material, stones]);

    function selectType(type: string) {
        position.current = ref.current.scrollTop;
        setActiveDefault(undefined, undefined);
        setShowCopy(false);
        changeJewelType(tooth, type);
    }

    function selectMaterial(material: string) {
        position.current = ref.current.scrollTop;
        setActiveDefault(undefined, undefined);
        changeMaterial(tooth, material);
    }

    function selectDiamond(pave: string) {
        position.current = ref.current.scrollTop;
        toggleDiamond(tooth, pave);
    }

    function selectStone(stone: string) {
        position.current = ref.current.scrollTop;
        changeStone(tooth, 'prev', stone);
    }

    function selectShape(stone: string) {
        position.current = ref.current.scrollTop;
        changeStone(tooth, stone, 'prev');
    }
    function setCopy(newTooth: string, oldTooth: string) {
        copy(newTooth, oldTooth);
        setShowCopy(false);
    }

    console.log('oh no');

    return (
        <Accordion elevation={0} sx={{backgroundColor: '#f9fafb', '&:before': {height: '0px'}, '&.Mui-expanded': {margin: 0}, marginBottom:'1rem'}}
                   expanded={activeTooth === tooth}>
            <div className="flex items-center justify-between bg-stone-100">
                <div className="w-[10%] flex justify-center">
                    {material !== 'base' &&
                            <Close className="cursor-pointer" onClick={() => resetTooth(tooth)}/>
                    }
                </div>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{height: '100px', px: 8, width:'90%', '&.MuiAccordionSummary-root':{paddingLeft:'2rem', paddingRight:'2rem'}, backgroundColor: '#f5f5f4'}}
                                  onClick={() => setActiveTooth(tooth)} id={tooth}>
                    {title}
                </AccordionSummary>
            </div>
            <AccordionDetails sx={{borderTop: '1px solid #9ca3af', height: 'calc(100% - 100px - 15vh)'}}>
                <div className="w-full flex flex-col gap-2 relative text-right">
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
                                <DiamondToggler tooth={tooth} onclick={() => selectDiamond('diamond')} selection="diamond"
                                                active={visible && pave === 'diamond' && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ?
                                    <p key={price.tooth + '_' + jewelType + 'D'}>+ {price[jewelType.includes('Diamond') ? jewelType : jewelType + 'Diamond']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <DiamondToggler tooth={tooth} onclick={() => selectDiamond('emerald')} selection="emerald"
                                                active={visible && pave === 'emerald' && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ?
                                    <p key={price.tooth + '_' + jewelType + 'D'}>+ {price[jewelType.includes('Diamond') ? jewelType : jewelType + 'Diamond']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <DiamondToggler tooth={tooth} onclick={() => selectDiamond('sapphire')} selection="sapphire"
                                                active={visible && pave === 'sapphire' && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ?
                                    <p key={price.tooth + '_' + jewelType + 'D'}>+ {price[jewelType.includes('Diamond') ? jewelType : jewelType + 'Diamond']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <DiamondToggler tooth={tooth} onclick={() => selectDiamond('ruby')} selection="ruby"
                                                active={visible && pave === 'ruby' && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                                {prices?.map(price => (tooth === price.tooth + 'sx' || tooth === price.tooth + 'dx') && material !== 'base' ?
                                    <p key={price.tooth + '_' + jewelType + 'D'}>+ {price[jewelType.includes('Diamond') ? jewelType : jewelType + 'Diamond']}€</p> : null)}
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-left">Gem shapes</p>
                        <div className="flex gap-2">
                            <div className="text-center">
                                <ShapeSelector tooth={tooth} stone="marquise"
                                               active={visible && (stones?.shape === 'marquise')}
                                               onclick={() => selectShape('marquise')}/>
                            </div>
                            <div className="text-center">
                                <ShapeSelector tooth={tooth} stone="heart"
                                               active={visible && (stones?.shape === 'heart')}
                                               onclick={() => selectShape('heart')}/>
                            </div>
                            <div className="text-center">
                                <ShapeSelector tooth={tooth} stone="circle"
                                               active={visible && (stones?.shape === 'circle')}
                                               onclick={() => selectShape('circle')}/>
                            </div>
                            <div className="text-center">
                                <ShapeSelector tooth={tooth} stone="tear"
                                               active={visible && (stones?.shape === 'tear')}
                                               onclick={() => selectShape('tear')}/>
                            </div>
                            <div className="text-center">
                                <ShapeSelector tooth={tooth} stone="square"
                                               active={visible && (stones?.shape === 'square')}
                                               onclick={() => selectShape('square')}/>
                            </div>
                        </div>

                        <p className="text-left mt-4">Gem types</p>
                        <div className="flex gap-2">
                            <div className="text-center">
                                <StoneSelector tooth={tooth} stone="sapphire"
                                               active={visible && (stones?.color === 'sapphire')}
                                               onclick={() => selectStone('sapphire')}/>
                                {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'sapphire' ?
                                    <p key={stone + '_' + tooth}>+ {stone[stones?.shape + 'Shape']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <StoneSelector tooth={tooth} stone="ruby"
                                               active={visible && (stones?.color === 'ruby')}
                                               onclick={() => selectStone('ruby')}/>
                                {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'ruby' ?
                                    <p key={stone + '_' + tooth}>+ {stone[stones?.shape + 'Shape']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <StoneSelector tooth={tooth} stone="emerald"
                                               active={visible && (stones?.color === 'emerald')}
                                               onclick={() => selectStone('emerald')}/>
                                {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'emerald' ?
                                    <p key={stone + '_' + tooth}>+ {stone[stones?.shape + 'Shape']}€</p> : null)}
                            </div>
                            <div className="text-center">
                                <StoneSelector tooth={tooth} stone="amethyst"
                                               active={visible && (stones?.color === 'amethyst')}
                                               onclick={() => selectStone('amethyst')}/>
                                {pricesAdds?.map(stone => (jewelType === 'full' || jewelType === 'fullDiamond') && material !== 'base' && stone.stone === 'amethyst' ?
                                    <p key={stone + '_' + tooth}>+ {stone[stones?.shape + 'Shape']}€</p> : null)}
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
{/*E' ESPANSO SE COINCIDE L'ACTIVE TOOTH, NON SE IL DENTE E' VISIBILE*/
}
