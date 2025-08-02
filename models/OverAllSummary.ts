import mongoose from "mongoose";

const overAllSummarySchema = new mongoose.Schema({

    totalOrders: {
        type: Number,
        required: true,
        default: 0
    },
    totalRevenue: {
        type: Number,
        required: true,
        default: 0
    },
    totalUsers: {
        type: Number,
        required: true,
        default: 0
    },
    topSoldProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product_List'
        }
    ],
    recentOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    ordersSummaryData: {
        months: [],
        revenueData: [],
        ordersData: [],
        avgRevenueData: []
    },
    reviewBreakdown: [
        {
            rating: { type: Number, required: true },
            count: { type: Number, required: true }
        }
    ]
}, { timestamps: true })

export const OverAllSummary = mongoose.models.OverAllSummary || mongoose.model('OverAllSummary', overAllSummarySchema)
