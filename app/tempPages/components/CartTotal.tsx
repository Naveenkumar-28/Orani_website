import { usePricetotal } from '@/app/tempPages/(protected_pages)/checkout/hooks'
import { RootState } from '@/app/redux/store'
import { useSelector } from 'react-redux'
import { CardTotalSkeleton } from './CardTotalSkeleton'
import { memo } from 'react'

export const CartTotal = memo(() => {
    const { isLoading, cartList } = useSelector((state: RootState) => state.CartItems)
    const { pricing } = usePricetotal()

    return (
        <>
            {!isLoading ? (
                <div className="border border-gray-200 px-5 pt-5 lg:pb-8 pb-3 flex flex-col gap-5 w-full rounded-sm">
                    <h5 className="lg:text-xl text-lg font-normal sm:text-xl">Cart Totals</h5>
                    <div className="flex justify-between text-neutral-600">
                        <h5 className='text-sm lg:text-base flex justify-between items-center gap-2'>Subtotal<span className='font-light'>{`(${cartList.length} ${cartList.length > 1 ? "items" : "item"})`}</span></h5>
                        <p className='text-sm lg:text-base'>₹{pricing.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                        <h5 className='text-sm lg:text-base'>Delivery</h5>
                        <p className='text-sm lg:text-base'>{pricing.deliveryCharge ? `₹${pricing.deliveryCharge.toFixed(2)}` : 'Free'}</p>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                        <h5 className='text-sm lg:text-base'>Discount</h5>
                        <p className='text-sm lg:text-base' >₹{(pricing.discount ? -pricing.discount : pricing.discount).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-semibold border-t py-3 border-gray-200">
                        <h5 className="uppercase text-sm lg:text-base">Total</h5>
                        <p className='text-sm lg:text-base'>₹{pricing.total.toFixed(2)}</p>
                    </div>
                </div>
            ) : (
                <CardTotalSkeleton />
            )}
        </>
    )
})
