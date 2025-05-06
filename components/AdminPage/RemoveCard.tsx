import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import { ProductListType } from '@/app/types'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

type RemoveCardProps = {
    removeId: string,
    setRemoveId: (value: string) => void,
    GetProductList: () => void,
}

function RemoveCard({ removeId, setRemoveId, GetProductList }: RemoveCardProps) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const product: ProductListType = useSelector((state: any) => state.ProductList).find((item: ProductListType) => item._id === removeId) || []

    //Delete product handler
    const deleteHandler = useCallback(async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/product/${id}`)
            if (response?.data?.success) {
                GetProductList()
                dispatch(AddNotifyMessage({ message: 'Product Removed' }))
            }
        } catch (error) {
            console.log((error as Error).message);
            dispatch(AddNotifyMessage({ message: 'Product Remove failed', type: 'error' }))
        } finally {
            setLoading(false)
            setRemoveId('')
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center'>
            <div className=' bg-white px-10 py-10 absolute z-10 rounded-sm flex flex-col items-center'>

                <div className='flex justify-end w-full items-center mb-5'>
                    <button className='text-2xl cursor-pointer hover:text-red-500 transition-all duration-200 text-gray-500' onClick={() => setRemoveId('')}>
                        <IoClose />
                    </button>
                </div>
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
                        <button onClick={() => setRemoveId('')} className=' px-3 py-1.5 rounded-sm text-white cursor-pointer shadow-md active:shadow-none bg-red-400 duration-75'>No</button>
                        <button onClick={() => deleteHandler(product?._id)} className='bg-green px-3 py-1.5 rounded-sm text-white cursor-pointer shadow-md active:shadow-none duration-75'>Yes</button>
                    </div>
                </div>
                {loading && (
                    <div className='absolute top-0 left-0 w-full h-full bg-white z-100 flex justify-center items-center rounded-md'>
                        <p className='animate-spin border-b-3 border-r-2 text-green size-10 rounded-full'></p>
                    </div>
                )}
            </div>
            <div onClick={() => setRemoveId('')} className=' h-full w-full bg-black opacity-45'>

            </div>

        </div>
    )
}

export default RemoveCard