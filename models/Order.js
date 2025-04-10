const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    products: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            }

        }
    ],
    paymentStatus: {
        type: Boolean,
        default: false
    },
    orderStatus: {
        type: String,
        default: 'Pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
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
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentDetails: {
        razorpay_payment_id: {
            type: String,
            default: null
        },
        razorpay_order_id: {
            type: String,
            default: null
        },
        razorpay_signature: {
            type: String,
            default: null
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order
