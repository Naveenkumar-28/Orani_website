import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
    ,
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: Number,
        default: null
    }
}, { timestamps: true, })


export const User = mongoose.models.User || mongoose.model('User', userSchema)
