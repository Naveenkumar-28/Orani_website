import { CartList, Order, User } from "@/models";
import { connectToDatabase } from "@/lib/mongoDB";
import { withAuth } from "@/lib/withAuth";
import { sendOrderSuccessEmail } from "@/templates";


export const POST = withAuth(async (req, _, user) => {
  try {
    await connectToDatabase()
    const currentUser = await User.findById(user._id)
    if (!currentUser) {
      return Response.json({ success: false, message: 'User not found' }, { status: 404 })
    }

    //Geting data from request
    const paymentDetails = await req.json()

    const UpdatedOrder = await Order.findOne({ razorpay_order_id: paymentDetails?.razorpay_order_id })
    if (!UpdatedOrder) {
      return Response.json({ success: false, message: 'Order not found' }, { status: 404 })
    }
    UpdatedOrder.paymentStatus = true
    UpdatedOrder.orderStatus = "confirmed"
    UpdatedOrder.paymentDetails = paymentDetails

    const { razorpay_order_id, items, subtotal, discount, deliveryCharge, totalAmount } = UpdatedOrder

    const sendMailData = {
      to: currentUser.email,
      customerName: currentUser.name,
      orderId: razorpay_order_id,
      items,
      subtotal,
      discount,
      deliveryCharge,
      totalAmount
    }

    // Clear the cart after successful order
    const cartItem = await CartList.findOne({ user: user._id })
    cartItem.items = []
    await cartItem.save()

    // Send order success email
    await sendOrderSuccessEmail(sendMailData)

    // Save the updated order
    await UpdatedOrder.save()

    return Response.json({ success: true, message: 'Payment successful' }, { status: 200 })

  } catch (error) {
    const err = error as Error
    console.log({ error: err.message })
    return Response.json({ success: false, error: err?.message, message: "Order failed" }, { status: 500 })
  }
})
