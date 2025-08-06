import { ProductList } from '@/models';
import { connectToDatabase } from "@/lib/mongoDB";
import mongoose from 'mongoose';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {

    try {
        await connectToDatabase();
        const data = await params
        const product = await ProductList.findOne({ _id: data.id })
        if (!product) {
            return Response.json({ message: "This Product Not found" }, { status: 404 })
        }

        let relatedProducts = await ProductList.find({ category: { $regex: new RegExp(product.category, "i") } }).select(" imageUrl price discountPrice name _id")

        if (relatedProducts) {
            relatedProducts = relatedProducts.filter((item) => String(item._id) != String(product._id)).splice(0, 9)
        }

        const formattedProduct = product.toObject()
        const specificProduct = { ...formattedProduct, userRatings: formattedProduct.userRatings.length }


        return Response.json({ success: true, specificProduct, relatedProducts }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json(
            { success: false, message: "Specific product fetched failed", error: err.message },
            { status: 500 }
        )
    }
}