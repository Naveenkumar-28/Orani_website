"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "./ProductCard"
import { addProductList } from '@/app/redux/slices/productListSlice';
import axios from 'axios';

function FeaturedProductSection() {
    const [limit, setLimit] = useState(8)
    const [page, setPage] = useState(1)
    const [loadingSkeleton, setLoadingSkeleton] = useState(false)
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.ProductList) || []

    const GetProductList = useCallback(async () => {

        setLoadingSkeleton(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&page=${page}`)
            if (response?.data?.success) {
                console.log(response.data);
                const { products } = response.data
                dispatch(addProductList(products))
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoadingSkeleton(false)
        }
    }, [page, limit])

    useEffect(() => {
        GetProductList()
    }, [])

    return (
        <section className="pt-20 px-5 container lg:px-20 mx-auto md:px-20 2xl:px-52 relative select-none mb-32 ">
            <div className="flex  gap-5 justify-center flex-col w-full items-center mb-15 mt-10">
                <h3 className="text-center text-green font-medium font-serif text-lg ">Featured Product</h3>
                <h1 className="text-center font-extrabold lg:text-4xl text-3xl">Our Products</h1>
                <p className='text-gray-500'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
            </div>
            <div id="Featured_product_Container"
                className=" grid gap-x-7 gap-y-14 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] mb-20  ">
                {!loadingSkeleton ? (
                    <>
                        {productList.map((product, index) => {
                            return (
                                <ProductCard delay={index * 100} product={product} key={index} />
                            )

                        })}
                    </>
                ) : (
                    <>
                        {[...Array(limit)].map((_, index) => {
                            return <div key={index} className="bg-gray-300 animate-pulse h-full rounded-sm" ></div>
                        })}
                    </>
                )}
            </div>
        </section >
    )
}

export default FeaturedProductSection