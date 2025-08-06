import React from 'react'

export function BlogCardSkeleton() {
    return (
        <div className="sm:max-w-full max-w-[320px] border border-gray-200 rounded-md overflow-hidden md:w-full pb-3 duration-500 animate-pulse bg-white">
            {/* Image Placeholder */}
            <div className="w-full xl:h-62 sm:h-44 h-36 bg-gray-200" />

            {/* Content Area */}
            <div className="w-full h-4/12 px-5 py-2">
                {/* Top icons (date & comment) */}
                <div className="flex gap-5 items-center text-gray-400 mb-2">
                    <div className="flex gap-1 items-center sm:text-xs text-[0.6rem]">
                        <div className="w-3 h-3 bg-gray-300 rounded-full" />
                        <div className="h-3 w-12 bg-gray-300 rounded" />
                    </div>
                    <div className="flex gap-1 items-center sm:text-xs text-[0.6rem]">
                        <div className="w-3 h-3 bg-gray-300 rounded-full" />
                        <div className="h-3 w-4 bg-gray-300 rounded" />
                    </div>
                </div>

                {/* Title */}
                <div className="h-4 w-full bg-gray-300 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-300 rounded mb-1" />

                {/* Description lines */}
                <div className="h-3 w-full bg-gray-200 rounded mb-1" />
                <div className="h-3 w-11/12 bg-gray-200 rounded mb-1" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
            </div>
        </div>

    )
}
