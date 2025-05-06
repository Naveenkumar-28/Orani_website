import React from 'react'

function SinglePageSkeleton() {
    return (
        <>
            <div className="h-[200px] relative mb-20 bg-gray-200 animate-pulse"></div>
            <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20" >
                <div className="flex lg:flex-row flex-col h-full lg:gap-10 gap-10">
                    <div className="xl:w-7/12 lg:w-6/12 w-full h-[26rem] bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="xl:w-5/12 lg:w-6/12 w-full h-full flex flex-col gap-8">
                        <div className="font-normal uppercase text-3xl bg-gray-200 animate-pulse h-12 rounded-sm w-6/12"></div>
                        <div className="flex gap-5 h-8 w-full">
                            <div className="bg-gray-200 animate-pulse h-10 w-5/12 rounded-sm"></div>
                            <div className="bg-gray-200 animate-pulse h-10 w-3/12 rounded-sm"></div>
                            <div className="bg-gray-200 animate-pulse h-10 w-3/12 rounded-sm"></div>
                        </div>
                        <div className='flex gap-5'>
                            <p className="bg-gray-200 animate-pulse h-12 w-2/12 rounded-sm"></p>
                            <p className="bg-gray-200 animate-pulse h-12 w-2/12 rounded-sm"></p>
                            <div className='bg-gray-200 animate-pulse h-12 w-1/12 rounded-sm'></div>
                        </div>
                        <div className="w-full h-24 bg-gray-200 animate-pulse rounded-sm"></div>
                        <div className="flex gap-2 h-8">
                            <div className='bg-gray-200 animate-pulse w-2/12 h-12'></div>
                            <div className='bg-gray-200 animate-pulse w-3/12 h-12'></div>
                            <div className='bg-gray-200 animate-pulse w-2/12 h-12'></div>
                        </div>
                        <div className="bg-gray-200 animate-pulse h-10 w-6/12 rounded-sm"></div>
                        <div className='h-16 w-4/12 rounded-full bg-gray-200 animate-pulse'></div>
                    </div>
                </div>

            </section>
            <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20">
                <div className="flex justify-center flex-col items-center gap-8">
                    <h6 className="text-green font-medium italic text-xl">Products</h6>
                    <h1 className="lg:text-4xl text-3xl font-semibold">Related Products</h1>
                    <p className="text-gray-500 text-base">Far far away, behind the word mountains, far from the
                        countries Vokalia and
                        Consonantia</p>
                </div>

                <div
                    className="flex pt-10 pb-5 select-none gap-5 overflow-x-auto snap-x snap-mandatory w-full">
                    {[...Array(4)].map((_, index) => {
                        return (

                            <div key={index} className="bg-gray-200 animate-pulse rounded-sm min-w-62 h-72" >

                            </div>
                        )
                    })}

                </div>

            </section>
        </>
    )
}

export default SinglePageSkeleton