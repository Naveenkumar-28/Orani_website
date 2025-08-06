import { connectToDatabase } from "@/lib/mongoDB";
import { ProductList } from "@/models";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
    let products = [] as { _id: string }[]
    try {
        const body = await req.json()
        products = body?.products ?? []
    } catch (err) {
        return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 })
    }
    try {
        if (products.length == 0) return Response.json({ success: false, message: "Please provide wish items" }, { status: 400 })
        await connectToDatabase()
        const productIds = products.map(p => new mongoose.Types.ObjectId(p._id));

        const productList = await ProductList.aggregate([
            {
                $match: {
                    _id: { $in: productIds }
                }
            },
            {
                $project: {
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

        return Response.json({ success: true, products: productList, message: 'wishList fetched successfully' }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, message: 'WishList fetch failed', error: err.message }, { status: 500 })
    }
}