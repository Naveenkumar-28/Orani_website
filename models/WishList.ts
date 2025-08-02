import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    }
})

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [itemSchema]
}, { timestamps: true })

export const WishList = mongoose.models.WishList || mongoose.model('WishList', wishListSchema)
