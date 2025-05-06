import { parseData, uploadFile } from '@/lib/cloudinary';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
    try {
        const { buffer, data } = await parseData(request)
        if (!buffer) {
            return Response.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }
        const result = await uploadFile('product_image', buffer)
        if (!result || !result.secure_url) {
            return Response.json({ success: false, message: 'Upload failed' }, { status: 500 });
        }
        return Response.json({ success: true, message: "File upload successfully", url: result.secure_url });

    } catch (error) {
        console.error('Upload error:', error);
        return Response.json(
            { error: (error as Error).message || 'Upload failed' },
            { status: 500 }
        );
    }
}