import React from 'react'
import { OrderType } from './types';

type OrderCardPropsType = {
    setID: (value: string) => void;
    statusColor: (value: string) => void;
    order: OrderType
}

function OrderCard({ order, setID, statusColor }: OrderCardPropsType) {
    const date = new Date(order?.createdAt)
    const findSingleDigit = (digit: number) => digit < 10 ? `0${digit}` : digit.toString()
    const formattedDate = `${findSingleDigit(date.getDate())}-${findSingleDigit(date.getMonth() + 1)}-${date.getFullYear()}`
    return (
        <div className='flex py-3  items-center gap-5 lg:text-sm sm:text-xs text-[0.5rem] hover:bg-gray-50 rounded-md'>
            <p className='w-3/12 lg:text-start lg:ps-5 text-center'>{order?.razorpay_order_id}</p>
            <p className='w-2/12 text-center'>{formattedDate}</p>

            <div className='w-3/12  gap-2 flex justify-center'>
                <p className={`w-6/12 relative uppercase flex justify-center py-2 items-center text-white px-2 rounded-full ${statusColor(order?.orderStatus.toLowerCase())}`}>
                    {order?.orderStatus}
                </p>
            </div>

            <p className='w-2/12 text-center'>₹{order?.totalPrice}</p>
            <div className='w-2/12 flex justify-center items-center'>
                <button onClick={() => setID(order?._id)} className=' bg-green text-white rounded-full px-3 py-2 max-w-max cursor-pointer'>View Details</button>
            </div>
        </div>

    )
}

export default OrderCard