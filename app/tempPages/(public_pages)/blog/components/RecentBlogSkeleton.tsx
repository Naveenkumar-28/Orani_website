import React from 'react'

export function RecentBlogSkeleton() {
    return (
        <div className="w-full flex animate-pulse">
            <div className="w-3/12 lg:h-20 sm:h-26 h-20">
                <div className="w-full h-full bg-gray-300 rounded" />
            </div>
            <div className="w-9/12 flex flex-col gap-2 lg:ml-3 xl:ml-5 ml-5">
                <div className="h-4 w-11/12 bg-gray-300 rounded" /> {/* Title */}
                <div className="h-3 w-10/12 bg-gray-200 rounded" /> {/* Description line 1 */}
                <div className="h-3 w-8/12 bg-gray-200 rounded" /> {/* Description line 2 */}

                <div className="flex text-xs gap-2 text-gray-500 flex-wrap mt-1">
                    <div className="h-3 w-16 bg-gray-300 rounded" />
                    <div className="h-3 w-12 bg-gray-300 rounded" />
                    <div className="h-3 w-10 bg-gray-300 rounded" />
                </div>
            </div>
        </div>

    )
}
