
import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { Order, ProductList, User } from "@/models";
import { sendOrderCancelledEmail } from "@/templates";
import mongoose from "mongoose";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export type ProductType = {
    productId: string
    image: string,
    name: string,
    price: number,
    quantity: number,
}

export const PATCH = withAuth(async (req, { params }) => {
    try {
        const { status } = await req.json()
        const { id } = await params
        if (!status) return Response.json({ success: false, message: 'Order Status are required Please provide order status' }, { status: 400 })

        if (!id) return Response.json({ success: false, message: 'Id is required' }, { status: 400 })

        await connectToDatabase()

        // 1. Find the order
        const existingOrder = await Order.findById(id)

        if (!existingOrder) {
            return Response.json({ success: false, message: 'Order not found' }, { status: 404 })
        }

        if (status.toLowerCase() === 'cancelled') {
            const paymentId = existingOrder.paymentDetails.razorpay_payment_id

            // check status before refund
            const payment = await razorpay.payments.fetch(paymentId)

            if (payment.status !== 'captured') {
                return Response.json({ success: false, message: 'Payment not captured, cannot refund' }, { status: 400 })
            }

            // Check if refund already issued
            const refunds = await razorpay.refunds.all({ payment_id: paymentId } as any)

            if (refunds.items.length > 0) {
                return Response.json({ success: false, message: 'Payment already refunded' }, { status: 400 })
            }

            // Refund via Razorpay
            try {
                await razorpay.payments.refund(paymentId, {
                    amount: payment.amount,
                    speed: "normal",
                    notes: {
                        reason: "Order cancelled"
                    }
                })
            } catch (refundError) {
                console.error('Razorpay refund failed:', refundError)
                return Response.json({ success: false, message: 'Refund failed' }, { status: 500 })
            }

            // Restock product quantities
            const productIds = existingOrder.items.map((p: { productId: string }) => new mongoose.Types.ObjectId(p.productId))
            const products = await ProductList.find({ _id: { $in: productIds } })

            // Loop through products from the order
            await Promise.all(existingOrder?.items.map(async (orderProduct: ProductType) => {

                const dbProduct = products.find((p) => p._id.toString() == orderProduct.productId.toString()); // Get all products from DB

                if (!dbProduct) {
                    throw new Error(`${orderProduct.name} not found`);
                }

                dbProduct.stock += orderProduct.quantity;
                dbProduct.sold = Math.max(0, dbProduct.sold - orderProduct.quantity);

                // Save the updated product to the database
                await dbProduct.save()
            }))

            const currentUser = await User.findOne({ _id: existingOrder.user })

            const { razorpay_order_id, items, subtotal, discount, deliveryCharge, totalAmount } = existingOrder

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
        }

        existingOrder.orderStatus = status

        await existingOrder.save()

        const order = { _id: existingOrder?._id, orderStatus: existingOrder?.orderStatus }

        return Response.json({ success: true, updatedOrder: order, message: "Order status update successfully" }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, error: err.message, message: "Order status update failed" }, { status: 500 })
    }
})