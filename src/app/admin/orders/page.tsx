import {createClient} from "@/utils/supabase/server";
import dateConverter from "@/app/helpers/dateConverter";
import Link from 'next/link';
export default async function Page() {
    const supabase = await createClient();
    let { data, error } = await supabase
        .from('Orders')
        .select('*');
    console.log(data)
    return(
        <div className="w-[75vw] h-[calc(100vh-54px)] flex flex-col items-center justify-center mx-auto">
            <h2 className="font-bold text-2xl mb-8">Orders list</h2>
            <div className="h-[calc(80vh-54px)]">
                <table className="rounded border border-gray-400">
                <thead>
                <tr>
                    <th scope="col" className="font-semibold w-[15vw] py-4">Order Id</th>
                    <th scope="col" className="font-semibold w-[15vw] py-4">Date</th>
                    <th scope="col" className="font-semibold w-[15vw] py-4">Status</th>
                    <th scope="col" className="font-semibold w-[15vw] py-4">Shipping</th>
                    <th className="font-semibold w-[10vw]"></th>
                </tr>
                </thead>
                <tbody>
                    {data?.map((order, index) => (
                        <tr key={order.id} className={`${index % 2 === 0? 'border-t border-b border-t-gray-400 border-b-gray-400' : 'bg-stone-100'}`}>
                            <th scope="row" className="text-center h-[2rem]">{order.id}</th>
                            <td className="text-center h-[4rem]">{dateConverter(order.created_at)}</td>
                            <td className="text-center h-[4rem]">{order.status}</td>
                            <td className="text-center h-[4rem]">{order.shipping ? 'Standard shipping' : 'Pick up'}</td>
                            <td className="text-center h-[4rem]">
                                <Link href={`/admin/orders/${order.id}`}>&rarr;</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}