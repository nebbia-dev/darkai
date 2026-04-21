import uploadScan from "@/app/_helpers/_db-interactions/uploadScan";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
        return Response.json({error: 'Missing file'}, {status: 400});
    }

    const arrayBuffer = await file.arrayBuffer();
    const number = Math.random() * 100 + Math.cos(Math.random() * 100);

    try {
        const fileName = await uploadScan(
            {
                scan: arrayBuffer,
                type: file.type || undefined,
            },
            number,
        );

        return Response.json({fileName});
    } catch (error) {
        return Response.json(
            {error: error instanceof Error ? error.message : 'Unable to upload scan'},
            {status: 500},
        );
    }
}
