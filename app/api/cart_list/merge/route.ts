import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { CartList } from "@/models";

type localProducts = {
    _id: string, quantity: number
};

export const POST = withAuth(async (req: Request, _, user) => {

    let products: localProducts[] = []
    try {
        const body = await req.json()
        products = body?.products ?? []
    } catch (err) {
        return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 })
    }
    try {
        await connectToDatabase()
        if (products.length == 0) return Response.json({ message: 'Your cart items empty please provide cart items', success: false }, { status: 400 })
        const cartList = await CartList.findOne({ user: user._id }) || new CartList({ user: user._id, items: [] });

        products.forEach(localItem => {
            const existingItem = cartList.items
                .find((item: { productId: string, quantity: number }) => item.productId.toString() === localItem._id);
            if (existingItem) {
                existingItem.quantity = Math.max(1, localItem.quantity);
            } else {
                cartList.items.push({ productId: localItem._id, quantity: Math.max(1, localItem.quantity) });
            }
        });

        await cartList.save();

        const updatedProduts = cartList.items.map((p: {
            productId: string; quantity: number
        }) => {

            return {
                _id: p.productId,
                quantity: p.quantity
            }

        })

        return Response.json({ success: true, products: updatedProduts, message: 'cartList merge successfully' }, { status: 200 })
    } catch (error) {
        console.log(error);

        return Response.json({ success: false, message: 'Somthing went wrong!', error: (error as Error).message }, { status: 500 })
    }
})