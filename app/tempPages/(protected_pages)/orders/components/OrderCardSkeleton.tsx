import React from 'react'

export function OrderCardSkeleton() {
    return (
        <div className='flex py-5 border-b border-gray-200 items-center gap-5 xl:text-sm text-xs px-5 animate-pulse'>
            <p className='w-3/12 text-center'>
                <span className="inline-block h-3 w-8/12 bg-gray-200 rounded-sm"></span>
            </p>
            <p className='w-2/12 text-center'>
                <span className="inline-block h-3 w-6/12 bg-gray-200 rounded-sm"></span>
            </p>

            <div className='w-3/12 gap-2 flex justify-center'>
                <span className="w-6/12 h-6 bg-gray-200 rounded-full"></span>
            </div>

            <p className='w-2/12 text-center'>
                <span className="inline-block h-3 w-6/12 bg-gray-200 rounded-sm"></span>
            </p>

            <div className='w-2/12 flex justify-center items-center'>
                <span className="h-8 w-25 bg-gray-200 rounded-full"></span>
            </div>
        </div>
    )
}
