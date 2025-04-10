import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoMdHeartEmpty, IoMdPersonAdd } from 'react-icons/io'
import { IoHeartSharp } from 'react-icons/io5'
import { PiShoppingCart, PiShoppingCartSimple, PiShoppingCartSimpleLight, PiSignIn } from 'react-icons/pi'
import { RiAdminLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

function Header({ setSliderShow, pathName }) {
    const router = useRouter()
    const CartList = useSelector((state) => state.CartList)
    const WishList = useSelector((state) => state.WishList)

    return (
        <header className=" select-none sticky top-0 z-[99] shadow-lg  bg-white">
            {/* Menu Section  */}
            <div
                className="lg:h-[4.5rem] flex lg:flex-row flex-row items-center lg:py-0 py-5 gap-5 h-16  bg-white container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52">
                <div className="lg:w-3/12 w-full h-full flex items-center justify-between">
                    <div className=" overflow-hidden flex uppercase text-3xl font-extrabold">
                        <img className="h-full w-full object-contain" src="/logo.png" alt="" />

                    </div>
                    <div className="lg:hidden cursor-pointer" id="menu_icon" onClick={() => setSliderShow((pre) => !pre)}>

                        <HiOutlineMenuAlt1 className="font-extrabold text-4xl" />

                    </div>
                </div>
                <div className="lg:flex justify-between lg:w-9/12 w-full items-center hidden">

                    <ul className="gap-8 lg:gap-10 flex ">
                        <li><Link className={`menu_btn font-medium  hover:text-[#7fad39]  text-base uppercase  ${pathName == '/Pages' ? "text-[#7fad39]" : ''}`} href="/Pages">Home</Link>
                        </li>

                        <li><Link href="/Pages/shop" className={`menu_btn font-medium  hover:text-[#7fad39]  text-base uppercase ${pathName == '/Pages/shop' ? "text-[#7fad39]" : ''}`}>Shop</Link>

                        </li>
                        <li className="relative group">
                            <Link className="menu_btn font-medium  hover:text-[#7fad39]  text-base uppercase" href="#">Pages</Link>
                            <div className="absolute hidden  group-hover:block left-[-50%] top-[100%] pt-7">
                                <ul
                                    className=" flex  w-36 bg-white px-5 shadow-2xl py-3 font-light text-sm flex-col flex-nowrap gap-2 rounded-sm">
                                    <li><Link className="hover:text-[#7fad39]" href="/Pages/wishList">Wishlist</Link></li>
                                    <li><Link className="hover:text-[#7fad39]" href="/Pages/orders">Orders</Link></li>
                                    <li><Link className="hover:text-[#7fad39]" href="/Pages/cart">Cart</Link></li>
                                    <li><Link className="hover:text-[#7fad39]" href="/Pages/checkout">Checkout</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li><Link className={`menu_btn font-medium  hover:text-[#7fad39]  text-base uppercase ${pathName == '/Pages/blog' ? "text-[#7fad39]" : ''}`}
                            href="/Pages/blog">Blog</Link></li>
                        <li><Link className={`menu_btn font-medium  hover:text-[#7fad39]  text-base uppercase ${pathName == '/Pages/contact' ? "text-[#7fad39]" : ''}`}
                            href="/Pages/contact">Contact</Link></li>
                    </ul>
                    <div className="lg:flex gap-10 h-full  items-center hidden">
                        <div className='flex justify-center items-center gap-3'>
                            <div className="relative h-full" onClick={() => router.push('/Pages/wishlist')}>
                                {/* <IoHeartSharp  /> */}
                                <IoMdHeartEmpty className="text-2xl cursor-pointer" />
                                {WishList.length > 0 && (
                                    <div className="absolute top-[-5px] right-[-10px] bg-[#7fad39] rounded-full text-white h-3.5 w-3.5 text-[10px] text-center">
                                        {WishList.length}
                                    </div>
                                )}
                            </div>
                            <div className="relative h-full" onClick={() => router.push('/Pages/cart')}>
                                <PiShoppingCartSimple className="text-2xl ms-2 cursor-pointer" />

                                {CartList.length > 0 && (
                                    <div className="absolute top-[-5px] right-[-10px] bg-[#7fad39] rounded-full text-white h-3.5 w-3.5 text-[10px] text-center">
                                        {CartList.length}
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="flex px-2 ">
                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "w-20 h-20", // Tailwind for avatar size
                                            userButtonPopoverCard: "text-red-500 shadow-xl", // Dropdown card style
                                            userButtonPopoverActionButton: "hover:bg-gray-100 text-black", // Action buttons
                                        },
                                    }}
                                />
                            </SignedIn>
                            <SignedOut>
                                <div className='border-[1px] shadow-md relative group p-2 rounded-full border-green  cursor-pointer'>
                                    <FaUser className='text-green' />
                                    <div className='absolute  w-42 right-0 pt-5 group-hover:block hidden '>
                                        <div className='bg-white rounded-sm shadow-sm border border-gray-300 overflow-hidden'>

                                            <SignInButton >
                                                <div className='flex items-center w-full hover:bg-green hover:text-white ps-5 text-gray-600'>
                                                    <PiSignIn className='text-xl' />
                                                    <button className='cursor-pointer px-2 py-2 text-center'>Sign In </button>
                                                </div>
                                            </SignInButton>
                                            <SignUpButton >
                                                <div className='flex items-center w-full hover:bg-green hover:text-white ps-5 text-gray-600'>
                                                    <IoMdPersonAdd className='text-xl' />
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