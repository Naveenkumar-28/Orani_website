"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from "../../../components/AdminPage/ProductCard";
import { RiFilter3Line } from 'react-icons/ri';
import UploadNewProduct from "@/components/AdminPage/UploadNewProduct";
import EditProduct from "@/components/AdminPage/EditProduct";
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import axios from 'axios';
import { addProductList } from '@/app/redux/slices/productListSlice';
import { ProductListType } from '@/app/types';
import { IoCloseCircle } from 'react-icons/io5';
import { RootState } from '@reduxjs/toolkit/query';


function ProductsSection() {
    const [EditShow, setEditShow] = useState('')
    const [layerShow, setLayerShow] = useState(false)
    const [categoryShow, setCategoryShow] = useState(false)
    const [search, setSearch] = useState('')
    const [categorySelect, setCategorySelect] = useState('all')
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)
    const [productLength, setProductLength] = useState(0)

    const dispatch = useDispatch()

    const GetProductList = useCallback(async () => {
        setLoadingSkeleton(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&page=${page}&search=${search && search}&category=${categorySelect != 'all' ? categorySelect : ''}`)
            if (response?.data?.success) {
                dispatch(addProductList(response.data.products))
                setProductLength(response.data.total)
            }
        } catch (error) {
            console.log((error as Error).message)
        } finally {
            setLoadingSkeleton(false)
        }
    }, [search, categorySelect, page, limit, productLength])

    useEffect(() => {
        GetProductList()
    }, [page])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setPage(1)
            GetProductList()
        }, 300)
        return () => clearTimeout(timeOut)
    }, [search, categorySelect])

    const productList: ProductListType[] = useSelector((state: any) => state.ProductList) || []

    const onNext = useCallback(() => {
        setPage(Math.min(Math.ceil(productLength / limit), page + 1))
    }, [page, productLength, limit])

    const onForward = useCallback(() => {
        setPage(Math.max(1, page - 1))
    }, [page, productLength, limit])

    const numberCilck = useCallback((num: number) => {
        if (page == num) return
        setPage(num)

    }, [page])

    const bodyOverflowHandler = useCallback((isActive: boolean) => {
        if (isActive) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

    }, [])

    return (
        <div className=' py-5 px-2 '>
            <div className='flex flex-col md:flex-row justify-between items-center gap-5'>
                <div className='flex  lg:w-6/12 md:w-8/12 w-full items-center px-3 py-2 rounded-sm border-2 border-gray-400 focus-within:border-green'>
                    <input value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className='border-none outline-none w-full' placeholder='Search Product' />
                    {!search ? <IoIosSearch className='text-xl ml-2 text-gray-400' /> : <IoCloseCircle onClick={() => setSearch('')} className='text-xl cursor-pointer hover:text-green ml-2 text-gray-400' />}

                </div>
                <div className='flex items-center md:justify-end justify-between w-full md:gap-5'>
                    <div className=' relative gap-2 cursor-pointer focus-within:border-green flex justify-center px-3 py-2 rounded-sm items-center border-2 border-gray-400'>
                        <input
                            readOnly
                            value={categorySelect || ''}
                            onChange={(e) => setCategorySelect(e.target.value)}
                            onFocus={() => setCategoryShow(true)}
                            onBlur={() => setTimeout(() => setCategoryShow(false), 300)}
                            type="text"
                            className='cursor-pointer capitalize border-none w-32 text-gray-500 outline-none' />
                        <RiFilter3Line className='text-lg text-gray-500' />
                        {categoryShow && (
                            <ul className='w-full rounded-md overflow-hidden top-12 shadow-sm  left-0 outline-none absolute z-50 bg-white'>
                                {
                                    ["all", "oranges", "juice", "vegetables", "fruits"].map((Name, index) => {
                                        return (
                                            <li onClick={() => setCategorySelect(Name)} className={`capitalize px-2 py-1 cursor-pointer hover:bg-green hover:text-white ${categorySelect == Name && "bg-green text-white"}`} key={index} value={Name} >
                                                {Name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )}
                    </div>
                    <button onClick={() => setLayerShow((pre => !pre))} className='bg-green text-white px-3 py-2 rounded-sm cursor-pointer'>Add New Product</button>

                </div>
            </div>
            {!loadingSkeleton ? (
                <>
                    {productList.length > 0 ? (

                        <div className='py-5 pt-10 grid lg:grid-cols-3 grid-cols-2 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-20'>

                            {productList.map((product, index) => {
                                return <ProductCard key={index} product={product} setEditShow={setEditShow} GetProductList={GetProductList} />
                            })}

                        </div>) : (
                        <div className='h-82 flex justify-center items-end pb-20'>
                            {search ? <p className=' text-3xl font-semibold text-gray-300'>{`"${search && search}"`} not found</p> :
                                <p className=' text-3xl font-semibold text-gray-300'>no products found</p>}
                        </div>
                    )}
                </>
            ) : (
                // Loading Skeleton 
                <div className='py-5 pt-10 grid lg:grid-cols-3 grid-cols-2 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-20'>
                    {[...Array(limit)].map((_, index) => {
                        return <div className='bg-gray-300 animate-pulse h-72 rounded-sm' key={index}>
                        </div>
                    })}
                </div>
            )}
            {/* Pagenation Section */}
            {productLength > limit && (
                <div className='flex justify-center items-center gap-5 mb-30'>
                    <button onClick={onForward} className='text-3xl border-2 border-green text-green shadow-lg  cursor-pointer rounded-full p-2 active:text-white active:bg-green duration-100'><GoChevronLeft /></button>
                    <ul className='flex gap-5'>
                        {[...Array(Math.ceil(productLength / limit))].map((_, index) => {
                            return <li key={index} onClick={() => numberCilck(index + 1)} className={`size-12 cursor-pointer flex justify-center items-center border  text-lg   rounded-full shadow-sm    ${page == (index + 1) ? "bg-green text-white border-transparent" : "text-gray-400 border-gray-300"}`}>{index + 1}</li>
                        })}
                    </ul>
                    <button onClick={onNext} className='text-3xl border-2 border-green text-green shadow-lg  cursor-pointer rounded-full p-2 active:text-white active:bg-green duration-100'><GoChevronRight /></button>
                </div>
            )}

            {layerShow && <UploadNewProduct GetProductList={GetProductList} setLayerShow={setLayerShow} bodyOverflowHandler={bodyOverflowHandler} />}
            {EditShow && <EditProduct GetProductList={GetProductList} setEditShow={setEditShow} EditShow={EditShow} productList={productList} bodyOverflowHandler={bodyOverflowHandler} />}
        </div>
    )
}

export default ProductsSection