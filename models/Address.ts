import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Address = mongoose.models.Address || mongoose.model("Address", addressSchema)

