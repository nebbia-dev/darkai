import {createClient} from "@/lib/supabase/client";

type UploadBucket = 'configs' | 'scans';

type UploadTargetResponse = {
    path: string,
    token: string,
    publicUrl: string,
    error?: string,
};

function getFileExtension(file: File) {
    if (!file.name.includes('.')) {
        return undefined;
    }

    return file.name.split('.').pop()?.toLowerCase();
}

function getContentType(file: File) {
    if (file.type) {
        return file.type;
    }

    if (getFileExtension(file) === 'stl') {
        return 'model/stl';
    }

    return 'application/octet-stream';
}

export async function uploadToStorage(bucket: UploadBucket, file: File) {
    const contentType = getContentType(file);
    const targetResponse = await fetch('/api/storage/upload-target', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bucket,
            contentType,
            fileName: file.name,
        }),
    });

    const targetPayload = await targetResponse.json().catch(() => null) as UploadTargetResponse | null;

    if (!targetResponse.ok || !targetPayload?.path || !targetPayload.token) {
        throw new Error(targetPayload?.error || 'Unable to initialize the upload');
    }

    const supabase = createClient();
    const {error} = await supabase
        .storage
        .from(bucket)
        .uploadToSignedUrl(targetPayload.path, targetPayload.token, file, {
            cacheControl: '3600',
            contentType,
        });

    if (error) {
        throw error;
    }

    return {
        path: targetPayload.path,
        publicUrl: targetPayload.publicUrl,
    };
}

export async function dataUrlToFile(dataUrl: string, baseName: string) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const extension = blob.type?.split('/')[1]?.split('+')[0] || 'bin';

    return new File([blob], `${baseName}.${extension}`, {
        type: blob.type || 'application/octet-stream',
    });
}
