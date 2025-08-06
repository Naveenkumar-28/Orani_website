"use client"
import { WEB_SITE_NAME } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { BiLogoFacebook } from 'react-icons/bi'
import { FaInstagram, FaMapMarkerAlt, FaTwitter } from 'react-icons/fa'
import { IoIosArrowUp, IoMdMail } from 'react-icons/io'
import { IoCall } from 'react-icons/io5'
import { TbBrandGithubFilled } from 'react-icons/tb'


export function Footer() {

    const ScrollToTop = () => {
        scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
    return (
        <section className="bg-neutral-50 lg:py-20 pt-20 pb-10 relative">
            {/* Scroll to top button */}
            <div onClick={ScrollToTop}
                className="top-[-25px] rounded-full left-[50%] translate-x-[-50%] z-40 bg-green text-white hover:bg-green/95 active:scale-95 duration-500 absolute shadow-2xl px-4 py-4 cursor-pointer text-2xl">
                <IoIosArrowUp className="animate-bounce size-7" />
            </div>
            {/* Footer */}
            <div className="flex flex-col mediaQuary">
                <div className="grid gap-10  pb-10 lg:grid-cols-2 xl:grid-cols-3">
                    <div className=" gap-8 flex flex-col text-gray-700">
                        <h1 className="text-3xl font-semibold text-gray-800 uppercase lg:text-4xl">{WEB_SITE_NAME}</h1>
                        <div className='flex flex-col gap-5'>
                            <div className="flex gap-2  items-center">
                                <p className="font-medium sm:text-lg text-base"><FaMapMarkerAlt /></p>
                                <p className=" text-gray-600 sm:text-sm text-xs font-light lg:font-normal">60-49 Road 11378 New York</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="font-medium sm:text-lg text-base"><IoCall /></p>
                                <p className=" text-gray-600 sm:text-sm text-xs font-light lg:font-normal">+65 11.188.888</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="font-medium sm:text-lg text-base"><IoMdMail /></p>
                                <p className=" text-gray-600 sm:text-sm text-xs font-light lg:font-normal">hello@colorlib.com</p>
                            </div>
                        </div>
                    </div>
                    <div className=" gap-2 flex flex-col">
                        <h1 className="font-medium text-lg text-gray-800 lg:font-semibold">Useful Links</h1>
                        <ul className="flex flex-col gap-2">
                            <li className=" text-gray-600"><Link className="hover:text-green sm:text-sm text-xs lg:font-normal font-light" href="#">About
                                Us</Link></li>
                            <li className=" text-gray-600"><Link className="hover:text-green sm:text-sm text-xs lg:font-normal font-light" href="#">About
                                Our Shop</Link></li>
                            <li className=" text-gray-600"><Link className="hover:text-green sm:text-sm text-xs lg:font-normal font-light" href="#">Secure
                                Shopping</Link></li>
                            <li className=" text-gray-600"><Link className="hover:text-green sm:text-sm text-xs lg:font-normal font-light" href="#">Delivery infomation</Link>
                            </li>
                            <li className=" text-gray-600"><Link className="hover:text-green sm:text-sm text-xs lg:font-normal font-light" href="#">Privacy Policy</Link></li>
                            <li className=" text-gray-600"><Link className="hover:text-green sm:text-sm text-xs lg:font-normal font-light" href="#">Our
                                Sitemap</Link></li>
                        </ul>

                    </div>
                    <div className=" flex flex-col gap-2">
                        <h1 className="font-medium text-lg text-gray-800 lg:font-semibold">Join Our Newsletter Now</h1>
                        <div className="flex gap-8 flex-col">
                            <p className="sm:text-sm text-xs text-gray-500 font-light lg:font-normal">Get E-mail updates about our latest shop and
                                special offers.
                            </p>
                            <div className="sm:w-84 w-72 rounded-sm overflow-hidden bg-white h-12 justify-between flex">
                                <input
                                    className="h-full placeholder:text-xs lg:placeholder:text-sm text-sm lg:w-8/12 w-full rounded-ss-sm rounded-es-sm ps-3 outline-0 border-gray-300 border"
                                    type="text" placeholder="Enter your mail" />

                                <button
                                    className="font-medium px-3 flex justify-center items-center text-xs uppercase w-4/12 duration-200 text-white cursor-pointer bg-green hover:bg-white hover:text-green border-2 border-green h-full ">Subscribe</button>
                            </div>
                            <ul className="flex gap-5 ">
                                <li className=" duration-500 hover:scale-110 text-white bg-green p-2 rounded-full text-xl">
                                    <Link href="#" >
                                        <BiLogoFacebook />
                                    </Link>
                                </li>
                                <li className=" duration-500 hover:scale-110 text-white bg-green p-2 rounded-full text-xl">
                                    <Link href="#" >
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li className=" duration-500 hover:scale-110 text-white bg-green p-2 rounded-full text-xl">
                                    <Link href="#" >
                                        <FaTwitter />
                                    </Link>
                                </li>
                                <li className=" duration-500 hover:scale-110 text-white bg-green p-2 rounded-full text-xl">
                                    <Link href="#" >
                                        <TbBrandGithubFilled />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center w-full justify-center">
                        <p className="font-light sm:text-sm text-gray-500 text-xs lg:font-normal">Copyright ©2025 All
                            rights
                            reserved | This
                            template is
                            made by <span className="text-green">Colorlib</span></p>

                    </div>
                </div>

            </div>
        </section>
    )
}