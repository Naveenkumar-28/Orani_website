
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaUser } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { useSelector } from 'react-redux'

function SmallDeviceMenuSlider({ setSliderShow, pathName }) {
    const [isActive, setActive] = useState(false)
    const CartList = useSelector((state) => state.CartList)
    const WishList = useSelector((state) => state.WishList)
    useEffect(() => {
        setTimeout(() => {
            setActive(true)
        }, 300);
    }, [])
    return (
        <section className={`fixed h-full w-full z-[100] lg:hidden flex`}>

            <div className={`w-12/12 sm:w-7/12 md:w-6/12 h-full bg-white z-50 px-5 pt-2 duration-500   ${isActive ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full justify-between pb-5">
                    <div>
                        <div className="flex justify-between items-center ">
                            <div className="h-15 w-25 overflow-hidden flex">
                                <img className="h-full w-full object-contain" src="/logo.png" alt="Logo" />
                            </div>

                            <div onClick={() => {
                                setActive(false)
                                setTimeout(() => {
                                    setSliderShow(false)
                                }, 500);
                            }} className="py-3 text-3xl flex justify-end px-2 cursor-pointer">
                                <IoMdClose />

                            </div>
                        </div>

                        <div className="flex gap-2 px-10 items-center justify-between py-3 border-b-2 border-gray-200">
                            <div className='flex gap-2'>

                                <div className="relative" >
                                    <FaHeart className="text-xl cursor-pointer" />
                                    {WishList.length > 0 && (
                                        <div className="absolute top-[-5px] right-[-10px] bg-[#7fad39] rounded-full text-white h-3.5 w-3.5 text-[10px] text-center font-semibold">
                                            {WishList.length}
                                        </div>
                                    )}
                                </div>
                                <div className="relative h-full" >
                                    <FiShoppingCart className="text-xl ms-3 cursor-pointer" />
                                    {CartList.length > 0 && (
                                        <div className="absolute top-[-5px] right-[-10px] bg-[#7fad39] rounded-full text-white h-3.5 w-3.5 text-[10px] text-center font-semibold">
                                            {CartList.length}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <div className='flex justify-center items-center gap-2'>
                                    <FaUser className="text-sm" />
                                    <SignInButton className='cursor-pointer' />
                                </div>
                            </SignedOut>

                        </div>
                        <ul className="gap-2 flex flex-col mt-5 ">
                            <li
                                className={` py-2 hover:bg-gray-100 rounded-sm flex justify-center items-center  font-medium text-balance uppercase ${pathName == '/Pages' ? "text-green" : ''}`}>
                                <Link href="/Pages">Home</Link>
                            </li>
                            <li
                                className={` py-2  hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase ${pathName == '/Pages/shop' ? "text-green" : ''}`}>
                                <Link href="/Pages/shop">Shop</Link>

                            </li>
                            <li
                                className="py-2 relative group hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase">
                                <a href="#">Pages</a>
                                <div className="absolute hidden  group-hover:block top-0 right-0">
                                    <ul
                                        className=" flex  w-36 bg-white px-5 shadow-2xl py-3 font-light text-sm flex-col flex-nowrap gap-2 rounded-sm">
                                        <li><Link className="hover:text-[#7fad39]" href="/Pages/wishList">Wishlist</Link></li>
                                        <li><Link className="hover:text-[#7fad39]" href="/Pages/Orders">Orders</Link>
                                        </li>
                                        <li><Link className="hover:text-[#7fad39]" href="/Pages/cart">Cart</Link></li>
                                        <li><Link className="hover:text-[#7fad39]" href="/Pages/checkout">Checkout</Link></li>
                                        <li><Link className="hover:text-[#7fad39]" href="/Pages/order">Order</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase ${pathName == '/Pages/blog' ? "text-green" : ''}`}>
                                <Link href="/Pages/blog">Blog</Link>
                            </li>
                            <li
                                className={`py-2 hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase ${pathName == '/Pages/contact' ? "text-[#7fad39]" : ''}`}>
                                <Link href="/Pages/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="flex items-center pe-5">
                            <MdEmail />
                            <div className="font-normal ms-1 text-[14px]">hello@colorlib.com</div>
                        </div>
                        <div className="ps-5 font-normal text-[14px]">Free Shipping for all Order of ₹99</div>
                    </div>
                </div>
            </div>
            <div onClick={() => {
                setActive(false)
                setTimeout(() => {
                    setSliderShow(false)
                }, 500);
            }} className="bg-gray-700 cursor-pointer absolute top-0 w-full h-full z-[-10] opacity-50">
            </div>
        </section>
    )
}

export default SmallDeviceMenuSlider