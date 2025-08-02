import { parseData, uploadFile } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { ProductList } from "@/models";


export const POST = withAuth(async (req) => {
    try {

        const { buffer, data } = await parseData(req)

        const { stock, category, price, description, name, discountPrice } = data

        if (discountPrice && Number(discountPrice) >= Number(price)) {
            return Response.json({ message: 'Discount Price should be less than to Price', success: false }, { status: 400 })
        }

        if (!name || !category || !stock || !price || !description) {
            return Response.json({ success: false, message: "Some fields are missing" })
        }

        if (!buffer) return Response.json({ success: false, message: "File uploaded failed" }, { status: 400 });
        await connectToDatabase();

        const result = await uploadFile('product_image', buffer)
        if (!result || !result.secure_url) {
            throw new Error('File upload failed')
        }

        const newData = { ...data, imageUrl: result.secure_url }


        await ProductList.create(newData)

        return Response.json({ success: true, message: "Product uploaded successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error uploading file:", error);
        return Response.json({ message: "Product upload failed ", success: false, error: (error as Error)?.message }, { status: 500 });
    }
})
