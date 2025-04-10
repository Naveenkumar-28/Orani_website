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
    ImageUrl: {
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
    ratings: [
        {
            name: {
                type: String,
                required: true
            },
            profileUrl: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ]
});


// Prevent recompiling the model in development mode
const ProductList = mongoose.models.Product_List || mongoose.model("Product_List", ProductSchema);

export default ProductList;


