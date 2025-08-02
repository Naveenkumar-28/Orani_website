import React from 'react'

export function OrderTableHeader() {
    return (
        <div className='flex py-3 border-b-2 border-gray-300 text-black font-medium gap-5 mb-2 xl:text-base lg:text-[0.8em] text-sm '>
            <p className='w-3/12 text-center '>Order ID</p>
            <p className='w-2/12 text-center'>Order Date</p>
            <p className='w-3/12 text-center'>Order Status</p>
            <p className='w-2/12 text-center'>Order Price</p>
            <p className='w-2/12 text-center'>Show Details</p>
        </div>
    )
}
