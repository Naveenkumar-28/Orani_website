import { connectToDatabase } from "../../../lib/mongoDB";
import User from "../../../models/User";
import Order from "../../../models/Order";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit')) || 9
    const page = parseInt(searchParams.get('page')) || 1
    console.log({ page, limit });


    try {

        await connectToDatabase()
        const currentuserData = await currentUser()
        if (!currentuserData) return Response.json({ success: false, message: "User not available please login after try again" }, { status: 400 })

        const id = currentuserData.id
        const user = await User.findOne({ clerkId: id })

        if (!user) return Response.json({ success: false, message: "User not found" }, { status: 404 })

        const total = await Order.countDocuments({ _id: { $in: user.orders } })
        const orders = await Order.find({ _id: { $in: user.orders } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return Response.json({ success: true, orders, total }, { status: 200 });

    } catch (error) {
        console.log(error?.message)
        return Response.json({ success: false, message: error?.message }, { status: 500 })
    }

}