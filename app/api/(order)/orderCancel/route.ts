import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { Order, ProductList, User } from "@/models";
import { sendOrderCancelledEmail } from "@/templates";
import mongoose from "mongoose";

export type ProductType = {
    productId: string
    image: string,
    name: string,
    price: number,
    quantity: number,
}

export const POST = withAuth(async (req, _) => {
    try {
        const data = await req.json()
        if (!data.orderId) return Response.json({ success: false, message: 'Order id missing please try again' }, { status: 404 })

        await connectToDatabase()

        const order = await Order.findOne({ razorpay_order_id: data?.orderId })

        if (!order) {
            return Response.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        order.orderStatus = "cancelled"

        const productIds = order.items.map((p: ProductType) => new mongoose.Types.ObjectId(p.productId))
        const products = await ProductList.find({ _id: { $in: productIds } })

        // Loop through products from the order
        await Promise.all(order?.items.map(async (orderProduct: ProductType) => {

            const dbProduct = products.find((p) => p._id.toString() == orderProduct.productId.toString()); // Get all products from DB

            if (!dbProduct) {
                throw new Error(`${orderProduct.name} not found`);
            }

            dbProduct.stock += orderProduct.quantity;
            dbProduct.sold = Math.max(0, dbProduct.sold - orderProduct.quantity);

            // Save the updated product to the database
            await dbProduct.save()
        }))

        await order.save()

        const currentUser = await User.findOne({ _id: order.user })

        const { razorpay_order_id, items, subtotal, discount, deliveryCharge, totalAmount } = order

        const sendMailData = {
            to: currentUser.email,
            customerName: currentUser.name,
            orderId: razorpay_order_id,
            items,
            subtotal,
            discount,
            deliveryCharge,
            totalAmount
        }

        await sendOrderCancelledEmail(sendMailData)

        return Response.json({ success: true, message: 'Order as be cancelled' }, { status: 200 })

    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, error: err.message, message: "Order cancellation failed" }, { status: 500 })

    }

})