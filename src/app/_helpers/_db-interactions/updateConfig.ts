'use server'
import {createClient} from "@/utils/supabase/server";

export default async function updateConfig(configId:Number) {
    const supabase = await createClient();
    const { data: moreData, error: moreError } = await supabase
        .from('Configs')
        .update({ orderStatus: 'Completed' })
        .eq('id', configId);
}