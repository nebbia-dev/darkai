import {createClient} from "@/utils/supabase/server";
import elabToothName from "@/app/helpers/elabToothName";
import firstCapital from "@/app/helpers/firstCapital";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserImages from "@/app/components/UserImages";
import BackButton from "@/app/components/BackButton";
export default async function Order({params}: { params: Promise<{ orderId: string[] }> }){
    const { orderId } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Orders')
        .select('id, shipping, created_at, status, shippingAddress, user_id(' +
            'name, lastname, email, phone), config(id, config) ')
        .eq('id', orderId);
    console.log(data);

    return(
        <div className="w-[75vw] h-[calc(100vh-54px)] mx-auto flex flex-col items-center justify-center gap-4">
            <div className="w-full text-left">
                <BackButton/>
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="w-[50vw] max-h-[calc(80vh-15vh)] overflow-y-auto p-8 border-r border-gray-400">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold">Customer</h2>
                            <p className="pl-2">{data?.[0].user_id.name} {data?.[0].user_id.lastname}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Contacts</h3>
                            <ul>
                                <li className="pl-2">Email: {data?.[0].user_id.email}</li>
                                <li className="pl-2">Phone: {data?.[0].user_id.phone}</li>
                            </ul>

                        </div>

                        <div>
                            <h3 className="font-semibold">Shipping information</h3>
                            {data?.[0].shipping
                                ? <ul>
                                    <li className="pl-2">Address: {data?.[0].shippingAddress.address}, {data?.[0].shippingAddress.postalCode} {data?.[0].shippingAddress.city} - {data?.[0].shippingAddress.state}
                                    </li>
                                    <li className="pl-2">Phone: {data?.[0].shippingAddress.phone}</li>
                                </ul>
                                : <p className="pl-2">Pick up in store</p>
                            }
                        </div>

                        <div>
                            <h3 className="font-semibold">Order status</h3>
                            <p className="pl-2">{data?.[0].status}</p>
                        </div>

                        <div>
                            <Accordion elevation={0} sx={{
                                backgroundColor: '#f9fafb',
                                '&:before': {height: '0px'},
                                '&.Mui-expanded': {margin: 0},
                                marginBottom: '1rem'
                            }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{
                                    height: '48px',
                                    '&.MuiAccordionSummary-root': {paddingRight: '2rem', paddingLeft: '0px'}
                                }}>
                                    <h3 className="font-semibold">Configuration</h3>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    borderTop: '1px solid #9ca3af',
                                    height: 'calc(100% - 100px - 15vh)',
                                    paddingLeft: '0px',
                                    paddingRight: '0px',
                                    paddingTop: '0px'
                                }}>
                                    <div>
                                        {Object.entries(data?.[0].config.config.visible).map(tooth => {
                                            if (!tooth[1]) return null;
                                            if (tooth[0] === 'cisx' && (data?.[0].config.config.type[tooth[0]] === 'bigBar' || data?.[0].config.config.type[tooth[0]] === 'bigBarDiamond')) return null;
                                            if (tooth[0] === 'icisx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond')) return null;
                                            if (tooth[0] === 'icssx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond')) return null;

                                            return <div key={`${tooth}Visibility`}>
                                                <h4 className="w-full py-1 px-3 bg-stone-200 mb-1">{
                                                    (tooth[0] === 'cidx' && (data?.[0].config.config.type[tooth[0]] === 'bigBar' || data?.[0].config.config.type[tooth[0]] === 'bigBarDiamond'))
                                                        ? 'Canini inferiori'
                                                        : (tooth[0] === 'icidx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond'))
                                                            ? 'Incisivi centrali inferiori'
                                                            : (tooth[0] === 'icsdx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond'))
                                                                ? 'Incisivi centrali superiori'
                                                                : elabToothName(tooth[0], false)
                                                }</h4>
                                                <ul className="mb-2">
                                                    <li className="pl-2">Jewel
                                                        type: {firstCapital(data?.[0].config.config.type[tooth[0]].replace('Diamond', ''))} {data?.[0].config.config.type[tooth[0]].includes('Diamond') ? ' with ' + data?.[0].config.config.pave[tooth[0]] + 's' : ''}</li>
                                                    <li className="pl-2">Material: {firstCapital(data?.[0].config.config.material[tooth[0]])}</li>
                                                    {data?.[0].config.config.stones[tooth[0]].shape &&
                                                        <li className="pl-2">Gem: {firstCapital(data?.[0].config.config.stones[tooth[0]].color as string)}, {firstCapital(data?.[0].config.config.stones[tooth[0]].shape as string)} cut</li>
                                                    }
                                                </ul>
                                            </div>
                                        })
                                        }
                                        <div>
                                            <h4 className="w-full py-1 px-3 bg-stone-200 mb-1">Features</h4>
                                            <ul>
                                            {Object.entries(data?.[0].config.config.preciousness).map(feat => {
                                                return <li key={feat[0] + feat[1]}
                                                           className="pl-2">{firstCapital(feat[0])}: {firstCapital(feat[1] as string)}</li>
                                            })
                                            }
                                            </ul>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button className="cursor-pointer py-2 px-4 rounded bg-gray-50 text-gray-950 border"
                                type="button">Contact customer
                        </button>
                        <button className="cursor-pointer py-2 px-4 rounded bg-gray-50 text-gray-950 border"
                                type="button">Upload dental scan
                        </button>
                        <button className="cursor-pointer py-2 px-4 rounded bg-gray-950 text-gray-50"
                                type="button">Update order status
                        </button>
                    </div>
                </div>
                <div className="w-[50vw] h-[calc(80vh-15vh)]">
                    <UserImages configId={data?.[0].config.id}/>
                </div>
            </div>
        </div>
    )
}