import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    items: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true }
        }
    ],
    paymentStatus: {
        type: Boolean,
        default: false
    },
    orderStatus: {
        type: String,
        default: "pending"
    },
    subtotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    deliveryCharge: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },

    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    paymentDetails: {
        razorpay_payment_id: { type: String, default: null },
        razorpay_order_id: { type: String, default: null },
        razorpay_signature: { type: String, default: null }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
