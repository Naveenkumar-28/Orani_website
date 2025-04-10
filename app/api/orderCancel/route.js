import { connectToDatabase } from "../../../lib/mongoDB";
import Order from "../../../models/Order";
import ProductList from "../../../models/ProductList";

export async function POST(req) {
    try {
        await connectToDatabase()
        const data = await req.json()
        if (!data.orderId) return Response.json({ message: 'OrderId missing please try again' }, { status: 404 })
        const order = await Order.findOne({ razorpay_order_id: data?.orderId })

        if (!order) {
            return Response.json({ message: 'Order not found' }, { status: 404 });
        }


        order.orderStatus = "cancelled"
        await order.save()
        console.log(order);


        // Loop through products from the order
        await Promise.all(order?.products.map(async (orderProduct) => {

            const dbProduct = await ProductList.findById({ _id: orderProduct._id.toString() }); // Get all products from DB

            if (dbProduct) {
                dbProduct.stock += orderProduct.quantity;
                dbProduct.sold -= orderProduct.quantity;

                // Save the updated product to the database
                await ProductList.findByIdAndUpdate(orderProduct.id, {
                    stock: dbProduct.stock,
                    sold: dbProduct.sold,
                });
            }
        }))



        return Response.json({ message: 'Cancellation successful' }, { status: 200 })

    } catch (error) {

        console.log({ error: error.message })

        return Response.json({ message: error.message }, { status: 500 })

    }

}