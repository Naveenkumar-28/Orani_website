import { connectToDatabase } from "@/lib/mongoDB";
import ProductList from "../../../../../models/ProductList";
import { getPublicIdFromUrl, parseData, removeColudinaryImage, uploadFile } from "../../../../../lib/cloudinary";


export async function DELETE(req, { params }) {
    try {
        await connectToDatabase()
        const data = await params
        if (!data.id) return Response.json({ success: false, message: "ID is required but not provided" }, { status: 404 })
        const { id } = data

        const product = await ProductList.findByIdAndDelete(id)

        if (!product) return Response.json({ success: false, message: "Product not found!" }, { status: 404 })
        const publicId = getPublicIdFromUrl(product.ImageUrl)
        await removeColudinaryImage(publicId)
        return Response.json({ success: true, message: "Successfully Removed" }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return Response.json({ success: false, message: error.message }, { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    try {
        await connectToDatabase()
        const paramsData = await params
        if (!paramsData.id) return Response.json({ success: false, message: "ID is required but not provided" }, { status: 404 })
        const { id } = paramsData

        const { buffer, data } = await parseData(req, { fileOptional: true, fileSizeLimit: 1 })
        console.log({ buffer, data });

        const product = await ProductList.findById(id)
        if (!product) return Response.json({ success: false, message: 'Product not found' }, { status: 404 })

        if (buffer) {
            const publicId = getPublicIdFromUrl(product.ImageUrl)
            console.log({ publicId });

            await removeColudinaryImage(publicId)
            const result = await uploadFile('product_image', buffer)
            console.log({ result });

            data.ImageUrl = result.secure_url

            const updatedProduct = await ProductList.findByIdAndUpdate(
                id,
                data,
                { new: true } // Return the updated document
            );


            if (!updatedProduct) return Response.json({ success: false, message: "Product not found" }, { status: 404 })

        } else {

            const updatedProduct = await ProductList.findByIdAndUpdate(
                id,
                data,
                { new: true } // Return the updated document
            );

            if (!updatedProduct) return Response.json({ success: false, message: "Product not found" }, { status: 404 })

        }
        return Response.json({ success: true, message: "Product updated successfully" }, { status: 200 })

    } catch (error) {
        console.log(error.message);

        return Response.json({ success: false, message: error.message }, { status: 500 })
    }
}
