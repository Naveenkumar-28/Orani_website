import React from 'react'

export function ProductSliderCardSkeleton() {
    return (
        <div className="group active:scale-95 duration-200 snap-start overflow-hidden box-border px-1 animate-pulse my-2">
            <div className="flex lg:h-30 sm:h-32 h-28 w-full border border-gray-200 relative rounded-sm overflow-hidden bg-white">
                {/* Image Skeleton */}
                <div className="relative overflow-hidden lg:w-2/5 w-3/12 flex items-center justify-center bg-gray-100">
                </div>

                {/* Content Skeleton */}
                <div className="flex justify-start py-5 items-start px-5 flex-col w-9/12">
                    {/* Title */}
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

                    {/* Price area */}
                    <div className="flex gap-2 items-center mb-2">
                        <div className="h-4 w-14 bg-gray-200 rounded" />
                        <div className="h-4 w-14 bg-gray-200 rounded" />
                    </div>

                    {/* Rating */}
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>

                {/* Discount Badge Skeleton */}
                <div className="absolute top-0 left-0 px-2 py-1 bg-gray-300 text-[.6rem] sm:text-xs rounded-br-sm w-12 h-5 text-transparent" >00%</div>
            </div>
        </div>

    )
}
