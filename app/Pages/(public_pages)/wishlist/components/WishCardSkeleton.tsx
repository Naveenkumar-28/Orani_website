import React from 'react'

export function WishCardSkeleton() {
    return (
        <div className="flex sm:flex-row flex-col border-b border-gray-300 py-10 md:gap-2 gap-3 animate-pulse">
            {/* Image section */}
            <div className="lg:w-4/12 sm:w-6/12 w-full h-full relative flex justify-center items-center">
                <div className="h-40 w-full xl:max-w-64 bg-gray-200 rounded-sm"></div>
                <div className="xl:block hidden absolute top-0 left-0 border border-gray-300 p-1 rounded-sm bg-gray-200 w-6 h-6"></div>
            </div>

            {/* Details section */}
            <div className="lg:w-7/12 sm:w-6/12 w-full flex flex-col gap-5 md:ps-5">
                <div className="flex flex-col md:gap-4 gap-3">
                    <div className="h-4 w-40 bg-gray-300 rounded-sm"></div>

                    <div className="flex items-center gap-3">
                        <div className="h-4 w-10 bg-gray-200 rounded-sm"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded-sm"></div>
                        <div className="h-4 w-12 bg-gray-200 rounded-sm"></div>
                    </div>

                    <div className="flex gap-3">
                        <div className="h-4 w-16 bg-gray-200 rounded-sm"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded-sm"></div>
                        <div className="h-4 w-12 bg-gray-200 rounded-sm"></div>
                    </div>

                    <div className="h-12 w-full bg-gray-200 rounded-sm"></div>

                    <div className="h-4 w-28 bg-gray-300 rounded-sm"></div>
                </div>

                <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
            </div>
        </div>

    )
}
