'use server'
import {createClient} from "@/lib/supabase/serverSU";

function getScanExtension(type: string | undefined) {
    const extension = type?.split('/')[1]?.split('+')[0];
    return extension || 'bin';
}

export default async function uploadScan(
    buffer:{ scan: ArrayBuffer|undefined, type: string | undefined },
    number:number,
    userId?:number
) {
    if (!buffer.scan) {
        throw new Error('Missing scan buffer');
    }

    const ext = getScanExtension(buffer.type);
    const fileName = `${number}.${ext}`;
    const supabase = await createClient();
    const {data, error} = await supabase
        .storage
        .from('scans')
        .upload(fileName, buffer.scan, {
            cacheControl: '3600',
            upsert: false,
            contentType: buffer.type || 'application/octet-stream'
        })

    if (error) {
        throw error;
    }

    if (userId !== undefined) {
        const { data: moreData, error: moreError } = await supabase
            .from('Customers')
            .update({ scan: fileName })
            .eq('id', userId);

        if (moreError) {
            throw moreError;
        }
    }

    return fileName;
}
