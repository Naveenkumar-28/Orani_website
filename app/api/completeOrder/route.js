import Order from "../../../models/Order";
import User from "../../../models/User";
import { currentUser as signedUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../lib/mongoDB";
import nodemailer from 'nodemailer';




export async function POST(req) {
  try {
    await connectToDatabase()
    const currentUser = await signedUser()
    if (!currentUser.id) {
      throw new Error('Your Id is missing Please login again ')
    }

    //Geting data from request
    const paymentDetails = await req.json()

    const UpdatedOrder = await Order.findOneAndUpdate({ razorpay_order_id: paymentDetails?.razorpay_order_id }, { paymentStatus: true, paymentDetails }, { new: true })
    if (!UpdatedOrder) {
      return Response.json({ message: 'This Order not found in DataBase' }, { status: 404 })
    }
    await sendMail(UpdatedOrder)

    return Response.json({ message: 'Payment successful' }, { status: 200 })

  } catch (error) {

    console.log({ error: error.message })

    return Response.json({ message: error.message }, { status: 500 })

  }
}

async function sendMail(order) {
  const product = {
    _id: "abc123",
    name: "Cheesy Pizza",
    description: "Delicious cheese burst pizza loaded with toppings.",
    ImageUrl: "https://example.com/pizza.jpg",
    price: 399,
    discountPrice: 299,
    quantity: 2,
  };

  const total = {
    subTotal: 598,
    deliveryCharges: 40,
    discount: 50,
    total: 588,
  };
  const html = `
<div style="width: 100%; border-bottom: 1px solid #e5e7eb; display: flex; flex-wrap: wrap; padding: 20px 0; font-family: 'Poppins', sans-serif;">
  <div style="width: 50%; display: flex; align-items: center; justify-content: center; position: relative;">
    <div style="position: absolute; top: 0; left: 0; background-color: white; padding: 5px; border: 1px solid #d1d5db; cursor: pointer;">
      &#10005;
    </div>
    <div style="height: 70%; width: 100%;">
      <img src="${product.ImageUrl}" alt="Product_Image" style="height: 100%; width: 100%; object-fit: contain;" />
    </div>
  </div>
  <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 20px; padding-top: 10px;">
    <div style="width: 100%; text-align: center;">
      <h4 style="font-weight: 600; text-transform: uppercase; font-size: 18px; margin-bottom: 10px;">${product.name}</h4>
      <p style="color: #6b7280; font-size: 14px; line-height: 1.4;">${product.description}</p>
    </div>
    <div style="width: 100%; font-size: 16px; font-weight: 500; color: green;">₹${product.discountPrice || product.price}</div>
    <div style="width: 100%; display: flex; justify-content: center; gap: 10px;">
      <span style="border: 1px solid #d1d5db; padding: 5px 10px;">-</span>
      <span style="border: 1px solid #d1d5db; padding: 5px 10px;">${product.quantity}</span>
      <span style="border: 1px solid #d1d5db; padding: 5px 10px;">+</span>
    </div>
    <div style="width: 100%; font-weight: 500;">
      Total: ₹${(product.discountPrice || product.price) * product.quantity}
    </div>
  </div>
</div>

<!-- Cart Totals Section -->
<div style="border: 1px solid #e5e7eb; padding: 20px; margin-top: 20px; background-color: #f9fafb;">
  <h5 style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">Cart Totals</h5>
  
  <div style="display: flex; justify-content: space-between; color: #6b7280;">
    <span>Subtotal</span>
    <span>₹${total.subTotal}.00</span>
  </div>

  <div style="display: flex; justify-content: space-between; color: #6b7280; margin-top: 10px;">
    <span>Delivery</span>
    <span>${total.deliveryCharges ? `₹${total.deliveryCharges}.00` : 'Free'}</span>
  </div>

  <div style="display: flex; justify-content: space-between; color: #6b7280; margin-top: 10px;">
    <span>Discount</span>
    <span>₹-${total.discount}.00</span>
  </div>

  <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 15px;">
    <span style="text-transform: uppercase;">Total</span>
    <span>₹${total.total}.00</span>
  </div>

  <div style="margin-top: 20px; text-align: center;">
    <a href="https://your-site.com/checkout" style="background-color: #D72638; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Proceed to Checkout</a>
  </div>
</div>
`;


  const user = await signedUser()
  if (!user) return Response.json({ message: 'user not found ' }, { status: 400 })
  console.log(user)
  const currentuser = await User.findOne({ clerkId: user.id })
  if (!currentuser) return Response.json({ message: 'user not found ' }, { status: 400 })
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,      // Your email
      pass: process.env.EMAIL_PASS       // App password (if using Gmail)
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: currentuser?.email,
    subject: "Your Order placed Successfully",
    html: html,
  }

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json({ message: "Email failed to send" }, { status: 500 });
  }
}