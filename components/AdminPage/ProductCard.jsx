import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import { addProductList } from '@/app/redux/slices/productListSlice'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'

function ProductCard({ product, setEditShow, GetProductList }) {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const dispatch = useDispatch()
    const deleteHandler = useCallback(async (id) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/product/${id}`)
            if (response?.data?.success) {
                GetProductList()
                dispatch(AddNotifyMessage('Product Removed'))
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [])

    return (
        <>
            <div className='bg-white rounded-sm group shadow-sm relative overflow-hidden hover:shadow-md pb-5'>
                {product?.discountPrice && (

                    <div className='bg-green font-light text-sm text-white absolute top-0 left-0 px-2 py-1 rounded-br-sm z-10'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>
                )}
                <div className='h-52 w-full overflow-hidden'>
                    <img src={product?.ImageUrl} className='h-full duration-500 group-hover:scale-105 w-full object-contain' alt="ProductImage" />
                </div>
                <div className='w-full flex justify-center gap-5 py-5 absolute -bottom-full group-hover:bottom-5 bg-white duration-500'>
                    <button title='Edit' onClick={() => setEditShow(product._id)} className='bg-white p-2 border border-gray-300 rounded-full text-xl hover:bg-green hover:text-white hover:rotate-[360deg] cursor-pointer duration-500'><MdEdit /></button>
                    <button title='Delete' onClick={() => setConfirmDelete(true)} className='bg-white p-2 border border-gray-300 rounded-full text-xl hover:bg-green hover:text-white hover:rotate-[360deg] cursor-pointer duration-500'><IoMdTrash /></button>
                </div>
                <div className='p-2 flex flex-col justify-center items-center gap-2'>
                    <h1 className='uppercase text-gray-600'>{product.name}</h1>
                    {product?.discountPrice ? (
                        <div className='flex gap-3'>
                            <span className='line-through text-gray-500'>₹{product?.price}</span>
                            <span className='text-green '>₹{product?.discountPrice}</span>
                        </div>
                    ) : (
                        <p className='text-green'>₹{product.price}</p>
                    )}
                </div>
            </div>
            {confirmDelete && (

                <div className='fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center'>
                    <div className=' bg-white px-10 py-10 absolute z-10 rounded-sm flex flex-col items-center'>
                        <div className='bg-white mb-5 rounded-sm group shadow-sm relative overflow-hidden hover:shadow-md pb-5 w-52'>
                            {product?.discountPrice && (

                                <div className='bg-green font-light text-sm text-white absolute top-0 left-0 px-2 py-1 rounded-br-sm z-10'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>
                            )}
                            <div className='h-52 w-full overflow-hidden'>
                                <img src={product?.ImageUrl} className='h-full duration-500 group-hover:scale-105 w-full object-contain' alt="ProductImage" />
                            </div>

                            <div className='p-2 flex flex-col justify-center items-center gap-2'>
                                <h1 className='uppercase text-gray-600'>{product.name}</h1>
                                {product?.discountPrice ? (
                                    <div className='flex gap-3'>
                                        <span className='line-through text-gray-500'>₹{product?.price}</span>
                                        <span className='text-green '>₹{product?.discountPrice}</span>
                                    </div>
                                ) : (
                                    <p className='text-green'>₹{product.price}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <h1 className='font-medium  text-gray-600'>Do you want to remove this product</h1>
                            <div className='flex gap-10 justify-center'>
                                <button onClick={() => setConfirmDelete(false)} className='bg-green px-3 py-1.5 rounded-sm text-white cursor-pointer shadow-md active:shadow-none active:bg-red-500 duration-75'>No</button>
                                <button onClick={() => deleteHandler(product?._id)} className='bg-green px-3 py-1.5 rounded-sm text-white cursor-pointer shadow-md active:shadow-none active:bg-red-500 duration-75'>Yes</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setConfirmDelete(false)} className=' h-full w-full bg-black opacity-45'>

                    </div>

                </div>
            )}
        </>
    )
}

export default ProductCard