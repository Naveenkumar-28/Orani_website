import { bodyOverflowHandler, statusColor } from '@/utils'
import React from 'react'
import { OrderCardProps } from '../types'
import { getFormatDate } from '@/utils'

export function OrderCard({ order, setIsModelopen }: OrderCardProps) {
    return (
        <div className='flex py-5 border-b border-gray-200  items-center gap-5 xl:text-sm text-xs hover:bg-gray-50 px-5 '>
            <p className='w-3/12  text-center'>{order?.razorpay_order_id.split('_')[1]}</p>
            <p className='w-2/12 text-center'>{getFormatDate(order?.createdAt.toString())}</p>

            <div className='w-3/12  gap-2 flex justify-center'>
                <p className={`w-6/12 relative uppercase flex justify-center py-2 items-center text-white px-2 rounded-full ${statusColor(order?.orderStatus.toLowerCase())}`}>
                    {order?.orderStatus}
                </p>
            </div>

            <p className='w-2/12 text-center'>₹{order?.totalAmount.toFixed(2)}</p>
            <div className='w-2/12 flex justify-center items-center'>
                <button onClick={() => {
                    setIsModelopen(order)
                    bodyOverflowHandler(true)
                }} className='bg-gray-500 text-white rounded-full px-3 py-2 max-w-max cursor-pointer'>View Details</button>
            </div>
        </div>

    )
}