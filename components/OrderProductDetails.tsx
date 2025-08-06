import { OrderType } from '@/app/tempPages/(protected_pages)/orders/types'
import React from 'react'

export function OrderProductDetails({ order }: { order: OrderType }) {
    return (
        <section className='px-5 text-sm flex flex-col gap-5 mb-5'>
            <h1 className='font-medium text-base underline underline-offset-2'>Products Details :</h1>
            <div>
                <div className='flex justify-between mb-2 text-neutral-800'>
                    <h6 className='underline underline-offset-2 w-3/12 '>Name</h6>
                    <h6 className='underline underline-offset-2 w-3/12 text-center'>Quantity</h6>
                    <h6 className='underline underline-offset-2 w-3/12 text-end'>Price </h6>
                    <h6 className='underline underline-offset-2 w-3/12 text-end'>Total </h6>
                </div>
                <div className='w-full flex flex-col items-center gap-2'>
                    {order?.items?.map((product, index) => {
                        const total = (product?.quantity * Number(product?.price))
                        return <div key={index} className='flex justify-between items-center w-full gap-2  text-neutral-700'>
                            <p className='capitalize w-3/12 flex flex-wrap'>{product?.name}</p>
                            <p className='w-3/12 text-center'>{product?.quantity}</p>
                            <p className='w-3/12 text-end'>₹{product?.price}</p>
                            <p className='w-3/12 text-end'> ₹{isNaN(total) ? 0 : total}</p>
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}
