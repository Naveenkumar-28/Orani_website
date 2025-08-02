import React from 'react'

export function OrderSummaryChartSkeleton() {
    return (
        <div className='w-full ring-1 shadow-md bg-white ring-gray-200 rounded-md px-5 py-5 gap-2 sm:gap-6 flex flex-col lg:min-h-9/12 animate-pulse'>
            {/* Header Section */}
            <div className='flex justify-between flex-col sm:flex-row gap-5'>
                <div className='flex flex-col gap-2 sm:w-6/12'>
                    <div className='h-4 w-32 bg-gray-300 rounded-sm' />
                    <div className='h-3 w-52 bg-gray-200 rounded-sm' />
                </div>
                <div className='h-8 sm:w-40 w-32 bg-gray-200 rounded-md' />
            </div>

            {/* Chart Skeleton */}
            <div className='h-[250px] md:h-[300px] lg:h-[380px] flex items-end justify-between gap-2 w-full overflow-hidden'>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className='flex gap-5 items-end'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='bg-gray-200 w-6 sm:w-8 rounded-t-md' style={{ height: `${150 + i * 20}px` }}></div>
                            <div className='h-2 w-8 bg-gray-300 rounded-sm' />
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='bg-gray-200 w-6 sm:w-8 rounded-t-md' style={{ height: `${100 + i * 20}px` }}></div>
                            <div className='h-2 w-8 bg-gray-300 rounded-sm' />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
