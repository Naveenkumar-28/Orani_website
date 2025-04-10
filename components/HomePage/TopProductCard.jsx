
import { addCartList } from '@/app/redux/slices/CartSlice'
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import React, { useCallback } from 'react'
import { IoCart } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

function TopProductCard({ product }) {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.ProductList)
    const CartList = useSelector((state) => state.CartList)

    const addCart = useCallback((id) => {
        const addCartProduct = productList.find((product) => product?._id == id)
        if (addCartProduct?.stock == 0) {
            return dispatch(AddNotifyMessage("This Product out of Stock"))
        }
        if (CartList.find((product) => product._id == id)) return alert("This product Already in Card");
        let newList = productList.find(product => product._id == id)
        if (!newList) return dispatch(AddNotifyMessage(("This product not available in product list")))
        dispatch(addCartList(newList))
        dispatch(AddNotifyMessage('This Product added to your Cart'))
    }, [product, CartList, productList])

    return (
        <div className="group  snap-start   overflow-hidden box-border px-1 best_product_item">
            <div className="flex w-full border-[1px] border-gray-200 relative rounded-sm overflow-hidden">
                <div className="h-[120px] relative overflow-hidden w-2/5">
                    <img src={product?.ImageUrl} className="h-full w-full object-contain" alt="product_Image" />
                </div>
                <div className="flex justify-start py-5 items-start px-5 flex-col w-8/12 font-mono">
                    <p className="uppercase">{product?.name}</p>
                    {product?.discountPrice ? (

                        <div className='flex justify-center items-center gap-2'>
                            <p className='line-through text-gray-400'>₹{product?.price}</p>
                            <p className="font-extrabold text-[#7fad39] py-2">₹{product?.discountPrice}</p>
                        </div>
                    ) : (
                        <p className="font-extrabold text-[#7fad39] py-2">₹{product?.price}</p>

                    )}
                </div>
                <button onClick={() => addCart(product._id)} className="absolute opacity-0 cursor-pointer group-hover:opacity-100 duration-200 z-10 right-0 top-0 p-2 bg-[#7fad39] text-white rounded-bl-sm">
                    <IoCart />
                </button>
                {product.discountPrice && <div className='absolute bg-green top-0 left-0 text-white text-xs px-1.5 py-1 rounded-br-sm'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
            </div>
        </div>
    )
}

export default TopProductCard
