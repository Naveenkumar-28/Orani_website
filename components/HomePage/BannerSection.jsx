import React from 'react'

function BannerSection() {
    return (
        <section id="banner_section"
            className="grid grid-cols-1 sm:auto-rows-[300px] auto-rows-[250px] md:auto-rows-[450px] xl:auto-rows-[500px] w-full sm:gap-10 gap-5 mb-32">
            <div className="w-full h-full  overflow-hidden ">
                <div className=" w-full h-full justify-end flex">
                    <div
                        className="xl:w-6/12 md:w-8/12 w-10/12 h-full flex flex-col sm:gap-3 xl:gap-5 gap-2 justify-center items-end lg:pe-20 pe-10">
                        <div className="flex flex-col justify-center items-center gap-2 lg:gap-3">
                            <p className="lg:text-5xl font-extrabold text-(--color-green) md:text-4xl sm:text-2xl text-xl ">
                                Dried & Drink
                                Fruits</p>

                            <p className="lg:text-lg font-normal text-sm sm:text-base text-gray-400">With 25% off</p>
                            <button
                                className="bg-(--color-green) mt-2 cursor-pointer border-2 border-transparent hover:border-(--color-green) hover:bg-white hover:text-[#7fad39] rounded-full duration-500 text-white font-medium md:text-base lg:py-3 sm:py-2 text-[12px] py-1 lg:px-5 px-3 font-sans lg:mt-3">Shop
                                Now</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full h-full  overflow-hidden ">
                <div className=" w-full h-full justify-start flex">
                    <div
                        className="xl:w-6/12 md:w-8/12 w-10/12 h-full flex flex-col sm:gap-3 xl:gap-5 gap-2 justify-center items-start lg:ps-20 ps-10">
                        <div className="flex flex-col justify-center items-center gap-2 lg:gap-3">
                            <p className="lg:text-5xl font-extrabold text-[#7fad39] md:text-4xl sm:text-2xl text-xl ">
                                Summar
                                Fruits</p>

                            <p className="lg:text-lg font-normal text-sm sm:text-base text-gray-400">
                                100% Pure
                                Natural Fruit
                                Juice</p>
                            <button
                                className="bg-[#7fad39] mt-2 cursor-pointer border-2 border-transparent hover:border-[#7fad39] hover:bg-white hover:text-[#7fad39] rounded-full duration-500 text-white font-medium md:text-base lg:py-3 sm:py-2 text-[12px] py-1 lg:px-5 px-3 font-sans lg:mt-3">Shop
                                Now</button>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default BannerSection