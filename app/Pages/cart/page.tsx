"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartProductItem from "@/components/CartPage/CartProductItem";
import MenuSection from "@/components/MenuSection"
import Button from "@/components/Button"
import Input from "@/components/Input";
import { useRouter } from 'next/navigation';
import { CartType } from '@/app/types';


function Cart() {
    const router = useRouter()
    const [total, setTotal] = useState({
        subTotal: 0,
        discount: 0,
        deliveryCharges: 0,
        total: 0
    })

    const CartList: CartType[] = useSelector((state: any) => state.CartList) || []

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


    return (
        <>
            <MenuSection name={'cart'} />
            <div className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-30">
                <div
                    className="bg-green hidden lg:flex lg:h-20  text-white lg:text-lg font-medium items-center justify-center gap-2">
                    <div className="lg:w-3/12 w-4/12 justify-center items-center flex"> </div>
                    <div className="lg:w-3/12 w-4/12 sm:justify-center sm:items-center flex">Product name</div>
                    <div className="lg:w-2/12 justify-center items-center lg:flex hidden">Price</div>
                    <div className="lg:w-2/12 w-2/12 justify-center items-center flex">Quantity</div>
                    <div className="lg:w-2/12 w-2/12 justify-center items-center flex  ">Total</div>
                </div>
                <div className="w-full mb-20">

                    {CartList.length > 0 ? (CartList.map((product, index) => {
                        return <CartProductItem key={index} product={product} />
                    })) : (
                        <div className='h-40 flex justify-center items-center'>
                            <p className='text-gray-400 text-lg'>Your Cart is Empty</p>
                        </div>
                    )}


                </div>
                {CartList.length > 0 && (
                    <div className="w-full grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 mb-40 gap-10">
                        <div className="flex flex-col">
                            <div className="border border-gray-200 px-5 pt-5 pb-8 flex flex-col gap-5 mb-5">
                                <h1 className="text-xl font-medium">Coupon Code</h1>
                                <p className="text-gray-500">Enter your coupon code if you have one</p>
                                <div>
                                    <p className="text-sm font-semibold mb-2">Coupon code</p>
                                    <Input type={"text"} />

                                </div>
                            </div>

                            <Button title={"Apply Coupon"} className='text-lg w-max py-3' />
                        </div>
                        <div className="flex flex-col">
                            <div className="border border-gray-200 px-5 pt-5 pb-8 flex flex-col gap-5 mb-5">
                                <h5 className="text-xl font-medium">Estimate shipping and tax</h5>
                                <p className="text-gray-500">Enter your destination to get a shipping estimate</p>
                                <div className="mb-2">
                                    <h5 className="text-sm font-semibold mb-2">Country</h5>
                                    <Input type={"text"} />
                                </div>
                                <div className="mb-2">
                                    <h5 className="text-sm font-semibold mb-2">State/Province</h5>
                                    <Input type={"text"} />

                                </div>
                                <div className="mb-2">
                                    <h5 className="text-sm font-semibold mb-2">Zip/Postal Code</h5>
                                    <Input type={"text"} />

                                </div>
                            </div>
                            <Button title={"Estimate"} className='text-lg w-max py-3' />
                        </div>
                        <div className="flex flex-col">
                            <div className="border border-gray-200 px-5 pt-5 pb-8 flex flex-col gap-5 mb-5">

                                <h5 className="text-xl font-medium">Cart Totals</h5>
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
                                    <p id="discount">₹{(total.discount ? -total.discount : total.discount).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between font-semibold border-t py-3 border-gray-200">
                                    <h5 className="uppercase">Total</h5>
                                    <p id="total">₹{total.total.toFixed(2)}</p>
                                </div>
                            </div>
                            <Button title={"Proceed to checkout"} className='text-lg py-3' onClick={() => router.push('/Pages/checkout')} />
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default Cart