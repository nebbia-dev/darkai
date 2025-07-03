import ToothConfig from "@/app/components/ToothConfig";
import {ReactNode, SyntheticEvent, useState} from "react";
import {Box, MenuItem, Select, SelectChangeEvent, Tab, Tabs} from "@mui/material";
import DefaultConfig from "@/app/components/DefaultConfig";
import elabToothName from "@/app/helpers/elabToothName";
import ToothSelector from "@/app/components/ToothSelector";
interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export default function Selection({ui}) {
    const [value, setValue] = useState<number>(0);
    const [arch, setArch] = useState<string>('Arcata superiore');
    const [tooth, setTooth] = useState<string>('');
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
                {value === index && ui && <Box sx={{height: 1, display:'grid', gridTemplateRows:'80% 10% 10%', gridTemplateColumns:'15% 60% 25%'}}>{children}</Box>}
                {value === index && !ui && <Box>{children}</Box>}
            </div>
        );
    }

    function handleChange(event: SelectChangeEvent) {
        setArch(event.target.value as string);
    }

    return (
        <>
        { !ui ?
            <div className="border-l-1 border-gray-400">
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
                    <div className="flex items-center justify-center gap-8 col-start-2 col-end-2 row-start-1 row-end-1">

                        <Select
                            value={arch}
                            onChange={handleChange}
                            sx={{width: 0.175, backgroundColor:'#030712', color: '#f9fafb', borderRadius: 'calc(infinity * 1px)', '& .css-lohd6h-MuiSvgIcon-root-MuiSelect-icon': {color: '#f9fafb'}}}
                        >
                            <MenuItem value="Arcata superiore">Arcata superiore</MenuItem>
                            <MenuItem value="Arcata inferiore">Arcata inferiore</MenuItem>
                        </Select>

                        <div className={`flex justify-between ${arch ? 'block' : 'hidden'} border rounded-full w-full`}>
                            <ToothSelector tooth='icsdx' active={tooth==='icsdx'} click={() => setTooth('icsdx')}/>
                            <ToothSelector tooth='icssx' active={tooth==='icssx'} click={() => setTooth('icssx')}/>
                            <ToothSelector tooth='ilsdx' active={tooth==='ilsdx'} click={() => setTooth('ilsdx')}/>
                            <ToothSelector tooth='ilssx' active={tooth==='ilssx'} click={() => setTooth('ilssx')}/>
                            <ToothSelector tooth='csdx' active={tooth==='csdx'} click={() => setTooth('csdx')}/>
                            <ToothSelector tooth='cssx' active={tooth==='cssx'} click={() => setTooth('cssx')}/>
                        </div>
                        <div className={`flex justify-between ${!arch ? 'block' : 'hidden'} border rounded-full w-full`}>
                            <ToothSelector tooth='icidx' active={tooth==='icidx'} click={() => setTooth('icidx')}/>
                            <ToothSelector tooth='icisx' active={tooth==='icisx'} click={() => setTooth('icisx')}/>
                            <ToothSelector tooth='ilidx' active={tooth==='ilidx'} click={() => setTooth('ilidx')}/>
                            <ToothSelector tooth='ilisx' active={tooth==='ilisx'} click={() => setTooth('ilisx')}/>
                            <ToothSelector tooth='cidx' active={tooth==='cidx'} click={() => setTooth('cidx')}/>
                            <ToothSelector tooth='cisx' active={tooth==='cisx'} click={() => setTooth('cisx')}/>
                        </div>
                    </div>
                    <div className="flex items-end justify-start col-start-3 col-end-3 row-start-2 row-end-2">
                        <button className="w-[40%] mb-[4vh] ml-4 bg-gray-950 text-gray-50 p-[1rem] rounded-full text-right flex items-center justify-between">Continua <span className="inline-block">&rarr;</span></button>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {tooth !== ''
                        ?
                        <>
                            <div className="flex items-center justify-center gap-8 col-start-2 col-end-2 row-start-1 row-end-1">
                                <button>Full</button>
                                <button>Bar</button>
                                <button>Frame</button>
                                <button>Big Bar</button>
                            </div>
                            <div className="flex items-end justify-start col-start-3 col-end-3 row-start-2 row-end-2">
                                <button className="w-[40%] mb-[4vh] ml-4 bg-gray-950 text-gray-50 p-[1rem] rounded-full text-right flex items-center justify-between">Continua <span className="inline-block">&rarr;</span></button>
                            </div>
                        </>
                        : <p className="flex items-center justify-center col-start-2 col-end-2 row-start-1 row-end-1">Prima scegli un dente</p>
                    }
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <div className="flex items-center justify-center gap-8 col-start-2 col-end-2 row-start-1 row-end-1">
                            <button>Gold</button>
                            <button>Rose</button>
                            <button>White</button>
                        </div>
                        <div className="flex items-end justify-start col-start-3 col-end-3 row-start-2 row-end-2">
                            <button
                                className="w-[40%] mb-[4vh] ml-4 bg-gray-950 text-gray-50 p-[1rem] rounded-full text-right flex items-center justify-between">Continua <span
                                className="inline-block">&rarr;</span></button>
                        </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div className="flex items-center justify-center gap-8 col-start-2 col-end-2 row-start-1 row-end-1">
                        <button>Diamonds</button>
                        <button>Sapphire</button>
                        <button>Ruby</button>
                        <button>Emerald</button>
                        <button>Amethyst</button>
                    </div>
                    <div className="flex items-end justify-start col-start-3 col-end-3 row-start-2 row-end-2">
                        <button
                            className="w-[40%] mb-[4vh] ml-4 bg-gray-950 text-gray-50 p-[1rem] rounded-full text-right flex items-center justify-between">Termina <span
                            className="inline-block">&rarr;</span></button>
                    </div>
                </CustomTabPanel>
            </div>
        }
        </>
    )
}