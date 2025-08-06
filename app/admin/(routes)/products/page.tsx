"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoIosSearch, IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from "@/app/admin/components";
import { RiFilter3Line } from 'react-icons/ri';
import { UploadNewProduct, RemoveCard, EditProduct, ProductCardSkeleton } from "./components";
import { IoCloseCircle } from 'react-icons/io5';
import { Dropdown, FullScreenLoader, LoadingIndicator } from '@/components/';
import { Pagination } from '@/app/pages/components';
import { useDebounceEffect } from '@/hooks';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAdminProducts } from './redux';
import { ProductCardType } from './types';


function ProductsSection() {
    const [isEditModelOpen, setEditModelOpen] = useState<ProductCardType | null>(null)
    const [isRemoveModelOpen, setRemoveModelOpen] = useState<ProductCardType | null>(null)
    const [isAddNewProductModelOpen, setAddNewProductModelOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [categorySelect, setCategorySelect] = useState('all')
    const [limit, setLimit] = useState(9)
    const firstRunRef = useRef(true);

    const { totalPage, isLoading, products, page, isSkeletonLoding, isFiltering } = useSelector((state: RootState) => state.AdminProducts)

    const dispatch = useDispatch<AppDispatch>()

    const fetchProducts = useCallback((Page?: number, isFiltering = false) => {
        dispatch(getAdminProducts({ page: Page || 1, limit, category: categorySelect, search, isFiltering }))
    }, [categorySelect, search, limit])

    useEffect(() => {
        if (products?.length > 0) return
        fetchProducts()
    }, [])

    useDebounceEffect(() => {
        if (firstRunRef.current) {
            return firstRunRef.current = false
        }
        fetchProducts(1, true)
    }, [search, categorySelect], 500)

    const resetHandler = useCallback(() => {
        setSearch('')
        setCategorySelect('all')
    }, [])


    return (
        <div className='py-2 sm:py-5 lg:px-7 px-5 min-h-dvh'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                <div className='flex  md:max-w-64 w-full items-center px-4 py-2 rounded-sm ring-2 ring-gray-300 focus-within:ring-green ' >
                    <input aria-label='Search Products' value={search || ''} onChange={(e) => setSearch(e.target.value.trim().toLowerCase())} type="text" className='border-none outline-none w-full text-gray-500 placeholder:text-sm ' placeholder='Search Product' />
                    {!search ? <IoIosSearch aria-label='Search-icon' className='text-2xl ml-2 text-gray-400' /> : <IoCloseCircle aria-label='Close-icon' onClick={() => setSearch('')} className='text-xl cursor-pointer hover:text-green ml-2 text-gray-400' />}

                </div>
                <div className='flex items-center md:justify-end justify-between w-full md:gap-5 gap-4 flex-col sm:flex-row'>
                    <Dropdown dropdownHeight=' h-10' icon={<RiFilter3Line className='text-lg text-gray-400' />} dropdownInputPadding='py-2' status={categorySelect} dropdownOuterWidth='w-full md:w-44 sm:w-6/12' dropdownPosition='top-12' onClick={setCategorySelect} renderItems={["all", "oranges", "juice", "vegetables", "fruits"]} />
                    <button onClick={() => setAddNewProductModelOpen(true)} className='bg-green shadow-lg text-white px-3 py-2 rounded-md cursor-pointer ring-2 ring-gray-300 active:ring-green hover:opacity-95 w-full sm:w-6/12 md:w-max flex items-center gap-2'>
                        <IoMdAdd className='text-lg' />
                        New Product
                    </button>
                </div>
            </div>
            {!isSkeletonLoding ? (
                <>
                    {!isFiltering ? (
                        <>
                            {products?.length > 0 ? (
                                <div className='py-5 pt-10 grid lg:grid-cols-3 grid-cols-1 min-[400px]:grid-cols-2 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-20 '>

                                    {products.map((product, index) => {
                                        return <ProductCard key={index} product={product} setEditModelOpen={setEditModelOpen} setRemoveModelOpen={setRemoveModelOpen} />
                                    })}

                                </div>
                            ) : (
                                <div className='sm:h-82 h-40 flex justify-center items-end sm:pb-20'>
                                    {search ? <p className='text-base sm:text-lg md:text-2xl lg:text-2xl xl:text-3xl font-normal text-gray-300'>{`"${search}"`} not found</p> :
                                        <p className=' text-base sm:text-lg md:text-2xl lg:text-2xl xl:text-3xl font-normal text-gray-300'>No product found</p>}
                                </div>
                            )}
                        </>

                    ) : (
                        <div className='sm:h-82 h-40 flex justify-center items-end sm:pb-20'>
                            <LoadingIndicator borderWidth='border-b-3 border-r-3' size='size-10' />
                        </div>
                    )}
                </>
            ) : (
                // Loading Skeleton 
                <div className='py-5 pt-10 grid lg:grid-cols-3 grid-cols-2 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-20'>
                    {Array.from({ length: limit }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {/* Pagination Section */}
            {!isFiltering && products.length > 0 && (
                <div className='mb-30'>
                    <Pagination callback={fetchProducts} page={page} length={totalPage} />
                </div>
            )}

            {isAddNewProductModelOpen && <UploadNewProduct fetchProducts={fetchProducts} onDismiss={setAddNewProductModelOpen} />}
            {isEditModelOpen && <EditProduct onDismiss={setEditModelOpen} product={isEditModelOpen} />}
            {isRemoveModelOpen && <RemoveCard onDismiss={setRemoveModelOpen} fetchProducts={fetchProducts} product={isRemoveModelOpen} />}
            <FullScreenLoader loadingState={isLoading} />
        </div>
    )
}

export default ProductsSection