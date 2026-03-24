import {createClient} from "@/utils/supabase/server";
import dateConverter from "@/app/_helpers/_converters/dateConverter";
import Link from 'next/link';
import confIdConverter from "@/app/_helpers/_converters/confIdConverter";
import DownloadCsv from "@/app/_components/_elements/_buttons/DownloadCsv";
import ConfigInfo from "@/app/_types/ConfigInfo";
export default async function Page() {
    const supabase = await createClient();
    let { data, error } = await supabase
        .from('Configs')
        .select('*');
    let { data:orders, error:ordersError } = await supabase
        .from('Orders')
        .select('status, config');
    data?.forEach(config => {
        orders?.forEach(order => {
            if(config.id === order.config) {
                config['orderStatus'] = 'Completed'
            }
        })
    })

    return(
        <div className="relative left-[7.5vw] w-[92.5vw]">
            <div className="bg-gray-100 flex flex-col justify-center h-[15dvh]">
                <div className="w-[75vw] mx-auto flex items-center justify-between">
                    <h2 className="font-bold text-2xl">Configurations list</h2>
                    <DownloadCsv data={data as unknown as ConfigInfo[]}/>
                </div>
                <h3 className="w-[75vw] mx-auto mt-2">List of all configurations</h3>
            </div>
            <div className="w-full h-tab-height mb-[3rem]">
                <div className="overflow-y-scroll">
                <table className="w-full">
                    <thead className="border-b border-b-gray-400">
                    <tr>
                        <th scope="col" className="font-semibold w-[20%] py-4 text-right">
                            <span className="inline-block text-center">
                                Configuration ID
                            </span>
                        </th>
                        <th scope="col" className="font-semibold w-[15%] py-4 pr-4 pl-[5%]">Date</th>
                        <th scope="col" className="font-semibold w-[15%] py-4">Total</th>
                        <th scope="col" className="font-semibold w-[20%] py-4">Configurator outcome</th>
                        <th className="font-semibold w-[20%]"></th>
                    </tr>
                    </thead>
                        <tbody>
                        {data?.map((config, index) => (
                            <tr key={config.id}
                                className={`${index % 2 !== 0 ? 'border-t border-b border-t-gray-400 border-b-gray-400' : 'bg-gray-100'}`}>
                                <td scope="row" className="text-right h-[2rem] px-2">
                                    <span className="w-[7.5vw] inline-block text-center">
                                        {confIdConverter(config.config_id)}
                                    </span>
                                </td>
                                <td className="text-center h-[4rem] pr-2 pl-[5%]">{dateConverter(config.created_at)}</td>
                                <td scope="row" className="text-center h-[4rem] px-2">
                                        {new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(config.total)}
                                </td>
                                <td className={`text-center h-[4rem] ${config.orderStatus === 'Completed' ? 'bg-green-200' : 'bg-gray-200'}`}>{config.orderStatus}</td>
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