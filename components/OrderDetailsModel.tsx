"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from './Button'
import { useDispatch } from 'react-redux'
import { OrderType } from '../app/admin/types'
import { Dropdown } from './Dropdown'
import { bodyOverflowHandler } from '@/utils'
import { AppDispatch, } from '@/app/redux/store'
import { createSendMessage } from '@/utils'
import { updateOrderStatus } from '@/app/admin/(routes)/orders/redux/api/orderThunks'
import { OrderShippingInfo } from './OrderShippingInfo'
import { OrderProductDetails } from './OrderProductDetails'
import { OrderDetails } from './OrderDetails'
import { OrderPriceDetails } from './OrderPriceDetails'

type OrderDetailsPropsType = {
    closerHandler: React.Dispatch<React.SetStateAction<OrderType | null>>;
    editMode?: boolean;
    loading?: boolean
    order: OrderType
}

export function OrderDetailsModel({
    closerHandler = () => { },
    editMode = false,
    loading = false,
    order
}: OrderDetailsPropsType) {

    const [isActive, setIsActive] = useState(false)
    const [orderStatus, setOrderStatus] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()

    //First time slider show after 200ms
    useEffect(() => {
        setTimeout(() => {
            setIsActive(true)
            bodyOverflowHandler(true)
        }, 400)
    }, [])

    //Order Status update handler
    const OrderStatusUpdateHandler = useCallback(async (id: string) => {
        if (!orderStatus) return sendMessage.error('Please Choose Order status')
        try {
            await dispatch(updateOrderStatus({ id, status: orderStatus })).unwrap()
            sendMessage.info("Order status update successfully")
        } catch (error) {
            sendMessage.error("Order status update failed")
        } finally {
            bodyOverflowHandler(false)
            closerHandler(null)

        }
    }, [sendMessage, bodyOverflowHandler, closerHandler, orderStatus, dispatch])

    //Slider close handler
    const sliderCloserHandler = useCallback(() => {
        setIsActive(false)
        setTimeout(() => {
            bodyOverflowHandler(false)
            closerHandler(null)
        }, 400);
    }, [bodyOverflowHandler, closerHandler])


    return (
        <>
            <section className={`fixed top-0 left-0  w-full h-dvh z-100 flex justify-end`}>
                <div className={`h-full bg-white lg:w-5/12 w-full sm:w-10/12 md:w-7/12 xl:w-4/12 pb-[4.3rem] duration-400 ${isActive ? "translate-x-0" : "translate-x-full"}`}>
                    <div className='flex justify-between items-center py-5 shadow-md px-5'>
                        <h1 className='font-medium text-lg'>Order Details</h1>
                        <button onClick={sliderCloserHandler} className='text-3xl cursor-pointer hover:text-red-500'><IoCloseOutline /></button>
                    </div>
                    <section className='overflow-y-auto h-full pt-5 pb-5 flex flex-col gap-3'>
                        {/* Order Details  */}
                        <OrderDetails order={order} />

                        {/* Products details  */}
                        <OrderProductDetails order={order} />

                        {/* Shipping Info  */}
                        <OrderShippingInfo order={order} />

                        {/* Price details  */}
                        <OrderPriceDetails order={order} />

                        {editMode &&
                            order?.paymentStatus &&
                            order.orderStatus.toLowerCase() !== "cancelled" &&
                            order.orderStatus.toLowerCase() !== "delivered" && (

                                <div className='px-5 mb-5 flex flex-col gap-5 '>
                                    <Dropdown dropdownHeight='h-12' dropdownPosition='bottom-12' status={orderStatus || order?.orderStatus} renderItems={["pending", "confirmed", "shipping", "delivered", "cancelled"]} onClick={setOrderStatus} />

                                    <Button loading={loading} disabled={loading} loadingContent='Updating . . .' onClick={() => OrderStatusUpdateHandler(order?._id)} title={"Update Order Status"} />
                                </div>

                            )}
                    </section>
                </div>
                <div onClick={sliderCloserHandler} className='bg-neut h-full w-full absolute -z-1 bg-black/50 cursor-pointer'></div>
            </section>
        </>

    )
}