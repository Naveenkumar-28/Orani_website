"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from "./ProductCard"
import { AppDispatch, RootState } from '@/app/redux/store';
import { fetchProductList } from '@/app/tempPages/(public_pages)/shop/redux';
import { ProductCardSkeleton } from './ProductCardSkeleton';

export function FeaturedProductSection() {
    const [limit, setLimit] = useState(8)
    const dispatch = useDispatch<AppDispatch>()

    const { products, isLoading, page } = useSelector((state: RootState) => state.ProductList) || []



    useEffect(() => {
        dispatch(fetchProductList({ page: 1, limit }))
    }, [])

    return (
        <section className="xl:pt-10 pt-10 mediaQuary relative select-none lg:mb-32 ">
            <div className="flex lg:gap-5 gap-3 justify-center flex-col w-full items-center md:mb-15 mb-10 mt-10">
                <h3 className="text-center text-green font-medium lg:text-lg text-sm">Featured Product</h3>
                <h1 className="text-center font-extrabold lg:text-4xl md:text-3xl text-3xl text-gray-700">Our <span className='text-green'>Products</span></h1>
                <p className='text-gray-400 text-sm font-light'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
            </div>
            <div
                className="grid
             min-[480px]:grid-cols-2
             sm:grid-cols-2
             lg:grid-cols-3 
             xl:grid-cols-4
             grid-cols-1 
             gap-5 
             sm:gap-8
             xl:gap-5
             auto-rows-[260px] 
              min-[480px]:auto-rows-[260px] 
              sm:auto-rows-[300px] 
             lg:auto-rows-[300px] 
             mb-20">
                {!isLoading ? (
                    <>
                        {products.map((product, index) => {
                            return (
                                <ProductCard delay={index * 100} product={product} key={index} />
                            )

                        })}
                    </>
                ) : (
                    <>
                        {[...Array(limit)].map((_, index) => {
                            return <ProductCardSkeleton key={index} />
                        })}
                    </>
                )}
            </div>
        </section >
    )
}