import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductList",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"]
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [cartItemSchema],
}, {
    timestamps: true
});

export const CartList = mongoose.models.CartList || mongoose.model("CartList", cartSchema);
