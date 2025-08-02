import React from 'react'
import { ProductSliderType } from '@/app/types'
import { StarRating } from './StarRating'
import { useRouter } from 'next/navigation'

export function ProductSliderCard({ product }: { product: ProductSliderType }) {
    const router = useRouter()

    return (
        <div onClick={() => router.push(`/pages/shop/${product._id}`)} className="group hover:cursor-pointer active:scale-95 duration-200 snap-start overflow-hidden box-border px-1 w-full my-2">
            <div className="flex lg:h-30 sm:h-32 h-28 w-full border border-gray-200 relative rounded-sm overflow-hidden">
                <div className=" relative overflow-hidden lg:w-2/5  w-4/12 flex items-center">
                    <img src={product?.imageUrl} className="sm:h-20 h-16 w-full object-contain" alt="product_Image" />
                </div>
                <div className="flex justify-start py-5 items-start px-5 flex-col w-8/12">
                    <p className="uppercase text-sm text-gray-700 ">{product?.name}</p>
                    {product?.discountPrice ? (
                        <div className='flex justify-center items-center gap-2'>
                            <p className='line-through text-gray-300 text-sm'>₹{product?.price?.toFixed(2)}</p>
                            <p className=" text-green py-2 text-sm">₹{product?.discountPrice?.toFixed(2)}</p>
                        </div>
                    ) : (
                        <p className=" text-green py-2 text-sm">₹{product?.price?.toFixed(2)}</p>

                    )}
                    <StarRating initialValue={product.rating} className='text-sm sm:text-base lg:text-sm' />
                </div>
                {product.discountPrice && <div className='absolute bg-green top-0 left-0 text-white font-light text-[.6rem] rounded-br-sm sm:text-xs px-2 py-1'>{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
            </div>
        </div>
    )
}
