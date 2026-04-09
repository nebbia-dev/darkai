'use server'
import {createClient} from "@/lib/supabase/server";

export default async function uploadConfig(base64:any, number:Number, configId:Number) {
    const baseString = (base64 as string).split('base64,')[1];
    const buffer = Buffer.from(baseString, 'base64');
    const supabase = await createClient();
    const {data, error} = await supabase
        .storage
        .from('configs')
        .upload(number + '.png', buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/png'
        })
    const { data: moreData, error: moreError } = await supabase
        .from('Configs')
        .update({ screen: number + '.png' })
        .eq('id', configId);
}