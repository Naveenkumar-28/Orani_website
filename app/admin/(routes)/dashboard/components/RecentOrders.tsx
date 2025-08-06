import { RootState } from '@/app/redux/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { OrderCard, OrderTableHeader } from '../../orders/components'
import { OrderDetailsModel } from '@/components'
import { OrderType } from '@/app/admin/types'

export function RecentOrders() {
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
    const { data } = useSelector((state: RootState) => state.OverallSummary)
    return (
        <div className='w-full flex flex-col bg-white ring-1 shadow-md ring-gray-200 rounded-md px-5 py-8 '>
            <h1 className='font-semibold sm:text-xl text-lg'>Recent Orders</h1>
            <div className='overflow-auto pt-8 pb-2'>

                <div className='min-w-[800px] '>
                    <OrderTableHeader />

                    {data?.recentOrders.map((order, index) => (
                        <OrderCard order={order} key={index} setIsModel={setSelectedOrder} />
                    ))}
                </div>
            </div>
            {selectedOrder && <OrderDetailsModel closerHandler={() => setSelectedOrder(null)} editMode={true} order={selectedOrder} />}
        </div>
    )
}
