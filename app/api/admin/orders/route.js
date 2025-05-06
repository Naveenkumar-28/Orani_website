import Order from "../../../../models/Order";
import { connectToDatabase } from "../../../../lib/mongoDB";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit')) || 10
    const status = searchParams.get('status')
    console.log({ page, search, limit, status });

    try {
        await connectToDatabase()
        let orderDetails = []
        let total = 0
        const query = {}
        if (status) query.orderStatus = status
        if (search) query.razorpay_order_id = { $regex: search, $options: "i" }
        orderDetails = await Order.find(query).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).select("-paymentDetails")
        total = await Order.countDocuments(query)
        return Response.json({ success: true, total, orders: orderDetails }, { status: 200 })
    } catch (error) {
        console.log(error.message);

        return Response.json({ error: error?.message }, { status: 500 })
    }
} 