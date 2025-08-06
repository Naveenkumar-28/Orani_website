import { RootState } from '@/app/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

export function TopProducts() {
    const { data } = useSelector((state: RootState) => state.OverallSummary)
    return (
        <div className='w-full flex flex-col bg-white ring-1 shadow-md ring-gray-200 rounded-md px-5 py-8 gap-8 flex-1'>
            <div className='flex flex-col gap-1'>
                <h1 className='font-semibold sm:text-xl text-lg'>Top Products</h1>
                <p className='text-xs text-gray-500'>Top products based on number of sold</p>
            </div>
            <div className='flex flex-col md:gap-8 gap-5'>
                {
                    data?.topSoldProducts?.map((product, index) => {
                        return (
                            <div key={index} className='flex gap-2 items-center justify-between'>
                                <div className='items-center flex gap-5'>

                                    <div className='size-10'>
                                        <img src={product.imageUrl} className='w-full h-full object-cover' alt="Product_image" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h1 className='font-normal text-sm'>{product.name}</h1>
                                        <p className='text-xs text-gray-500'>₹{(product.discountPrice ? product.discountPrice : product.price).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='bg-green text-white px-2 py-1 rounded-md w-max text-xs'>
                                    {product.sold} kg
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}