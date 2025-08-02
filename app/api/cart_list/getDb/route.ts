import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { ProductList, CartList } from "@/models";
import mongoose from "mongoose";

export const GET = withAuth(async (req: Request, _, user) => {

    try {
        await connectToDatabase()
        const cartList = await CartList.findOne({ user: user._id }) || await CartList.create({ user: user._id, items: [] })
        let updatedProducts = []
        if (cartList.items.length > 0) {
            const productIds = cartList.items.map((p: { productId: string }) => new mongoose.Types.ObjectId(p.productId))
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
            updatedProducts = productList
                .map((product) => {
                    const matchproduct = cartList.items.find((p: { productId: string }) => p.productId == product._id.toString())
                    const quantity = Math.min(matchproduct?.quantity || 1, product.stock)
                    return {
                        ...product,
                        quantity: quantity == 0 ? 1 : quantity
                    }

                })

        }

        return Response.json({ success: true, products: updatedProducts, message: 'cartList fetched dataBase successfully' }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: 'Somthing went wrong!', error: (error as Error).message }, { status: 500 })
    }
})