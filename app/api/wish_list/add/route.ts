import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { ProductList, WishList } from "@/models";
import mongoose from "mongoose";

export const POST = withAuth(async (req: Request, _, user) => {
    let product = {} as { _id: string }
    try {
        const body = await req.json()
        product = body?.product ?? null
    } catch (err) {
        return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 })
    }
    try {

        if (!product?._id) return Response.json({ message: "Please provide wish item _id" }, { status: 400 })
        await connectToDatabase()
        const wishList = await WishList.findOne({ user: user._id }) || new WishList({ user: user._id, items: [] });

        const existingItem = wishList.items
            .find((item: { productId: string, quantity: number }) => item.productId.toString() === product._id);
        if (!existingItem) {
            wishList.items.push({ productId: product._id });
        }
        await wishList.save();

        const [Product] = await ProductList.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(product._id)
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
        ])

        if (!Product) return Response.json({ success: false, message: "Product not found" }, { status: 404 })

        return Response.json({ success: true, product: Product, message: 'Item added successfully' }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: 'Somthing went wrong!', error: (error as Error).message }, { status: 500 })
    }
})