import ToothConfig from "@/app/components/ToothConfig";
import {ReactNode, SyntheticEvent, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import DefaultConfig from "@/app/components/DefaultConfig";
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export default function Selection({ui}) {
    const [value, setValue] = useState<number>(0);
    const changeTab = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                className={`w-full ${ui ? 'bg-stone-200 h-[calc(100%-48px-0.2rem)]' : ''}`}
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{height: 1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap: '1rem'}}>{children}</Box>}
            </div>
        );
    }

    return (
        <>
        { !ui ?
            <div className="w-full border-l-1 border-gray-400">
                <div className="w-full">
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
                        className="w-full h-[90vh] flex flex-col align-center justify-start text-center bg-gray-50 my-auto rounded text-black">
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
                        className="w-full h-[90vh] flex flex-col align-center justify-start text-center bg-gray-50 my-auto rounded text-black">
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
                <div className="w-full">
                    <Tabs
                        value={value} onChange={changeTab} aria-label="tabs" sx={{
                        width: 1,
                        '& .MuiTabs-indicator': {top: 0, backgroundColor: '#030712', height: '0.2rem'},
                        borderBottom: '1px solid #9ca3af',
                        '& .Mui-selected': {color: '#030712 !important'}
                    }}>
                        <Tab label="Dente" sx={{width: 0.25, maxWidth: 1}}/>
                        <Tab label="Base" sx={{width: 0.25, maxWidth: 1}}/>
                        <Tab label="Metallo" sx={{width: 0.25, maxWidth: 1}}/>
                        <Tab label="Pietre" sx={{width: 0.25, maxWidth: 1}}/>
                    </Tabs>
                </div>
                <CustomTabPanel value={value} index={0}>
                    <div className="flex align-center justify-center gap-8">
                        <select>
                            <option>Arcata superiore</option>
                            <option>Arcata inferiore</option>
                        </select>
                        <div className="flex">
                            <button>ICSDX</button>
                            <button>ICSSX</button>
                            <button>ILSDX</button>
                            <button>ILSSX</button>
                            <button>CSDX</button>
                            <button>CSSX</button>
                        </div>
                        <div className="flex">
                            <button>ICIDX</button>
                            <button>ICISX</button>
                            <button>ILIDX</button>
                            <button>ILISX</button>
                            <button>CIDX</button>
                            <button>CISX</button>
                        </div>
                    </div>
                    <button>Continua</button>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="flex align-center justify-center gap-8">
                        <button>Full</button>
                        <button>Bar</button>
                        <button>Frame</button>
                        <button>Big Bar</button>
                    </div>
                    <button>Continua</button>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className="flex align-center justify-center gap-8">
                        <button>Gold</button>
                        <button>Rose</button>
                        <button>White</button>
                    </div>
                    <button>Continua</button>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div className="flex align-center justify-center gap-8">
                        <button>Diamonds</button>
                        <button>Sapphire</button>
                        <button>Ruby</button>
                        <button>Emerald</button>
                        <button>Amethyst</button>
                    </div>
                    <button>Continua</button>
                </CustomTabPanel>
            </div>
        }
        </>
    )
}