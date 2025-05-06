"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from "../../../components/AdminPage/ProductCard";
import { RiFilter3Line } from 'react-icons/ri';
import UploadNewProduct from "@/components/AdminPage/UploadNewProduct";
import EditProduct from "@/components/AdminPage/EditProduct";
import { addProductList } from '@/app/redux/slices/productListSlice';
import { ProductListType } from '@/app/types';
import { IoCloseCircle } from 'react-icons/io5';
import Dropdown from '@/components/Dropdown';
import Pagination from '@/components/Pagination';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';
import axios from 'axios';
import RemoveCard from "../../../components/AdminPage/RemoveCard";


function ProductsSection() {
    const [EditShow, setEditShow] = useState('')
    const [layerShow, setLayerShow] = useState(false)
    const [search, setSearch] = useState('')
    const [categorySelect, setCategorySelect] = useState('all')
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const [removeId, setRemoveId] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)
    const productLengthRef = useRef(0)

    const dispatch = useDispatch()


    const GetProductList = useCallback(async (Page?: number) => {

        setLoadingSkeleton(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&page=${Page || page}&search=${search}&category=${categorySelect != 'all' ? categorySelect : ''}`)
            if (response?.data?.success) {
                console.log(response.data);
                productLengthRef.current = Math.ceil(response.data.total / limit)
                dispatch(addProductList(response.data.products))
            }
        } catch (error) {
            console.log((error as Error).message)
        } finally {
            setLoadingSkeleton(false)
        }
    }, [search, limit, categorySelect, page])

    useEffect(() => {
        GetProductList(1)
    }, [])

    useDebounceEffect(() => {
        setPage(1)
        GetProductList(1)
    }, [search, categorySelect], 300)

    const productList: ProductListType[] = useSelector((state: any) => state.ProductList) || []

    return (
        <div className=' py-5 lg:px-7 px-5 min-h-dvh'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-5'>
                <div className='flex  lg:w-6/12 md:w-8/12 w-full items-center px-3 py-2 rounded-sm border-2 border-gray-400 focus-within:border-green focus-within:shadow-lg ' >
                    <input aria-label='Search Products' value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className='border-none outline-none w-full text-gray-500 ' placeholder='Search Product' />
                    {!search ? <IoIosSearch aria-label='Search-icon' className='text-2xl ml-2 text-gray-400' /> : <IoCloseCircle aria-label='Close-icon' onClick={() => setSearch('')} className='text-xl cursor-pointer hover:text-green ml-2 text-gray-400' />}

                </div>
                <div className='flex items-center md:justify-end justify-between w-full md:gap-5'>
                    <Dropdown icon={<RiFilter3Line className='text-lg text-gray-400' />} dropdownInputPadding='py-2 px-5' status={categorySelect} dropdownOuterWidth='w-44' dropdownPosition='top-12' onClick={setCategorySelect} renderItems={["all", "oranges", "juice", "vegetables", "fruits"]} />
                    <button onClick={() => setLayerShow((pre => !pre))} className='bg-green shadow-sm text-white px-3 py-2 rounded-sm cursor-pointer'>Add New Product</button>

                </div>
            </div>
            {!loadingSkeleton ? (
                <>
                    {productList.length > 0 ? (

                        <div className='py-5 pt-10 grid lg:grid-cols-3 grid-cols-2 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-20'>

                            {productList.map((product, index) => {
                                return <ProductCard key={index} product={product} setEditShow={setEditShow} setRemoveId={setRemoveId} />
                            })}

                        </div>) : (
                        <div className='h-82 flex justify-center items-end pb-20'>
                            {search ? <p className=' text-3xl font-medium text-gray-300'>{`"${search}"`} not found</p> :
                                <p className=' text-3xl font-medium text-gray-300'>No product found</p>}
                        </div>
                    )}
                </>
            ) : (
                // Loading Skeleton 
                <div className='py-5 pt-10 grid lg:grid-cols-3 grid-cols-2 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-20'>
                    {[...Array(limit)].map((_, index) => {
                        return <div className='bg-gray-200 animate-pulse h-72 rounded-sm' key={index}>
                        </div>
                    })}
                </div>
            )}
            {/* Pagenation Section */}
            <div className='mb-30'>
                <Pagination callback={GetProductList} setPage={setPage} page={page} length={productLengthRef.current} />
            </div>

            {layerShow && <UploadNewProduct GetProductList={GetProductList} setLayerShow={setLayerShow} />}
            {EditShow && <EditProduct GetProductList={GetProductList} setEditShow={setEditShow} EditShow={EditShow} productList={productList} />}
            {removeId && <RemoveCard setRemoveId={setRemoveId} removeId={removeId} GetProductList={GetProductList} />}
        </div>
    )
}

export default ProductsSection