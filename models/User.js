
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number
    },
    image: String,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
    ,
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;