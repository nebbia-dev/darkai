'use server'
import {createClient} from "@/lib/supabase/server";

export default async function uploadScan(buffer:{ scan: ArrayBuffer|undefined, type: string | undefined }, number:Number, userId:Number) {
    const ext = buffer.type?.split('/')[1];
    const supabase = await createClient();
    const {data, error} = await supabase
        .storage
        .from('scans')
        .upload(number + '.' + ext, buffer.scan as ArrayBuffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: buffer.type as string
        })
    const { data: moreData, error: moreError } = await supabase
        .from('Customers')
        .update({ scan: number + '.' + ext })
        .eq('id', userId);
}