'use server'
import {createClient} from "@/utils/supabase/server";
import {History} from "@/app/_types/TeethOptions";

export default async function createConfig(config:History, total:number) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Configs')
        .insert({
            orderStatus: 'Completed',
            config: config,
            total: total,
        })
        .select();
    console.log(error)
    return data;
}