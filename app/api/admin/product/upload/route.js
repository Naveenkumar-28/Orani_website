import { connectToDatabase } from "../../../../../lib/mongoDB";
import { parseData, uploadFile } from "../../../../../lib/cloudinary";
import ProductList from "../../../../../models/ProductList";

export async function POST(req) {
    try {
        await connectToDatabase();

        const { buffer, data } = await parseData(req)

        const result = await uploadFile('product_image', buffer)
        if (!result || !result.secure_url) {
            return Response.json({ success: false, message: 'Upload failed' }, { status: 500 });
        }

        const newData = { ...data, ImageUrl: result.secure_url }

        const product = await ProductList.create(newData)

        return Response.json({ success: true, message: "File uploaded successfully", product }, { status: 201 });
    } catch (error) {
        console.error("Error uploading file:", error);
        return new Response(JSON.stringify({ message: "File upload failed ", error: error.message }), { status: 500 });
    }
}
