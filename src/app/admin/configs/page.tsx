import {createClient} from "@/utils/supabase/server";
import dateConverter from "@/app/helpers/dateConverter";
import Link from 'next/link';
export default async function Page() {
    const supabase = await createClient();
    let { data, error } = await supabase
        .from('Configurations')
        .select('*');
    let { data:orders, error:ordersError } = await supabase
        .from('Orders')
        .select('status, config');
    data?.forEach(config => {
        orders?.forEach(order => {
            if(config.id === order.config) {
                config['orderStatus'] = 'Order finalized'
            }
        })
    })
    console.log(data)
    return(
        <div className="relative left-[7.5vw] w-[92.5vw]">
            <div className="bg-stone-100 flex flex-col justify-center h-[15vh]">
                <h2 className="font-bold text-2xl w-[75vw] mx-auto">Configurations list</h2>
                <h3 className="w-[75vw] mx-auto mt-2">List of all configurations</h3>
            </div>
            <div className="w-full h-[calc(100vh-54px-15vh-3rem)] mb-[3rem]">
                <div className="overflow-y-scroll">
                    <table className="w-full">
                    <thead className="border-b border-b-gray-400">
                    <tr>
                        <th scope="col" className="font-semibold w-[25%] py-4 text-right">
                            <span className="inline-block text-center">
                                Configuration Id
                            </span>
                        </th>
                        <th scope="col" className="font-semibold w-[25%] py-4">Date</th>
                        <th scope="col" className="font-semibold w-[25%] py-4">Configurator outcome</th>
                        <th className="font-semibold w-[25%]"></th>
                    </tr>
                    </thead>
                        <tbody>
                        {data?.map((config, index) => (
                            <tr key={config.id}
                                className={`${index % 2 !== 0 ? 'border-t border-b border-t-gray-400 border-b-gray-400' : 'bg-stone-100'}`}>
                                <td scope="row" className="text-right h-[2rem] px-2">
                                    <span className="w-[7.5vw] inline-block text-center">
                                        {config.id}
                                    </span>
                                </td>
                                <td className="text-center h-[4rem] px-2">{dateConverter(config.created_at)}</td>
                                <td className={`text-center h-[4rem] ${config.orderStatus ? 'bg-green-200' : 'bg-gray-200'}`}>{config.orderStatus ?? 'Order not finalized'}</td>
                                <td className="text-left h-[4rem] pl-12">
                                    <Link href={`/admin/configs/${config.id}`}>&rarr;</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}