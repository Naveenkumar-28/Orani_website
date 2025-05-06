"use client"
import React from 'react'
import MenuSection from '@/components/MenuSection'
import { useSelector } from 'react-redux'
import { WishListType } from '@/app/types'
import WishListCard from '@/components/WishListPage/WishListCard'


function page() {
    const WishList: WishListType[] = useSelector((state: any) => state.WishList) || []
    console.log({ WishList });

    return (
        <section className="mb-30">
            <MenuSection name={'WishList'} />
            <div className="container lg:px-20 mx-auto md:px-20 sm:px-5 2xl:px-52">
                <div
                    className="bg-[#7fad39] flex lg:h-20 sm:h-16 h-14 text-white lg:text-lg sm:text-base font-medium items-center justify-center">

                    <div className=" justify-end items-center flex ">Product List</div>
                </div>
            </div>
            {WishList.length > 0 ? (WishList.map((product, index) => {
                return (
                    <WishListCard key={index} product={product} />

                )
            })) : (
                <div className='h-40 flex justify-center items-center'>
                    <p className='text-gray-400 text-lg'>Your WishList is Empty</p>
                </div>
            )}
        </section>
    )
}

export default page