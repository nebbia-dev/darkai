const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function buildPublicStorageUrl(bucket: string, path: string | null | undefined) {
    if (!supabaseUrl) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
    }

    return `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${path ?? ''}`;
}
