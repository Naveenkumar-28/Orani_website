import { AppDispatch } from '@/app/redux/store'
import { decrementQuantity, incrementQuantity, changeQuantity, removeCart } from '../redux'
import { CartType } from '@/app/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { IoAdd, IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'


interface Props {
    product: CartType;
}

export function CartCard({ product }: Props) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    useEffect(() => {
        setQuantity(product.quantity)
    }, [product])

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code == "Enter" || e.code == "Space") {
            dispatch(changeQuantity({ _id: product?._id, quantity: quantity }))
        }
    }

    return (
        <div className="w-full flex border-b border-gray-200 lg:h-auto sm:gap-2 gap-5 select-none lg:py-0 py-5 flex-col sm:flex-row ">
            <div className="lg:w-3/12 sm:w-6/12 w-full justify-center items-center flex relative ">
                <div onClick={() => dispatch(removeCart({ _id: product?._id }))} className="text-sm p-1 rounded-sm duration-200 bg-white lg:static absolute top-0 left-0 border-[1px]  border-gray-300 hover:bg-green hover:text-white hover:border-transparent cursor-pointer">
                    <IoCloseOutline />
                </div>
                <div className="sm:h-[70%] h-40 lg:w-10/12 w-full ">
                    <img className="h-full w-full object-contain" src={product?.imageUrl} alt="Product_Image" />
                </div>
            </div>
            <div className='lg:w-9/12 sm:w-8/12 w-full flex lg:flex-row flex-col lg:gap-1 gap-5'>
                <div className="lg:w-5/12 justify-center flex flex-col items-center overflow-hidden">
                    <h3 onClick={() => router.push('/pages/shop/' + product?._id)} className="font-medium cursor-pointer hover:text-green duration-100 mb-2 lg:text-center w-full uppercase  xl:text-lg text-base">{product?.name}</h3>
                    <div className='overflow-hidden flex flex-wrap w-full'>
                        <p className="lg:line-clamp-2 line-clamp-3 text-gray-400 xl:text-sm text-xs font-light">{product?.description}</p>
                    </div>
                </div>
                <div className="lg:w-3/12 text-sm xl:text-base justify-center items-center lg:flex hidden font-normal">₹{product?.discountPrice ? product?.discountPrice?.toFixed(2) : product?.price?.toFixed(2)}</div>
                <div className="lg:w-2/12  text-sm text-green items-center flex lg:hidden font-medium ">₹{product?.discountPrice ? product?.discountPrice.toFixed(2) : product?.price.toFixed(2)}</div>
                <div className=" lg:w-4/12 lg:justify-center items-center flex gap-1 md:gap-3">
                    <div className='xl:h-10 h-8 flex gap-1'>
                        <button onClick={() => dispatch(decrementQuantity({ _id: product._id }))} className="border lg:text-base text-sm rounded-sm select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center" >
                            <FiMinus />
                        </button>
                        <input value={quantity} onKeyDown={onKeyPress} onChange={(e) => {
                            dispatch(changeQuantity({ _id: product?._id, quantity: Math.min(Number(e.target.value || 1), product?.stock) }))
                        }} type="number"
                            className="border xl:text-base text-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-sm border-gray-300 w-15 outline-none h-full text-center" />

                        <button onClick={() => dispatch(incrementQuantity({ _id: product._id }))} className="border lg:text-base text-sm rounded-sm select-none h-full shadow active:shadow-inner cursor-pointer px-3 border-gray-300 flex justify-center items-center">
                            <IoAdd />
                        </button>
                    </div>
                </div>
                <div className="lg:w-3/12 w-full lg:justify-center items-center flex font-normal gap-2 text-sm lg:text-base">
                    <div className='lg:hidden font-medium'>Total:</div>
                    <p className='text-sm xl:text-base'>₹{((product?.discountPrice ? product?.discountPrice : product?.price) * product?.quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}