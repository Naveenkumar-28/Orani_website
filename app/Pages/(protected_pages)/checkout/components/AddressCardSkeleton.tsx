import React from 'react'

export function AddressCardSkeleton() {
    return (
        <div className="border-b border-gray-300 px-5 py-4 flex flex-col gap-2 animate-pulse">
            <div className="flex items-start gap-3">
                <div className="mt-1 size-4 rounded-full bg-gray-300"></div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-start">
                        <div className="h-4 w-32 bg-gray-300 rounded-sm"></div>
                        <div className="h-4 w-10 bg-gray-300 rounded-sm"></div>
                    </div>

                    <div className="h-3 w-48 bg-gray-200 rounded-sm"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded-sm"></div>
                </div>
            </div>
        </div>

    )
}
