import React, { SetStateAction } from 'react'
import { OrderType } from '../../../types';
import { getFormatDate, statusColor } from '@/utils';

type OrderCardPropsType = {
    setIsModel: React.Dispatch<SetStateAction<OrderType | null>>;
    order: OrderType
}

export function OrderCard({ order, setIsModel }: OrderCardPropsType) {

    return (
        <div className='flex py-3  items-center gap-5 xl:text-sm lg:text-[0.7em] text-xs  hover:bg-gray-100 rounded-lg'>
            <p className='w-3/12 text-center'>{order?.razorpay_order_id.split('_')[1]}</p>
            <p className='w-2/12 text-center'>{getFormatDate(order?.createdAt.toString())}</p>

            <div className='w-3/12  gap-2 flex justify-center'>
                <p className={`w-6/12 relative uppercase flex justify-center py-2 items-center text-white px-2 rounded-full ${statusColor(order?.orderStatus.toLowerCase())}`}>
                    {order?.orderStatus}
                </p>
            </div>

            <p className='w-2/12 text-center'>₹{order?.totalAmount}</p>
            <div className='w-2/12 flex justify-center items-center'>
                <button onClick={() => setIsModel(order)} className=' bg-green text-white rounded-full px-3 py-2 max-w-max cursor-pointer'>View Details</button>
            </div>
        </div>

    )
}
