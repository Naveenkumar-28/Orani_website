import { connectToDatabase } from "@/lib/mongoDB";
import { OverAllSummary } from "@/models";

export const GET = async () => {
    try {
        await connectToDatabase();

        const [summary] = await OverAllSummary.aggregate([
            { $limit: 1 },

            // 🔹 Lookup top sold products
            {
                $lookup: {
                    from: 'product_lists',
                    localField: 'topSoldProducts',
                    foreignField: '_id',
                    as: 'topSoldProducts'
                }
            },

            // 🔹 Lookup recent order documents
            {
                $lookup: {
                    from: 'orders',
                    localField: 'recentOrders',
                    foreignField: '_id',
                    as: 'recentOrders'
                }
            },

            // 🔹 Lookup all addresses used by recentOrders
            {
                $lookup: {
                    from: 'addresses',
                    let: { recentOrders: "$recentOrders" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$_id", {
                                        $map: {
                                            input: "$$recentOrders",
                                            as: "order",
                                            in: "$$order.shippingAddress"
                                        }
                                    }]
                                }
                            }
                        }
                    ],
                    as: "recentAddresses"
                }
            },

            // 🔹 Final projection with sorting, mapping, and embedded shipping address
            {
                $project: {
                    _id: 1,
                    totalOrders: 1,
                    totalRevenue: 1,
                    totalUsers: 1,
                    ordersSummaryData: 1,
                    reviewBreakdown: 1,
                    createdAt: 1,
                    updatedAt: 1,

                    // Top sold products, sorted
                    topSoldProducts: {
                        $map: {
                            input: {
                                $sortArray: {
                                    input: "$topSoldProducts",
                                    sortBy: { sold: -1 }
                                }
                            },
                            as: "product",
                            in: {
                                _id: "$$product._id",
                                name: "$$product.name",
                                price: "$$product.price",
                                discountPrice: "$$product.discountPrice",
                                imageUrl: "$$product.imageUrl",
                                sold: "$$product.sold"
                            }
                        }
                    },

                    // Recent orders with embedded shippingAddress
                    recentOrders: {
                        $map: {
                            input: {
                                $sortArray: {
                                    input: "$recentOrders",
                                    sortBy: { createdAt: -1 }
                                }
                            },
                            as: "order",
                            in: {
                                _id: "$$order._id",
                                totalAmount: "$$order.totalAmount",
                                createdAt: "$$order.createdAt",
                                orderStatus: "$$order.orderStatus",
                                razorpay_order_id: "$$order.razorpay_order_id",
                                items: "$$order.items",
                                subtotal: "$$order.subtotal",
                                deliveryCharge: "$$order.deliveryCharge",
                                discount: "$$order.discount",
                                paymentMethod: "$$order.paymentMethod",
                                paymentStatus: "$$order.paymentStatus",

                                //Lookup shipping address inline from recentAddresses
                                shippingAddress: {
                                    $first: {
                                        $filter: {
                                            input: "$recentAddresses",
                                            as: "addr",
                                            cond: {
                                                $eq: ["$$addr._id", "$$order.shippingAddress"]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);

        return Response.json({
            success: true,
            message: 'Order statistics fetched successfully',
            data: summary
        });

    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json(
            {
                success: false,
                error: err.message,
                message: 'Order statistics fetched failed'
            },
            { status: 500 }
        );
    }
}