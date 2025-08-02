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
    const { isLoading, page } = useSelector((state: RootState) => state.AdminProducts)
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
            <div className=' bg-white px-10 py-10 absolute z-10 rounded-lg flex flex-col items-center w-fit'>
                <div className='bg-white mb-5 rounded-sm relative overflow-hidden shadow-md pb-5 w-52'>
                    {product?.discountPrice && (

                        <div className='bg-green font-light text-xs sm:text-sm text-white absolute top-0 left-0 px-2 py-1 rounded-br-sm z-10'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>
                    )}
                    <div className='sm:h-52 h-40 w-full overflow-hidden'>
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
                <div className='flex flex-col gap-5'>
                    <h1 className='font-normal  text-gray-600 text-xs sm:text-base'>Do you want to remove this product</h1>
                    <div className='flex gap-10 justify-center'>
                        <button onClick={closerHandler} className=' px-3 py-1.5 rounded-sm text-white cursor-pointer shadow-md active:shadow-none bg-red-400 duration-75 hover:opacity-90 text-xs sm:text-sm md:text-base'>No</button>
                        <button onClick={() => deleteHandler(product?._id)} className='bg-green px-3 py-1.5 rounded-sm text-white cursor-pointer shadow-md active:shadow-none duration-75 hover:opacity-90 text-xs sm:text-sm md:text-base'>Yes</button>
                    </div>
                </div>
                {isLoading && (
                    <div className='absolute top-0 left-0 w-full h-full bg-white z-100 flex justify-center items-center rounded-md'>
                        <p className='animate-spin border-b-3 border-r-2 text-green size-10 rounded-full'></p>
                    </div>
                )}
            </div>

            <div onClick={closerHandler} className=' h-full w-full bg-black opacity-45'></div>
        </div>
    )
}

