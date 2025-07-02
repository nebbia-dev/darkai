import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectorButton from "@/app/components/SelectorButton";

interface Selected {
    type: 'full' | 'bar' | 'frame' | 'bigBar' | undefined,
    material: 'gold' | 'rose' | 'white' | undefined,
    diamond: boolean,
    stone: 'sapphire' | 'ruby' | 'emerald' | 'amethyst' | undefined,
}

const initialState: Selected = {
    type: undefined,
    material: undefined,
    diamond: false,
    stone: undefined,
}

export default function ToothConfig({tooth}) {
    const jewelType = useTeethStore((state) => state.teethJewelType[tooth]);
    const material = useTeethStore((state) => state.teethMaterial[tooth]);
    const stones = useTeethStore((state) => state.teethStones[tooth]);
    const visible = useTeethStore((state) => state.teethVisibility[tooth]);
    const changeJewelType = useTeethStore((state) => state.setType);
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    const toggleDiamond = useTeethStore((state) => state.setDiamond);
    const changeStone = useTeethStore((state) => state.setStone);
    const setActiveDefault = useTeethStore((state) => state.setActiveDefault);
    const firstChild = tooth === 'icsdx' ? '' : '1px solid #9ca3af';
    let title;

    if(tooth.length === 4) {
        title = 'Canino';

        if(tooth[1] === 's') {
            title += ' superiore';
        } else {
            title += ' inferiore';
        }

        if(tooth[2] === 'd') {
            title += ' destro';
        } else {
            title += ' sinistro';
        }

    } else if(tooth.length === 5) {
        title = 'Incisivo';

        if(tooth[1] === 'c') {
            title += ' centrale';
        } else {
            title += ' laterale';
        }

        if(tooth[2] === 's') {
            title += ' superiore';
        } else {
            title += ' inferiore';
        }

        if(tooth[3] === 'd') {
            title += ' destro';
        } else {
            title += ' sinistro';
        }
    }

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

    console.log('oh no');

    return (
        <Accordion elevation={0} sx={{backgroundColor: '#f9fafb', '&:before':{height:'0px'}}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{height: '100px', borderTop: firstChild, px: 8}}>
                {title}
            </AccordionSummary>
            <AccordionDetails sx={{borderTop: '1px solid #9ca3af'}}>
                <div className="w-full flex flex-col gap-8">

                        <div className="p-4">
                            <p className="text-left">Jewel type</p>
                            <div className="flex gap-2">
                                <SelectorButton adjust={true} click={() => selectType('full')}
                                                disabled={false} selection="full" active={visible && (jewelType === 'full' || jewelType === 'fullDiamond')}/>

                                {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                                    <SelectorButton adjust={true} click={() => selectType('bar')}
                                                    disabled={false} selection="bar" active={visible && (jewelType === 'bar' || jewelType === 'barDiamond')}/>
                                }
                                {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                    <SelectorButton adjust={true} click={() => selectType('frame')}
                                                    disabled={false} selection="frame" active={visible && (jewelType === 'frame' || jewelType === 'frameDiamond')}/>
                                }
                                {(tooth === 'cidx' || tooth === 'cisx') &&
                                    <SelectorButton adjust={true} click={() => selectType('bigBar')}
                                                    disabled={false} selection="bigBar" active={visible && (jewelType === 'bigBar' || jewelType === 'bigBarDiamond')}/>
                                }
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-left">Material</p>
                            <div className="flex gap-2">
                                <SelectorButton disabled={false} selection="gold" active={visible && (material === 'gold')} click={() => selectMaterial('gold')}/>
                                <SelectorButton disabled={false} selection="rose" active={visible && (material === 'rose')} click={() => selectMaterial('rose')}/>
                                <SelectorButton disabled={false} selection="white" active={visible && (material === 'white')} click={() => selectMaterial('white')}/>
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-left">Stones</p>
                            <div className="flex gap-4">
                                <DiamondToggler tooth={tooth} onclick={selectDiamond} active={visible && (jewelType === 'fullDiamond' || jewelType === 'barDiamond' || jewelType === 'frameDiamond' || jewelType === 'bigBarDiamond')}/>
                                {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                    <div className="flex gap-2">
                                        <StoneSelector tooth={tooth} stone="sapphire" active={visible && (stones === 'sapphire')} onclick={() => selectStone('sapphire')}/>
                                        <StoneSelector tooth={tooth} stone="ruby" active={visible && (stones === 'ruby')} onclick={() => selectStone('ruby')}/>
                                        <StoneSelector tooth={tooth} stone="emerald" active={visible && (stones === 'emerald')} onclick={() => selectStone('emerald')}/>
                                        <StoneSelector tooth={tooth} stone="amethyst" active={visible && (stones === 'amethyst')} onclick={() => selectStone('amethyst')}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            </AccordionDetails>

        </Accordion>
    )
}
