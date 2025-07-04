import {useTeethStore} from "@/app/stores/teeth";
import {Box, Tab, Tabs} from "@mui/material";
import DefaultConfigButton from "@/app/components/DefaultConfigButton";
import {ReactNode, SyntheticEvent, useState} from "react";
import DefaultConfigSelector from "@/app/components/DefaultConfigSelector";
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
                className="w-full bg-stone-200 h-[calc(100%-48px-0.2rem)]"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{height: 1, width: 1, display:'grid', gridTemplateRows:'80% 10% 10%', gridTemplateColumns:'25% 50% 25%'}}>{children}</Box>}
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
                    backgroundColor: '#f9fafb',
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
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="w-full flex gap-8 justify-center">
                        <DefaultConfigSelector teeth="full" color="gold"/>
                        <DefaultConfigSelector teeth="full" color="rose"/>
                        <DefaultConfigSelector teeth="full" color="white"/>
                        <DefaultConfigSelector teeth="full" color="diamond"/>
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="w-full flex gap-8 justify-center">
                        <DefaultConfigSelector teeth="bar" color="gold"/>
                        <DefaultConfigSelector teeth="bar" color="rose"/>
                        <DefaultConfigSelector teeth="bar" color="white"/>
                        <DefaultConfigSelector teeth="bar" color="diamond"/>
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="w-full flex gap-8 justify-center">
                        <DefaultConfigSelector teeth="frame" color="gold"/>
                        <DefaultConfigSelector teeth="frame" color="rose"/>
                        <DefaultConfigSelector teeth="frame" color="white"/>
                        <DefaultConfigSelector teeth="frame" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="w-full flex gap-8 justify-center">
                        <DefaultConfigSelector teeth="canines" color="gold"/>
                        <DefaultConfigSelector teeth="canines" color="rose"/>
                        <DefaultConfigSelector teeth="canines" color="white"/>
                        <DefaultConfigSelector teeth="canines" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2 row-start-1 row-end-1">
                    <div className="w-full flex gap-8 justify-center">
                        <DefaultConfigSelector teeth="stones" color="gold"/>
                        <DefaultConfigSelector teeth="stones" color="rose"/>
                        <DefaultConfigSelector teeth="stones" color="white"/>
                        <DefaultConfigSelector teeth="stones" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
        </div>
    )
}
