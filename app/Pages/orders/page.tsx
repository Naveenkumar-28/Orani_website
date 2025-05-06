"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import MenuSection from '@/components/MenuSection'
import OrderDetails from '@/components/OrderDetails';
import { OrdersType, OrderType } from '@/components/AdminPage/types';
import bodyOverflowHandler from '@/hooks/bodyOverFlowHandler';
import OrderCard from '@/components/OrdersPage/OrderCard';
import { IoIosArrowDown } from 'react-icons/io';

function Orders() {
    const [OrderDetailsList, setOrderDetailsList] = useState<OrderType[]>([])
    const [id, setID] = useState('')
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const [limit, setLimit] = useState(9)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const totalLengthRef = useRef(0)

    const getOrderDetails = useCallback(async () => {
        if (page > 1) setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?limit=${limit}&page=${page}`)
            if (response.data.success) {

                console.log(response.data);
                const { orders, total } = response.data
                totalLengthRef.current = Math.ceil(total / limit)
                if (page == 1) {
                    setOrderDetailsList(orders)
                } else {

                    setOrderDetailsList((prev) => [...prev, ...orders])
                }

            }

        } catch (error) {
            console.log({ error: (error as Error).message })
        } finally {
            page > 1 ? setLoading(false) : setLoadingSkeleton(false)
        }
    }, [limit, page])

    useEffect(() => {
        getOrderDetails()
    }, [page])

    return (
        <div className=''>
            <MenuSection name={'Orders'} />
            <section className=" lg:px-20 xl:container mx-auto 2xl:px-52 lg:mb-50 mb-30 ">
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
                            {OrderDetailsList.length > 0 ? (
                                <>
                                    {OrderDetailsList.map((order, index) => {

                                        return (
                                            <OrderCard order={order} key={index} setID={setID} />
                                        )
                                    })}
                                    <>
                                        {page < totalLengthRef.current && (
                                            <>
                                                {!loading && (
                                                    <div className='flex justify-center items-center gap-1  py-5'>
                                                        <div onClick={() => setPage((prev) => prev + 1)} className='flex justify-center items-center gap-1 text-green cursor-pointer hover:text-gray-500 duration-150'>
                                                            <h1 className='text-center   font-normal uppercase'>See More</h1>
                                                            <IoIosArrowDown className='text-xl' />

                                                        </div>

                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {loading && (
                                            <div className='flex justify-center items-center h-20 '>
                                                <p className='animate-spin border-3 border-transparent size-10 rounded-full border-l-green border-b-green'></p>
                                            </div>
                                        )}
                                    </>
                                </>
                            ) : (
                                <>
                                    {loadingSkeleton ? (

                                        <div className='flex flex-col gap-4 py-5'>
                                            {[...Array(limit)].map((_, index) => {
                                                return (

                                                    <div key={index} className='flex py-3  items-center gap-5 lg:text-sm sm:text-xs text-[0.5rem] rounded-md'>
                                                        <p className='w-3/12 lg:text-start lg:ps-5 text-center bg-gray-300 animate-pulse h-4 rounded-2xl'></p>
                                                        <p className='w-2/12 text-center bg-gray-300 animate-pulse h-4 rounded-2xl'></p>
                                                        <div className='w-3/12 flex justify-center items-center  bg-gray-300 animate-pulse h-4 rounded-2xl'> </div>
                                                        <p className='w-2/12 text-center bg-gray-300 animate-pulse h-4 rounded-2xl'></p>
                                                        <div className='w-2/12 flex justify-center items-center bg-gray-300 animate-pulse h-4 rounded-2xl'> </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center h-62'>
                                            <div className='text-2xl font-semibold text-gray-300'>Your Order Empty</div>
                                        </div>
                                    )}
                                </>
                            )}

                        </div>
                    </div>

                </div>
            </section>
            {id && <OrderDetails OrderList={OrderDetailsList} specificId={id} closerHandler={setID} />}
        </div>
    )
}

export default Orders