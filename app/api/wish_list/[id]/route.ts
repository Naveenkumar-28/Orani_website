import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { WishList } from '@/models'

export const DELETE = withAuth(async (req: Request, { params }, user) => {
    try {
        const { id } = await params

        if (!id) return Response.json({ success: false, message: "id is required please provide" }, { status: 400 })
        await connectToDatabase()
        const wishList = await WishList.findOne({ user: user._id })
        if (!wishList) return Response.json({ success: false, message: "Wishlist not found" }, { status: 404 })
        wishList.items = wishList.items.filter((p: { productId: string }) => p.productId.toString() !== id)
        await wishList.save()

        return Response.json({ success: true, productId: id, message: 'Wish item Removed successfully' }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, message: 'Wish item Remove failed', error: err.message }, { status: 500 })
    }
})