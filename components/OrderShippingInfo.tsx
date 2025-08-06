import { OrderType } from '@/app/tempPages/(protected_pages)/orders/types'
import React from 'react'

export function OrderShippingInfo({ order }: { order: OrderType }) {

    return (
        <>
            <section className='px-5 text-sm flex flex-col gap-5 mb-5'>
                <h1 className='font-medium text-base underline underline-offset-2'>Shipping Info :</h1>
                {order?.shippingAddress ? (
                    <div className=' capitalize flex flex-col gap-3 text-neutral-700'>
                        <div className=' flex gap-2'>
                            <span className='w-4/12 text-neutral-800'>Name :</span>
                            <span className='w-8/12'>{(order?.shippingAddress?.firstName + " " + order?.shippingAddress?.lastName)}</span>
                        </div>
                        <div className=' flex gap-2'>
                            <span className='w-4/12 text-neutral-800'>Street :</span>
                            <span className='w-8/12'>{order?.shippingAddress?.street}</span>
                        </div>
                        <div className=' flex gap-2'>
                            <span className='w-4/12 text-neutral-800'>City :</span>
                            <span className='w-8/12'>{order?.shippingAddress?.city}</span>
                        </div>
                        <div className=' flex gap-2'>
                            <span className='w-4/12 text-neutral-800'>Mobile Number :</span>
                            <span className='w-8/12'>{order?.shippingAddress?.mobileNumber}</span>
                        </div>
                        <div className=' flex gap-2'>
                            <span className='w-4/12 text-neutral-800'>Pincode :</span>
                            <span className='w-8/12'>{order?.shippingAddress?.postcode}</span>
                        </div>
                    </div>
                ) : (<div className='text-neutral-700'>Not Provided</div>)}
            </section>
        </>

    )
}
