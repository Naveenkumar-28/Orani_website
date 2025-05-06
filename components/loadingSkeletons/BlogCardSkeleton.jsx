import React from 'react'

function BlogCardSkeleton() {

    return (
        <div className="flex flex-col md:flex-row md:h-64 xl:h-[17rem] gap-5 ">
            <div className="lg:h-full xl:w-5/12 h-64 md:w-5/12 md:h-full sm:h-80 lg:w-6/12 w-full overflow-hidden bg-gray-200 animate-pulse">
            </div>
            <div className="flex xl:7/12 lg:w-6/12 md:w-7/12 flex-col xl:gap-8 gap-5">
                <div className="flex gap-5 items-center">

                    <div className='bg-gray-200 animate-pulse h-10 w-25 rounded-sm'></div>
                    <div className='bg-gray-200 animate-pulse h-10 w-25 rounded-sm'></div>
                    <div className="bg-gray-200 animate-pulse h-10 w-25 rounded-sm"></div>

                </div>
                <div className="flex flex-col gap-3 xl:gap-5 ">
                    <h3 className="w-full h-10 bg-gray-200 animate-pulse rounded-sm"></h3>
                    <p className="bg-gray-200 animate-pulse w-full h-20 rounded-sm"></p>
                    <div className='w-25 rounded-full h-12 bg-gray-200 animate-pulse'></div>
                </div>

            </div>

        </div>
    )
}

export default BlogCardSkeleton