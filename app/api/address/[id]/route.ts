import { addressSchema } from "@/app/tempPages/(protected_pages)/checkout/utils"
import { connectToDatabase } from "@/lib/mongoDB"
import { withAuth } from "@/lib/withAuth"
import { Address } from "@/models"
import * as Yup from 'yup'

export const DELETE = withAuth(async (_, { params }) => {
    const { id } = await params

    try {
        await connectToDatabase()
        const result = await Address.findByIdAndDelete(id)
        if (!result) return Response.json({ message: "Address remove failed", success: false }, { status: 400 })
        return Response.json({ success: true, message: "Addresses removed successfully" }, { status: 200 })
    } catch (error) {
        const err = error as Error
        console.log(err.message);
        return Response.json({ success: false, message: "Address remove failed", error: err.message }, { status: 500 })
    }
})

export const PATCH = withAuth(async (req, { params }, user) => {
    const { id } = await params;
    const data = await req.json();

    try {
        // 1. Validate input
        const validated = await addressSchema.validate(data, { abortEarly: false });

        // 2. Connect to DB
        await connectToDatabase();

        // 3. Find and update the address (ensure it belongs to the user)
        const updatedAddress = await Address.findOneAndUpdate(
            { _id: id, user: user._id },
            { ...validated },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return Response.json(
                { success: false, message: 'Address not found or not owned by user' },
                { status: 404 }
            );
        }

        // 4. Return selected fields
        const {
            _id,
            firstName,
            lastName,
            city,
            country,
            mobileNumber,
            postcode,
            street
        } = updatedAddress;

        return Response.json(
            {
                success: true,
                address: { _id, firstName, lastName, city, country, mobileNumber, postcode, street, isChecked: false },
                message: 'Address updated successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            return Response.json(
                {
                    success: false,
                    message: error.errors[0] || 'Validation failed',
                    error: 'Validation failed'
                },
                { status: 400 }
            );
        }
        const err = error as Error
        console.log(err.message);
        return Response.json(
            {
                success: false,
                message: 'Address update failed',
                error: err.message
            },
            { status: 500 }
        );
    }
});
