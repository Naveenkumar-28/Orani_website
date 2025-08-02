import { connectToDatabase } from "@/lib/mongoDB";
import { OverAllSummary } from "@/models";

export const GET = async () => {
    try {
        await connectToDatabase();

        const [summary] = await OverAllSummary.aggregate([
            {
                $limit: 1 // Equivalent to findOne()
            },
            {
                $lookup: {
                    from: 'product_lists',
                    localField: 'topSoldProducts',
                    foreignField: '_id',
                    as: 'topSoldProducts'
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: 'recentOrders',
                    foreignField: '_id',
                    as: 'recentOrders'
                }
            },
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
                                orderStatus: "$$order.orderStatus"
                            }
                        }
                    }
                }
            }
        ]);

        console.log(summary); // aggregation returns array



        return Response.json({
            success: true,
            message: 'Order statistics fetched successfully',
            data: summary
        });

    } catch (error) {
        console.error('Error fetching order statistics:', error);
        return Response.json(
            {
                success: false,
                message: error instanceof Error ? error.message : 'Something went wrong while fetching order statistics'
            },
            { status: 500 }
        );
    }
}