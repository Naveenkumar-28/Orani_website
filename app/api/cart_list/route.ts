import { connectToDatabase } from "@/lib/mongoDB";
import { ProductList } from "@/models";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
    let products = [] as { _id: string, quantity: number }[]
    try {
        const body = await req.json()
        products = body?.products ?? []
    } catch (err) {
        return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 })
    }
    try {
        if (products.length == 0) return Response.json({ success: false, message: "Please provide cart items" }, { status: 400 })
        const productIds = products.map((p) => new mongoose.Types.ObjectId(p._id))
        await connectToDatabase()
        const productList = await ProductList.aggregate([
            {
                $match: {
                    _id: { $in: productIds }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    discountPrice: 1,
                    price: 1,
                    imageUrl: 1,
                    stock: 1,
                    quantity: 1
                }
            }
        ])

        const updatedProducts = productList.map((product) => {
            const matchproduct = products.find((p) => p._id == product._id)
            const quantity = Math.min(matchproduct?.quantity || 1, product.stock)
            return {
                ...product,
                quantity: quantity == 0 ? 1 : quantity
            }

        })

        return Response.json({ success: true, products: updatedProducts, message: 'CartList fetched successfully' }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, message: 'CartList fetched failed', error: err.message }, { status: 500 })
    }
}