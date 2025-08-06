import React from 'react'
import { OrderCardSkeleton } from './OrderCardSkeleton'

export function RecentOrdersSkeleton() {
    return (
        <div className='w-full flex flex-col bg-white ring-1 shadow-md ring-gray-200 rounded-md px-5 py-8 animate-pulse'>
            <div className='h-6 w-32 bg-gray-300 rounded-sm mb-8'></div>

            <div className='overflow-auto pt-0 pb-2'>
                <div className='min-w-[800px] flex flex-col gap-3'>

                    {/* Table header skeleton */}

                    <div className='flex py-3 border-b-2 border-gray-300 gap-5 mb-2 xl:text-base lg:text-[0.8em] text-sm animate-pulse'>
                        <div className='w-3/12 text-center'>
                            <div className='mx-auto h-4 w-24 bg-gray-300 rounded' />
                        </div>
                        <div className='w-2/12 text-center'>
                            <div className='mx-auto h-4 w-20 bg-gray-300 rounded' />
                        </div>
                        <div className='w-3/12 text-center'>
                            <div className='mx-auto h-4 w-28 bg-gray-300 rounded' />
                        </div>
                        <div className='w-2/12 text-center'>
                            <div className='mx-auto h-4 w-16 bg-gray-300 rounded' />
                        </div>
                        <div className='w-2/12 text-center'>
                            <div className='mx-auto h-4 w-20 bg-gray-300 rounded' />
                        </div>
                    </div>



                    {/* Skeleton rows */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <OrderCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>

    )
}
