import { useRouter } from 'next/navigation'
import React from 'react'

export function BannerSection() {
    const router = useRouter()
    return (
        <section id="banner_section"
            className=" mx-auto grid grid-cols-1 sm:auto-rows-[220px] auto-rows-[200px] md:auto-rows-[280px] lg:auto-rows-[300px]  xl:auto-rows-[400px] w-full sm:gap-10 gap-5 lg:mb-32 mb-10">
            <div onClick={() => router.push(`/pages/shop?category=${'fruits'}`)} className="w-full h-full  overflow-hidden ">
                <div className=" w-full h-full justify-end flex">
                    <div
                        className="xl:w-6/12 md:w-8/12 w-10/12 h-full flex flex-col sm:gap-3 xl:gap-5 gap-2 justify-center items-end lg:pe-20 pe-5">
                        <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 lg:gap-3">
                            <p className="lg:text-4xl font-extrabold text-green md:text-3xl sm:text-2xl text-base ">
                                Dried & Drink
                                Fruits</p>

                            <p className="lg:text-lg font-normal text-xs sm:text-sm text-gray-400">
                                With 25% off</p>
                            <button onClick={() => router.push(`/pages/shop`)}
                                className="bg-green active:scale-95 cursor-pointer border-2 border-transparent hover:border-white rounded-full md:text-sm sm:text-xs text-[0.6rem] duration-500 text-white font-medium xl:text-base lg:py-3 py-2 shadow-lg lg:px-5 px-3  lg:mt-3">Shop
                                Now</button>
                        </div>
                    </div>
                </div>

            </div>
            <div onClick={() => router.push(`/pages/shop?category=${'fruits'}`)} className="w-full h-full  overflow-hidden ">
                <div className=" w-full h-full justify-start flex">
                    <div
                        className="xl:w-6/12 md:w-8/12 w-10/12 h-full flex flex-col xl:gap-5 sm:gap-5 gap-2 justify-center items-start lg:ps-20 ps-5">
                        <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 lg:gap-3">
                            <p className="lg:text-4xl font-extrabold text-green md:text-3xl sm:text-2xl text-base ">
                                Summar
                                Fruits</p>

                            <p className="lg:text-lg font-normal text-xs sm:text-sm text-gray-400">
                                100% Pure
                                Natural Fruit
                                Juice</p>
                            <button onClick={() => router.push(`/pages/shop`)}
                                className="bg-green active:scale-95 cursor-pointer border-2 border-transparent hover:border-white rounded-full md:text-sm sm:text-xs text-[0.6rem] duration-500 text-white font-medium xl:text-base lg:py-3 py-2 shadow-lg lg:px-5 px-3 lg:mt-3">Shop
                                Now</button>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}