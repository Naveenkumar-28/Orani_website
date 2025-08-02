import { updateProductAverageRating } from "@/lib/updateProductAverageRating";
import mongoose from "mongoose";

const ProductRatingSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_List",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Make sure you have a User model
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProductRatingSchema.post('save', async function () {
    await updateProductAverageRating(this.product.toString())
})

// Prevent recompiling in development
export const ProductRating = mongoose.models.productRatings || mongoose.model("productRatings", ProductRatingSchema);

