import { connectToDatabase } from "../../../../../lib/mongoDB";
import Order from "../../../../../models/Order";

export async function PATCH(req, { params }) {
    try {
        const { searchParams } = new URL(req.url)
        const limit = parseInt(searchParams.get('limit')) || 10
        const { status } = await req.json()
        const { id } = await params
        if (!status) Response.json({ message: 'Order Status are required Please provide order status' })
        if (!id) Response.json({ message: 'Id is required Please Provide Id' }, { status: 400 })

        await connectToDatabase()
        const total = await Order.countDocuments()
        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true })
        if (!updatedOrder) Response.json({ message: "Order not found" }, { status: 404 })

        const orderDetails = await Order.find().sort({ createdAt: -1 }).limit(limit).select("-paymentDetails -products -shippingAddress")

        return Response.json({ success: true, total, orders: orderDetails }, { status: 200 })
    } catch (error) {
        console.log(error.message);

        return Response.json({ error: error?.message }, { status: 500 })
    }
}
export async function GET(req, { params }) {
    const { id } = await params
    if (!id) Response.json({ message: 'Id is required Please Provide Id' }, { status: 400 })
    try {
        await connectToDatabase()
        const order = await Order.findById(id)
        if (!order) Response.json({ message: "Order not found" }, { status: 404 })
        return Response.json({ success: true, order }, { status: 200 })
    } catch (error) {
        console.log(error.message);

        return Response.json({ error: error?.message }, { status: 500 })
    }
}