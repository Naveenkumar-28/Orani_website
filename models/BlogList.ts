
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    comments: [{
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const BlogList = mongoose.models.BlogList || mongoose.model('BlogList', BlogSchema)
