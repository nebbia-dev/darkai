import ToothConfig from "@/app/components/ToothConfig";
import {ReactNode, SyntheticEvent, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import DefaultConfig from "@/app/components/DefaultConfig";
import ToothSelector from "@/app/components/ToothSelector";
import DefaultSelector from "@/app/components/DefaultSelector";
import {useTeethStore} from "@/app/stores/teeth";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export default function Selection({ui}) {
    const [value, setValue] = useState<number>(0);
    const activeTooth = useTeethStore((state) => state.currentTooth);
    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                className={`w-full ${ui ? 'bg-stone-200 h-full' : ''}`}
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && ui && <Box sx={{height: 1}}>{children}</Box>}
                {value === index && !ui && <Box>{children}</Box>}
            </div>
        );
    }

    return (
        <>
            {!ui
                ? <div className="border-l-1 border-gray-400">
                    <div>
                        <Tabs
                            value={value} onChange={changeTab} aria-label="tabs" sx={{
                            width: 1,
                            '& .MuiTabs-indicator': {top: 0, backgroundColor: '#030712', height: '0.2rem'},
                            borderBottom: '1px solid #9ca3af',
                            '& .Mui-selected': {color: '#030712 !important'}
                        }}>
                            <Tab label="DEFAULT" sx={{width: 0.5, maxWidth: 1}}/>
                            <Tab label="CUSTOM" sx={{width: 0.5, maxWidth: 1}}/>
                        </Tabs>
                    </div>
                    <CustomTabPanel value={value} index={0}>
                        <div
                            className="w-full h-[calc(100vh-54px-48px-0.2rem)] flex flex-col align-center justify-start text-center bg-gray-50 my-auto rounded text-black">
                            <div className="overflow-y-auto">
                                <DefaultConfig teeth="full"/>
                                <DefaultConfig teeth="bar"/>
                                <DefaultConfig teeth="frame"/>
                                <DefaultConfig teeth="canines"/>
                                <DefaultConfig teeth="stones"/>
                            </div>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <div
                            className="w-full h-[calc(100vh-54px-48px-0.2rem)] flex flex-col align-center justify-start text-center bg-gray-50 my-auto rounded text-black">
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
                : <div className="w-full h-full">
                    <Box sx={{display:'flex', height: 1}}>
                        <Tabs
                            orientation={`${!ui ? 'horizontal' : 'vertical'}`}
                            value={value} onChange={changeTab} aria-label="tabs" sx={{
                            width: 0.2,
                            '& .MuiTabs-indicator': {left: 50, backgroundColor: '#030712', height: '0.2rem'},
                            height: 1,
                            paddingTop: '0.2rem',
                            borderTop: '1px solid #9ca3af',
                            borderRight: '1px solid #9ca3af',
                            '& .Mui-selected': {color: '#030712 !important'}
                        }}>
                            <Tab label="DEFAULT" sx={{width: 1}}/>
                            <Tab label="CUSTOM" sx={{width: 1}}/>
                        </Tabs>

                    <CustomTabPanel value={value} index={0}>
                        <DefaultSelector/>
                    </CustomTabPanel>
                        <>
                            {!activeTooth
                                ? <CustomTabPanel value={value} index={1}>
                                    <div className="w-full">
                                        <Tabs
                                            value={0} aria-label="tabs" sx={{
                                            width: 1,
                                            '& .MuiTabs-indicator': {
                                                top: 0,
                                                backgroundColor: '#030712',
                                                height: '0.2rem'
                                            },
                                            borderBottom: '1px solid #9ca3af',
                                            backgroundColor: '#f9fafb',
                                            '& .Mui-selected': {color: '#030712 !important'}
                                        }}>
                                            <Tab sx={{width: 1, maxWidth: 1}}/>
                                        </Tabs>
                                    </div>
                                    <Box sx={{height: 'calc(100% - 48px - 0.2rem)', display:'grid', gridTemplateRows:'80% 10% 10%', gridTemplateColumns:'25% 50% 25%'}}>
                                        <div className="w-full h-full bg-stone-200 flex flex-col items-center justify-center my-auto rounded text-black col-start-2 col-end-2 row-start-1 row-end-1">
                                            <p>Prima scegli un dente</p>
                                        </div>
                                    </Box>
                                </CustomTabPanel>

                                : <CustomTabPanel value={value} index={1}>
                                        {/*DENTI SUPERIORI*/}
                                        <ToothSelector tooth='icsdx'/>
                                        <ToothSelector tooth='icssx'/>
                                        <ToothSelector tooth='ilsdx'/>
                                        <ToothSelector tooth='ilssx'/>
                                        <ToothSelector tooth='csdx'/>
                                        <ToothSelector tooth='cssx'/>
                                        {/*DENTI INFERIORI*/}
                                        <ToothSelector tooth='icidx'/>
                                        <ToothSelector tooth='icisx'/>
                                        <ToothSelector tooth='ilidx'/>
                                        <ToothSelector tooth='ilisx'/>
                                        <ToothSelector tooth='cidx'/>
                                        <ToothSelector tooth='cisx'/>
                                    </CustomTabPanel>
                            }
                        </>
                    </Box>
                </div>
            }
        </>
    )
}