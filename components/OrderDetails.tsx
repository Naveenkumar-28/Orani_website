import { OrderType } from '@/app/tempPages/(protected_pages)/orders/types'
import { getFormatDate, statusColor } from '@/utils'
import React from 'react'

export function OrderDetails({ order }: { order: OrderType }) {

    return (
        <section className='px-5 flex flex-col gap-4 pb-5 text-sm'>
            <div className='flex justify-between items-center'>
                <h1 className='font-medium'>Order ID</h1>
                <p>{order?.razorpay_order_id.split('_')[1]}</p>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='font-medium'>Order Date</h1>
                <p>{getFormatDate(order?.createdAt.toString())}</p>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='font-medium'>Order Price</h1>
                <p>₹{order?.totalAmount}</p>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='font-medium'>Payment Method</h1>
                <p >{order?.paymentMethod}</p>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='font-medium'>Payment Status</h1>
                {order?.paymentStatus ? (
                    <p className='text-green'>Paid</p>
                ) : (
                    <>
                        {order?.orderStatus == "cancelled" ? (
                            <p className='text-red-500'>Payment failed</p>) : (
                            <p className='text-red-500'>Payment Not Paid</p>
                        )}
                    </>

                )}

            </div>

            <div className='flex justify-between items-center'>
                <h1 className='font-medium'>Order Status:</h1>
                <p className={`${statusColor(order?.orderStatus?.toLowerCase())} capitalize text-white px-3 py-1 rounded-full `}>{order?.orderStatus}</p>
            </div>
        </section>

    )
}