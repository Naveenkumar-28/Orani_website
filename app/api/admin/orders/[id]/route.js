import { connectToDatabase } from "../../../../../lib/mongoDB";
import Order from "../../../../../models/Order";

export async function PATCH(req, { params }) {
    try {
        const { status } = await req.json()
        const { id } = await params
        if (!status) Response.json({ success: false, message: 'Order Status are required Please provide order status' }, { status: 400 })
        if (!id) Response.json({ success: false, message: 'Id is required Please Provide Id' }, { status: 400 })
        await connectToDatabase()
        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true })
        if (!updatedOrder) Response.json({ success: false, message: "Order not found" }, { status: 404 })
        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return Response.json({ success: false, error: error?.message }, { status: 500 })
    }
}
export async function GET(req, { params }) {
    try {
        const { id } = await params
        if (!id) Response.json({ success: false, message: 'Id is required Please Provide Id' }, { status: 400 })
        await connectToDatabase()
        const order = await Order.findById(id)
        if (!order) Response.json({ success: false, message: "Order not found" }, { status: 404 })
        return Response.json({ success: true, order }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return Response.json({ success: false, error: error?.message }, { status: 500 })
    }
}