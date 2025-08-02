"use client"
import React from 'react'
import { MdEmail } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaTruckFast } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { Footer, Header } from "./components";
import { AppDispatch } from "../redux/store";
import { useUserData } from "@/hooks/useUserData";
import { getUserdetails } from "../redux/api";
import { getDbCartList, setTolocalStorageCartList } from './(public_pages)/cart/redux';
import { getDbWishList, setTolocalStorageWishList } from './(public_pages)/wishlist/redux';
import { useResetBodyOnPathChange } from '@/hooks/useResetBodyOnPathChange';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, isSignedIn, user } = useUserData()

    useResetBodyOnPathChange()

    useEffect(() => {
        const loadUser = async () => {
            if (!user) {
                await dispatch(getUserdetails()).unwrap();
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (isSignedIn) {
                dispatch(getDbCartList());
                dispatch(getDbWishList())
            } else {
                dispatch(setTolocalStorageCartList());
                dispatch(setTolocalStorageWishList());
            }
        }
    }, [isLoading, isSignedIn]);


    return (
        <>

            {/* Header */}
            <header className="relative lg:h-8 w-full z-[99] bg-green text-white  hidden lg:block ">
                <div className="lg:flex justify-between items-center h-full mediaQuary">
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
            <Header />
            {children}
            {/* Footer Section */}
            <Footer />
        </>
    );
}
