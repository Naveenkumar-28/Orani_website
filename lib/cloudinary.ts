import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Function to parse data from a request object
export const parseData = async (req: NextRequest, options: { fileOptional?: boolean, fileSizeLimit?: number } = {}) => {
    const { fileOptional = false, fileSizeLimit = 1 } = options
    let data: Record<string, any> = {}
    let buffer: Buffer | null = null

    if (!req) {
        throw new Error('Request object is required')
    }
    const formData = await req.formData();
    const file = formData.get('file');

    if (!fileOptional) {
        if (!file) throw new Error('No file uploaded')
    }
    if (file && typeof file !== "string") {
        // Check file size (in bytes)
        const MAX_SIZE = fileSizeLimit * 1024 * 1024; // 1MB in bytes
        const fileSize = file.size;

        if (fileSize > MAX_SIZE) throw new Error('File size exceeds the 1MB limit')

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed')

        const arrayBuffer = await file.arrayBuffer();
        buffer = Buffer.from(arrayBuffer)
    }

    //Iterate through the formData and add it to the data object
    formData.forEach((value, key) => {
        if (key != 'file') {

            data[key] = value;
        }
    });

    return { buffer, data }
}

// Function to upload a file to Cloudinary
export const uploadFile = async (folderName: string, bufferData: Buffer) => {
    if (!folderName) throw new Error('foldername is required')
    if (!bufferData) throw new Error('bufferData is required')

    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: folderName,
                public_id: uuidv4(),
                resource_type: 'image',
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
        ).end(bufferData)
    });

    return result as UploadApiResponse
}

// Function to remove an image from Cloudinary using its public ID
export const removeColudinaryImage = async (publicId: string) => {

    if (!publicId) throw new Error('PublicId is required')

    const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    console.log(result);
    if (result.result !== 'ok') {
        throw new Error('Failed to remove image from cloudinary')
    }

    return result
}

// Function to get the public ID from a Cloudinary URL
export const getPublicIdFromUrl = (url: string) => {
    const parts = url.split('/');
    const filename = parts.slice(-2).join('/').split('.')[0];
    return filename;
};
