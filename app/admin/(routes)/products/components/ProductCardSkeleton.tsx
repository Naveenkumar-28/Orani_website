import React from 'react'

export function ProductCardSkeleton() {
    return (
        <div className='bg-white rounded-sm shadow-md ring-1 ring-gray-100 relative overflow-hidden pb-5 md:h-72 h-64 animate-pulse'>

            {/* Discount Badge */}
            <div className='absolute top-0 left-0 h-6 w-14 bg-gray-300 rounded-br-sm z-10'></div>

            {/* Image Section */}
            <div className='h-9/12 w-full flex justify-center bg-gray-200 items-center'>
            </div>

            {/* Text Content */}
            <div className='p-2 h-3/12 flex flex-col justify-center items-center gap-2'>
                <div className='h-4 w-3/4 bg-gray-300 rounded'></div>
                <div className='flex gap-3 w-full justify-center'>
                    <div className='h-4 w-1/4 bg-gray-300 rounded'></div>
                    <div className='h-4 w-1/4 bg-gray-300 rounded'></div>
                </div>
            </div>
        </div>

    )
}
