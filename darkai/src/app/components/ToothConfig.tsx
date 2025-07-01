import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorSelector from "@/app/components/ColorSelector";
import SelectorButton from "@/app/components/SelectorButton";

export default function ToothConfig({tooth}) {
    const changeJewelType = useTeethStore((state) => state.setType);
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

    console.log('oh no');

    return (
        <Accordion elevation={0} sx={{backgroundColor: '#f9fafb', '&:before':{height:'0px'}}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{height: '100px', borderTop: firstChild, px: 8}}>
                {title}
            </AccordionSummary>
            <AccordionDetails sx={{borderTop: '1px solid #9ca3af'}}>
                <div className="w-full">
                    <div className="w-full flex flex-col gap-8">

                        <div className="p-4">
                            <p className="text-left">Jewel type</p>
                            <div className="flex gap-2">
                                <SelectorButton adjust={true} click={() => changeJewelType(tooth, 'full')}
                                                disabled={false} selection="full"/>

                                {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                                    <SelectorButton adjust={true} click={() => changeJewelType(tooth, 'bar')}
                                                    disabled={false} selection="bar"/>
                                }
                                {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                    <SelectorButton adjust={true} click={() => changeJewelType(tooth, 'frame')}
                                                    disabled={false} selection="frame"/>
                                }
                                {(tooth === 'cidx' || tooth === 'cisx') &&
                                    <SelectorButton adjust={true} click={() => changeJewelType(tooth, 'bigBar')}
                                                    disabled={false} selection="bigBar"/>
                                }
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-left">Material</p>
                            <div className="flex gap-2">
                                <ColorSelector tooth={tooth} color="gold"/>
                                <ColorSelector tooth={tooth} color="rose"/>
                                <ColorSelector tooth={tooth} color="white"/>
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-left">Stones</p>
                            <div className="flex gap-4">
                                <DiamondToggler tooth={tooth}/>
                                {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                    <StoneSelector tooth={tooth}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionDetails>

        </Accordion>
    )
}
