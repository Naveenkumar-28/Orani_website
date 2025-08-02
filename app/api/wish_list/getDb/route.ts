import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { WishList, ProductList } from "@/models";
import mongoose from "mongoose";

export const GET = withAuth(async (req: Request, _, user) => {

    try {
        await connectToDatabase()

        const wishlist = await WishList.findOne({ user: user._id }) || await WishList.create({ user: user._id, items: [] })
        let productList = []
        if (wishlist.items.length > 0) {
            const productIds = wishlist.items.map((p: { productId: string }) => new mongoose.Types.ObjectId(p.productId))
            productList = await ProductList.aggregate([
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
                        rating: 1,
                        stock: 1,
                        userRatings: { $size: '$userRatings' }
                    }
                }
            ]
            )
        }

        return Response.json({ success: true, products: productList, message: 'wishlist fetched dataBase successfully' }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: 'Somthing went wrong!', error: (error as Error).message }, { status: 500 })
    }
})