import {createClient} from "@/lib/supabase/server";
import elabToothName from "@/app/_helpers/_string-modders/elabToothName";
import firstCapital from "@/app/_helpers/_string-modders/firstCapital";
import BackButton from "@/app/_components/_elements/_buttons/BackButton";
import {Preciousness} from "@/app/_types/TeethOptions";

import Image from "next/image";
import confIdConverter from "@/app/_helpers/_converters/confIdConverter";
import elabVelvetName from "@/app/_helpers/_string-modders/elabVelvetName";
import elabMaterial from "@/app/_helpers/_string-modders/elabMaterial";
import {redirect} from "next/navigation";
export default async function Config({params}: { params: Promise<{ configId: string[] }> }){

    const supabase = await createClient();

    const { configId } = await params;
    const {data:config, error:configError } = await supabase
        .from('Configs')
        .select('*')
        .eq('id', configId);

    if(configError) {
        console.log(configError)
    }

    const teethConfig: {[key: string]:string} = {};
    const jewelsConfig:{[key: string]:string[]} = {};

    Object.entries(config?.[0].config.visible).forEach(tooth => {
        if (!tooth[1]) return null;
        const toothProp = config?.[0].config;
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
                                + ' ' + (toothProp.type[tooth[0]].replace('Diamond', '') === 'bigBar'
                                            ? 'bar'
                                            : toothProp.type[tooth[0]].replace('Diamond', '') === 'bigBar'
                                                ? 'spacer'
                                                : toothProp.type[tooth[0]].replace('Diamond', ''))
                                + (toothProp.type[tooth[0]].includes('Diamond') ? ' with ' + toothProp.pave[tooth[0]].color + ' ' + toothProp.pave[tooth[0]].shape + ' pave' : '')
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
            <div className="bg-gray-100 h-[15dvh] relative">
                <div className="h-full absolute flex items-center justify-center w-[7.5vw]">
                    <BackButton url="/admin/configs"/>
                </div>
                <div className="h-full flex flex-col justify-center">
                    <h1 className="font-bold text-2xl w-[75vw] mx-auto">Configuration {confIdConverter(config?.[0].id)} </h1>
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
                                    {config?.[0].config.preciousness
                                        && Object.entries(config?.[0].config.preciousness as Preciousness).map(feat => {
                                            return <li key={feat[0] + feat[1]}
                                                       className="pl-2">{firstCapital(feat[0])}: {feat[1]}</li>
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

                            {config?.[0]['config_pack'] &&
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-semibold">
                                            Premium Box
                                        </h4>
                                    </div>
                                    {/*type + material*/}
                                    <p className="pl-2">
                                        {firstCapital(config?.[0]['config_pack'].out)} box w/ {elabVelvetName(config?.[0]['config_pack'].in)} velvet
                                        and {elabMaterial(config?.[0]['config_pack'].details, 'gold')} gold details
                                    </p>
                                    {(config?.[0]['config_pack'].text.firstLine.length > 0 || config?.[0]['config_pack'].text.secondLine.length > 0) &&
                                        <p className="pl-2">
                                            Custom text: {
                                                    config?.[0]['config_pack'].text.firstLine && config?.[0]['config_pack'].text.secondLine
                                                        ? <span><br/>1) {config?.[0]['config_pack'].text.firstLine}<br/>2) {config?.[0]['config_pack'].text.secondLine}</span>
                                                        : config?.[0]['config_pack'].text.firstLine !== ''
                                                            ? config?.[0]['config_pack'].text.firstLine
                                                            : config?.[0]['config_pack'].text.secondLine
                                                }
                                        </p>
                                    }
                                </div>
                            }

                            <div className="mb-4">
                                <h3 className="w-full py-1 px-3 bg-gray-200 mb-3">Total</h3>
                                <p className="pl-2 mb-2">
                                    {new Intl.NumberFormat("it-IT", {
                                        style: "currency",
                                        currency: "EUR"
                                    }).format(config?.[0].total)}
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
                                   src={`https://aiuptuoijjmfcxutusbc.supabase.co/storage/v1/object/public/configs/${config?.[0].screen}`}
                                   width={1000} height={1000} quality={70}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}