import { connectToDatabase } from "@/lib/mongoDB";
import { Order, OverAllSummary, ProductList, ProductRating, User } from "@/models";

export const GET = async () => {
    try {
        await connectToDatabase();

        // Top 3 sold products
        const topSoldProducts = await ProductList.aggregate([
            { $sort: { sold: -1 } },
            { $limit: 3 },
            {
                $project: {
                    _id: 1
                }
            }
        ]);

        const orderTotalRevenue = await Order.aggregate([
            {
                $match: {
                    orderStatus: { $in: ["delivered"] }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }

            },
            {
                $project: {
                    _id: 0,
                    total: 1
                }
            }
        ])

        const totalRevenue = orderTotalRevenue[0]?.total || 0;


        const [orderResult] = await Order.aggregate([
            {
                $facet: {
                    totalOrders: [
                        { $count: "count" }
                    ],
                    recentOrders: [
                        { $sort: { createdAt: -1 } },
                        { $limit: 5 },
                        {
                            $project: {
                                _id: 1
                            }
                        }
                    ]
                }
            }
        ]);

        const totalOrders = orderResult.totalOrders[0]?.count || 0;
        const recentOrders = orderResult.recentOrders;

        // Total users
        const totalUsers = await User.countDocuments({ role: 'user' });

        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1); // 6 months before

        // Step 1: MongoDB aggregation
        const monthlySummary = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: sixMonthsAgo,
                        $lte: now
                    },
                    orderStatus: { $in: ["delivered"] } // Optional: filter only valid orders
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    revenue: { $sum: "$totalAmount" },
                    orders: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    averageOrderRevenue: {
                        $cond: [{ $eq: ["$orders", 0] }, 0, { $divide: ["$revenue", "$orders"] }]
                    }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    revenue: 1,
                    orders: 1,
                    averageOrderRevenue: 1
                }
            }
        ]);

        // Step 2: Fill in missing months
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const filledSummary = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const found = monthlySummary.find(m => m.month === month && m.year === year);

            filledSummary.push({
                monthIndex: month,
                monthName: monthNames[month - 1],
                revenue: found?.revenue || 0,
                orders: found?.orders || 0,
                averageOrderRevenue: found?.averageOrderRevenue
                    ? Number(found.averageOrderRevenue.toFixed(2))
                    : 0
            });
        }

        // Step 3: Prepare final response
        const ordersSummaryData = {
            months: filledSummary.map(m => m.monthName),
            revenueData: filledSummary.map(m => m.revenue),
            ordersData: filledSummary.map(m => m.orders),
            avgRevenueData: filledSummary.map(m => m.averageOrderRevenue)
        };

        // Count how many reviews per star rating
        const productReviewStats = await ProductRating.aggregate([
            {
                $addFields: {
                    roundedRating: { $floor: "$rating" } // floor(4.7) => 4
                }
            },
            {
                $group: {
                    _id: "$roundedRating", // Group by rating value (1–5)
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    rating: "$_id",
                    count: 1
                }
            },
            { $sort: { rating: -1 } } // Optional: sort from 5 to 1
        ]);

        // Fill in missing stars with 0 count
        const ratingSummary = [5, 4, 3, 2, 1].map(star => {
            const match = productReviewStats.find(r => r.rating === star);
            return {
                rating: star,
                count: match ? match.count : 0
            };
        });
        const topSoldProductsIds = topSoldProducts.map((item: { _id: string }) => item._id)
        const recentOrderIds = recentOrders.map((item: { _id: string }) => item._id)
        const summary = await OverAllSummary.findOne()
        if (!summary) {
            OverAllSummary.create({
                totalUsers,
                totalOrders,
                totalRevenue,
                topSoldProducts: topSoldProductsIds,
                recentOrders: recentOrderIds,
                ordersSummaryData,
                reviewBreakdown: ratingSummary
            })
        } else {
            summary.totalUsers = totalUsers
            summary.totalOrders = totalOrders
            summary.totalRevenue = totalRevenue
            summary.topSoldProducts = topSoldProductsIds
            summary.recentOrders = recentOrderIds
            summary.ordersSummaryData = ordersSummaryData
            summary.reviewBreakdown = ratingSummary

            await summary.save()
        }

        return Response.json({
            success: true,
            message: 'Order statistics fetched successfully',
            data: {
                totalUsers,
                totalOrders,
                totalRevenue,
                topSoldProducts,
                recentOrders,
                ordersSummaryData,
                reviewBreakdown: ratingSummary
            }
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
};
