import {createClient} from "@/utils/supabase/server";
import elabToothName from "@/app/_helpers/elabToothName";
import firstCapital from "@/app/_helpers/firstCapital";
import BackButton from "@/app/_components/_buttons/BackButton";
import OrderInfo from "@/app/_types/OrderInfo";
import {Preciousness} from "@/app/_types/State";
import Select from "@/app/_components/_elements/Select";
import Image from "next/image";
import {Write} from "@/app/_components/_icons/Write";
import {Tooltip} from "@mui/material";
import Link from 'next/link';
import UploadScanBackoffice from "@/app/_components/_upload/UploadScanBackoffice";
import orderIdConverter from "@/app/_helpers/orderIdConverter";
export default async function Order({params}: { params: Promise<{ orderId: string[] }> }){
    const { orderId } = await params;
    const supabase = await createClient();
    const {data, error } = await supabase
        .from('Orders')
        .select('id, order_id, shipping, created_at, status, shippingAddress, total, user_id(' +
            'id, name, lastname, email, phone, scan), config(id, config, screen) ')
        .eq('id', orderId);

    const teethConfig: {[key: string]:string} = {};
    const jewelsConfig:{[key: string]:string[]} = {};

    Object.entries((data as unknown as OrderInfo[])?.[0].config.config.visible).forEach(tooth => {
        if (!tooth[1]) return null;
        const toothProp = (data as unknown as OrderInfo[])?.[0].config.config;
        if (tooth[0] === 'cisx' && (!(toothProp) || toothProp.type[tooth[0]] === 'bigBar' || toothProp.type[tooth[0]] === 'bigBarDiamond')) return null;
        if (tooth[0] === 'icisx' && (!(toothProp) || toothProp.type[tooth[0]] === 'bar' || toothProp.type[tooth[0]] === 'barDiamond')) return null;
        if (tooth[0] === 'icssx' && (!(toothProp) || toothProp.type[tooth[0]] === 'bar' || toothProp.type[tooth[0]] === 'barDiamond')) return null;

        const propName = (tooth[0] === 'cidx' && (toothProp.type[tooth[0]] === 'bigBar' || toothProp.type[tooth[0]] === 'bigBarDiamond'))
            ? 'Lower canines'
            : (tooth[0] === 'icidx' && (toothProp.type[tooth[0]] === 'bar' || toothProp.type[tooth[0]] === 'barDiamond'))
                ? 'Lower central incisors'
                : (tooth[0] === 'icsdx' && (toothProp.type[tooth[0]] === 'bar' || toothProp.type[tooth[0]] === 'barDiamond'))
                    ? 'Upper central incisors'
                    : elabToothName(tooth[0], false);

        const propValue = firstCapital(toothProp.material[tooth[0]] as string)
                                + ' ' + (toothProp.type[tooth[0]].replace('Diamond', '') === 'bigBar' ? 'big bar' : toothProp.type[tooth[0]].replace('Diamond', ''))
                                + (toothProp.type[tooth[0]].includes('Diamond') ? ' with ' + toothProp.pave[tooth[0]] + 's pave' : '')
                                + (toothProp.stones[tooth[0]].shape ? '. Gem: ' + toothProp.stones[tooth[0]].color as string + ', ' + toothProp.stones[tooth[0]].shape as string + ' cut' : '');

        teethConfig[propName as string] = propValue;

    })

    for (const [key, value] of Object.entries(teethConfig)) {
        if(jewelsConfig[value]) {
            jewelsConfig[value].push(key);
        } else {
            jewelsConfig[value] = [key]
        }
    }

    return(
        <div className="relative left-[7.5vw] w-[92.5vw] h-page-nav">
            <div className="bg-gray-100 h-[15vh] relative">
                <div className="h-full absolute flex items-center justify-center w-[7.5vw]">
                    <BackButton url="/admin/orders"/>
                </div>
                <div className="h-full flex flex-col justify-center">
                    <h1 className="font-bold text-2xl w-[75vw] mx-auto">Order {orderIdConverter((data as unknown as OrderInfo[])?.[0].order_id)} </h1>

                    <div className="w-[75vw] mx-auto mt-2">
                        <h3 className="inline">Order status: </h3>
                        <Select st={(data as unknown as OrderInfo[])?.[0].status} orderId={(data as unknown as OrderInfo[])?.[0].id as number}/>
                    </div>
                </div>
            </div>
            <div className="w-[80%] mx-auto h-tab-height mb-[3rem] flex justify-center">
                <div className="w-[33vw] py-8 pr-8">
                    <h2 className="font-semibold mb-4">Configuration</h2>
                    <div className="overflow-y-auto h-full">
                        <div>
                            <div className="mb-4">
                                <h3 className="w-full py-1 px-3 bg-gray-200 mb-3">Composition</h3>
                                <ul>
                                    {(data as unknown as OrderInfo[])?.[0].config.config.preciousness
                                        && Object.entries((data as unknown as OrderInfo[])?.[0].config.config.preciousness as Preciousness).map(feat => {
                                            return <li key={feat[0] + feat[1]}
                                                       className="pl-2">{firstCapital(feat[0])}: {firstCapital(feat[1] as string)}</li>
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h3 className="w-full py-1 px-3 bg-gray-200 mb-3">Products</h3>
                                <ul className="mb-2">
                                    {
                                        Object.entries(jewelsConfig).map(jewel => {
                                            return (
                                                <li className="mb-2 pl-2" key={jewel[0]}>
                                                    <span className="font-semibold">{jewel[0]}</span>
                                                    <ul>
                                                        {jewel[1].map(tooth => {
                                                            return (
                                                                <li key={tooth} className="flex items-center gap-1">
                                                                    <span
                                                                        className="inline-block w-1 h-1 bg-black rounded-full"></span>
                                                                    {tooth}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h3 className="w-full py-1 px-3 bg-gray-200 mb-3">Total</h3>
                                <p className="pl-2 mb-2">
                                    {new Intl.NumberFormat("it-IT", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format((data as unknown as OrderInfo[])?.[0].total)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[33vw] h-full overflow-y-auto py-8 border-l border-gray-400">

                    <div className="pt-4 flex gap-2 items-center justify-center h-full">
                        <div className="w-full">
                            <Image alt="config"
                                   className="object-cover w-full"
                                   src={`https://ronyoylrbgiuxaawwtcb.supabase.co/storage/v1/object/public/configs/${(data as unknown as OrderInfo[])?.[0].config.screen}`}
                                   width={1000} height={1000} quality={70}/>
                        </div>
                    </div>
                </div>
                <div className="w-[33vw] h-full overflow-y-auto pt-8 border-l border-gray-400">
                    <div className="flex flex-col gap-4 pb-4 border-b border-gray-400 pl-8">
                        <div>
                            <h3 className="font-semibold">Customer</h3>
                            <p className="pl-2">{((data as unknown as OrderInfo[]) as OrderInfo[])?.[0].user_id.name} {(data as unknown as OrderInfo[])?.[0].user_id.lastname}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold flex items-center gap-2">
                                Contacts
                                <Tooltip title="Contact customer" placement="right">
                                    <Link className="cursor-pointer" href={`mailto:${(data as unknown as OrderInfo[])?.[0].user_id.email}`}>
                                        <Write/>
                                    </Link>
                                </Tooltip>
                            </h3>
                            <ul>
                            <li className="pl-2">Email: {(data as unknown as OrderInfo[])?.[0].user_id.email}</li>
                                <li className="pl-2">Phone: {(data as unknown as OrderInfo[])?.[0].user_id.phone}</li>
                            </ul>

                        </div>

                        <div>
                            <h3 className="font-semibold">Shipping information</h3>
                            {(data as unknown as OrderInfo[])?.[0].shipping
                                ? <ul>
                                    <li className="pl-2">Address: {(data as unknown as OrderInfo[])?.[0].shippingAddress.address}, {(data as unknown as OrderInfo[])?.[0].shippingAddress.postalCode} {(data as unknown as OrderInfo[])?.[0].shippingAddress.city} - {(data as unknown as OrderInfo[])?.[0].shippingAddress.state}
                                    </li>
                                    <li className="pl-2">Phone: {(data as unknown as OrderInfo[])?.[0].shippingAddress.phone}</li>
                                </ul>
                                : <p className="pl-2">Pick up in store</p>
                            }
                        </div>
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <UploadScanBackoffice userId={(data as unknown as OrderInfo[])?.[0].user_id.id as number} scanId={(data as unknown as OrderInfo[])?.[0].user_id.scan}/>
                    </div>
                </div>
            </div>
        </div>

    )
}