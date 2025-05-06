import { CartType, WishListType } from '@/app/types'
import React, { useEffect, useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { IoAdd, IoCloseOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { addCartList } from '@/app/redux/slices/CartSlice'
import { LuMoveDown } from 'react-icons/lu'
import { WishListChangeQuantity, WishListDecrementQuantity, WishListIncrementQuantity, WishListRemove } from '@/app/redux/slices/wishListSlice'
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'

type wishListCardProps = {
    product: WishListType
}
function WishListCard({ product }: wishListCardProps) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const CartList: CartType[] = useSelector((state: any) => state.CartList)

    useEffect(() => {
        setQuantity(product.quantity)
    }, [product])

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code == "Enter" || e.code == "Space") {
            dispatch(WishListChangeQuantity({ _id: product?._id, quantity: quantity }))
        }
    }


    const AddCartHandler = (id: string) => {
        if (product?.stock) {
            if (!CartList.find(item => item?._id == id)) {
                dispatch(addCartList({ ...product, quantity: Number(quantity) }))
                dispatch(AddNotifyMessage('This product added to Cart'))
            } else {
                dispatch(AddNotifyMessage('This product already in Cart'))
            }
        } else {
            dispatch(AddNotifyMessage('This product Out of the Stock'))
        }

    }
    return (
        <div className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52" >
            <div className=" flex border-b border-gray-300 py-10">
                <div className="lg:w-4/12 w-6/12 h-full relative">
                    <img className="h-full w-full object-contain" src={product?.ImageUrl} alt={product?.name} />
                    <div onClick={() => dispatch(WishListRemove({ _id: product?._id }))} className="absolute top-0 left-0 border border-gray-200 p-1 cursor-pointer hover:bg-green hover:text-white hover:border-green">
                        <IoCloseOutline />

                    </div>

                </div>
                <div className="lg:w-7/12 w-6/12 flex flex-col gap-2 ps-5">
                    <h5 className="font-medium md:text-xl text-lg uppercase">{product?.name}</h5>
                    <div className="flex flex-col gap-5">
                        <p className="text-gray-500 line-clamp-4 md:text-base text-sm">{product?.description}</p>
                        <div className='flex gap-3'>
                            {product?.discountPrice && <div className="font-normal text-lg text-gray-500 line-through">₹{product?.discountPrice}</div>}
                            <p className="font-normal text-lg ">₹{product?.price}</p>
                            {product?.discountPrice && <div className='flex justify-center items-center text-green text-base'>
                                <LuMoveDown className='text-base' />
                                <p >{`${Math.round(((product?.price - product.discountPrice) / product?.price) * 100)}%`}</p>
                            </div>}

                        </div>
                        {product.stock > 0 ? (

                            <div className="flex items-center">
                                <div className='sm:h-10 h-8 flex gap-1'>
                                    <button onClick={() => dispatch(WishListDecrementQuantity({ _id: product._id }))} className="border outline-none select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center" >
                                        <FiMinus />
                                    </button>
                                    <input value={quantity} onKeyDown={onKeyPress} onChange={(e) => setQuantity(Number(e.target.value))} type="number"
                                        className="border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300 w-15 outline-none h-full text-center" />

                                    <button onClick={() => dispatch(WishListIncrementQuantity({ _id: product._id }))} className="border outline-none select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center">
                                        <IoAdd />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='text-red-500 font-semibold text-lg'>
                                Out of Stock
                            </div>
                        )}
                        <button disabled={product.stock > 0 ? false : true} onClick={() => AddCartHandler(product?._id)}
                            className={` ${product.stock > 0 ? "bg-green focus:bg-blue-600 focus:border-blue-600 focus:text-white shadow-2xl hover:border-green hover:text-green hover:bg-white cursor-pointer" : "bg-gray-500 cursor-no-drop"} w-fit  text-sm md:text-base  border-2 border-transparent  duration-200 text-white py-3 font-normal  rounded-full px-5`}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishListCard