"use client"
import React, { useEffect, useReducer, useState } from 'react'
import MenuSection from '@/components/MenuSection'
import { useDispatch, useSelector } from 'react-redux'
import states from "@/lib/stateList";
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice';
import { Error } from 'mongoose';
import { CartType } from '@/app/types';
import { CartReset } from '@/app/redux/slices/CartSlice';
import Button from '@/components/Button';
import { updateAddress } from '@/app/redux/slices/AddressSlice';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export { };

function page() {

    const [paymentMode, setPaymentMode] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const { isSignedIn, user } = useUser()
    const router = useRouter()
    const dispatch = useDispatch()

    const CartList: CartType[] = useSelector((state: any) => state.CartList)
    const Address = useSelector((state: any) => state.Address)
    console.log(Address);


    const [total, setTotal] = useState({
        subTotal: 0,
        discount: 0,
        deliveryCharges: 0,
        total: 0
    })

    useEffect(() => {

        setTotal((pre) => {
            const subTotal = CartList.reduce((acc, value) => acc + (Number(value.quantity) * Number(value.discountPrice ? value.discountPrice : value.price)), 0)
            const discount = 0
            const deliveryCharges = subTotal > 500 ? 0 : 50
            const total = (subTotal + deliveryCharges) - discount
            return {
                subTotal: subTotal,
                discount: discount,
                deliveryCharges: deliveryCharges,
                total: total
            }
        })
    }, [CartList])

    const placeOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!(CartList.length > 0)) {
            return router.replace('/Pages/shop')
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!Address.firstName || !Address.lastName) {
            return sendMessage("Please fill in both Name fields.")
        } else if (!Address.city) {
            return sendMessage("Please fill in City.")
        } else if (!Address.postcode) {
            return sendMessage("Please fill in Postcode.")
        } else if (!Address.mobileNumber || isNaN(Address.mobileNumber)) {
            return sendMessage("Please enter a valid Mobile Number.")
        } else if (!Address.street) {
            return sendMessage("Please fill in Street Name.")
        } else if (!Address.emailAddress) {
            return sendMessage("Please enter your Email Address.")
        } else if (!emailRegex.test(Address.emailAddress)) {
            return sendMessage("Please enter a valid Email Address.")
        } else if (!paymentMode) {
            return sendMessage("Please select a Payment Method.")
        } else if (!isChecked) {
            return sendMessage("Please accept the Terms and Conditions.")
        }

        if (isSignedIn) {
            handlePayment()
        } else {
            sendMessage('Please Login and try again!')
        }
    };

    const sendMessage = (msg: string) => {
        dispatch(AddNotifyMessage({ message: msg, type: 'error' }))
    }

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const products = CartList.map((product) => {
                return {
                    _id: product?._id,
                    name: product.name,
                    quantity: product.quantity,
                    price: product.discountPrice ? product.discountPrice : product.price,
                    image: product.ImageUrl
                }
            })
            const OrderData = {
                shippingAddress: Address,
                paymentMethod: paymentMode,
                totalPrice: total.total,
                products: products,
            }

            const response = await axios.post("/api/createOrder", OrderData)


            const order = await response?.data?.razorpayOrder
            console.log(order.id);


            if (!order.id) {
                throw new Error("Failed to create order");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                amount: order?.amount,
                currency: order?.currency,
                name: "Ogani Shopping site",
                description: "Test Transaction",
                order_id: order?.id,
                handler: async function (res: any) {
                    try {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/completeOrder`, res)
                        if (response.data) {
                            dispatch(AddNotifyMessage({ message: `Payment Successful! Payment ID: ${res?.razorpay_payment_id}`, type: 'sucess' }))
                            dispatch(CartReset())
                            router.push('/Pages/orders')
                        }

                    } catch (error) {
                        console.log((error as Error).message)
                        dispatch(AddNotifyMessage({ message: 'Payment Failed', type: 'error' }))

                    }
                },
                prefill: {
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                },
                theme: { color: "#7fad39" },
                // Handling cancellation
                modal: {
                    ondismiss: async function () {
                        try {
                            // Optionally notify backend about cancellation
                            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orderCancel`, { orderId: order?.id });
                            dispatch(AddNotifyMessage({ message: "Payment Cancelled", type: 'error' }))
                        } catch (error) {
                            console.error("Error during cancellation:", (error as Error).message);
                        }
                    }
                }

            }


            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Payment Failed:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <MenuSection name={"Checkout"} />

            <div className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-48" >
                <div className="flex flex-col xl:flex-row gap-10">

                    {/* <!-- Address section  --> */}
                    <div className="xl:flex-8/12 flex flex-col gap-8">
                        <h5 className="text-2xl font-normal">Billing Details</h5>
                        <form action="#" className="flex flex-col gap-5">
                            <div className="flex flex-col gap-5 lg:flex-row w-full">
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">First Name</label>
                                    <input type="text" value={Address.firstName} onChange={(e) => dispatch(updateAddress({ type: "FIRSTNAME", payload: e.target.value }))}
                                        className="text-sm font-light text-gray-600 outline focus:outline-green outline-transparent border ps-5 border-gray-200 w-full h-14" />
                                </div>
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Last Name</label>
                                    <input onChange={(e) => dispatch(updateAddress({ type: "LASTNAME", payload: e.target.value }))} type="text" value={Address.lastName}
                                        className="text-sm font-light text-gray-600 outline focus:outline-green outline-transparent border ps-5 border-gray-200 w-full h-14" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-normal mb-10">State / Country</label>
                                <input defaultValue={'india'} type="text" readOnly
                                    className="text-sm font-light text-gray-600 outline focus:outline-green outline-transparent border ps-5 border-gray-200 w-full h-14" />
                            </div>
                            <div>
                                <label className="text-sm font-normal mb-10">Street Address</label>
                                <div className="flex flex-col lg:flex-row gap-5">

                                    <input onChange={(e) => dispatch(updateAddress({ type: "STREET", payload: e.target.value }))} type="text" placeholder="House number and street name" value={Address.street}
                                        className="border text-sm font-light text-gray-600 outline focus:outline-green outline-transparent ps-5 border-gray-200 w-full h-14" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 lg:flex-row w-full">
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Town / City</label>
                                    <select onChange={(e) => dispatch(updateAddress({ type: "CITY", payload: e.target.value }))} className="border appearance-none text-sm font-light text-gray-600 outline focus:outline-green outline-transparent px-5 border-gray-200 w-full h-14">
                                        <option key={0} value="">select city</option>
                                        {states.map((state, index) => {
                                            return <option key={index} value={state}>{state}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Postcode / ZIP *</label>
                                    <input onChange={(e) => dispatch(updateAddress({ type: "POSTCODE", payload: e.target.value }))} type="text" value={Address.postcode}
                                        className="border text-sm font-light text-gray-600 outline focus:outline-green outline-transparent ps-5 border-gray-200 w-full h-14" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">
                                        Mobile Number</label>
                                    <input onChange={(e) => dispatch(updateAddress({ type: "MOBILENUMBER", payload: e.target.value }))} type="number" value={Address.mobileNumber}
                                        className="border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-sm font-light text-gray-600 outline focus:outline-green outline-transparent ps-5 border-gray-200 w-full h-14" />
                                </div>
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Email Address</label>
                                    <input onChange={(e) => dispatch(updateAddress({ type: "EMAIL", payload: e.target.value }))} type="text" value={Address.emailAddress}
                                        className="border text-sm font-light text-gray-600 outline focus:outline-green outline-transparent ps-5 border-gray-200 w-full h-14" />
                                </div>
                            </div>
                            <div className="flex gap-5 text-sm">
                                <div className="flex justify-center items-center gap-2 cursor-pointer">

                                    <input id="CreateAccount" defaultChecked name="select_address" type="radio" />
                                    <label htmlFor="CreateAccount" className="text-gray-700">Create an
                                        Account?</label>
                                </div>
                                <div className="flex justify-center items-center gap-2 cursor-pointer">
                                    <input id="select_address" name="select_address" type="radio" />
                                    <label htmlFor="select_address" className="text-gray-700 cursor-pointer">Ship to different
                                        address</label>
                                </div>
                            </div>
                        </form>


                    </div>
                    {/* <!-- Cart Total & Payment  --> */}
                    <div className="xl:flex-4/12 flex flex-col gap-5">
                        {/* <!-- Cart Total  --> */}
                        <div className="flex flex-col">
                            <div className="border border-gray-200 px-5 pt-5 pb-8 flex flex-col gap-5 mb-5">

                                <h5 className="text-xl font-normal">Cart Totals</h5>
                                <div className="flex justify-between text-gray-600">
                                    <h5>Subtotal</h5>
                                    <p id="total_price">₹{total.subTotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <h5>Delivery</h5>
                                    <p id="DeliveryCharges">{total.deliveryCharges ? `₹${total.deliveryCharges.toFixed(2)}` : 'Free'}</p>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <h5>Discount</h5>
                                    <p id="discount">₹{total.discount ? -total.discount : total.discount.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between font-medium border-t py-3 border-gray-200">
                                    <h5 className="uppercase">Total</h5>
                                    <p id="total">₹{total.total.toFixed(2)}</p>
                                </div>
                            </div>

                        </div>
                        {/* <!-- Payment Method  --> */}
                        <form className="border border-gray-200 px-5 pt-5 pb-8 flex flex-col gap-5 mb-5">
                            <h5 className="text-2xl">Payment Method</h5>
                            <div className="flex gap-5 flex-col px-5 text-base">
                                <div className=" flex justify-start items-center gap-2 cursor-pointer">

                                    <input onClick={() => setPaymentMode('CreditCart')} id="CreditCard" name="select_payment" type="radio" />
                                    <label htmlFor="CreditCard" className="text-gray-600 cursor-pointer">Credit Cart Payment</label>
                                </div>
                                <div className=" flex justify-start items-center gap-2 cursor-pointer">
                                    <input onClick={() => setPaymentMode('debitCart')} id="DebitCard" name="select_payment" type="radio" />
                                    <label htmlFor="DebitCard" className="text-gray-600  cursor-pointer">Debit Card
                                        Payment</label>
                                </div>
                                <div className=" flex justify-start items-center gap-2 cursor-pointer">
                                    <input onClick={() => setPaymentMode('UPI')} id="upi" name="select_payment" type="radio" />
                                    <label htmlFor="upi" className="text-gray-600 cursor-pointer">UPI</label>
                                </div>

                                <div className="flex justify-start gap-2 cursor-pointer">
                                    <div>
                                        <input defaultChecked={isChecked} onClick={() => setIsChecked((pre) => !pre)} className="h-3.5 w-3.5" id="termsAndConditions" name="termsAndConditions"
                                            type="checkbox" />
                                    </div>
                                    <label htmlFor="termsAndConditions" className="text-gray-700  text-sm cursor-pointer">I have
                                        read
                                        and
                                        accept
                                        the <Link href="#" className="text-green">terms and conditions</Link>
                                    </label>
                                </div>
                            </div>
                            <Button title='Place an Order' loading={loading} loadingContent='Processing . . .' onClick={placeOrder} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page