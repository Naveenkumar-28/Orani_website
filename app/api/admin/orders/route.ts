import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { Order, OrdersData } from "@/models";

export const GET = withAuth(async (req) => {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '') || 1
    const search = searchParams.get('search')?.trim()
    const limit = parseInt(searchParams.get('limit') || '') || 10
    const status = searchParams.get('status')

    console.log({ page, search, limit, status });

    let ordersData = { total: 0, new: 0, cancelled: 0, delivered: 0 }

    try {
        await connectToDatabase()
        if (page == 1) {
            const data = await OrdersData.findOne().select("-updatedAt -createdAt")
            console.log(data);
            ordersData = data
        }
        const query: { orderStatus?: string, razorpay_order_id?: any } = {}
        if (status) query.orderStatus = status
        if (search) query.razorpay_order_id = { $regex: search, $options: "i" }

        const [result] = await Order.aggregate([
            {
                $match: query
            },
            {
                $facet: {
                    orders: [
                        {
                            $lookup: {
                                from: "addresses",
                                localField: "shippingAddress",
                                foreignField: "_id",
                                as: "shippingAddress"
                            }
                        },
                        { $unwind: { path: "$shippingAddress", preserveNullAndEmptyArrays: true } },
                        {
                            $project: {
                                paymentDetails: 0,
                                user: 0,
                                __v: 0
                            }
                        },
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }

        ])

        const orders = result.orders || []
        const totalCount = result.totalCount[0]?.count || 0
        const totalPage = Math.ceil(totalCount / limit)

        return Response.json({ success: true, totalPage, orders, ordersData }, { status: 200 })
    } catch (error) {
        console.log((error as Error).message);

        return Response.json({ message: "Order fetched failed", error: (error as Error)?.message }, { status: 500 })
    }
})