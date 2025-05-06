import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser, OrganizationList } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoMdHeart, IoMdPersonAdd } from 'react-icons/io'
import { PiShoppingCartFill, PiSignIn } from 'react-icons/pi'
import { useSelector } from 'react-redux'

function Header({ setSliderShow, pathName }) {
    const router = useRouter()
    const CartList = useSelector((state) => state.CartList)
    const WishList = useSelector((state) => state.WishList)
    const { user } = useUser()
    return (
        <header className=" select-none sticky top-0 z-[99] shadow-lg  bg-white">
            {/* Menu Section  */}
            <div
                className="lg:h-[4.5rem] flex lg:flex-row flex-row items-center lg:py-0 py-5 gap-5 h-16  bg-white container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52">
                <div className="lg:w-3/12 w-full h-full flex items-center justify-between">
                    <div className=" overflow-hidden h-10">
                        <img className='h-full w-full object-contain overflow-hidden' src="/logo.png" alt="Logo" />
                    </div>
                    <div className="lg:hidden cursor-pointer" id="menu_icon" onClick={() => setSliderShow((pre) => !pre)}>

                        <HiOutlineMenuAlt1 className="font-extrabold text-4xl" />

                    </div>
                </div>
                <div className="lg:flex justify-between lg:w-9/12 w-full items-center hidden">

                    <ul className="gap-8 lg:gap-10 flex ">
                        <li><Link className={`menu_btn font-medium  hover:text-green  text-base uppercase  ${pathName == '/Pages' ? "text-green" : ''}`} href="/Pages">Home</Link>
                        </li>

                        <li><Link href="/Pages/shop" className={`menu_btn font-medium  hover:text-green text-base uppercase ${pathName == '/Pages/shop' ? "text-green" : ''}`}>Shop</Link>

                        </li>
                        <li className="relative group">
                            <Link className="menu_btn font-medium  hover:text-green text-base uppercase" href="#">Pages</Link>
                            <div className="absolute hidden  group-hover:block left-[-50%] top-[100%] pt-7">
                                <ul
                                    className=" flex  w-36 bg-white px-5 shadow-2xl py-3 font-light text-sm flex-col flex-nowrap gap-2 rounded-sm">
                                    <li><Link className="hover:text-green" href="/Pages/wishlist">Wishlist</Link></li>
                                    <li><Link className="hover:text-green" href="/Pages/orders">Orders</Link></li>
                                    <li><Link className="hover:text-green" href="/Pages/cart">Cart</Link></li>
                                    <li><Link className="hover:text-green" href="/Pages/checkout">Checkout</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li><Link className={`menu_btn font-medium  hover:text-green  text-base uppercase ${pathName == '/Pages/blog' ? "text-green" : ''}`}
                            href="/Pages/blog">Blog</Link></li>
                        <li><Link className={`menu_btn font-medium  hover:text-green  text-base uppercase ${pathName == '/Pages/contact' ? "text-green" : ''}`}
                            href="/Pages/contact">Contact</Link></li>
                    </ul>
                    <div className="lg:flex gap-10 h-full  items-center hidden">
                        <div className='flex justify-center items-center gap-5'>
                            <div className="relative h-full" onClick={() => router.push('/Pages/wishlist')}>
                                <div className='bg-green rounded-full h-9 w-9  text-white flex justify-center items-center'>
                                    <IoMdHeart className="text-2xl cursor-pointer p-0.5" />
                                </div>
                                {WishList.length > 0 && (
                                    <div className="absolute top-[-5px] right-[-5px] bg-gray-500 rounded-full text-white h-4 w-4 text-[0.70em] flex justify-center items-center">
                                        {WishList.length}
                                    </div>
                                )}
                            </div>
                            <div className="relative h-full" onClick={() => router.push('/Pages/cart')}>

                                <div className='bg-green rounded-full h-9 w-9  text-white flex justify-center items-center'>
                                    <PiShoppingCartFill className="text-2xl cursor-pointer p-0.5" />
                                </div>


                                {CartList.length > 0 && (
                                    <div className="absolute top-[-5px] right-[-5px] bg-gray-500 rounded-full text-white h-4 w-4 text-[0.70em] flex justify-center items-center">
                                        {CartList.length}
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="flex px-2 ">
                            <SignedIn>
                                {/* <div onClick={() => <UserProfile />} className='h-9 w-9 rounded-full  border-3 border-transparent active:border-gray-300 cursor-pointer '>
                                    <img className='rounded-full object-cover' src={user?.imageUrl} alt="" />
                                </div> */}
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <div className='border-[2px] shadow-md relative group p-2 rounded-full border-green  cursor-pointer'>
                                    <FaUser className='text-green' />
                                    <div className='absolute  w-42 right-0 pt-5 group-hover:block hidden'>
                                        <div className='bg-white rounded-sm shadow-sm border border-gray-300 overflow-hidden py-1'>

                                            <SignInButton >
                                                <div className='flex items-center text-sm w-full hover:text-green  ps-5 text-gray-600'>
                                                    <PiSignIn className='text-base' />
                                                    <button className='cursor-pointer px-2 py-2 text-center'>Sign In </button>
                                                </div>
                                            </SignInButton>
                                            <SignUpButton >
                                                <div className='flex items-center text-sm w-full hover:text-green  ps-5 text-gray-600'>
                                                    <IoMdPersonAdd className='text-base' />
                                                    <button className='cursor-pointer px-2 py-2 text-center'>Sign Up </button>
                                                </div>
                                            </SignUpButton>

                                        </div>
                                    </div>
                                </div>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header