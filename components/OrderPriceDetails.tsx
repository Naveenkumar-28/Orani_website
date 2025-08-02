import { OrderType } from '@/app/pages/(protected_pages)/orders/types'
import React from 'react'

export function OrderPriceDetails({ order }: { order: OrderType }) {
    return (
        <section className='px-5 flex flex-col gap-4 pb-2 text-sm'>
            <h1 className='font-medium text-base underline underline-offset-2'>Price Details :</h1>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-normal text-neutral-800'>Selling price <span className='text-xs'>{`(${order.items.length} ${order.items.length > 0 ? "items" : "item"})`}</span></h1>
                    <p>₹{order.subtotal.toFixed(2)}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <h1 className='font-normal text-neutral-800'>Discount</h1>
                    <p>{order.discount ? `- ₹${order.discount.toFixed(2)}` : `₹${order.discount.toFixed(2)}`}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <h1 className='font-normal text-neutral-800'>Delivery charge</h1>
                    <p>{order.deliveryCharge ? `₹${order.deliveryCharge}` : "free"}</p>
                </div>
                <div className='flex justify-between items-center py-2'>
                    <h1 className='font-medium'>Total Amount</h1>
                    <p className='font-medium' >₹{order?.totalAmount.toFixed(2)}</p>
                </div>
            </div>
        </section>
    )
}