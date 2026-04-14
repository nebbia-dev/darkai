'use server'
import {createClient} from "@/lib/supabase/serverSU";
import {History, Packaging} from "@/app/_types/TeethOptions";

export default async function createConfig(config:History, total:number, packaging:Packaging|undefined, orderStatus:string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Configs')
        .insert({
            orderStatus: orderStatus,
            config: config,
            total: total,
            config_pack: packaging ? packaging : null
        })
        .select();
    console.log(error)
    return data;
}