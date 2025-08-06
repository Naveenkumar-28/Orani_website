import React from 'react'

export function SpecificProductSkeleton() {
    return (
        <section className='container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20 lg:mt-20'>

            <div className="flex lg:flex-row flex-col gap-10 animate-pulse">
                {/* Image Skeleton */}
                <div className="xl:w-7/12 lg:w-6/12 w-full sm:h-[26rem] h-[18rem] bg-gray-200 rounded-md" />

                {/* Info Skeleton */}
                <div className="xl:w-5/12 lg:w-6/12 w-full flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="h-6 bg-gray-200 w-3/4 rounded" />
                        <div className="h-6 w-6 bg-gray-200 rounded" />
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="h-4 w-10 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-10 bg-gray-200 rounded" />
                    </div>

                    <div className="h-5 w-1/2 bg-gray-200 rounded" />
                    <div className="h-20 w-full bg-gray-200 rounded" />
                    <div className="h-10 w-32 bg-gray-200 rounded" />
                    <div className="h-5 w-1/3 bg-gray-200 rounded" />
                    <div className="h-10 w-40 bg-gray-200 rounded" />
                </div>
            </div>
        </section>
    )
}
