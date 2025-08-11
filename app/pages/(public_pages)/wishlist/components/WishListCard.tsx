import { WishListType } from '../types'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { LuMoveDown } from 'react-icons/lu'
import { removeWish } from '../redux'
import { Button } from '@/components'
import { addCart } from '../../cart/redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { StarRating } from '@/app/pages/components'
import { createSendMessage } from '@/utils/sendMessage/createSendMessage'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useThrottleCallback } from '@/hooks'

type wishListCardProps = {
    product: WishListType
}
export function WishListCard({ product }: wishListCardProps) {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()
    const [isLoading, setLoading] = useState(false)
    const { localStorageCartList } = useSelector((state: RootState) => state.CartItems)

    const handleAddToCart = useCallback(async (id: string) => {
        if (isLoading) return;

        if (product?.stock) {
            const isAlreadyInCart = localStorageCartList.find(item => item?._id == id)
            if (!isAlreadyInCart) {
                setLoading(true)
                try {
                    await dispatch(addCart({ _id: id })).unwrap()
                    sendMessage.info('This product added to Cart')
                } catch (err) {

                } finally {
                    setLoading(false)
                }
            } else {
                sendMessage.warning('This product already in Cart')
            }
        } else {
            sendMessage.error('This product Out of the Stock')
        }

    }, [localStorageCartList, sendMessage, isLoading, product])

    const throttledAddToCart = useThrottleCallback(handleAddToCart, 1000)

    return (

        <div className=" flex sm:flex-row flex-col border-b border-gray-300 py-10 gap-2 text-neutral-700">
            <div className="lg:w-4/12 sm:w-6/12 w-full h-full relative flex justify-center items-center">
                <img className="h-full sm:w-full max-w-64 object-contain" src={product?.imageUrl} alt={product?.name} />
                <div onClick={() => dispatch(removeWish({ _id: product?._id }))} className="absolute rounded-sm duration-200 top-0 left-0 border border-gray-200 p-1 cursor-pointer hover:bg-green hover:text-white hover:border-green">
                    <IoCloseOutline />
                </div>
            </div>
            <div className="lg:w-7/12 sm:w-6/12 w-full flex flex-col gap-5 md:ps-5">
                <div className="flex flex-col md:gap-4 gap-3">
                    <h5 onClick={() => router.push('/pages/shop/' + product._id)} className="font-medium lg:text-2xl md:text-xl text-lg uppercase hover:text-green cursor-pointer w-fit">{product?.name}</h5>
                    <div className='flex flex-col gap-3'>
                        {product?.rating && product?.userRatings > 0 ? (
                            <div className="flex items-center gap-2">
                                <p className='lg:text-lg md:text-base font-medium text-green text-sm leading-0'>{product?.rating.toFixed(1)}</p>
                                <StarRating initialValue={Number(product?.rating)} className='lg:text-lg md:text-base text-sm' />
                                <p className='text-gray-500 lg:text-sm text-xs'>({product?.userRatings})</p>
                            </div>
                        ) : (
                            <StarRating initialValue={0} className='lg:text-lg md:text-base text-sm' />
                        )}
                        <div className='flex gap-3'>
                            {product?.discountPrice ? (
                                <>
                                    <div className="font-normal lg:text-lg md:text-base text-gray-400 line-through text-sm">₹{product?.price?.toFixed(2)}</div>
                                    <p className="font-normal lg:text-lg md:text-base  text-sm">₹{product?.discountPrice?.toFixed(2)}</p>
                                </>
                            ) : (
                                <p className="font-normal lg:text-lg md:text-base  text-sm">₹{product?.price?.toFixed(2)}</p>
                            )}
                            {product?.discountPrice && <div className='flex justify-center items-center text-green lg:text-base md:text-sm text-xs'>
                                <LuMoveDown />
                                <p >{`${Math.round(((product?.price - product.discountPrice) / product?.price) * 100)}%`}</p>
                            </div>}

                        </div>
                        <p className="text-gray-400 line-clamp-4 lg:text-base md:text-sm text-xs font-light">{product?.description}</p>
                        {product.stock == 0 && (
                            <div className='text-red-500 font-medium xl:text-base text-sm'>
                                Out of Stock
                            </div>

                        )}
                    </div>
                </div>
                <Button loading={isLoading} loadingContent='Adding . . .' className='w-max text-sm lg:text-base' title='Add to Cart' disabled={!product.stock || isLoading} onClick={() => throttledAddToCart(product?._id)} />
            </div>
        </div>
    )
}
