"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { LoadingIndicator, MenuSection, OrderDetailsModel } from '@/components'
import { OrderCard, OrderCardSkeleton } from './components';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { OrderType } from './types';

function Orders() {
    const [isModelOpen, setIsModelOpen] = useState<OrderType | null>(null)
    const [limit, setLimit] = useState(9)
    const dispatch = useDispatch<AppDispatch>()

    const { isLoading, isLoadingSkeleton, orders, page, totalPage } = useSelector((state: RootState) => state.OrderList)
    const { user, isSignedIn, isLoading: loadingUserDetails } = useSelector((state: RootState) => state.UserDetails)

    useEffect(() => {
        if (!loadingUserDetails) {
            if (user && isSignedIn) {
                if (orders.length > 0) return
                dispatch(fetchOrders({ page, limit }))
            }
        }
    }, [user, loadingUserDetails])

    const seeMoreHandler = useCallback(() => {
        if (page >= totalPage) return
        dispatch(fetchOrders({ page: page + 1, limit }))
    }, [page, totalPage])

    return (
        <div >
            <MenuSection name={'Orders'} />
            <section className="lg:px-20 lg:container mx-auto 2xl:px-52  lg:mb-50 mb-30 ">
                <div className='overflow-x-auto'>
                    <div className='min-w-[850px] '>
                        <div className='flex py-6 bg-green text-white gap-5 xl:text-base text-sm px-5'>
                            <p className='w-3/12 text-center font-medium '>Order ID</p>
                            <p className='w-2/12 text-center font-medium'>Order Date</p>
                            <p className='w-3/12 text-center font-medium'>Order Status</p>
                            <p className='w-2/12 text-center font-medium'>Order Price</p>
                            <p className='w-2/12 text-center font-medium'>Show Details</p>
                        </div>
                        <div className='flex flex-col'>
                            {!isLoadingSkeleton ? (
                                <>
                                    {orders.length > 0 ? (
                                        <>
                                            {orders.map((order, index) => (
                                                <OrderCard order={order} key={index} setIsModelopen={setIsModelOpen} />
                                            ))}
                                            <>
                                                {page < totalPage && (
                                                    <>
                                                        {!isLoading && (
                                                            <div className='flex justify-center items-center gap-1  py-5'>
                                                                <div onClick={seeMoreHandler} className='flex justify-center items-center gap-2 text-green cursor-pointer hover:opacity-90 duration-150'>
                                                                    <IoIosArrowDown className='text-xl' />
                                                                    <h1 className='text-center   font-normal capitalize'>See More</h1>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                                {isLoading && (
                                                    <div className='flex justify-center items-center h-20 '>
                                                        <LoadingIndicator borderWidth='border-3' size='size-9' />
                                                    </div>
                                                )}
                                            </>
                                        </>
                                    ) : (
                                        <div className='flex justify-center items-center h-62'>
                                            <div className='text-2xl text-gray-300'>No orders found</div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>

                                    {Array.from({ length: limit }).map((_, index) => {
                                        return (
                                            <OrderCardSkeleton key={index} />
                                        )
                                    })}

                                </>
                            )}

                        </div>
                    </div>

                </div>
            </section>
            {isModelOpen && <OrderDetailsModel order={isModelOpen} closerHandler={setIsModelOpen} />}
        </div>
    )
}

export default Orders