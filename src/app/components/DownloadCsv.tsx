'use client'
import CustomerInfo from "@/app/types/CustomerInfo";
import dateConverter from "@/app/helpers/dateConverter";
import removeCommas from "@/app/helpers/removeCommas";
import ConfigInfo from "@/app/types/ConfigInfo";
import OrderInfo from "@/app/types/OrderInfo";
import orderIdConverter from "@/app/helpers/orderIdConverter";
import confIdConverter from "@/app/helpers/confIdConverter";

export default function DownloadCsv({data} : {data: CustomerInfo[]| ConfigInfo[] | OrderInfo[] | null }) {
    if(!data) {
        return;
    }

    function downloadCsv() {
        if(!data) {
            return
        }
        const arr:string[][] = [];
        let filename;


        if((data as unknown as ConfigInfo[])?.[0].screen) {
                arr.push(['Configuration ID', 'Date', 'Total', 'Configurator outcome']);
                data?.forEach(el => {
                    arr.push([
                        removeCommas(confIdConverter((el as unknown as ConfigInfo).config_id)),
                        removeCommas(dateConverter((el as unknown as ConfigInfo).created_at)),
                        removeCommas((el as unknown as ConfigInfo).total.toString()) + '€',
                        (el as unknown as ConfigInfo).orderStatus ? removeCommas((el as unknown as ConfigInfo).orderStatus) : "Order not finalized",
                    ])
                })
                filename = 'DarkaiLab_Configs_List_' + new Date().toLocaleDateString('it-IT');

        } else if((data as unknown as OrderInfo[])?.[0].shipping) {
                arr.push(['Order ID', 'Date', 'Customer', 'Total', 'Status']);
                data?.forEach(el => {
                    arr.push([
                        removeCommas(orderIdConverter((el as unknown as OrderInfo).order_id)),
                        removeCommas(dateConverter((el as unknown as OrderInfo).created_at)),
                        removeCommas((el as unknown as OrderInfo).user_id.name) + ' ' + removeCommas((el as unknown as OrderInfo).user_id.lastname),
                        removeCommas((el as unknown as OrderInfo).total.toString()) + '€',
                        removeCommas((el as unknown as OrderInfo).status as string),
                    ])
                })
                filename = 'DarkaiLab_Orders_List_' + new Date().toLocaleDateString('it-IT');

        } else {
                arr.push(['Name', 'City', 'Postal code', 'State', 'Order Date', 'Order Amount']);
                data?.forEach(el => {
                    arr.push([
                        removeCommas((el as unknown as CustomerInfo).user_id.name) + ' ' + removeCommas((el as unknown as CustomerInfo).user_id.lastname),
                        removeCommas((el as unknown as CustomerInfo).user_id.city),
                        removeCommas((el as unknown as CustomerInfo).user_id.postalCode),
                        removeCommas((el as unknown as CustomerInfo).user_id.state),
                        removeCommas(dateConverter((el as unknown as CustomerInfo).created_at)),
                        removeCommas((el as unknown as CustomerInfo).total.toString()) + '€'
                    ])
                })
                filename = 'DarkaiLab_Customers_List_' + new Date().toLocaleDateString('it-IT');
            }

        console.log(arr);

        let csvContent = '';

        arr.forEach(row => {
            csvContent += row.join(',') + '\n'
        })

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const objUrl = URL.createObjectURL(blob);
            a.style = 'display: none';
            a.href = objUrl;
            a.download = filename;
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(objUrl);
                document.body.removeChild(a);
            }, 200);
        }
    }

    return (
        <button type="button" className="text-md border rounded-full px-3 py-1 cursor-pointer"
                onClick={downloadCsv}>Download .CSV</button>
    )
}