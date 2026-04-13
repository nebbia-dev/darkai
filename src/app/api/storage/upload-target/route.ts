import {createClient} from "@/lib/supabase/serverSU";

const allowedBuckets = new Set(['configs', 'scans']);

function getExtensionFromFileName(fileName: string | undefined) {
    if (!fileName || !fileName.includes('.')) {
        return undefined;
    }

    return fileName.split('.').pop()?.toLowerCase();
}

function getExtensionFromContentType(contentType: string | undefined) {
    return contentType?.split('/')[1]?.split('+')[0]?.toLowerCase();
}

export async function POST(request: Request) {
    const payload = await request.json().catch(() => null) as {
        bucket?: string,
        contentType?: string,
        fileName?: string,
    } | null;

    if (!payload?.bucket || !allowedBuckets.has(payload.bucket)) {
        return Response.json({error: 'Invalid bucket'}, {status: 400});
    }

    const extension = getExtensionFromFileName(payload.fileName)
        || getExtensionFromContentType(payload.contentType)
        || 'bin';
    const filePath = `${crypto.randomUUID()}.${extension}`;
    const supabase = await createClient();
    const {data, error} = await supabase
        .storage
        .from(payload.bucket)
        .createSignedUploadUrl(filePath);

    if (error || !data) {
        return Response.json(
            {error: error?.message || 'Unable to create an upload URL'},
            {status: 500},
        );
    }

    const {data: publicData} = supabase
        .storage
        .from(payload.bucket)
        .getPublicUrl(data.path);

    return Response.json({
        bucket: payload.bucket,
        path: data.path,
        token: data.token,
        publicUrl: publicData.publicUrl,
    });
}
