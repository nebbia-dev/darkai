import {useTeethStore} from "@/app/stores/teeth";
import {Box, Tab, Tabs} from "@mui/material";
import DefaultConfigButton from "@/app/components/DefaultConfigButton";
import {ReactNode, SyntheticEvent, useState} from "react";
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}
export default function DefaultSelector() {
    const [value, setValue] = useState<number>(0);
    const activeTooth = useTeethStore((state) => state.currentTooth);
    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                className="w-full bg-stone-200 h-full"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{height: 1, width: 1}}>{children}</Box>}
            </div>
        );
    }

    return (
        <div className="w-full block h-full">
            <div>
                <Tabs
                    value={value} onChange={changeTab} aria-label="tabs" sx={{
                    width: 1,
                    '& .MuiTabs-indicator': {top: 0, backgroundColor: '#030712', height: '0.2rem'},
                    borderBottom: '1px solid #9ca3af',
                    '& .Mui-selected': {color: '#030712 !important'}
                }}>
                    <Tab label="Full mouth" sx={{width: 0.2, maxWidth: 1}}/>
                    <Tab label="Bar" sx={{width: 0.2, maxWidth: 1}}/>
                    <Tab label="Canines" sx={{width: 0.2, maxWidth: 1}}/>
                    <Tab label="Frame" sx={{width: 0.2, maxWidth: 1}}/>
                    <Tab label="Stones" sx={{width: 0.2, maxWidth: 1}}/>
                </Tabs>
            </div>

            <CustomTabPanel value={value} index={0}>
                <div className="flex items-center justify-center">
                    <div className="w-full flex gap-8">
                        <DefaultConfigButton teeth="full" color="gold"/>
                        <DefaultConfigButton teeth="full" color="rose"/>
                        <DefaultConfigButton teeth="full" color="white"/>
                        <DefaultConfigButton teeth="full" color="diamond"/>
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="flex items-center justify-center">
                    <div className="w-full flex gap-8">
                        <DefaultConfigButton teeth="bar" color="gold"/>
                        <DefaultConfigButton teeth="bar" color="rose"/>
                        <DefaultConfigButton teeth="bar" color="white"/>
                        <DefaultConfigButton teeth="bar" color="diamond"/>
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className="flex items-center justify-center">
                    <div className="w-full flex gap-8">
                        <DefaultConfigButton teeth="frame" color="gold"/>
                        <DefaultConfigButton teeth="frame" color="rose"/>
                        <DefaultConfigButton teeth="frame" color="white"/>
                        <DefaultConfigButton teeth="frame" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <div className="flex items-center justify-center">
                    <div className="w-full flex gap-8">
                        <DefaultConfigButton teeth="canines" color="gold"/>
                        <DefaultConfigButton teeth="canines" color="rose"/>
                        <DefaultConfigButton teeth="canines" color="white"/>
                        <DefaultConfigButton teeth="canines" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <div className="flex items-center justify-center">
                    <div className="w-full flex gap-8">
                        <DefaultConfigButton teeth="stones" color="gold"/>
                        <DefaultConfigButton teeth="stones" color="rose"/>
                        <DefaultConfigButton teeth="stones" color="white"/>
                        <DefaultConfigButton teeth="stones" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
        </div>
    )
}
