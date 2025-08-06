import React from 'react'

export function BlogCardSkeleton() {

    return (
        <div className="flex flex-col md:flex-row md:h-64 xl:h-[17rem] gap-5 animate-pulse">
            {/* Left Image Skeleton */}
            <div className="lg:h-full xl:w-5/12 h-64 md:w-5/12 md:h-full sm:h-80 lg:w-6/12 w-full bg-gray-200 rounded" />

            {/* Right Content Skeleton */}
            <div className="flex xl:7/12 lg:w-6/12 md:w-7/12 flex-col xl:gap-6 lg:gap-5 md:gap-7 gap-5">
                {/* Top Info Row */}
                <div className="flex gap-5 items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24" />
                    <div className="h-4 bg-gray-300 rounded w-16" />
                    <div className="h-4 bg-gray-300 rounded w-10" />
                </div>

                {/* Title + Description */}
                <div className="flex flex-col gap-3 xl:gap-6">
                    <div className="h-5 bg-gray-300 rounded w-11/12" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-10/12" />
                    <div className="h-4 bg-gray-200 rounded w-8/12" />
                </div>

                {/* Button */}
                <div className="h-8 w-24 bg-gray-300 rounded" />
            </div>
        </div>

    )
}
