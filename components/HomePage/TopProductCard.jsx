
import { addCartList } from '@/app/redux/slices/CartSlice'
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import React, { useCallback } from 'react'
import { IoCart } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

function TopProductCard({ product }) {
    const dispatch = useDispatch()
    const CartList = useSelector((state) => state.CartList)

    // add cart functionality here, if not already in cart after add to cart
    const addCart = useCallback((id) => {
        if (CartList.find((product) => product._id == id)) return dispatch(AddNotifyMessage({ message: "This product Already in Card", type: 'warning' }))
        dispatch(addCartList(product))
        dispatch(AddNotifyMessage({ message: 'This Product added to your Cart' }))
    }, [product, CartList])

    return (
        <div className="group  snap-start   overflow-hidden box-border px-1 ">
            <div className="flex w-full border-[1px] border-gray-200 relative rounded-sm overflow-hidden">
                <div className="h-[120px] relative overflow-hidden w-2/5">
                    <img src={product?.ImageUrl} className="h-full w-full object-contain" alt="product_Image" />
                </div>
                <div className="flex justify-start py-5 items-start px-5 flex-col w-8/12 font-mono">
                    <p className="uppercase">{product?.name}</p>
                    {product?.discountPrice ? (

                        <div className='flex justify-center items-center gap-2'>
                            <p className='line-through text-gray-300'>₹{product?.price?.toFixed(2)}</p>
                            <p className="font-extrabold text-green py-2">₹{product?.discountPrice?.toFixed(2)}</p>
                        </div>
                    ) : (
                        <p className="font-extrabold text-green py-2">₹{product?.price?.toFixed(2)}</p>

                    )}
                    {product.stock == 0 && <p className="text-red-500 text-sm font-semibold">Out of Stock</p>}
                </div>
                {product.stock > 0 &&
                    <button onClick={() => addCart(product._id)} className="absolute opacity-0 cursor-pointer group-hover:opacity-100 duration-200 z-10 right-0 top-0 p-2 bg-green text-white rounded-bl-sm">
                        <IoCart />
                    </button>
                }
                {product.discountPrice && <div className='absolute bg-green top-0 left-0 text-white text-xs px-1.5 py-1 rounded-br-sm'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
            </div>
        </div>
    )
}

export default TopProductCard
