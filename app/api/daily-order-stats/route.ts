import { connectToDatabase } from "@/lib/mongoDB"
import { OrdersData, Order } from "@/models";

export const GET = async () => {
    try {
        await connectToDatabase()
        const today = new Date();
        const last30Days = new Date(today.setDate(today.getDate() - 30));
        const recentDeliveredOrdersCount = await Order.countDocuments({
            orderStatus: 'delivered',
            createdAt: { $gte: last30Days }
        })
        const orderStatus = await Order.aggregate([
            {
                $group: {
                    _id: { $toLower: "$orderStatus" },
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedStats = {
            total: orderStatus.reduce((sum, s) => sum + s.count, 0),
            new: recentDeliveredOrdersCount || 0,
            cancelled: orderStatus.find(s => s._id === 'cancelled')?.count || 0,
            delivered: orderStatus.find(s => s._id === 'delivered')?.count || 0,
        };

        const ordersData = await OrdersData.findOne()

        if (ordersData) {
            ordersData.total = formattedStats.total
            ordersData.new = formattedStats.new
            ordersData.cancelled = formattedStats.cancelled
            ordersData.delivered = formattedStats.delivered
            ordersData.updatedAt = Date.now()
            await ordersData.save()
        } else {
            await OrdersData.create(formattedStats)
        }
        return Response.json({ success: true, message: "Calculated orders statistics report successfully" }, { status: 200 })
    } catch (error) {
        console.log((error as Error).message);
        return Response.json({ message: "Something went wrong!", error: (error as Error).toString(), success: false }, { status: 500 })
    }

}