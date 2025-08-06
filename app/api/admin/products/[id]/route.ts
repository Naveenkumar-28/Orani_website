import { getPublicIdFromUrl, parseData, removeColudinaryImage, uploadFile } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { ProductList } from "@/models";
import { number } from "yup";


export const DELETE = withAuth(async (_, { params }) => {
    try {
        await connectToDatabase()
        const data = await params
        if (!data.id) return Response.json({ success: false, message: "ID is required but not provided" }, { status: 400 })
        const { id } = data

        const product = await ProductList.findByIdAndDelete(id)

        if (!product) return Response.json({ success: false, message: "Product not found!" }, { status: 404 })
        const publicId = getPublicIdFromUrl(product.imageUrl)
        await removeColudinaryImage(publicId)
        return Response.json({ success: true, message: "Product Removed successfully" }, { status: 200 })
    } catch (error) {
        console.log((error as Error).message);
        return Response.json({ success: false, error: (error as Error).message, message: "Somthing went wrong!" }, { status: 500 })
    }
})

export const PATCH = withAuth(async (req, { params }) => {
    try {
        await connectToDatabase()
        const paramsData = await params
        if (!paramsData.id) return Response.json({ success: false, message: "ID is required but not provided" }, { status: 404 })
        const { id } = paramsData

        const { buffer, data } = await parseData(req, { fileOptional: true, fileSizeLimit: 1 })

        const { stock, category, price, description, name, discountPrice } = data

        if (discountPrice && Number(discountPrice) >= Number(price)) {
            return Response.json({ message: 'Discount Price should be less than to Price', success: false }, { status: 400 })
        }

        if (!name || !category || !stock || !price || !description) {
            return Response.json({ success: false, message: "Some fields are missing" })
        }

        const product = await ProductList.findById(id).select("-rating -userRatings -createdAt -updatedAt -__v -sold")

        if (!product) return Response.json({ success: false, message: 'Product not found' }, { status: 404 })

        if (buffer) {
            const publicId = getPublicIdFromUrl(product.imageUrl)

            await removeColudinaryImage(publicId)

            const result = await uploadFile('product_image', buffer)

            product.name = name
            product.price = price
            product.discountPrice = discountPrice || null
            product.category = category
            product.imageUrl = result.secure_url
            product.description = description
            product.stock = stock

            await product.save()

        } else {
            product.name = name
            product.price = price
            product.discountPrice = discountPrice || null
            product.category = category
            product.description = description
            product.stock = stock

            await product.save()
        }

        return Response.json({ success: true, message: "Product updated successfully", updatedProduct: product }, { status: 200 })

    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, error: err.message, message: "Product update failed" }, { status: 500 })
    }
})
