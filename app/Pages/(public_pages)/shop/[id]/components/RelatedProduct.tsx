import React from 'react'
import { ProductType } from '../../types'
import { useRouter } from 'next/navigation'

export function RelatedProduct({ product }: { product: ProductType }) {
    const router = useRouter()

    return (
        <div onClick={() => router.push('/pages/shop/' + product?._id)} key={product?._id} className={`border border-gray-200 lg:hover:shadow-md active:scale-95 snap-start cursor-pointer overflow-hidden relative group transition-all bg-white p-5 rounded-sm xl:min-w-62 lg:min-w-52 min-w-40 xl:h-72 lg:h-64 h-52`} >
            {product?.discountPrice &&
                <div className="absolute top-0 xl:py-2 lg:py-1.5 lg:px-2 px-1.5 py-1 left-0 bg-green text-white xl:text-xs lg:text-[0.7rem] text-[0.6rem] z-50 rounded-br-sm">{`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}</div>}
            <div className="h-9/12 relative overflow-hidden pb-2 ">
                <img
                    src={product?.imageUrl}
                    className="h-full w-full object-contain lg:group-hover:scale-110 duration-500"
                    alt={product?.name}
                />
            </div>
            <div className="flex justify-center gap-2 items-center flex-col h-3/12">
                <p className=" font-normal uppercase text-gray-400 lg:text-sm text-xs">{product?.name}</p>
                {product?.discountPrice ? (

                    <div className="flex gap-5 font-light">
                        <p className="  line-through text-gray-300 font-normal lg:text-sm text-xs">₹{product?.price.toFixed(2)}</p>
                        <p className=" text-green font-normal lg:text-sm text-xs">₹{product?.discountPrice.toFixed(2)}</p>
                    </div>
                ) : (<p className=" text-green font-normal lg:text-sm text-xs">₹{product?.price.toFixed(2)}</p>
                )}
            </div>
        </div>
    )
}
