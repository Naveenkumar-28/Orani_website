import React from 'react'

export default function TopProductsSkeleton() {
    return (
        <div className='w-full flex flex-col bg-white ring-1 shadow-md ring-gray-200 rounded-md px-5 py-8 gap-8 min-h-6/12 animate-pulse'>
            {/* Header */}
            <div className='flex flex-col gap-1'>
                <div className='h-4 w-32 bg-gray-300 rounded-sm' />
                <div className='h-3 w-40 bg-gray-200 rounded-sm' />
            </div>

            {/* List of product skeletons */}
            <div className='flex flex-col md:gap-8 gap-5'>
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='flex gap-2 items-center justify-between'>
                        <div className='items-center flex gap-5'>
                            <div className='size-10 bg-gray-200 rounded-sm' />
                            <div className='flex flex-col gap-2'>
                                <div className='h-3 w-24 bg-gray-300 rounded-sm' />
                                <div className='h-2 w-16 bg-gray-200 rounded-sm' />
                            </div>
                        </div>
                        <div className='h-6 w-12 bg-gray-300 rounded-md' />
                    </div>
                ))}
            </div>
        </div>


    )
}
