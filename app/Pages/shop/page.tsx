"use client"
import MenuSection from '@/components/MenuSection'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "@/components/HomePage/ProductCard"
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { addProductList } from '@/app/redux/slices/productListSlice';
import axios from 'axios';
import { ProductType } from '@/app/types';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/Pagination';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';

function FeaturedProductSection() {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const productRef = useRef(null)
    const [limit, setLimit] = useState(8)
    const [page, setPage] = useState(1)
    // const [productLength, setProductLength] = useState(0)
    const [categorySelect, setCategorySelect] = useState('all')
    const productLengthRef = useRef<number>(0)

    const dispatch = useDispatch()
    const router = useRouter()

    const SearcheParams = useSearchParams()
    const category = SearcheParams.get('category')

    const productList: ProductType[] = useSelector((state: any) => state.ProductList) || []

    useEffect(() => {
        if (category) {
            setCategorySelect(category.toString().toLowerCase())
        }
        else {
            setCategorySelect('all')
        }
    }, [category])


    const GetProductList = useCallback(async (Page: number) => {
        setLoadingSkeleton(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&page=${Page || page}&category=${categorySelect != 'all' ? categorySelect : ''}`)

            if (response?.data?.success) {
                console.log(response?.data);
                const { products, total } = response.data
                productLengthRef.current = Math.ceil(total / limit)
                dispatch(addProductList(products))
            }

        } catch (error) {
            console.log((error as Error).message);

        } finally {
            setLoadingSkeleton(false)
        }
    }, [limit, page, categorySelect])

    useDebounceEffect(() => {
        setPage(1)
        GetProductList(1)
    }, [categorySelect], 300)

    return (
        <>
            <MenuSection name={'Shop'} />
            <section className=" px-5 container lg:px-20 mx-auto md:px-20 2xl:px-52 relative select-none mb-52 ">
                <div className='overflow-x-auto mb-10'>
                    <div className="flex justify-center md:gap-5 gap-1  select-none min-w-fit mb-5">
                        {
                            ["all", "oranges", "juice", "vegetables", "fruits"].map((Name, index) => {
                                return (
                                    <p onClick={() => {
                                        router.push(`/Pages/shop?category=${Name}`);
                                    }}
                                        key={index}
                                        className={`${categorySelect == Name.toLowerCase() ? "bg-green  text-white" : "bg-transparent"} text-gray-500 lg:text-lg text-base cursor-pointer px-3 py-1  rounded-lg font-normal capitalize`} >
                                        {Name}
                                    </p>
                                )
                            })
                        }

                    </div>

                </div>
                {!loadingSkeleton ? (
                    <>
                        {productList?.length > 0 ? (
                            <div ref={productRef}
                                className=" grid gap-x-7 gap-y-14 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] mb-20  ">

                                {productList.map((product, index) => {
                                    return (

                                        <ProductCard delay={index * 100} product={product} key={index} />
                                    )

                                })}
                            </div>
                        ) : (
                            <div className='h-50 flex justify-center items-center w-full'>
                                <p className='text-center w-full font-normal text-xl text-gray-300'>No products found</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        className=" grid gap-x-7 gap-y-14 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] mb-20  ">

                        {
                            [...Array(limit)].map((_, index) => {
                                return (

                                    <div key={index} className='h-72 bg-gray-200 animate-pulse rounded-sm'></div>
                                )

                            })}
                    </div>
                )}

                <Pagination callback={GetProductList} length={productLengthRef.current} page={page} setPage={setPage} />
            </section>
        </>
    )
}

export default FeaturedProductSection