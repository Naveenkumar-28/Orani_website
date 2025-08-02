import React from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { ProductCardType } from '../(routes)/products/types'
import { Fade, Tooltip } from "@mui/material";

type ProductCartPropsType = {
    product: ProductCardType,
    setEditModelOpen: (value: ProductCardType) => void,
    setRemoveModelOpen: (value: ProductCardType) => void
}

export function ProductCard({ product, setEditModelOpen, setRemoveModelOpen }: ProductCartPropsType) {

    return (

        <div className='bg-white rounded-sm group shadow-md ring-1 ring-gray-100 relative overflow-hidden hover:shadow-lg pb-5 md:h-72 h-64'>
            {product?.discountPrice && (
                <div className='bg-green font-light text-xs text-white absolute py-1.5 top-0 left-0 px-2 rounded-br-sm z-10'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>
            )}
            <div className='h-9/12 w-full overflow-hidden flex justify-center items-center'>
                <img src={product?.imageUrl} className='h-full duration-500 group-hover:scale-105 w-[90%] object-contain' alt="ProductImage" />
            </div>
            <div className='w-full flex justify-center items-center gap-5 py-5 absolute -bottom-full group-hover:bottom-5 bg-white duration-500'>
                <Tooltip title='Edit' arrow placement='left' enterDelay={500} slots={{ transition: Fade }}>
                    <button onClick={() => setEditModelOpen(product)} className='bg-white p-2 ring ring-gray-300 rounded-full text-green hover:ring-green text-xl hover:bg-green hover:text-white hover:rotate-[360deg] cursor-pointer duration-500'><MdEdit /></button>
                </Tooltip>
                <Tooltip title='Delete' arrow placement='right' enterDelay={500} slots={{ transition: Fade }}>
                    <button onClick={() => setRemoveModelOpen(product)} className='bg-white p-2 ring ring-gray-300 rounded-full text-green hover:ring-green text-xl hover:bg-green hover:text-white hover:rotate-[360deg] cursor-pointer duration-500'><IoMdTrash /></button>
                </Tooltip>
            </div>
            <div className='p-2 h-3/12 flex flex-col justify-center items-center gap-2'>
                <h1 className='uppercase text-neutral-500 md:text-base text-sm'>{product.name}</h1>
                {product?.discountPrice ? (
                    <div className='flex gap-3'>
                        <span className='line-through text-neutral-300 text-sm lg:text-base'>₹{product?.price?.toFixed(2)}</span>
                        <span className='text-green  text-sm lg:text-base'>₹{product?.discountPrice?.toFixed(2)}</span>
                    </div>
                ) : (
                    <p className='text-green text-sm lg:text-base'>₹{product?.price?.toFixed(2)}</p>
                )}
            </div>
        </div>
    )
}