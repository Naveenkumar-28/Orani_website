import React from 'react'

export function OverallReviewsSkeleton() {
    return (
        <div className='w-full flex flex-col bg-white ring-1 shadow-md ring-gray-200 rounded-md px-5 py-8 gap-8 min-h-6/12 animate-pulse'>
            {/* Header */}
            <div className='flex flex-col gap-1'>
                <div className='h-4 w-24 bg-gray-300 rounded-sm' />
                <div className='h-3 w-28 bg-gray-200 rounded-sm' />
            </div>

            {/* Progress bars */}
            <div className='flex flex-col gap-5 md:gap-8'>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className='flex items-center gap-3'>
                        {/* Star label */}
                        <div className='h-3 w-8 bg-gray-300 rounded-sm' />

                        {/* Progress bar */}
                        <div className='flex-1 h-3 bg-gray-200 rounded-full overflow-hidden'>
                            <div className='h-full w-[60%] bg-gray-400 rounded-full' />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
