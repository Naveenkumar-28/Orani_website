import React from 'react'

export function CardTotalSkeleton() {
    return (
        <div className="border border-gray-200 px-5 pt-5 lg:pb-8 pb-3 flex flex-col gap-5">
            <div className="h-5 w-40 bg-gray-200 rounded-sm"></div>

            <div className="flex justify-between text-gray-600">
                <div className="h-4 w-32 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-16 bg-gray-200 rounded-sm"></div>
            </div>

            <div className="flex justify-between text-gray-600">
                <div className="h-4 w-20 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-12 bg-gray-200 rounded-sm"></div>
            </div>

            <div className="flex justify-between text-gray-600">
                <div className="h-4 w-24 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-14 bg-gray-200 rounded-sm"></div>
            </div>

            <div className="flex justify-between border-t py-3 border-gray-200">
                <div className="h-4 w-16 bg-gray-300 rounded-sm"></div>
                <div className="h-4 w-16 bg-gray-300 rounded-sm"></div>
            </div>
        </div>

    )
}
