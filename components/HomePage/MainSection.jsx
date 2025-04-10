
import { IoChevronForward, IoMenu } from "react-icons/io5";
import React, { useState } from 'react'
import { FiPhone } from "react-icons/fi";
import SearchInput from "./mainSection/SearchInput";

function MainSection() {
    const [isShow, setIsSHow] = useState(false)
    return (
        <main className=" mb-32 relative">
            <main className=" lg:absolute top-0 left-0 z-50  w-full lg:py-5 pb-5">
                <div
                    className="container lg:px-20 md:px-20 2xl:px-52 flex lg:flex-row w-full gap-5 flex-col mx-auto sm:px-5">
                    <div className="lg:w-3/12 w-full h-full sm:px-0 px-5 lg:pt-0 pt-5">
                        <div className="overflow-hidden h-full duration-700 rounded-sm ">
                            <div id="CategorieMenu" onClick={() => setIsSHow((pre) => !pre)}
                                className="flex items-center justify-between bg-[#7fad39] duration-500 cursor-pointer text-white font-bold text-lg lg:px-2 px-5 h-12">
                                <div className="flex items-center gap-2">
                                    <IoMenu className="text-3xl" />

                                    <p className="lg:text-base text-lg font-extrabold">All Departments</p>
                                </div>
                                <IoChevronForward className={`text-xl duration-500 ${isShow ? "rotate-90" : "rotate-0"}`} />

                            </div>

                            <div id="CaterieItems" className={`duration-1000  ${isShow ? "max-h-[500px]" : "max-h-0"}`}>
                                <ul className="border-[1px] bg-white border-gray-300 flex flex-col xl:gap-1">
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Fresh Meat</li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Vegetables</li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Fruit & Nut
                                        Gifts
                                    </li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Fresh Berries
                                    </li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Ocean Foods</li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Butter & Eggs
                                    </li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Fastfood</li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Fresh Onion</li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Papayaya &
                                        Crisps
                                    </li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Oatmeal</li>
                                    <li className="px-6 py-2 cursor-pointer hover:bg-gray-200 duration-500">Fresh Bananas
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-9/12 w-full">
                        <div className="md:flex md:h-12 md:justify-between w-full sm:px-0 px-5">
                            <SearchInput />
                            <div className="flex gap-5 mt-5 lg:mt-0 items-center ">
                                <div className="h-12 w-12 rounded-full bg-gray-100  flex justify-center items-center">
                                    <FiPhone className="text-[#7fad39] " />
                                </div>
                                <div className="justify-center items-center flex flex-col lg:text-white">
                                    <p className="font-semibold">+91 8489260109</p>
                                    <p className="font-light text-[14px]">support 24/7 time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <div className=" lg:h-[520px] xl:h-[85vh] sm:h-[400px] h-[350px] ">

                <div
                    className="bg-[url('/hero/bg_2.jpg')] bg-cover bg-center bg-no-repeat w-full h-full bg-gray-300 ">
                    <div className="w-full bg-[#1413131f]  flex flex-col items-center justify-center h-full">
                        <p className="font-bold  lg:text-xl md:text-base text-white text-sm">FRUIT FRESH</p>
                        <div className="flex justify-center items-center">
                            <p
                                className=" xl:text-8xl md:text-6xl md:font-medium lg:text-7xl font-semibold sm:font-bold sm:text-5xl text-3xl lg:mt-3 lg:mb-3 mb-1 mt-1 text-white">
                                Vegetable 100% Organic</p>
                        </div>
                        <p className="font-normal text-white mb-4 lg:font-bold text-sm">Free Pickup and
                            Delivery
                            Available</p>
                        <button
                            className="bg-(--color-green) cursor-pointer border-2 border-transparent hover:border-(--color-green)  hover:bg-white hover:text-(--color-green)  rounded-full sm:text-base duration-500 text-white font-medium md:text-base lg:py-3 text-sm py-2 shadow-lg lg:px-5 px-3 lg:mt-3">Shop
                            Now</button>
                    </div>
                </div>
            </div>
            {/* <!-- Hero Section  --> */}

            <div className="lg:block hidden absolute w-full z-[0] top-0 left-0 h-22 bg-[rgba(0,0,0,0.31)]">
            </div>
        </main>

    )
}

export default MainSection