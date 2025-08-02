import Razorpay from "razorpay";
import { connectToDatabase } from "@/lib/mongoDB";
import { Address, ProductList, User, Order } from "@/models";
import { withAuth } from "@/lib/withAuth";
import mongoose from "mongoose";

export type ProductType = {
    productId: string
    image: string,
    name: string,
    price: number,
    quantity: number,
}

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Store this in .env file
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Store this in .env file
});

export const POST = withAuth(async (req, _, user) => {
    try {
        await connectToDatabase()
        //Geting data from request
        const OrderData = await req.json()

        const { addressId, totalAmount, paymentMethod, products, deliveryCharge, discount, subtotal } = OrderData

        console.log({ OrderData });

        //First check required fields are available or not
        if (!addressId) return Response.json({ message: "Please provide address id" }, { status: 400 })
        if (!totalAmount) return Response.json({ message: "Please provide total amount" }, { status: 400 })
        if (!subtotal) return Response.json({ message: "Please provide subtotal" }, { status: 400 })
        if (!paymentMethod) return Response.json({ message: "Please provide payment method" }, { status: 400 })
        if (products.length == 0) return Response.json({ message: 'Please provide product items' }, { status: 400 })

        const options = {
            amount: totalAmount * 100, // Razorpay works in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const currentUser = await User.findById(user._id)

        const createOrder = await instance.orders.create(options);

        const productIds = products.map((p: { productId: string }) => new mongoose.Types.ObjectId(p.productId))

        const productList = await ProductList.find({ _id: { $in: productIds } })// Get products from DB

        // 1. First validate all products
        for (const orderProduct of products) {
            const dbProduct = productList.find(item => item._id?.toString() === orderProduct.productId);

            if (!dbProduct) {
                throw new Error(`${orderProduct.name} not found`);
            }

            if (dbProduct.stock < orderProduct.quantity) {
                throw new Error(`${dbProduct.name} is out of stock`);
            }
        }

        // 2. Then update all product stocks (now safe to do)
        await Promise.all(products.map(async (orderProduct: ProductType) => {
            const dbProduct = productList.find((item) => item._id?.toString() === orderProduct.productId);
            if (!dbProduct) {
                throw new Error(`${orderProduct.name} not found`);
            }

            dbProduct.stock -= orderProduct.quantity;
            dbProduct.sold += orderProduct.quantity;
            await dbProduct.save()
        }))

        const address = await Address.findOne({ user: user._id, _id: addressId })
        if (!address) return Response.json({ message: "Address not found in database", success: false }, { status: 404 })

        //Create Order
        const order = new Order({
            razorpay_order_id: createOrder?.id,
            user: currentUser?._id,
            shippingAddress: address._id,
            totalAmount,
            paymentMethod,
            items: products,
            subtotal,
            deliveryCharge,
            discount
        })

        //After Creating the order save to mongoDB database
        await order.save()

        currentUser.orders.push(order._id)

        await currentUser.save()

        return Response.json({ razorpayOrder: createOrder, mongoOrder: order }, { status: 200 })

    } catch (error) {
        console.log(error);
        return Response.json({ success: false, error, message: 'Somthing went wrong!' }, { status: 500 })
    }
})
