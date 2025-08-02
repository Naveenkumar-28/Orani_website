import { RootState } from '@/app/redux/store'
import React from 'react'
import { FaBox, FaCheckCircle, FaShoppingBag } from 'react-icons/fa'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'

export function OrderSummaryCards() {
    const { loadingSkeleton, ordersData } = useSelector((state: RootState) => state.AdminOrders)
    return (
        <div className='flex gap-5 pt-2 mb-5'>
            <div className='bg-white ring-1 shadow-md ring-gray-200 rounded-md px-5 py-4 xl:gap-4 gap-1 lg:gap-2 flex flex-col w-full overflow-hidden'>
                <div className='flex gap-1 justify-between items-center'>
                    <h1 className='font-semibold text-xs xl:text-sm 2xl:text-base text-neutral-600'>Total Orders</h1>
                    <div className='xl:size-8 sm:size-7 size-6 flex justify-center items-center bg-green  rounded-sm text-white text-xl'>
                        <FaShoppingBag className='xl:text-base text-xs' />
                    </div>
                </div>
                {!loadingSkeleton ? (
                    <p className=' font-bold xl:text-2xl lg:text-xl text-base sm:text-lg'>{ordersData.total}</p>
                ) : (
                    <div className='xl:h-8 sm:h-6 h-5 lg:mt-0 mt-1 w-full bg-gray-200 animate-pulse rounded-md'></div>
                )}
            </div>
            <div className='bg-white ring-1 shadow-md ring-gray-200 rounded-md  px-5 py-4 xl:gap-4 gap-1 lg:gap-2 flex flex-col w-full'>
                <div className='flex gap-1 justify-between items-center'>
                    <h1 className='font-semibold text-xs xl:text-sm  2xl:text-base text-neutral-600'>New Orders</h1>
                    <div className='xl:size-8 sm:size-7 size-6 flex justify-center items-center bg-green rounded-sm text-white text-xl'>
                        <FaBox className='xl:text-base text-xs' />
                    </div>
                </div>
                {!loadingSkeleton ? (

                    <p className=' font-bold xl:text-2xl lg:text-xl text-base sm:text-lg'>{ordersData.new}</p>
                ) : (
                    <div className='xl:h-8 sm:h-6 h-5 lg:mt-0 mt-1 w-full bg-gray-200 animate-pulse rounded-md'></div>
                )}
            </div>
            <div className='bg-white ring-1 shadow-md ring-gray-200 rounded-md  px-5 py-4 xl:gap-4 gap-1 lg:gap-2 flex flex-col w-full'>
                <div className='flex gap-1 justify-between items-center'>
                    <h1 className='font-semibold text-xs xl:text-sm 2xl:text-base text-neutral-600'>Delivered Orders</h1>

                    <div className='xl:size-8 sm:size-7 size-6 flex justify-center items-center bg-green rounded-sm text-white text-xl'>
                        <FaCheckCircle className='xl:text-xl text-sm' />
                    </div>
                </div>
                {!loadingSkeleton ? (

                    <p className=' font-bold xl:text-2xl lg:text-xl text-base sm:text-lg'>{ordersData.delivered}</p>
                ) : (
                    <div className='xl:h-8 sm:h-6 h-5 lg:mt-0 mt-1 w-full bg-gray-200 animate-pulse rounded-md'></div>
                )}
            </div>
            <div className='bg-white ring-1 shadow-md ring-gray-200 rounded-md  px-5 py-4 xl:gap-4 gap-1 lg:gap-2 flex flex-col w-full'>
                <div className='flex gap-1 justify-between items-center'>
                    <h1 className='font-semibold text-xs xl:text-sm  2xl:text-base text-neutral-600'>Canceled Orders</h1>
                    <div className='xl:size-8 sm:size-7 size-6 flex justify-center items-center bg-green rounded-sm text-white text-xl'>
                        <IoCloseCircleSharp className=' xl:text-2xl text-base' />
                    </div>
                </div>
                {!loadingSkeleton ? (

                    <p className=' font-bold xl:text-2xl lg:text-xl text-base sm:text-lg'>{ordersData.cancelled}</p>
                ) : (
                    <div className='xl:h-8 sm:h-6 h-5 lg:mt-0 mt-1 w-full bg-gray-200 animate-pulse rounded-md'></div>
                )}
            </div>

        </div>
    )
}
