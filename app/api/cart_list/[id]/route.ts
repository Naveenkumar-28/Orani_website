import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { CartList } from "@/models";

export const DELETE = withAuth(async (req: Request, { params }, user) => {
    try {
        const { id } = await params

        if (!id) return Response.json({ success: false, message: "id is required please provide" }, { status: 400 })
        await connectToDatabase()

        const cartList = await CartList.findOne({ user: user._id })
        if (!cartList) return Response.json({ success: false, message: "CartList not found" }, { status: 404 })
        cartList.items = cartList.items.filter((p: { productId: string }) => p.productId.toString() !== id)
        await cartList.save()

        return Response.json({ success: true, message: 'Removed successfully' }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: 'Somthing went wrong!', error: (error as Error).message }, { status: 500 })
    }
})