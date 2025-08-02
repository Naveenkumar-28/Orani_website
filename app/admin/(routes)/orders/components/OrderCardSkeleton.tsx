import React from 'react'

export function OrderCardSkeleton() {
    return (

        <div className='flex py-2  items-center gap-5 animate-pulse'>
            <div className='w-3/12 flex justify-center '>
                <div className='bg-gray-200 h-4 rounded-sm w-8/12'></div>
            </div>
            <div className='w-2/12 flex justify-center '>
                <div className='bg-gray-200 h-4 rounded-sm w-8/12'></div>
            </div>
            <div className='w-3/12 flex justify-center items-center px-1'>
                <div className='bg-gray-200 sm:h-11 h-10 rounded-full w-40'></div>
            </div>
            <div className='w-2/12 flex justify-center '>
                <div className='bg-gray-200 h-4 rounded-sm w-8/12'></div>
            </div>
            <div className='w-2/12 flex justify-center items-center'>
                <div className='bg-gray-200 sm:h-11 h-10 rounded-full w-30'></div>
            </div>
        </div>


    )
}
