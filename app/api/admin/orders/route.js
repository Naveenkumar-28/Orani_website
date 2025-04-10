import Order from "../../../../models/Order";
import { connectToDatabase } from "../../../../lib/mongoDB";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit')) || 10
    console.log(page, search, limit);

    try {
        await connectToDatabase()
        let orderDetails = []
        const total = await Order.countDocuments()
        if (search) {
            orderDetails = await Order.find({ razorpay_order_id: { $regex: search, $options: "i" } }).select("-paymentDetails -products -shippingAddress")
        } else {
            orderDetails = await Order.find().sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).select("-paymentDetails -products -shippingAddress")
        }
        console.log(orderDetails);
        return Response.json({ success: true, total, orders: orderDetails }, { status: 200 })
    } catch (error) {
        console.log(error.message);

        return Response.json({ error: error?.message }, { status: 500 })
    }
} 