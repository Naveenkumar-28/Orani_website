import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        default: null
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: null
    },
    userRatings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productRatings'
        }
    ]
}, { timestamps: true });


// Prevent recompiling the model in development mode
export const ProductList = mongoose.models.Product_List || mongoose.model("Product_List", ProductSchema);



