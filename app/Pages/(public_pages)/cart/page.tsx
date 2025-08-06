"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FullScreenLoader, MenuSection } from "@/components"
import { fetchCartList } from './redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { CartCard, CartCardSkeleton, CouponCode, ShippingEstimate } from './components'
import { useUserData } from '@/hooks';
import { CartTotal } from '../../components';
import { useRouter } from 'next/navigation';


function Cart() {
    const dispatch = useDispatch<AppDispatch>()
    const { cartList, isLoading: isCartLoading, isSkeletonLoading } = useSelector((state: RootState) => state.CartItems)
    const { isSignedIn, user, isLoading } = useUserData()
    const router = useRouter()

    useEffect(() => {
        if (isLoading) return
        if (!isSignedIn && !user) {
            dispatch(fetchCartList())
        }
    }, [user, isSignedIn, isLoading])

    return (
        <>
            <MenuSection name={'cart'} />
            <div className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-30 text-gray-800">
                {cartList.length > 0 && (<div
                    className="bg-green hidden lg:flex xl:h-20 lg:h-18 rounded-sm text-white lg:text-lg font-medium items-center justify-center gap-2">
                    <div className="lg:w-3/12 w-4/12 justify-center items-center flex xl:text-base text-sm"> </div>
                    <div className="lg:w-3/12 w-4/12 sm:justify-center sm:items-center flex xl:text-base text-sm">Product name</div>
                    <div className="lg:w-2/12 justify-center items-center lg:flex hidden xl:text-base text-sm">Price</div>
                    <div className="lg:w-2/12 w-2/12 justify-center items-center flex xl:text-base text-sm">Quantity</div>
                    <div className="lg:w-2/12 w-2/12 justify-center items-center flex xl:text-base text-sm  ">Total</div>
                </div>)}
                <div className="w-full mb-20">
                    {!isSkeletonLoading ? (
                        <>
                            {cartList.length > 0 ? (cartList.map((product, index) => {
                                return <CartCard key={index} product={product} />
                            })) : (
                                <div className='h-40 flex justify-center items-center'>
                                    <p className='text-gray-400 lg:text-xl text-lg'>Your Cart is Empty</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div
                                className="bg-green hidden lg:flex xl:h-20 lg:h-18 rounded-sm text-white lg:text-lg font-medium items-center justify-center gap-2">
                                <div className="lg:w-3/12 w-4/12 justify-center items-center flex xl:text-base text-sm"> </div>
                                <div className="lg:w-3/12 w-4/12 sm:justify-center sm:items-center flex xl:text-base text-sm">Product name</div>
                                <div className="lg:w-2/12 justify-center items-center lg:flex hidden xl:text-base text-sm">Price</div>
                                <div className="lg:w-2/12 w-2/12 justify-center items-center flex xl:text-base text-sm">Quantity</div>
                                <div className="lg:w-2/12 w-2/12 justify-center items-center flex xl:text-base text-sm  ">Total</div>
                            </div>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CartCardSkeleton key={index} />
                            ))}
                        </>
                    )}


                </div>
                {cartList.length > 0 && (
                    <div className="w-full flex flex-col xl:flex-row mb-40 gap-10">
                        <div className='flex flex-col gap-10 lg:flex-row'>
                            {/* Coupon Code Section  */}
                            <CouponCode />

                            {/* Shipping Estimate Section */}
                            <ShippingEstimate />
                        </div>

                        {/* Cart Total Section*/}
                        <div className="flex flex-col gap-5 w-full lg:w-6/12 xl:flex-1/3">
                            <CartTotal />
                            <Button title={"Proceed to checkout"} className='xl:text-lg text-sm w-max py-3' onClick={() => router.push('/pages/checkout')} />
                        </div>
                    </div>
                )}

            </div>
            <FullScreenLoader loadingState={isCartLoading} />
        </>
    )
}

export default Cart