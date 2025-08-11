import React from 'react'

export function BusinessOverviewSkeleton() {
    return (
        <div className="w-full sm:gap-5 gap-3 lg:min-h-3/12 grid grid-cols-2 sm:grid-cols-3 animate-pulse">
            {/* Card 1 */}
            <div className=" ring-1 ring-gray-200 rounded-md px-5 py-5 gap-4 flex flex-col">
                <div className="rounded-sm bg-gray-300 lg:size-10 md:size-8 sm:size-7 size-6" />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-2/3 bg-gray-300 rounded-sm" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded-sm" />
                </div>
            </div>

            {/* Card 2 */}
            <div className=" ring-1 ring-gray-200 rounded-md px-5 py-5 gap-4 flex flex-col">
                <div className="rounded-sm bg-gray-300 lg:size-10 md:size-8 sm:size-7 size-6" />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-2/3 bg-gray-300 rounded-sm" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded-sm" />
                </div>
            </div>

            {/* Card 3 */}
            <div className=" ring-1 ring-gray-200 rounded-md px-5 py-5 gap-4 flex flex-col col-span-2 sm:col-auto">
                <div className="rounded-sm bg-gray-300 lg:size-10 md:size-8 sm:size-7 size-6" />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-2/3 bg-gray-300 rounded-sm" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded-sm" />
                </div>
            </div>
        </div>

    )
}
