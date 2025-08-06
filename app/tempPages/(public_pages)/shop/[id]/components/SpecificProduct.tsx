import React, { useCallback, useEffect, useState } from 'react'
import { ProductType } from '../../types'
import { StarRating } from "../../../../components";
import { FaArrowDownLong } from 'react-icons/fa6';
import { FiMinus } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';
import { Button } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { createSendMessage } from '@/utils/sendMessage/createSendMessage';
import { AppDispatch, RootState } from '@/app/redux/store';
import { addCart } from '../../../cart/redux';
import { RiBookmarkFill } from 'react-icons/ri';
import { addWish, removeWish } from '../../../wishlist/redux';
import { useThrottleCallback } from '@/hooks';

export function SpecificProduct({ product }: { product: ProductType }) {
    const { localStorageCartList, isLoading: isCartLoading } = useSelector((state: RootState) => state.CartItems) || []
    const { localStorageWishList, isLoading: isWishLoading } = useSelector((state: RootState) => state.WishItems) || []
    const [quantity, setQuantity] = useState<number>(1)
    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()

    const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code == "Enter" || e.code == "Space") {
            setQuantity(Number(quantity > 0 ? Math.min(quantity, product.stock) : 1))
        }
    }, [quantity, product])

    useEffect(() => {
        setQuantity(product?.quantity)
    }, [product])

    //Product add to cartList functionality 
    const handleAddToCart = useCallback((id: string) => {
        if (isCartLoading) return
        const isAlreadyIncart = localStorageCartList.find(item => item?._id == id)
        if (product?.stock) {
            if (!isAlreadyIncart) {
                dispatch(addCart({ _id: id, quantity: Number(quantity) || 1 }))
                sendMessage.info('This product added to Cart')
            } else {
                sendMessage.warning('This product already in Cart')
            }
        } else {
            sendMessage.error('This product Out of the Stock')
        }

    }, [product, quantity, localStorageCartList, isCartLoading, dispatch])

    //Product add to wishList functionality 
    const HandleAddToWish = useCallback(() => {
        if (isWishLoading) return;
        if (localStorageWishList.find(item => item?._id == product._id)) {
            dispatch(removeWish({ _id: product._id }))
            sendMessage.info('This product removed to wishlist')
        } else {
            dispatch(addWish({ _id: product._id }))
            sendMessage.info('This product added to wishlist')
        }
    }, [quantity, localStorageWishList, isWishLoading, dispatch])

    const throttledAddToCart = useThrottleCallback(handleAddToCart, 1000)
    const throttledAddToWish = useThrottleCallback(HandleAddToWish, 1000)

    return (
        <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20 lg:mt-20 text-gray-700">
            <div className="flex lg:flex-row flex-col h-full lg:gap-10 gap-10">
                <div className=" xl:w-7/12 lg:w-6/12 w-full lg:h-[26rem] overflow-hidden flex justify-center items-center">
                    <img className="h-full lg:w-full w-5/6 object-contain" src={product?.imageUrl} alt="Product_Image" />
                </div>
                <div className="xl:w-5/12 lg:w-6/12 w-full flex flex-col xl:gap-6 lg:gap-5 gap-4">
                    <div className='flex items-center justify-between'>
                        <h1 className="font-medium uppercase xl:text-3xl lg:text-2xl text-xl">
                            {product?.name}
                        </h1>
                        <button disabled={isWishLoading} onClick={throttledAddToWish} className={`${localStorageWishList.some((p) => p._id == product._id) ? "text-green" : "text-gray-300 hover:text-gray-400"}  sm:text-3xl text-2xl cursor-pointer active:scale-95 duration-200`}>
                            <RiBookmarkFill />
                        </button>
                    </div>
                    <div className="flex gap-5">
                        {product?.rating ? (
                            <div className="flex justify-center  items-center gap-2">
                                <p className='lg:text-xl md:text-lg text-base font-medium text-green lg:leading-3 leading-2'>{product?.rating.toFixed(1)}</p>
                                <StarRating initialValue={Number(product?.rating)} className='text-base lg:text-lg' />
                                <p className='text-gray-500 md:text-sm text-xs'>({product?.userRatings})</p>
                            </div>
                        ) : (
                            <div className="flex  justify-center  items-center gap-2">
                                <StarRating initialValue={0} className='text-base xl:text-lg' />
                            </div>
                        )}
                        {product?.sold > 0 && <div className="flex justify-center items-center gap-1 text-neutral-700 xl:text-base text-sm">
                            <p >Sold :</p>
                            <p >{product?.sold}<span className='text-sm'>kg</span></p>
                        </div>}

                    </div>

                    {product?.discountPrice ? (
                        <div className='flex gap-5'>
                            <p className="lg:text-xl xl:text-2xl text-lg text-gray-400 line-through">₹{product?.price?.toFixed(2)}</p>
                            <p className="lg:text-xl xl:text-2xl text-lg">₹{product?.discountPrice.toFixed(2)}</p>
                            <div className='flex justify-center items-center text-green gap-1'>
                                <FaArrowDownLong />
                                <p className='xl:text-xl lg:text-lg'>{Math.round(((product?.price - product?.discountPrice) / product?.price) * 100)}%</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-2xl">₹{product?.price.toFixed(2)}</p>
                    )}
                    <p className="text-gray-400 line-clamp-5 xl:text-base text-sm font-light">{product?.description}</p>
                    <div className='sm:h-10 h-9 flex gap-1'>
                        <button disabled={product.stock == 0} onClick={() => setQuantity((pre) => Math.max(pre - 1, 1))} className="border lg:text-base text-sm rounded-sm select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center" >
                            <FiMinus />
                        </button>
                        <input value={quantity || 1} onChange={(e) => setQuantity(Math.min(Number(e.target.value), product?.stock))} onKeyDown={onKeyPress}
                            type="number"
                            className="border lg:text-base text-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-sm border-gray-300 w-25 outline-none h-full text-center" />

                        <button disabled={product.stock == 0} onClick={() => setQuantity((pre) => Math.min(pre + 1, product?.stock))} className="border lg:text-base text-sm rounded-sm select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center">
                            <IoAdd />
                        </button>
                    </div>

                    {product?.stock > 0 ? (<>
                        {product?.stock <= 10 ? (<p className="font-medium text-red-600 lg:text-base text-sm mt-2">Only {product?.stock} kg available</p>) :
                            (<p className="font-medium lg:text-base text-sm mt-2">{product?.stock} kg available</p>)
                        }</>) : (
                        <p className='text-red-600 font-medium lg:text-base text-sm mt-2'>Out of Stock</p>
                    )}
                    <Button title='Add to Card' loading={isCartLoading} className='w-max xl:text-xl lg:text-lg text-sm lg:mt-0 mt-3' disabled={!(product?.stock > 0) || isCartLoading} onClick={() => throttledAddToCart(product._id)} />
                </div>
            </div>

        </section>
    )
}
