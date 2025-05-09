"use client"
import Link from 'next/link'
import React from 'react'
import { BiLogoFacebook } from 'react-icons/bi'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import { IoIosArrowUp } from 'react-icons/io'
import { TbBrandGithubFilled } from 'react-icons/tb'


function Footer() {

    const ScrollToTop = () => {
        scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
    return (
        <section id="contact" className="bg-neutral-50 py-20 relative">

            {/* Scroll to top button */}
            <div id="up_arrow" onClick={ScrollToTop}
                className="top-[-25px] rounded-full left-[50%] translate-x-[-50%] z-40 bg-green text-white hover:bg-green duration-500 absolute shadow-2xl px-4 py-4 cursor-pointer text-2xl">
                <IoIosArrowUp className="animate-bounce size-7" />

            </div>
            {/* Footer */}
            <div className="flex flex-col container lg:px-20 mx-auto md:px-20 px-5 sm:px-5 2xl:px-52">

                <div className="grid gap-10  pb-10 lg:grid-cols-2 xl:grid-cols-3">
                    <div className=" gap-2 flex flex-col">
                        <div className="h-18 w-30 overflow-hidden justify-center flex items-center">
                            <img src="/logo.png" className="object-cover" alt="Logo" />
                        </div>
                        <div className="flex gap-2  items-center">
                            <p className="font-medium text-base">Address:</p>
                            <p className="font-normal text-gray-600 text-sm lg:text-base">60-49 Road 11378 New York</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-base">Phone:</p>
                            <p className="font-normal text-gray-600 text-sm lg:text-base">+65 11.188.888</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-base">Email:</p>
                            <p className="font-normal text-gray-600 text-sm lg:text-base">hello@colorlib.com</p>
                        </div>
                    </div>
                    <div className=" gap-2 flex flex-col">
                        <h1 className="font-medium text-lg">Useful Links</h1>
                        <ul className="flex flex-col gap-2">
                            <li className=" text-gray-500"><Link className="hover:text-green text-sm lg:text-base font-normal" href="#">About
                                Us</Link></li>
                            <li className=" text-gray-500"><Link className="hover:text-green text-sm lg:text-base font-normal" href="#">About
                                Our Shop</Link></li>
                            <li className=" text-gray-500"><Link className="hover:text-green text-sm lg:text-base font-normal" href="#">Secure
                                Shopping</Link></li>
                            <li className=" text-gray-500"><Link className="hover:text-green text-sm lg:text-base font-normal" href="#">Delivery infomation</Link>
                            </li>
                            <li className=" text-gray-500"><Link className="hover:text-green text-sm lg:text-base font-normal" href="#">Privacy Policy</Link></li>
                            <li className=" text-gray-500"><Link className="hover:text-green text-sm lg:text-base font-normal" href="#">Our
                                Sitemap</Link></li>
                        </ul>

                    </div>
                    <div className=" flex flex-col gap-2">
                        <h1 className="font-medium text-lg ">Join Our Newsletter Now</h1>
                        <div className="flex gap-8 flex-col">
                            <p className="lg:text-base text-sm text-gray-500 font-normal">Get E-mail updates about our latest shop and
                                special offers.
                            </p>
                            <div className="w-84 rounded-sm overflow-hidden  bg-white h-12 justify-between flex">
                                <input
                                    className="h-full placeholder:text-sm lg:w-8/12 w-full rounded-ss-sm rounded-es-sm ps-3 outline-0 border-gray-300 border"
                                    type="text" placeholder="Enter your mail" />
                                <button
                                    className="font-medium px-3 flex justify-center items-center lg:text-sm text-xs uppercase w-4/12 duration-200 text-white cursor-pointer bg-green hover:bg-white hover:text-green border-2 border-green h-full ">Subscribe</button>
                            </div>
                            <ul className="flex gap-5 ">
                                <li className=" duration-500 hover:scale-120 text-white bg-green p-2 rounded-full text-xl"><Link href="#" >

                                    <BiLogoFacebook />

                                </Link>
                                </li>
                                <li className=" duration-500 hover:scale-120 text-white bg-green p-2 rounded-full text-xl"><Link href="#" >

                                    <FaInstagram />
                                </Link>
                                </li>
                                <li className=" duration-500 hover:scale-120 text-white bg-green p-2 rounded-full text-xl"><Link href="#" >

                                    <FaTwitter />
                                </Link>
                                </li>
                                <li className=" duration-500 hover:scale-120 text-white bg-green p-2 rounded-full text-xl"><Link href="#" >

                                    <TbBrandGithubFilled />
                                </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center w-full justify-center">

                        <p className="font-normal lg:text-base text-sm text-gray-500  ">Copyright ©2025 All
                            rights
                            reserved | This
                            template is
                            made by <a className="text-green font-medium lg:text-base text-sm " href="#">Colorlib</a></p>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Footer