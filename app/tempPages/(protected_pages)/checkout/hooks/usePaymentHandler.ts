import { useUserData } from "@/hooks/useUserData";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePricetotal } from "./usePriceTotal";
import { createSendMessage } from "@/utils/sendMessage/createSendMessage";
import { CartReset } from "@/app/tempPages/(public_pages)/cart/redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { WEB_SITE_NAME } from "@/constants";
import { resetOrders } from "../../orders/redux";


const usePaymentHandler = () => {
    const { user } = useUserData()
    const router = useRouter()
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { cartList } = useSelector((state: RootState) => state.CartItems)
    const dispatch = useDispatch<AppDispatch>()
    const { pricing } = usePricetotal()
    const sendMessage = createSendMessage()

    async function handlePayment({ addressId, paymentMethod }: { addressId: string, paymentMethod: string }) {

        setIsLoading(true);
        try {
            const products = cartList.map((product) => {
                return {
                    productId: product?._id,
                    name: product.name,
                    quantity: product.quantity,
                    price: product.discountPrice ? product.discountPrice : product.price,
                    image: product.imageUrl
                }
            })

            const OrderData = {
                addressId,
                paymentMethod,
                products: products,
                totalAmount: pricing.total,
                subtotal: pricing.subtotal,
                discount: pricing.discount,
                deliveryCharge: pricing.deliveryCharge
            }

            // Creating order with Razorpay
            const response = await api.post("/createOrder", OrderData)

            const order = await response?.data?.razorpayOrder

            if (!order.id) {
                throw new Error("Failed to create order");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                amount: order?.amount,
                currency: order?.currency,
                name: `${WEB_SITE_NAME} Shopping site`,
                description: "Test Transaction",
                order_id: order?.id,
                handler: async function (res: any) {
                    setIsPaymentLoading(true)
                    try {
                        const response = await api.post(`/completeOrder`, res)
                        if (response.data) {
                            sendMessage.success(`Payment Successful! Payment ID: ${res?.razorpay_payment_id}`)
                            dispatch(CartReset())
                            dispatch(resetOrders())
                            router.push('/pages/orders')
                        }

                    } catch (error) {
                        console.log((error as Error).message)
                        sendMessage.error('Payment failed')
                    } finally {
                        setIsPaymentLoading(false)
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: { color: "#7fad39" },
                // Handling cancellation
                modal: {
                    ondismiss: async function () {
                        setIsPaymentLoading(true)
                        try {
                            // Optionally notify backend about cancellation
                            await api.post(`/orderCancel`, { orderId: order?.id });
                            sendMessage.error("Payment Cancelled")
                        } catch (error) {
                            console.error("Error during cancellation:", (error as Error).message);
                        } finally {
                            setIsPaymentLoading(false)
                        }
                    }
                }

            }
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            sendMessage.error("Somthing went wrong!")
            console.error("Payment Failed:", error);
        } finally {
            setIsLoading(false);
        }

    };
    return { handlePayment, isLoading, isPaymentLoading }
}

export { usePaymentHandler }