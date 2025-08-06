import React from 'react'

export function RelatedProductSkeleton() {
    return (
        <div className="border border-gray-200 snap-start bg-white p-5 rounded-sm xl:min-w-62 lg:min-w-52 min-w-40 xl:h-72 lg:h-64 h-52 animate-pulse">

            {/* Image Placeholder */}
            <div className="h-9/12 relative overflow-hidden pb-2">
                <div className="w-full h-full bg-gray-200 rounded" />
            </div>

            {/* Text Placeholder */}
            <div className="flex justify-center gap-2 items-center flex-col h-3/12">
                <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                <div className="flex gap-4">
                    <div className="h-3 w-10 bg-gray-200 rounded" />
                    <div className="h-3 w-12 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    )
}
