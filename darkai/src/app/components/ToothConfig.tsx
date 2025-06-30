import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ToothSelector from "@/app/components/ToothSelector";

export default function ToothConfig({tooth}) {
    const changeMaterial = useTeethStore((state) => state.setMaterial);
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
                    <div className="w-full flex gap-8">
                        <div className="p-4">
                            <p className="text-left">Full</p>
                            <div className="flex gap-2">
                                <ToothSelector tooth={tooth} type="full" color="gold" title={title}/>
                                <ToothSelector tooth={tooth} type="full" color="rose" title={title}/>
                                <ToothSelector tooth={tooth} type="full" color="white" title={title}/>
                                <DiamondToggler tooth={tooth}/>
                            </div>
                            {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                                <>
                                    <p className="text-left">Bar</p>
                                    <div className="flex gap-2">
                                        <ToothSelector tooth={tooth} type="bar" color="gold" title={title}/>
                                        <ToothSelector tooth={tooth} type="bar" color="rose" title={title}/>
                                        <ToothSelector tooth={tooth} type="bar" color="white" title={title}/>
                                    </div>
                                </>
                            }
                            {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                <>
                                    <p className="text-left">Frame</p>
                                    <div className="flex gap-2">
                                        <ToothSelector tooth={tooth} type="frame" color="gold" title={title}/>
                                        <ToothSelector tooth={tooth} type="frame" color="rose" title={title}/>
                                        <ToothSelector tooth={tooth} type="frame" color="white" title={title}/>
                                    </div>
                                </>
                            }
                            {(tooth === 'cidx' || tooth === 'cisx') &&
                                <>
                                    <p className="text-left">Bar</p>
                                    <div className="flex gap-2">
                                        <ToothSelector tooth={tooth} type="bigBar" color="gold" title={title}/>
                                        <ToothSelector tooth={tooth} type="bigBar" color="rose" title={title}/>
                                        <ToothSelector tooth={tooth} type="bigBar" color="white" title={title}/>
                                    </div>
                                </>
                            }
                            {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                                <div className="p-4">
                                    <p className="text-left">Stones</p>
                                    <StoneSelector tooth={tooth}/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
