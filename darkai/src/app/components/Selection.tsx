import ToothConfig from "@/app/components/ToothConfig";
import {ReactNode, SyntheticEvent, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export default function Selection() {
    const [value, setValue] = useState<number>(0);
    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                className="w-full"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box>{children}</Box>}
            </div>
        );
    }

    return (
        <div className="w-full border-l-1 border-gray-400">
            <div className="w-full">
                <Tabs
                    value={value} onChange={changeTab} aria-label="tabs" sx={{width: 1, '& .MuiTabs-indicator': {top: 0, backgroundColor: '#030712', height: '0.2rem'}, borderBottom: '1px solid #9ca3af', '& .Mui-selected': {color: '#030712 !important'}}}>
                    <Tab label="DEFAULT" sx={{ width: 0.5, maxWidth: 1 }} />
                    <Tab label="CUSTOM"  sx={{ width: 0.5, maxWidth: 1 }} />
                </Tabs>
            </div>
            <CustomTabPanel value={value} index={0}>
                <div
                    className="w-full h-[90vh] flex flex-col align-center justify-center text-center bg-gray-50 my-auto rounded text-black">
                        Item One
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div
                    className="w-full h-[90vh] flex flex-col align-center justify-center text-center bg-gray-50 my-auto rounded text-black">
                    <div className="overflow-y-auto">
                        {/*DENTI SUPERIORI*/}
                        <ToothConfig tooth='icsdx'/>
                        <ToothConfig tooth='icssx'/>
                        <ToothConfig tooth='ilsdx'/>
                        <ToothConfig tooth='ilssx'/>
                        <ToothConfig tooth='csdx'/>
                        <ToothConfig tooth='cssx'/>
                        {/*DENTI INFERIORI*/}
                        <ToothConfig tooth='icidx'/>
                        <ToothConfig tooth='icisx'/>
                        <ToothConfig tooth='ilidx'/>
                        <ToothConfig tooth='ilisx'/>
                        <ToothConfig tooth='cidx'/>
                        <ToothConfig tooth='cisx'/>
                    </div>
                </div>
            </CustomTabPanel>
        </div>
    )
}