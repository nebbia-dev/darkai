import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorSelector from "@/app/components/ColorSelector";

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
                    <p className="text-left">Base</p>
                    <div className="flex gap-2">
                        <ColorSelector tooth={tooth} color="gold"/>
                        <ColorSelector tooth={tooth} color="rose"/>
                        <ColorSelector tooth={tooth} color="white"/>
                        <DiamondToggler tooth={tooth}/>
                    </div>
                </div>
                <div className="p-4 whitespace-nowrap">
                    <p className="text-left">Jewel</p>
                    <div className="w-[48px] h-[48px]"
                         onClick={() => changeJewelType(tooth, 'full')}>Full
                    </div>
                    {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                        <div className="w-[48px] h-[48px]"
                          onClick={() => changeJewelType(tooth, 'bar')}>Bar
                        </div>
                    }
                    {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                        <>
                            <div className="w-[48px] h-[48px]"
                                 onClick={() => changeJewelType(tooth, 'frame')}>Frame
                            </div>
                        </>
                    }
                    {(tooth === 'cidx' || tooth === 'cisx') &&
                        <>
                            <div className="w-[48px] h-[48px]"
                                 onClick={() => changeJewelType(tooth, 'bigBar')}>Big Bar
                            </div>
                        </>
                    }
                </div>
                {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                    <div className="p-4">
                        <p className="text-left">Stones</p>
                        <StoneSelector tooth={tooth}/>
                    </div>
                }
            </div>
        </div>
            </AccordionDetails>
        </Accordion>
    )
}
