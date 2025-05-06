import bodyOverflowHandler from '@/hooks/bodyOverFlowHandler'
import { statusColor } from '@/hooks/statusColor'
import React from 'react'
import { OrderType } from '../AdminPage/types'
type OrderCardProps = {
    order: OrderType,
    setID: (value: string) => void
}
function OrderCard({ order, setID }: OrderCardProps) {

    const findDigit = (num: number) => {
        return num < 10 ? `0${num}` : num
    }
    const date = new Date(order?.createdAt)
    return (
        <div className='flex py-5 border-b border-gray-200  items-center gap-5 xl:text-sm text-xs hover:bg-gray-50 px-5 '>
            <p className='w-3/12 lg:text-start lg:ps-5 text-center'>{order?._id}</p>
            <p className='w-2/12 text-center'>{`${date.getFullYear()}-${findDigit(date.getMonth() + 1)}-${findDigit(date.getDate())}`}</p>

            <div className='w-3/12  gap-2 flex justify-center'>
                <p className={`w-6/12 relative uppercase flex justify-center py-2 items-center text-white px-2 rounded-full ${statusColor(order?.orderStatus.toLowerCase())}`}>
                    {order?.orderStatus}
                </p>
            </div>

            <p className='w-2/12 text-center'>₹{order?.totalPrice}</p>
            <div className='w-2/12 flex justify-center items-center'>
                <button onClick={() => {
                    setID(order?._id)
                    bodyOverflowHandler(true)
                }} className='bg-gray-500 text-white rounded-full px-3 py-2 max-w-max cursor-pointer'>View Details</button>
            </div>
        </div>

    )
}

export default OrderCard