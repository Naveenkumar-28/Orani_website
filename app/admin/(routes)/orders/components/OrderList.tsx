import { LoadingIndicator } from '@/components'
import React, { SetStateAction } from 'react'
import { OrderCard } from './OrderCard'
import { ScrollEndBtn } from './ScrollEndBtn'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { OrderType } from '@/app/admin/types'

export function OrderList({ setIsModel, sentinelRef }: { setIsModel: React.Dispatch<SetStateAction<OrderType | null>>, sentinelRef: React.RefObject<null> }) {
    const { orders, loader, isLoading, totalPage, page } = useSelector((state: RootState) => state.AdminOrders)
    return (
        <>
            {isLoading ? (
                <div className='flex justify-center items-center h-80'>
                    <LoadingIndicator borderWidth='border-b-3 border-r-3' size='size-10' />
                </div>
            ) : (

                <>
                    {orders?.length > 0 ? (
                        <>
                            {orders?.map((order, index) => {
                                return <OrderCard order={order} key={index} setIsModel={setIsModel} />

                            })}
                            {
                                <div className='h-20 flex justify-center items-center'>
                                    <div ref={sentinelRef} className="h-1" />
                                    {
                                        loader ? (
                                            <LoadingIndicator borderWidth='border-b-3 border-r-3' size='size-10' />
                                        ) :
                                            page == totalPage && page > 1 &&
                                            <ScrollEndBtn />
                                    }
                                </div>
                            }
                        </>
                    ) : (<div className='flex justify-center items-center h-62'>
                        <p className='text-center text-gray-300 text-xl font-normal'>No orders found</p>
                    </div>)}
                </>
            )}
        </>
    )
}
