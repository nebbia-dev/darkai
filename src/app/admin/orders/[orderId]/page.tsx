import {createClient} from "@/utils/supabase/server";
import elabToothName from "@/app/helpers/elabToothName";
import firstCapital from "@/app/helpers/firstCapital";
import BackButton from "@/app/components/BackButton";
import OrderInfo from "@/app/types/OrderInfo";
import {Preciousness} from "@/app/types/State";
import Select from "@/app/components/Select";
import Image from "next/image";
import {Write} from "@/app/components/icons/Write";
import {Tooltip} from "@mui/material";
import Link from 'next/link';
import UploadScanBackoffice from "@/app/components/UploadScanBackoffice";
export default async function Order({params}: { params: Promise<{ orderId: string[] }> }){
    const { orderId } = await params;
    const supabase = await createClient();
    const {data, error } = await supabase
        .from('Orders')
        .select('id, shipping, created_at, status, shippingAddress, user_id(' +
            'id, name, lastname, email, phone, scan), config(id, config, screen) ')
        .eq('id', orderId);

    const teethConfig = {};
    const jewelsConfig = {};

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

        teethConfig[propName] = propValue;

    })

    for (const [key, value] of Object.entries(teethConfig)) {
        if(jewelsConfig[value]) {
            jewelsConfig[value].push(key);
        } else {
            jewelsConfig[value] = [key]
        }
    }

    return(
        <div className="relative left-[7.5vw] w-[92.5vw] h-[calc(100vh-54px)]">
            <div className="bg-stone-100 h-[15vh] relative">
                <div className="h-full absolute flex items-center justify-center w-[7.5vw]">
                    <BackButton url="/admin/orders"/>
                </div>
                <div className="h-full flex flex-col justify-center">
                    <h2 className="font-bold text-2xl w-[75vw] mx-auto">Order
                        n.{(data as unknown as OrderInfo[])?.[0].id} </h2>

                    <div className="w-[75vw] mx-auto mt-2">
                        <h3 className="inline">Order status: </h3>
                        <Select st={(data as unknown as OrderInfo[])?.[0].status} orderId={(data as unknown as OrderInfo[])?.[0].id as number}/>
                    </div>
                </div>
            </div>
            <div className="w-[80%] mx-auto h-[calc(100vh-54px-15vh-4rem)] mb-[3rem] flex justify-center">
                <div className="w-[33vw] py-8 pr-8">
                    <h3 className="font-semibold mb-4">Configuration</h3>
                    <div className="overflow-y-auto h-full">
                        <div>
                            <div className="mb-4">
                                <h4 className="w-full py-1 px-3 bg-stone-200 mb-1">Features</h4>
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
                                <h4 className="w-full py-1 px-3 bg-stone-200 mb-1">Jewels list</h4>
                                <ul className="mb-2">
                                    {
                                        Object.entries(jewelsConfig).map(jewel => {
                                            return(
                                                <li className="mb-2 pl-2" key={jewel[0]}>
                                                    <span className="font-semibold">{jewel[0]}</span>
                                                    <ul>
                                                        {jewel[1].map(tooth => {
                                                            return(
                                                                <li key={tooth} className="flex items-center gap-1">
                                                                    <span className="inline-block w-1 h-1 bg-black rounded-full"></span>
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
                        </div>
                    </div>
                </div>
                <div className="w-[33vw] h-full overflow-y-auto py-8 border-l border-gray-400">

                    <div className="pt-4 flex gap-2 items-center justify-center h-full">
                        <div className="w-full">
                            <Image alt="config"
                                   className="object-cover w-full"
                                   src={`https://dggrbfhwlvvsxbhnobig.supabase.co/storage/v1/object/public/configs/${(data as unknown as OrderInfo[])?.[0].config.screen}`}
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