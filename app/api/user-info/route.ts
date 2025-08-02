import { connectToDatabase } from "@/lib/mongoDB"
import { withAuth } from "@/lib/withAuth"
import { User, UserType } from "@/models"

export const GET = withAuth(async (req, _, user) => {
    try {
        await connectToDatabase()
        const currentUser = await User.findById(user._id)
        if (!currentUser) return Response.json({ message: 'User not found' }, { status: 404 })
        const { _id, name, imageUrl, email, role }: UserType = currentUser

        return Response.json({ success: true, user: { _id, name, imageUrl, email, role } }, { status: 200 })

    } catch (error) {
        console.log(error);

        return Response.json({ message: 'Somthing went wrong!' }, { status: 500 })
    }

})