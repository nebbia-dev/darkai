import {createClient} from "@/utils/supabase/server";
import dateConverter from "@/app/_helpers/_converters/dateConverter";
import CustomerInfo from "@/app/_types/CustomerInfo";
import DownloadCsv from "@/app/_components/_buttons/DownloadCsv";
export default async function Page() {
    const supabase = await createClient();
    let { data, error } = await supabase
        .from('Orders')
        .select('id, created_at, total, user_id(name, lastname, city, postalCode, state, email)');
    console.log(data);


    return(
        <div className="relative left-[7.5vw] w-[92.5vw]">
            <div className="bg-gray-100 flex flex-col justify-center h-[15vh]">
                <div className="w-[75vw] mx-auto flex items-center justify-between">
                    <h2 className="font-bold text-2xl">Customers list</h2>
                    <DownloadCsv data={data as unknown as CustomerInfo[]} />
                </div>
                <h3 className="w-[75vw] mx-auto mt-2">List of all customers</h3>
            </div>
            <div className="w-full h-tab-height mb-[3rem]">
                <div className="overflow-y-scroll">
                    <table className="w-full">
                    <thead className="border-b border-b-gray-400">
                    <tr>
                        <th scope="col" className="font-semibold text-left pr-2 pl-[10%] w-[20%] py-4">Name</th>
                        <th scope="col" className="font-semibold w-[10%] py-4">Email</th>
                        <th scope="col" className="font-semibold w-[10%] py-4">City</th>
                        <th scope="col" className="font-semibold w-[10%] py-4">Postal code</th>
                        <th scope="col" className="font-semibold w-[10%] py-4">State</th>
                        <th scope="col" className="font-semibold w-[10%] py-4">Order Date</th>
                        <th scope="col" className="font-semibold w-[20%] py-4 pl-2 pr-[10%]">Order Amount</th>
                        {/*<th scope="col" className="font-semibold w-[15%] py-4">Shipping</th>*/}
                    </tr>
                    </thead>
                        <tbody>
                        {data?.map((customer, index) => (
                            <tr key={(customer as unknown as CustomerInfo).id}
                                className={`${index % 2 !== 0 ? 'border-t border-b border-t-gray-400 border-b-gray-400' : 'bg-gray-100'}`}>
                                <td scope="row" className="text-left h-[2rem] pr-2 pl-[10%]">
                                    {(customer as unknown as CustomerInfo).user_id.name} {(customer as unknown as CustomerInfo).user_id.lastname}
                                </td>
                                <td className="text-center h-[4rem] px-2">{(customer as unknown as CustomerInfo).user_id.email}</td>
                                <td className="text-center h-[4rem] px-2">{(customer as unknown as CustomerInfo).user_id.city}</td>
                                <td className="text-center h-[4rem] px-2 ">{(customer as unknown as CustomerInfo).user_id.postalCode}</td>
                                <td className="text-center h-[4rem] px-2 ">{(customer as unknown as CustomerInfo).user_id.state}</td>
                                <td className="text-center h-[4rem] px-2">{dateConverter(customer.created_at)}</td>
                                <td className="text-center h-[4rem] pl-2 pr-[10%]">{new Intl.NumberFormat("it-IT", {
                                    style: "currency",
                                    currency: "EUR"
                                }).format(customer.total)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}