import Razorpay from "razorpay";
import User from "../../../models/User";
import Order from "../../../models/Order";
import { currentUser as signedUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../lib/mongoDB";
import ProductList from "../../../models/ProductList";
import mongoose from "mongoose";

export async function POST(req, res) {
    try {
        await connectToDatabase()
        //Geting data from request
        const OrderData = await req.json()
        console.log(OrderData);

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID, // Store this in .env file
            key_secret: process.env.RAZORPAY_KEY_SECRET, // Store this in .env file
        });

        const options = {
            amount: OrderData.totalPrice * 100, // Razorpay works in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const createOrder = await instance.orders.create(options);

        const currentUser = await signedUser()
        const user = { clerkId: currentUser.id, name: currentUser?.fullName, email: currentUser?.primaryEmailAddress?.emailAddress }



        const { shippingAddress, totalPrice, paymentMethod, products } = OrderData
        const { name, email, clerkId } = user
        const { firstName, lastName, country, city, mobileNumber, street, postcode } = shippingAddress

        //First check required fields are available or not
        if (!name || !email || !clerkId || !totalPrice || products.length == 0 || !paymentMethod || !firstName || !lastName || !country || !city || !mobileNumber || !street || !postcode) {
            return Response.json({ message: 'Some fields are missing please check the details after try again' }, { status: 400 })
        }

        //Check User Available in database
        let newuser = await User.findOne({ email: user.email })

        if (!newuser) {

            //User not avaiable in database to Create new User
            newuser = new User(user)
        }


        const productList = await ProductList.find(); // Get all products from DB

        // Loop through products from the order
        products.map(async (orderProduct) => {

            const dbProduct = productList.find(item => item._id.toString() === orderProduct._id);
            console.log({ dbProduct });

            if (dbProduct) {
                if (!dbProduct.stock) {
                    throw Error(`${dbProduct.name} Out the Stock`)
                }
                dbProduct.stock -= orderProduct.quantity;
                dbProduct.sold += orderProduct.quantity;

                // Save the updated product to the database
                await ProductList.findByIdAndUpdate(orderProduct._id, {
                    stock: dbProduct.stock,
                    sold: dbProduct.sold,
                });
            }
        })


        //Create Order
        const order = new Order({
            razorpay_order_id: createOrder?.id,
            user: newuser?._id,
            shippingAddress: shippingAddress,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            products: products

        })

        //After Creating the order save to mongoDB database
        await order.save()

        newuser.orders.push(order._id)

        await newuser.save()

        console.log({ message: 'Order Created' });
        console.log({ createOrder });


        return Response.json({ razorpayOrder: createOrder, mongoOrder: order }, { status: 200 })

    } catch (error) {
        console.log(error.message);
        return Response.json({ error: error.message }, { status: 500 })
    }
}
