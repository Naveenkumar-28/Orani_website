import React from 'react'

export function ProductCardSkeleton() {
    return (
        <div className={`w-auto border border-gray-200 relative overflow-hidden bg-white rounded-sm animate-pulse`}>
            {/* Discount badge placeholder */}
            <div className="absolute top-0 left-0 bg-gray-300 rounded-br-sm w-12 text-transparent" >00%</div>

            {/* Image container */}
            <div className="lg:h-9/12 h-8/12 overflow-hidden flex justify-center items-center">
                <div className="h-full sm:w-full w-full bg-gray-200 rounded" />
            </div>

            {/* Content section */}
            <div className="flex px-5 justify-center items-center flex-col lg:h-3/12 h-4/12 gap-2">
                {/* Title */}
                <div className="h-4 bg-gray-300 rounded w-3/4" />

                {/* Price row */}
                <div className="flex gap-5 w-full justify-center items-center mt-1">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
            </div>
        </div>

    )
}
