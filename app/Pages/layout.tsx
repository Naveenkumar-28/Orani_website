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
import { CartType } from "../types";

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
        const stored: CartType[] = raw ? JSON.parse(raw) : []
        if (stored) {

            stored.map((product) => dispatch(addCartList(product)))
        }
    }, [])

    return (
        <>

            {/* Mobile Slider  */}
            {SliderShow && <SmallDeviceMenuSlider pathName={pathName} setSliderShow={setSliderShow} />}

            {/* Header */}
            <header className="lg:h-10 w-full bg-[#7fad39] text-white  hidden lg:block ">
                <div className="lg:flex justify-between items-center h-full lg:container   mx-auto  lg:px-20 container md:px-20 px-10 2xl:px-52">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center pe-5 text-sm">
                            <MdEmail className="size-4" />

                            <div className=" ms-1 text-[12px]">hello@colorlib.com</div>
                        </div>
                        <div className="h-6 bg-gray-300 w-[2px] rounded-full"></div>
                        <div className="ps-5 font-normal text-[12px]">Free Shipping for all Order of ₹99</div>
                    </div>
                    <div className="flex items-center group">
                        <div className="flex py-3   items-center px-5 gap-2 cursor-pointer relative ">
                            <div className="h-4 w-7 overflow-hidden flex justify-center items-center">
                                <img className="object-cover "
                                    id="flag" src="/americaFlag.png" alt="flag_image" />
                            </div>
                            <div id="language" className="font-normal ms-1 text-[14px]">English</div>

                        </div>
                        <div className="h-6 bg-gray-300 w-[2px] rounded-full"></div>
                        <div className="flex items-center px-5 cursor-pointer">
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <div className="text-sm cursor-pointer">
                                    <SignOutButton />
                                </div>
                            </SignedIn>
                        </div>
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
