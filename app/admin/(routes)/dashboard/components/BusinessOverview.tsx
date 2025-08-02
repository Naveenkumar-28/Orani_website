import { RootState } from '@/app/redux/store'
import React from 'react'
import { BsFillDiagram3Fill } from 'react-icons/bs'
import { FaRupeeSign } from 'react-icons/fa'
import { FaBagShopping } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

export function BusinessOverview() {
    const { data } = useSelector((state: RootState) => state.OverallSummary)
    return (
        <div className='w-full sm:gap-5 gap-2 lg:min-h-3/12 grid grid-cols-2 sm:grid-cols-3'>
            <div className='bg-white ring-1 shadow-md ring-gray-200 rounded-md  px-5 py-5 gap-4 flex flex-col'>
                <i className='lg:size-10 md:size-8 sm:size-7 size-6 bg-green flex justify-center items-center rounded-sm text-white lg:text-xl text-sm'>
                    <FaRupeeSign />
                </i>
                <div className='flex flex-col gap-1'>
                    <h1 className='font-semibold lg:text-lg md:text-base sm:text-sm text-xs'>Total revenue</h1>
                    <p className='text-gray-500 md:text-base sm:text-sm text-xs'>₹ {data?.totalRevenue}</p>
                </div>
            </div>
            <div className='bg-white ring-1 shadow-md ring-gray-200 rounded-md  px-5 py-5 gap-4 flex flex-col'>
                <i className='lg:size-10 md:size-8 sm:size-7 size-6 bg-green flex justify-center items-center rounded-sm text-white lg:text-xl text-sm'>
                    <FaBagShopping />
                </i>
                <div className='flex flex-col gap-1'>
                    <h1 className='font-semibold lg:text-lg md:text-base sm:text-sm text-xs'>Total Orders</h1>
                    <p className='text-gray-500 md:text-base sm:text-sm text-xs'>{data?.totalOrders}</p>
                </div>
            </div>
            <div className='bg-white ring-1 shadow-md ring-gray-200 rounded-md  px-5 py-5 gap-4 flex flex-col col-span-2 sm:col-auto'>
                <i className='lg:size-10 md:size-8 sm:size-7 size-6 bg-green flex justify-center items-center rounded-sm text-white lg:text-xl text-sm'>
                    <BsFillDiagram3Fill />
                </i>
                <div className='flex flex-col gap-1 '>
                    <h1 className='font-semibold lg:text-lg md:text-base sm:text-sm text-xs'>Total Users</h1>
                    <p className='text-gray-500 md:text-base sm:text-sm text-xs'>{data?.totalUsers}</p>
                </div>
            </div>
        </div>
    )
}
