import React from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'

function ProductCard({ product, setEditShow, setRemoveId }) {
    const value = 2
    value.toFixed(2)
    return (
        <>
            <div className='bg-white rounded-sm group shadow-sm relative overflow-hidden hover:shadow-md pb-5'>
                {product?.discountPrice && (

                    <div className='bg-green font-light text-sm text-white absolute top-0 left-0 px-2 py-1 rounded-br-sm z-10'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>
                )}
                <div className='h-52 w-full overflow-hidden'>
                    <img src={product?.ImageUrl} className='h-full duration-500 group-hover:scale-105 w-full object-contain' alt="ProductImage" />
                </div>
                <div className='w-full flex justify-center gap-5 py-5 absolute -bottom-full group-hover:bottom-5 bg-white duration-500'>
                    <button title='Edit' onClick={() => setEditShow(product?._id)} className='bg-white p-2 border border-gray-300 rounded-full text-green hover:border-green text-xl hover:bg-green hover:text-white hover:rotate-[360deg] cursor-pointer duration-500'><MdEdit /></button>
                    <button title='Delete' onClick={() => setRemoveId(product?._id)} className='bg-white p-2 border border-gray-300 rounded-full text-green hover:border-green text-xl hover:bg-green hover:text-white hover:rotate-[360deg] cursor-pointer duration-500'><IoMdTrash /></button>
                </div>
                <div className='p-2 flex flex-col justify-center items-center gap-2'>
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
        </>
    )
}

export default ProductCard