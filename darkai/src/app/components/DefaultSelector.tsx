import {useTeethStore} from "@/app/stores/teeth";
import {Box, Tab, Tabs} from "@mui/material";
import {ReactNode, SyntheticEvent, useState} from "react";
import DefaultConfigSelector from "@/app/components/DefaultConfigSelector";
import {Tooth} from "@/app/components/icons/Tooth";
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}
export default function DefaultSelector() {
    const [value, setValue] = useState<number>(0);
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
                {value === index && <Box sx={{height: 1, width: 1, display:'grid', gridTemplateColumns:'25% 50% 25%'}}>{children}</Box>}
            </div>
        );
    }

    return (
        <div className="w-full block h-full">
            <div>
                <Tabs
                    value={value} onChange={changeTab} aria-label="tabs" sx={{
                    width: 1,
                    '& .MuiTabs-indicator': {display: 'none'},
                    borderBottom: '1px solid #9ca3af',
                    backgroundColor: '#f9fafb',
                    '& .Mui-selected': {color: '#f9fafb !important', fontWeight: '800'},
                    '& .MuiTab-root': {height: '48px', minHeight: '48px', minWidth: '48px'},
                }}>
                    <Tab icon={<Tooth />} label={`${value === 0 ? 'Full mouth' : ''}`} sx={{
                        width: value === 0 ? 0.4 : 0.15,
                        paddingLeft: value === 0 ? '1rem' : '0.5rem',
                        paddingRight: value === 0 ? '1rem' : '0.5rem',
                        maxWidth: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: `${value === 0 ? '#030712' : '#f9fafb'}`,
                        '& .MuiTab-icon': {marginBottom: 0},
                    }}/>
                    <Tab icon={<Tooth />} label={`${value === 1 ? 'Bar' : ''}`} sx={{
                        width: value === 1 ? 0.4 : 0.15,
                        paddingLeft: value === 1 ? '1rem' : '0.5rem',
                        paddingRight: value === 1 ? '1rem' : '0.5rem',
                        maxWidth: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: `${value === 1 ? '#030712' : '#f9fafb'}`,
                        '& .MuiTab-icon': {marginBottom: 0},
                    }}/>
                    <Tab icon={<Tooth />} label={`${value === 2 ? 'Canines' : ''}`} sx={{
                        width: value === 2 ? 0.4 : 0.15,
                        paddingLeft: value === 2 ? '1rem' : '0.5rem',
                        paddingRight: value === 2 ? '1rem' : '0.5rem',
                        maxWidth: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: `${value === 2 ? '#030712' : '#f9fafb'}`,
                        '& .MuiTab-icon': {marginBottom: 0},
                    }}/>
                    <Tab icon={<Tooth />} label={`${value === 3 ? 'Frames' : ''}`} sx={{
                        width: value === 3 ? 0.4 : 0.15,
                        paddingLeft: value === 3 ? '1rem' : '0.5rem',
                        paddingRight: value === 3 ? '1rem' : '0.5rem',
                        maxWidth: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: `${value === 3 ? '#030712' : '#f9fafb'}`,
                        '& .MuiTab-icon': {marginBottom: 0},
                    }}/>
                    <Tab icon={<Tooth />} label={`${value === 4 ? 'Stones' : ''}`} sx={{
                        width: value === 4 ? 0.4 : 0.15,
                        paddingLeft: value === 4 ? '1rem' : '0.5rem',
                        paddingRight: value === 4 ? '1rem' : '0.5rem',
                        maxWidth: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: `${value === 4 ? '#030712' : '#f9fafb'}`,
                        '& .MuiTab-icon': {marginBottom: 0},
                    }}/>
                </Tabs>
            </div>

            <CustomTabPanel value={value} index={0}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2">
                    <div className="w-full flex flex-col gap-2 justify-center h-full">
                        <DefaultConfigSelector teeth="full" color="gold"/>
                        <DefaultConfigSelector teeth="full" color="rose"/>
                        <DefaultConfigSelector teeth="full" color="white"/>
                        <DefaultConfigSelector teeth="full" color="diamond"/>
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2">
                    <div className="w-full flex flex-col gap-2 justify-center h-full">
                        <DefaultConfigSelector teeth="bar" color="gold"/>
                        <DefaultConfigSelector teeth="bar" color="rose"/>
                        <DefaultConfigSelector teeth="bar" color="white"/>
                        <DefaultConfigSelector teeth="bar" color="diamond"/>
                    </div>
                </div>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2">
                    <div className="w-full flex flex-col gap-2 justify-center h-full">
                        <DefaultConfigSelector teeth="frame" color="gold"/>
                        <DefaultConfigSelector teeth="frame" color="rose"/>
                        <DefaultConfigSelector teeth="frame" color="white"/>
                        <DefaultConfigSelector teeth="frame" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2">
                    <div className="w-full flex flex-col gap-2 justify-center h-full">
                        <DefaultConfigSelector teeth="canines" color="gold"/>
                        <DefaultConfigSelector teeth="canines" color="rose"/>
                        <DefaultConfigSelector teeth="canines" color="white"/>
                        <DefaultConfigSelector teeth="canines" color="diamond"/>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <div className="flex items-center justify-center h-full w-full col-start-2 col-end-2">
                    <div className="w-full flex flex-col gap-2 justify-center h-full">
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
