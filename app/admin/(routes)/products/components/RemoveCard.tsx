import { AppDispatch, RootState } from '@/app/redux/store'
import { createSendMessage } from '@/utils'
import React, { SetStateAction, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bodyOverflowHandler } from '@/utils'
import { deleteAdminProduct } from '../redux'
import { ProductCardType } from '../types'

type PropsType = {
    product: ProductCardType;
    onDismiss: React.Dispatch<SetStateAction<ProductCardType | null>>
    fetchProducts: (page?: number, isFiltering?: boolean) => void;
}

export function RemoveCard({ product, onDismiss, fetchProducts }: PropsType) {
    const sendMessage = createSendMessage()
    const { page } = useSelector((state: RootState) => state.AdminProducts)
    const dispatch = useDispatch<AppDispatch>()

    //Find Specific product from the products list
    useEffect(() => {
        bodyOverflowHandler(true)
    }, [])

    const closerHandler = useCallback(() => {
        onDismiss(null)
        bodyOverflowHandler(false)
    }, [bodyOverflowHandler, onDismiss])

    //Delete product handler
    const deleteHandler = useCallback(async (id: string) => {
        if (!id) return
        closerHandler()
        try {
            await dispatch(deleteAdminProduct({ id })).unwrap()
            fetchProducts(page, true)
            sendMessage.success('Product Removed successfully')
        } catch (error) {
            console.log({ error });
            sendMessage.error('Product Remove failed')
        }

    }, [closerHandler, sendMessage, page, fetchProducts])

    return (
        <div className='fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center'>
            <div className='bg-white absolute z-10 rounded-lg overflow-hidden w-11/12 min-[425px]:w-9/12 sm:w-fit'>
                <div className='p-8 gap-5 flex flex-col items-center'>
                    <h1 className='font-medium text-gray-800 text-lg text-wrap'>Do you want to remove this product ?</h1>
                    <div className='bg-white mb-5 rounded-sm relative overflow-hidden shadow-md w-52 pb-3'>
                        {product?.discountPrice && (

                            <div className='bg-green font-light text-xs text-white absolute top-0 left-0 px-2 py-1 rounded-br-sm z-10'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>
                        )}
                        <div className='h-52 w-full overflow-hidden'>
                            <img src={product?.imageUrl} className='h-full duration-500 w-full object-contain' alt="ProductImage" />
                        </div>

                        <div className='p-2 flex flex-col justify-center items-center gap-2 md:gap-3'>
                            <h1 className='uppercase text-gray-600 text-sm sm:text-base'>{product?.name}</h1>
                            {product?.discountPrice ? (
                                <div className='flex gap-3'>
                                    <span className='line-through text-gray-300 text-xs sm:text-sm '>₹{product?.price.toFixed(2)}</span>
                                    <span className='text-green  text-xs sm:text-sm '>₹{product?.discountPrice.toFixed(2)}</span>
                                </div>
                            ) : (
                                <p className='text-green text-xs sm:text-sm '>₹{product?.price.toFixed(2)}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex gap-3 justify-end w-full'>
                        <button onClick={closerHandler} className='px-3 hover:shadow-sm text-base py-2 active:scale-95 duration-200 text-green rounded-md ring ring-green cursor-pointer'>No</button>
                        <button onClick={() => deleteHandler(product?._id)} className='px-3 hover:shadow-sm py-2 active:scale-95 duration-200 text-base text-white rounded-md ring ring-green cursor-pointer bg-green'>Yes , delete</button>
                    </div>
                </div>
            </div>

            <div onClick={closerHandler} className=' h-full w-full bg-black opacity-45'></div>
        </div>
    )
}

