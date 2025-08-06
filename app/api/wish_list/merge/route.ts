import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { WishList } from "@/models";

type localProducts = {
    _id: string
};

export const POST = withAuth(async (req: Request, _, user) => {

    let productIds: localProducts[] = []
    try {
        const body = await req.json()
        productIds = body?.productIds ?? []
    } catch (err) {
        return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 })
    }
    try {
        if (productIds.length == 0) return Response.json({ message: 'Your wish items empty please provide wish items', success: false }, { status: 400 })
        await connectToDatabase()
        const wishList = await WishList.findOne({ user: user._id }) || new WishList({ user: user._id, items: [] });

        productIds.forEach(localItem => {
            const existingItem = wishList.items
                .find((item: { productId: string }) => item.productId.toString() === localItem._id);
            if (!existingItem) {
                wishList.items.push({ productId: localItem._id });
            }
        });
        await wishList.save();

        const getProductIds = wishList.items.map((p: {
            toObject: any; productId: string
        }) => {
            const obj = p.toObject()
            return {
                _id: obj.productId
            }
        })

        return Response.json({ success: true, products: getProductIds, message: 'WishList merged successfully' }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, message: 'WishList merge failed', error: err.message }, { status: 500 })
    }
})