import {createClient} from "@/utils/supabase/server";
import dateConverter from "@/app/helpers/dateConverter";
import Link from 'next/link';
import orderIdConverter from "@/app/helpers/orderIdConverter";
import DownloadCsv from "@/app/components/DownloadCsv";
import OrderInfo from "@/app/types/OrderInfo";
export default async function Page() {
    const supabase = await createClient();
    let { data, error } = await supabase
        .from('Orders')
        .select('*, user_id(id, name, lastname)');
    console.log(data)
    return(
        <div className="relative left-[7.5vw] w-[92.5vw]">
            <div className="bg-stone-100 flex flex-col justify-center h-[15vh]">
                <div className="w-[75vw] mx-auto flex items-center justify-between">
                    <h2 className="font-bold text-2xl">Orders list</h2>
                    <DownloadCsv data={data as unknown as OrderInfo[]}/>
                </div>
                <h3 className="w-[75vw] mx-auto mt-2">List of all completed orders</h3>
            </div>
            <div className="w-full h-[calc(100vh-54px-15vh-3rem)] mb-[3rem]">
                <div className="overflow-y-scroll">
                <table className="w-full">
                    <thead className="border-b border-b-gray-400">
                    <tr>
                        <th scope="col" className="font-semibold w-[15%] py-4 text-right">
                            <span className="w-[7.5vw] inline-block text-center pr-[1.25rem]">
                                Order ID
                            </span>
                        </th>
                        <th scope="col" className="font-semibold w-[10%] py-4 pr-2 pl-[5%]">Date</th>
                        <th scope="col" className="font-semibold w-[15%] py-4 pr-2 pl-[5%]">Customer</th>
                        <th scope="col" className="font-semibold w-[12.5%] py-4">Total</th>
                        <th scope="col" className="font-semibold w-[12.5%] py-4">Status</th>
                        {/*<th scope="col" className="font-semibold w-[15%] py-4">Shipping</th>*/}
                        <th className="font-semibold w-[15%]"></th>
                    </tr>
                    </thead>
                        <tbody>
                        {data?.map((order, index) => (
                            <tr key={order.id}
                                className={`${index % 2 !== 0 ? 'border-t border-b border-t-gray-400 border-b-gray-400' : 'bg-stone-100'}`}>
                                <td scope="row" className="text-right h-[2rem] px-2">
                                    <span className="w-[7.5vw] inline-block text-center">
                                        {orderIdConverter(order.order_id)}
                                    </span>
                                </td>
                                <td className="text-center h-[4rem] pr-2 pl-[5%]">{dateConverter(order.created_at)}</td>
                                <td className="text-center h-[4rem] pr-2 pl-[5%]">{order.user_id.name} {order.user_id.lastname}</td>
                                <td className="text-center h-[4rem] px-2 ">{new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(order.total)}</td>
                                <td className={`text-center h-[4rem] 
                                    ${order.status === 'In production'
                                    ? 'bg-yellow-200'
                                    : order.status === 'Canceled'
                                        ? 'bg-red-200'
                                        : order.status === 'New'
                                            ? 'bg-sky-200'
                                            // Shipped/Picked up
                                            : 'bg-green-200'}`
                                }>{order.status}</td>
                                <td className="text-left h-[4rem] pl-4">
                                    <Link href={`/admin/orders/${order.id}`}>&rarr;</Link>
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