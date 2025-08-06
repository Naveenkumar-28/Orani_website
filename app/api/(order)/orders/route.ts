import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { Order, User } from "@/models";
import mongoose from "mongoose";

export const GET = withAuth(async (req, _, user) => {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '') || 9
    const page = parseInt(searchParams.get('page') || '') || 1
    console.log({ page, limit });
    try {
        await connectToDatabase()

        const currentUser = await User.findOne({ _id: user._id })

        if (!currentUser) return Response.json({ message: "User not found" }, { status: 404 })

        const [result] = await Order.aggregate([
            {
                $match: { _id: { $in: currentUser.orders }, user: new mongoose.Types.ObjectId(user._id) }
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
        const totalPage = Math.ceil((result.totalCount[0]?.count || 0) / limit) || 0

        return Response.json({ success: true, message: 'Order fetched successfully', orders, totalPage }, { status: 200 });

    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, error: err.message, message: 'Somthing went wrong!' }, { status: 500 })
    }

})