import mongoose from "mongoose";

const ordersDataSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true,
        default: 0
    }, new: {
        type: Number,
        required: true,
        default: 0
    }, cancelled: {
        type: Number,
        required: true,
        default: 0
    }, delivered: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

export const OrdersData = mongoose.models.OrdersData || mongoose.model('OrdersData', ordersDataSchema)
