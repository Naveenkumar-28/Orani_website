import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { ProductList, CartList } from "@/models";
import mongoose from "mongoose";

export const POST = withAuth(async (req: Request, _, user) => {
    let product = {} as { _id: string, quantity: number }
    try {
        const body = await req.json()
        product = body?.product ?? null
    } catch (err) {
        return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 })
    }
    try {

        if (!product) return Response.json({ message: "Please provide cart item" }, { status: 400 })
        await connectToDatabase()
        const cartList = await CartList.findOne({ user: user._id }) || new CartList({ user: user._id, items: [] });

        const existingItem = cartList.items.find((item: { productId: string, quantity: number }) => item.productId.toString() === product._id);
        if (existingItem) {
            existingItem.quantity = Math.max(1, product.quantity);
        } else {
            cartList.items.push({ productId: product._id, quantity: Math.max(1, product.quantity) });
        }

        await cartList.save();

        const [AddProduct] = await ProductList.aggregate([
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
                    stock: 1,
                    quantity: 1
                }
            }
        ])
        if (!AddProduct) return Response.json({ success: false, message: "product not found" }, { status: 404 })

        const updatedProduct = { ...AddProduct, quantity: Math.min(product.quantity, AddProduct.stock) }

        return Response.json({ success: true, product: updatedProduct, message: 'Cart item added successfully' }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, message: 'Cart item add failed', error: err.message }, { status: 500 })
    }
})