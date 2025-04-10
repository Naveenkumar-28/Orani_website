"use client"
import MenuSection from '@/components/MenuSection'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "@/components/HomePage/ProductCard"
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { addProductList } from '@/app/redux/slices/productListSlice';
import axios from 'axios';
import { ProductListType, ProductType } from '@/app/types';

function FeaturedProductSection() {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const numOfProductShow = 8
    const [filterIndex, setFilterIndex] = useState({ start: 0, end: numOfProductShow })
    const [filterProductList, setFilterProductList] = useState<ProductType[]>([])
    const [categoryName, setCategoryName] = useState('all')
    const categoryClassList = " text-gray-500 lg:text-lg sm:text-base text-sm cursor-pointer px-3 py-1  rounded-lg font-light"
    const productRef = useRef(null)


    const dispatch = useDispatch()


    const GetProductList = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ProductList`)
            if (response.data.success) {
                dispatch(addProductList(response.data.products))
            }

        } catch (error) {
            console.log((error as Error).message);

        } finally {
            setLoadingSkeleton(false)
        }
    }, [])

    useEffect(() => {
        GetProductList()
    }, [])

    const productList: ProductType[] = useSelector((state: any) => state.ProductList) || []

    const selectedList = useCallback((category: string) => {

        setCategoryName(category.toLowerCase())
        setFilterIndex((pre) => {
            return {
                start: 0,
                end: numOfProductShow
            }
        })
        if (category.toLowerCase() == 'all') {
            setFilterProductList(productList)
        } else {
            setFilterProductList(productList.filter((product) => product.category.toLowerCase() == category.toLowerCase()))
        }
        // if (productRef?.current) {
        //     productRef.current.innerHTML = ''; // Corrected innerHTML
        //     console.log("Product content cleared");

        // }

        // productRef?.current = ''
    }, [productList, filterProductList])

    useEffect(() => {
        if (productList.length > 0) {
            selectedList('all');
        }
    }, [productList]) //Runs only when productList changes

    const onNext = useCallback(() => {
        if (filterIndex.end < filterProductList.length)
            setFilterIndex((pre) => {
                return {
                    start: pre.start + numOfProductShow,
                    end: pre.end + numOfProductShow
                }
            })
    }, [filterProductList, filterIndex])

    const onForward = useCallback(() => {
        if (filterIndex.start != 0) {

            setFilterIndex((pre) => {
                return {
                    start: pre.start - numOfProductShow,
                    end: pre.end - numOfProductShow
                }
            })
        }
    }, [filterProductList, filterIndex])

    const numberCilck = useCallback((num: number) => {
        setFilterIndex((pre) => {
            return {
                start: (numOfProductShow * num) - numOfProductShow,
                end: (numOfProductShow * num)
            }
        })
    }, [filterProductList, filterIndex])

    return (
        <>
            {!loadingSkeleton ? (
                <>
                    <MenuSection name={'Shop'} />
                    <section className=" px-5 container lg:px-20 mx-auto md:px-20 2xl:px-52 relative select-none mb-52 ">

                        <div id="featured_product_list" className="flex justify-center gap-5 mb-15">
                            {
                                ["All", "Oranges", "Juice", "Vegetables", "Fruits"].map((Name, index) => {
                                    return (
                                        <p onClick={() => selectedList(Name)} key={index}
                                            className={categoryName == Name.toLowerCase() ? `${categoryClassList} bg-green text-white` : `${categoryClassList} bg-transparent `} >
                                            {Name}
                                        </p>
                                    )
                                })
                            }

                        </div>
                        <div ref={productRef}
                            className=" grid gap-x-7 gap-y-14 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] mb-20  ">

                            {
                                filterProductList.slice(filterIndex.start, filterIndex.end).map((product, index) => {
                                    return (

                                        <ProductCard delay={index * 100} product={product} key={index} />
                                    )

                                })}
                        </div>
                        {filterProductList.length > numOfProductShow && (
                            <div className='flex justify-center items-center gap-5 mb-30'>
                                <button onClick={onForward} className='text-3xl border-2 border-green text-green shadow-lg  cursor-pointer rounded-full p-2 active:text-white active:bg-green duration-100'><GoChevronLeft /></button>
                                <ul className='flex gap-5'>
                                    {[...Array(Math.ceil(filterProductList.length / numOfProductShow))].map((_, index) => {
                                        return <li key={index} onClick={() => numberCilck(index + 1)} className={`size-12 cursor-pointer flex justify-center items-center border  text-lg   rounded-full shadow-sm    ${filterIndex.start == (index * numOfProductShow) ? "bg-green text-white border-transparent" : "text-gray-400 border-gray-300"}`}>{index + 1}</li>
                                    })}
                                </ul>
                                <button onClick={onNext} className='text-3xl border-2 border-green text-green shadow-lg  cursor-pointer rounded-full p-2 active:text-white active:bg-green duration-100'><GoChevronRight /></button>
                            </div>
                        )}
                    </section>
                </>
            ) : (

                <>
                    <div className="h-[200px] relative mb-20 bg-gray-300 animate-pulse">

                    </div>
                    <section className=" px-5 container lg:px-20 mx-auto md:px-20 2xl:px-52 relative select-none mb-52 ">

                        <div id="featured_product_list" className="flex justify-center gap-5 mb-15">
                            {
                                [...Array(5)].map((_, index) => {
                                    return (
                                        <div key={index} className='w-20 h-10 bg-gray-300 animate-pulse rounded-sm'></div>
                                    )
                                })
                            }

                        </div>
                        <div
                            className=" grid gap-x-7 gap-y-14 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] mb-20  ">

                            {
                                [...Array(8)].map((_, index) => {
                                    return (

                                        <div key={index} className='h-72 bg-gray-300 animate-pulse rounded-sm'></div>
                                    )

                                })}
                        </div>
                        <div className='flex items-center justify-center'>

                            <div className='bg-gray-300 animate-pulse h-20 w-70 rounded-sm'></div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default FeaturedProductSection