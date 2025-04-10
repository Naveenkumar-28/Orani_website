import React from 'react'

function SinglePageSkeleton() {
    return (
        <>
            <div className="h-[200px] relative mb-20 bg-gray-300 animate-pulse"></div>
            <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20" >
                <div className="flex lg:flex-row flex-col h-full lg:gap-10 gap-10">
                    <div className="xl:w-7/12 lg:w-6/12 w-full h-[26rem] bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="xl:w-5/12 lg:w-6/12 w-full h-full flex flex-col gap-8">
                        <div className="font-normal uppercase text-3xl bg-gray-300 animate-pulse h-12 rounded-sm w-6/12"></div>
                        <div className="flex gap-5 h-8 w-full">
                            <div className="bg-gray-300 animate-pulse h-10 w-5/12 rounded-sm"></div>
                            <div className="bg-gray-300 animate-pulse h-10 w-3/12 rounded-sm"></div>
                            <div className="bg-gray-300 animate-pulse h-10 w-3/12 rounded-sm"></div>
                        </div>
                        <div className='flex gap-5'>
                            <p className="bg-gray-300 animate-pulse h-12 w-2/12 rounded-sm"></p>
                            <p className="bg-gray-300 animate-pulse h-12 w-2/12 rounded-sm"></p>
                            <div className='bg-gray-300 animate-pulse h-12 w-1/12 rounded-sm'></div>
                        </div>
                        <div className="w-full h-24 bg-gray-300 animate-pulse rounded-sm"></div>
                        <div className="flex gap-2 h-8">
                            <div className='bg-gray-300 animate-pulse w-2/12 h-12'></div>
                            <div className='bg-gray-300 animate-pulse w-3/12 h-12'></div>
                            <div className='bg-gray-300 animate-pulse w-2/12 h-12'></div>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-10 w-6/12 rounded-sm"></div>
                        <div className='h-16 w-4/12 rounded-full bg-gray-300 animate-pulse'></div>
                    </div>
                </div>

            </section>
            <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20">
                <div className="flex justify-center flex-col items-center gap-8">
                    <div className=" h-10 w-32 rounded-sm bg-gray-300 animate-pulse"></div>
                    <div className=" h-12 w-72 rounded-sm bg-gray-300 animate-pulse"></div>
                    <div className=" h-8 w-full rounded-sm bg-gray-300 animate-pulse"></div>
                </div>

                <div
                    className="grid pt-10 pb-5 select-none gap-5 overflow-hidden xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 overflow-x-auto ">
                    {[...Array(4)].map((_, index) => {
                        return (

                            <div key={index} className="bg-gray-300 animate-pulse h-62 rounded-sm" >

                            </div>
                        )
                    })}

                </div>

            </section>
        </>
    )
}

export default SinglePageSkeleton