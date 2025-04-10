import { connectToDatabase } from "../../../lib/mongoDB";
import User from "../../../models/User";
import Order from "../../../models/Order";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    try {

        await connectToDatabase()
        const currentuserData = await currentUser()
        if (!currentuserData) return Response.json({ message: "User not available please login after try again" }, { status: 400 })

        const id = currentuserData.id
        const user = await User.findOne({ clerkId: id })
        // console.log(user.orders);
        if (!user) return Response.json({ message: "User not found" }, { status: 404 })

        const orderList = await Promise.all(
            user.orders.map(async (id) => {
                const order = await Order.findById(id)

                return order || null
            })
        )
        const filterOrderList = orderList.filter((order) => order !== null)

        return Response.json(filterOrderList, { status: 200 })
    } catch (error) {
        console.log(error?.message)
        return Response.json({ message: error?.message }, { status: 500 })
    }

}