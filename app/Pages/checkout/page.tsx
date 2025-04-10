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
    const reduxDispatch = useDispatch()

    const CartList: CartType[] = useSelector((state: any) => state.CartList) || []

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

    function reducer(state: any, action: any) {
        switch (action.type) {
            case "FIRSTNAME":
                return { ...state, firstName: action.payload };
            case "LASTNAME":
                return { ...state, lastName: action.payload };
            case "COUNTRY":
                return { ...state, country: action.payload };
            case "CITY":
                return { ...state, city: action.payload };
            case "POSTCODE":
                return { ...state, postcode: action.payload };
            case "STREET":
                return { ...state, street: action.payload };
            case "MOBILENUMBER":
                return { ...state, mobileNumber: action.payload };
            case "EMAIL":
                return { ...state, emailAddress: action.payload };
            default:
                return state;
        }
    }
    const placeOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!(CartList.length > 0)) {
            return router.replace('/Pages/shop')
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!address.firstName || !address.lastName) {
            return reduxDispatch(AddNotifyMessage("Please fill in both Name fields."))
        } else if (!address.city) {
            return reduxDispatch(AddNotifyMessage("Please fill in City."))
        } else if (!address.postcode) {
            return reduxDispatch(AddNotifyMessage("Please fill in Postcode."))
        } else if (!address.mobileNumber || isNaN(address.mobileNumber)) {
            return reduxDispatch(AddNotifyMessage("Please enter a valid Mobile Number."))
        } else if (!address.street) {
            return reduxDispatch(AddNotifyMessage("Please fill in Street Name."))
        } else if (!address.emailAddress) {
            return reduxDispatch(AddNotifyMessage("Please enter your Email Address."))
        } else if (!emailRegex.test(address.emailAddress)) {
            return reduxDispatch(AddNotifyMessage("Please enter a valid Email Address."))
        } else if (!paymentMode) {
            return reduxDispatch(AddNotifyMessage("Please select a Payment Method."))
        } else if (!isChecked) {
            return reduxDispatch(AddNotifyMessage("Please accept the Terms and Conditions."))
        }

        if (isSignedIn) {
            handlePayment()
        } else {
            reduxDispatch(AddNotifyMessage('Please Login and try again!'))
        }
    };


    const [address, dispatch] = useReducer(reducer, {
        firstName: '',
        lastName: '',
        country: 'india',
        city: '',
        postcode: '',
        mobileNumber: '',
        emailAddress: '',
        street: ''
    })

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
                shippingAddress: address,
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
                            reduxDispatch(AddNotifyMessage("Payment Successful! Payment ID: " + res?.razorpay_payment_id))
                            reduxDispatch(CartReset())
                            router.push('/Pages/orders')
                        }

                    } catch (error) {
                        console.log((error as Error).message)
                        reduxDispatch(AddNotifyMessage('Payment Failed'))

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
                            reduxDispatch(AddNotifyMessage("Payment Cancelled"))
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
                                    <input type="text" value={address.firstName} onChange={(e) => dispatch({ type: "FIRSTNAME", payload: e.target.value })}
                                        className="text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent border ps-5 border-gray-200 w-full h-14" />
                                </div>
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Last Name</label>
                                    <input onChange={(e) => dispatch({ type: "LASTNAME", payload: e.target.value })} type="text" value={address.lastName}
                                        className="text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent border ps-5 border-gray-200 w-full h-14" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-normal mb-10">State / Country</label>
                                <input defaultValue={'india'} type="text" readOnly
                                    className="text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent border ps-5 border-gray-200 w-full h-14" />
                            </div>
                            <div>
                                <label className="text-sm font-normal mb-10">Street Address</label>
                                <div className="flex flex-col lg:flex-row gap-5">

                                    <input onChange={(e) => dispatch({ type: "STREET", payload: e.target.value })} type="text" placeholder="House number and street name" value={address.street}
                                        className="border text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent ps-5 border-gray-200 w-full h-14" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 lg:flex-row w-full">
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Town / City</label>
                                    <select onChange={(e) => dispatch({ type: "CITY", payload: e.target.value })} className="border appearance-none text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent px-5 border-gray-200 w-full h-14">
                                        <option key={0} value="">select city</option>
                                        {states.map((state, index) => {
                                            return <option key={index + 1} value={state}>{state}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Postcode / ZIP *</label>
                                    <input onChange={(e) => dispatch({ type: "POSTCODE", payload: e.target.value })} type="text" value={address.postcode}
                                        className="border text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent ps-5 border-gray-200 w-full h-14" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">
                                        Mobile Number</label>
                                    <input onChange={(e) => dispatch({ type: "MOBILENUMBER", payload: e.target.value })} type="number" value={address.mobileNumber}
                                        className="border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent ps-5 border-gray-200 w-full h-14" />
                                </div>
                                <div className="w-full">
                                    <label className="text-sm font-normal mb-10">Email Address</label>
                                    <input onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })} type="text" value={address.emailAddress}
                                        className="border text-sm font-light text-gray-600 outline focus:outline-[#7fad39] outline-transparent ps-5 border-gray-200 w-full h-14" />
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
                                    <p id="total_price">₹{total.subTotal}.00</p>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <h5>Delivery</h5>
                                    <p id="DeliveryCharges">{total.deliveryCharges ? `₹${total.deliveryCharges}.00` : 'Free'}</p>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <h5>Discount</h5>
                                    <p id="discount">₹{total.discount ? -total.discount : total.discount}.00</p>
                                </div>
                                <div className="flex justify-between font-medium border-t py-3 border-gray-200">
                                    <h5 className="uppercase">Total</h5>
                                    <p id="total">₹{total.total}.00</p>
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
                                        the <Link href="#" className="text-[#7fad39]">terms and conditions</Link>
                                    </label>
                                </div>


                            </div>
                            <button onClick={placeOrder} disabled={loading}
                                className="bg-[#7fad39] focus:bg-blue-600 focus:border-blue-600 focus:text-white shadow-2xl border-2 border-transparent hover:border-[#7fad39] hover:text-[#7fad39] hover:bg-white duration-200 cursor-pointer text-white py-3 font-normal  rounded-full px-5">
                                {loading ? "Processing..." : " Place an order"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page