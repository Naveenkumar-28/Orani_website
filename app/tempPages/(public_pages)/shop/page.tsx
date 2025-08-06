"use client"
import { MenuSection } from '@/components'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard, Pagination, ProductCardSkeleton } from "@/app/tempPages/components"
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProductList } from './redux';
import { AppDispatch, RootState } from '@/app/redux/store';

function FeaturedProductSection() {
    const [limit, setLimit] = useState(8)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const firstRender = useRef(true)
    const [categorySelect, setCategorySelect] = useState('')
    const categoryList = useMemo(() => ["all", "oranges", "juice", "vegetables", "fruits"], [])

    const SearcheParams = typeof window !== 'undefined' ? useSearchParams() : null
    const category = SearcheParams?.get('category')

    const { isLoading, page, products, totalPage } = useSelector((state: RootState) => state.ProductList) || []

    // Fetch product list based on selected category and pagination
    const GetProductList = useCallback((Page?: number, category?: string) => {
        dispatch(fetchProductList({ page: Page || 1, limit, categorySelect: category || 'all' }))
    }, [limit, page])

    // Set the initial category based on the search params
    useEffect(() => {
        const currentCategory = category?.toLowerCase() || 'all';
        setCategorySelect(currentCategory);
    }, [category]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        GetProductList(1, categorySelect);
    }, [categorySelect]);

    return (
        <>
            <MenuSection name={'our Shop'} />
            <section className="mediaQuary relative select-none lg:mb-52 mb-30 xl:mt-20 lg:mt-15 mt-10 ">
                <div className='overflow-x-auto mb-5 lg:mb-10'>
                    <div className="flex justify-center md:gap-5 gap-3 select-none min-w-fit mb-5">
                        {
                            categoryList.map((Name, index) => {
                                return (
                                    <p onClick={() => {
                                        router.push(`/pages/shop?category=${Name}`);
                                    }}
                                        key={index}
                                        className={`${categorySelect == Name.toLowerCase() ? "bg-green font-normal text-white" : "bg-transparent font-normal"} text-gray-500 active:scale-95 duration-200 xl:text-lg lg:text-base text-sm cursor-pointer md:px-5 px-3 py-1.5 rounded-md capitalize`} >
                                        {Name}
                                    </p>
                                )
                            })
                        }

                    </div>

                </div>
                {!isLoading ? (
                    <>
                        {products.length > 0 ? (
                            <div
                                // className=" grid lg:gap-7 sm:gap-3 gap-5 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 w-[425px]:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[300px] sm:auto-rows-[260px] auto-rows-[230px] mb-20  ">
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

                                {products.map((product, index) => {
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

                        {
                            [...Array(limit)].map((_, index) => {
                                return (
                                    <ProductCardSkeleton key={index} />
                                )

                            })}
                    </div>
                )}

                <Pagination callback={GetProductList} length={totalPage} page={page} />
            </section>
        </>
    )
}

export default FeaturedProductSection