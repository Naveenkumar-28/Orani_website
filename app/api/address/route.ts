import { addressSchema } from "@/app/pages/(protected_pages)/checkout/utils"
import { connectToDatabase } from "@/lib/mongoDB"
import { withAuth } from "@/lib/withAuth"
import { Address } from "@/models"
import mongoose from "mongoose"
import * as Yup from 'yup'


export const POST = withAuth(async (req, _, user) => {
    const data = await req.json()
    try {
        // First: Validate address input using Yup
        const validated = await addressSchema.validate(data, { abortEarly: false })
        console.log("Validated Address:", validated)
        await connectToDatabase()
        const count = await Address.countDocuments({ user: user._id })
        if (count >= 10) return Response.json({ message: "Maximum address count reached", success: false }, { status: 400 })
        const newAddress = new Address({ user: user._id, ...validated });
        const address = await newAddress.save();

        if (!address) {
            return Response.json({ success: false, message: 'Address add failed' }, { status: 500 });
        }

        return Response.json({
            success: true,
            message: "Address added successfully"
        }, { status: 201 })
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            return Response.json({ success: false, message: err.errors[0] || "Validation failed", error: "Validation failed" }, { status: 400 })
        }

        console.error("Unexpected Error:", err)
        return Response.json({ success: false, message: "Somthing went wrong!", error: (err as Error).message }, { status: 500 })
    }
})

export const GET = withAuth(async (req, _, user) => {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '') || 1
    const limit = parseInt(searchParams.get('limit') || '') || 5

    console.log({ page, limit })
    try {
        await connectToDatabase()

        const [result] = await Address.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(user._id) } },
            {
                $facet: {
                    addresses: [
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                                city: 1,
                                country: 1,
                                mobileNumber: 1,
                                postcode: 1,
                                street: 1
                            }
                        }

                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ])
        const addresses = result.addresses.map((item: any) => ({ ...item, isChecked: false })) || []
        const totalPage = Math.ceil((result.totalCount[0]?.count || 0) / limit) || 0

        return Response.json({ success: true, addresses, totalPage, message: "Addresses fetched successfully" }, { status: 200 })
    } catch (err) {
        console.error("Unexpected Error:", err)
        return Response.json({ success: false, message: "Somthing went wrong!", error: (err as Error).message }, { status: 500 })
    }
})

