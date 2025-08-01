import {createClient} from "@/utils/supabase/server";
import elabToothName from "@/app/helpers/elabToothName";
import firstCapital from "@/app/helpers/firstCapital";
export default async function Order({params}: { params: Promise<{ orderId: string[] }> }){
    const { orderId } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Orders')
        .select('id, shipping, created_at, status, shippingAddress, user_id(' +
            'name, lastname, email, phone), config(config) ')
        .eq('id', orderId);
    console.log(data)

    return(
        <div className="w-[75vw] h-[calc(100vh-54px)] flex flex-col items-center justify-center mx-auto">
            <div className="w-full h-[calc(80vh)] overflow-y-auto">
                <ul className="flex flex-col gap-4">
                    <li>
                        <h2 className="font-semibold">Customer</h2>
                        <p className="pl-2">{data?.[0].user_id.name} {data?.[0].user_id.lastname}</p>
                    </li>

                    <li>
                        <h3 className="font-semibold">Contacts</h3>
                        <ul>
                            <li className="pl-2">Email: {data?.[0].user_id.email}</li>
                            <li className="pl-2">Phone: {data?.[0].user_id.phone}</li>
                        </ul>

                    </li>

                    <li>
                        <h3 className="font-semibold">Shipping information</h3>
                        {data?.[0].shipping
                            ? <ul>
                                    <li className="pl-2">Address: {data?.[0].shippingAddress.address}, {data?.[0].shippingAddress.postalCode} {data?.[0].shippingAddress.city} - {data?.[0].shippingAddress.state}
                                    </li>
                                    <li className="pl-2">Phone: {data?.[0].shippingAddress.phone}</li>
                                </ul>
                            : <p className="pl-2">Pick up in store</p>
                        }
                    </li>

                    <li>
                        <h3 className="font-semibold">Configuration</h3>
                            <ul>
                                { Object.entries(data?.[0].config.config.visible).map(tooth => {
                                    if(!tooth[1]) return null;
                                    if (tooth[0] === 'cisx' && (data?.[0].config.config.type[tooth[0]] === 'bigBar' || data?.[0].config.config.type[tooth[0]] === 'bigBarDiamond')) return null;
                                    if (tooth[0] === 'icisx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond')) return null;
                                    if (tooth[0] === 'icssx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond')) return null;

                                    return <li key={`${tooth}Visibility`} className="pl-2">
                                        <h4 className="w-full py-1 px-3 bg-stone-200 mb-1">{
                                            (tooth[0] === 'cidx' && (data?.[0].config.config.type[tooth[0]] === 'bigBar' || data?.[0].config.config.type[tooth[0]] === 'bigBarDiamond'))
                                                ? 'Canini inferiori'
                                                : (tooth[0] === 'icidx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond'))
                                                    ? 'Incisivi centrali inferiori'
                                                    : (tooth[0] === 'icsdx' && (data?.[0].config.config.type[tooth[0]] === 'bar' || data?.[0].config.config.type[tooth[0]] === 'barDiamond'))
                                                        ? 'Incisivi centrali superiori'
                                                        : elabToothName(tooth[0], false)
                                        }</h4>
                                        <div className="mb-2">
                                            <p className="pl-2">Jewel type: {firstCapital(data?.[0].config.config.type[tooth[0]].replace('Diamond', ''))} {data?.[0].config.config.type[tooth[0]].includes('Diamond') ? ' with ' + data?.[0].config.config.pave[tooth[0]] + 's': ''}</p>
                                            <p className="pl-2">Material: {firstCapital(data?.[0].config.config.material[tooth[0]])}</p>
                                            {data?.[0].config.config.stones[tooth[0]].shape &&
                                                <p className="pl-2">Gem: {firstCapital(data?.[0].config.config.stones[tooth[0]].color as string)}, {firstCapital(data?.[0].config.config.stones[tooth[0]].shape as string)} cut</p>
                                            }
                                        </div>
                                    </li>
                                })
                                }
                                <ul className="pl-2">
                                    <li>
                                        <h4 className="w-full py-1 px-3 bg-stone-200 mb-1">Features</h4>
                                    </li>

                                { Object.entries(data?.[0].config.config.preciousness).map(feat => {
                                    return <li key={feat[0]+feat[1]} className="pl-2">{firstCapital(feat[0])}: {firstCapital(feat[1] as string)}</li>
                                    })
                                }
                                </ul>
                            </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}