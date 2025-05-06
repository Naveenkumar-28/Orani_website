
import bodyOverflowHandler from '@/hooks/bodyOverFlowHandler'
import { useDebounceEffect } from '@/hooks/useDebounceEffect'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { FaRegHeart, FaUser } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { useSelector } from 'react-redux'

function SmallDeviceMenuSlider({ setSliderShow, pathName }) {
    const [isActive, setActive] = useState(false)
    const router = useRouter()
    const CartList = useSelector((state) => state.CartList)
    const WishList = useSelector((state) => state.WishList)

    useDebounceEffect(() => {
        setActive(true)
        bodyOverflowHandler(true)
    }, [], 300)

    const closerHandler = useCallback(() => {
        setActive(false)
        setTimeout(() => {
            setSliderShow(false)
            bodyOverflowHandler(false)
        }, 500);
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

                            <div onClick={closerHandler} className="py-3 text-3xl flex justify-end px-2 cursor-pointer hover:text-green text-gray-500">
                                <IoMdClose />

                            </div>
                        </div>

                        <div className="flex gap-2 px-10 items-center justify-between py-3 border-b-2 border-gray-200">
                            <div className='flex gap-2'>
                                <div onClick={() => {
                                    router.push('/Pages/wishlist')
                                    closerHandler()
                                }} className="relative" >
                                    <FaRegHeart className="text-xl cursor-pointer" />
                                    {WishList.length > 0 && (
                                        <div className="absolute top-[-5px] right-[-7px] bg-green rounded-full text-white h-3 w-3 text-[9px] text-center font-medium">
                                            {WishList.length}
                                        </div>
                                    )}
                                </div>
                                <div onClick={() => {
                                    router.push('/Pages/cart')
                                    closerHandler()
                                }} className="relative h-full" >
                                    <FiShoppingCart className="text-xl ms-3 cursor-pointer" />
                                    {CartList.length > 0 && (
                                        <div className="absolute top-[-5px] right-[-7px] bg-green rounded-full text-white h-3 w-3 text-[9px] text-center font-medium">
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
                            <li onClick={closerHandler}
                                className={` py-2 hover:bg-gray-100 rounded-sm flex justify-center items-center  font-medium text-balance uppercase ${pathName == '/Pages' ? "text-green" : ''}`}>
                                <Link href="/Pages">Home</Link>
                            </li>
                            <li onClick={closerHandler}
                                className={` py-2  hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase ${pathName == '/Pages/shop' ? "text-green" : ''}`}>
                                <Link href="/Pages/shop">Shop</Link>

                            </li>
                            <li
                                className="py-2 relative group hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase">
                                <a href="#">Pages</a>
                                <div className="absolute hidden  group-hover:block top-0 right-0">
                                    <ul
                                        className=" flex  w-36 bg-white px-5 shadow-2xl py-3 font-light text-sm flex-col flex-nowrap gap-2 rounded-sm">
                                        <li onClick={closerHandler}><Link className="hover:text-green" href="/Pages/wishlist">Wishlist</Link></li>
                                        <li onClick={closerHandler}><Link className="hover:text-green" href="/Pages/orders">Orders</Link>
                                        </li >
                                        <li onClick={closerHandler}><Link className="hover:text-green" href="/Pages/cart">Cart</Link></li>
                                        <li onClick={closerHandler}><Link className="hover:text-green" href="/Pages/checkout">Checkout</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li onClick={closerHandler}
                                className={`py-2 hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase ${pathName == '/Pages/blog' ? "text-green" : ''}`}>
                                <Link href="/Pages/blog">Blog</Link>
                            </li>
                            <li onClick={closerHandler}
                                className={`py-2 hover:bg-gray-100 rounded-sm flex justify-center items-center font-medium text-balance uppercase ${pathName == '/Pages/contact' ? "text-green" : ''}`}>
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
            <div onClick={closerHandler} className="bg-gray-700 cursor-pointer absolute top-0 w-full h-full z-[-10] opacity-50">
            </div>
        </section>
    )
}

export default SmallDeviceMenuSlider