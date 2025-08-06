import React from 'react'

export function CartCardSkeleton() {
    return (
        <div className="w-full flex border-b border-gray-200 lg:h-auto sm:gap-3 gap-5 select-none  py-5 flex-col sm:flex-row animate-pulse">
            {/* Image Section */}
            <div className="lg:w-3/12 sm:w-6/12 w-full justify-center lg:items-center items-start flex relative lg:gap-2">
                <div className="text-sm p-1 rounded-sm bg-gray-200 lg:static absolute top-0 left-0 w-6 h-6 hidden lg:block"></div>
                <div className="lg:h-22 xl:h-32 sm:h-38 h-40 lg:w-10/12 w-full bg-gray-200 rounded"></div>
            </div>

            {/* Product Info Section */}
            <div className="lg:w-9/12 sm:w-8/12 w-full flex lg:flex-row flex-col lg:gap-1 gap-5">

                {/* Name + Description */}
                <div className="lg:w-5/12 justify-center flex flex-col items-center gap-2">
                    <div className="h-4 w-32 bg-gray-300 rounded-sm mb-2 self-start"></div>
                    <div className="w-full space-y-1">
                        <div className="h-3 bg-gray-200 rounded-sm w-11/12"></div>
                        <div className="h-3 bg-gray-200 rounded-sm w-10/12"></div>
                    </div>
                </div>

                {/* Price */}
                <div className="lg:w-3/12 hidden lg:flex justify-center items-center">
                    <div className="h-4 w-16 bg-gray-300 rounded-sm"></div>
                </div>

                {/* Small screen price */}
                <div className="lg:hidden flex items-center text-green font-medium text-sm text-center">
                    <div className="h-4 w-16 bg-gray-300 rounded-sm"></div>
                </div>

                {/* Quantity Controls */}
                <div className="lg:w-4/12 flex items-center gap-2 lg:justify-center">
                    <div className="flex gap-1 xl:h-10 h-8">
                        <div className="w-8 h-full bg-gray-300 rounded-sm"></div>
                        <div className="w-12 h-full bg-gray-300 rounded-sm"></div>
                        <div className="w-8 h-full bg-gray-300 rounded-sm"></div>
                    </div>
                </div>

                {/* Total */}
                <div className="lg:w-3/12 flex items-center lg:justify-center gap-2">
                    <div className="lg:hidden font-medium text-sm">Total:</div>
                    <div className="h-4 w-16 bg-gray-300 rounded-sm"></div>
                </div>
            </div>
        </div>

    )
}
