import { CartDecrementQuantity, CartIncrementQuantity, CartRemove, CartChangeQuantity } from '@/app/redux/slices/CartSlice'
import { Product } from '@/app/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { IoAdd, IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'


interface CartProductItemProps {
    product: Product;
}

function CartProductItem({ product }: CartProductItemProps) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        setQuantity(product.quantity)
    }, [product])

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code == "Enter" || e.code == "Space") {
            dispatch(CartChangeQuantity({ _id: product?._id, quantity: quantity }))
        }
    }

    return (
        <div className="w-full   flex border-b border-gray-200 lg:h-auto sm:gap-2 gap-5 select-none xl:py-0 py-5  ">
            <div className="lg:w-3/12 w-6/12 justify-center items-center flex relative ">
                <div onClick={() => dispatch(CartRemove({ _id: product?._id }))} className="text-sm p-1 bg-white xl:static absolute top-0 left-0 border-[1px]  border-gray-300 hover:bg-green hover:text-white hover:border-transparent cursor-pointer">
                    <IoCloseOutline />

                </div>
                <div className="h-[70%] lg:w-10/12 w-full ">
                    <img className="h-full w-full object-contain" src={product?.ImageUrl} alt="Product_Image" />
                </div>
            </div>
            <div className='lg:w-9/12 w-8/12 flex lg:flex-row flex-col lg:gap-1 gap-5'>
                <div className="lg:w-5/12 justify-center flex flex-col items-center overflow-hidden">
                    <h4 onClick={() => router.replace('singleProduct/' + product?._id)} className="font-medium cursor-pointer mb-2 lg:text-center w-full uppercase text-xl">{product?.name}</h4>
                    <div className='overflow-hidden flex flex-wrap w-full'>
                        <p className="lg:line-clamp-2 line-clamp-3 text-gray-500 lg:text-base text-sm">{product?.description}</p>
                    </div>
                </div>
                <div className="lg:w-3/12  justify-center items-center lg:flex hidden font-normal">₹{product?.discountPrice ? product?.discountPrice : product?.price}</div>
                <div className="lg:w-2/12  text-lg text-green items-center flex lg:hidden font-normal ">₹{product?.discountPrice ? product?.discountPrice : product?.price}</div>
                <div className=" lg:w-4/12 lg:justify-center items-center flex gap-1 md:gap-3">
                    <div className='sm:h-10 h-8 flex gap-1'>
                        <button onClick={() => dispatch(CartDecrementQuantity({ _id: product._id }))} className="border select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center" >
                            <FiMinus />
                        </button>
                        <input value={quantity} onKeyDown={onKeyPress} onChange={(e) => setQuantity(Number(e.target.value))} type="number"
                            className="border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-gray-300 w-15 outline-none h-full text-center" />

                        <button onClick={() => dispatch(CartIncrementQuantity({ _id: product._id }))} className="border select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center">
                            <IoAdd />
                        </button>
                    </div>
                </div>
                <div className="lg:w-3/12 w-full lg:justify-center items-center flex font-normal gap-2 ">
                    <div className='lg:hidden'>Total:</div>
                    <p>₹{Number(product?.discountPrice ? product?.discountPrice : product?.price) * product?.quantity}</p>
                </div>
            </div>
        </div>
    )
}

export default CartProductItem