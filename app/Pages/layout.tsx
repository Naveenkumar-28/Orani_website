"use client"
import { MdEmail } from "react-icons/md";
import Footer from "@/components/Footer";
import SmallDeviceMenuSlider from "@/components/SmallDeviceMenuSlider";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut
} from '@clerk/nextjs'

import React from 'react'
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { addCartList } from "@/app/redux/slices/CartSlice";
import { CartType, WishListType } from "../types";
import { FaTruckFast } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { addWishList } from "../redux/slices/wishListSlice";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname()
    const [SliderShow, setSliderShow] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        const raw = localStorage.getItem("CartList")
        const parseCartList: CartType[] = raw ? JSON.parse(raw) : []
        if (parseCartList) {

            parseCartList.map((product) => dispatch(addCartList(product)))
        }

    }, [])

    useEffect(() => {
        const wishList = localStorage.getItem("WishList")
        const parseWishList: WishListType[] = wishList ? JSON.parse(wishList) : []
        if (parseWishList) {

            parseWishList.map((product) => dispatch(addWishList(product)))
        }
    }, [])

    return (
        <>

            {/* Mobile Slider  */}
            {SliderShow && <SmallDeviceMenuSlider pathName={pathName} setSliderShow={setSliderShow} />}

            {/* Header */}
            <header className="lg:h-8 w-full bg-[#7fad39] text-white  hidden lg:block ">
                <div className="lg:flex justify-between items-center h-full lg:container   mx-auto  lg:px-20 container md:px-20 px-10 2xl:px-52">
                    <div className="font-semiblod uppercase text-[12px] flex items-center gap-1">
                        <MdEmail className="size-4" />

                        <h1 className="text-[12px]">hello@gmail.com</h1>
                    </div>
                    <div className="font-semiblod uppercase text-[12px] flex items-center gap-1">
                        <FaTruckFast className="text-sm" />

                        <h1>Free Shipping for all Order of ₹99</h1>
                    </div>

                    <div className="font-semiblod uppercase text-[12px] flex items-center gap-1">
                        <IoIosCall className="text-base" />
                        <h1 className="text-[12px]">+918489260109</h1>

                    </div>
                </div>


            </header>
            <Header pathName={pathName} setSliderShow={setSliderShow} />
            {children}
            {/* Footer Section */}
            <Footer />
        </>
    );
}
