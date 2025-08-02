import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { Order } from "@/models";

export const PATCH = withAuth(async (req, { params }) => {
    try {
        const { status } = await req.json()
        const { id } = await params
        if (!status) return Response.json({ success: false, message: 'Order Status are required Please provide order status' }, { status: 400 })
        if (!id) return Response.json({ success: false, message: 'Id is required' }, { status: 400 })
        await connectToDatabase()
        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true })

        if (!updatedOrder) Response.json({ success: false, message: "Order not found" }, { status: 404 })

        const order = { _id: updatedOrder?._id, orderStatus: updatedOrder?.orderStatus }

        return Response.json({ success: true, updatedOrder: order }, { status: 200 })
    } catch (error) {
        console.log((error as Error).message);
        return Response.json({ success: false, error, message: "Something went wrong!" }, { status: 500 })
    }
})

// export const GET = withAuth(async (req, { params }) => {
//     try {
//         const { id } = await params
//         if (!id) Response.json({ success: false, message: 'Id is required' }, { status: 400 })
//         await connectToDatabase()
//         const order = await Order.findById(id)
//         if (!order) Response.json({ success: false, message: "Order not found" }, { status: 404 })
//         return Response.json({ success: true, order }, { status: 200 })
//     } catch (error) {
//         console.log((error as Error).message);
//         return Response.json({ success: false, error, message: 'Something went wrong!' }, { status: 500 })
//     }
// })