import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorSelector from "@/app/components/ColorSelector";
import SelectorButton from "@/app/components/SelectorButton";
import DefaultConfigButton from "@/app/components/DefaultConfigButton";

export default function DefaultConfig({teeth}) {
    const changeJewelType = useTeethStore((state) => state.setType);
    const firstChild = teeth === 'full' ? '' : '1px solid #9ca3af';
    let title;

    switch(teeth) {
        case 'full':
            title = 'Full mouth';
            break;
        case 'canines':
            title = 'Full canines';
            break;
        case 'bar':
            title = 'Bars';
            break;
        case 'frame':
            title = 'Frames';
            break;
        case 'stones':
            title = 'Stones';
            break;
        default:
            title = 'Default';
    }


    return (
        <Accordion elevation={0} sx={{backgroundColor: '#f9fafb', '&:before':{height:'0px'}}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{height: '100px', borderTop: firstChild, px: 8}}>
                {title}
            </AccordionSummary>
            <AccordionDetails sx={{borderTop: '1px solid #9ca3af'}}>
                <div className="w-full flex gap-8">
                    <DefaultConfigButton teeth={teeth} color="gold"/>
                    <DefaultConfigButton teeth={teeth} color="rose"/>
                    <DefaultConfigButton teeth={teeth} color="white"/>
                    <DefaultConfigButton teeth={teeth} color="diamond"/>
                </div>
            </AccordionDetails>

        </Accordion>
    )
}
