"use client"
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import MenuSection from '@/components/MenuSection'
import OrderDetails from '@/components/OrdersPage/OrderDetails';
import { OrdersType } from '@/components/AdminPage/types';

function Orders() {
    const [OrderDetailsList, setOrderDetailsList] = useState<OrdersType[]>([])
    const [id, setID] = useState('')
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)



    useEffect(() => {

        const getOrderDetails = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
                if (response.status < 300) {
                    console.log(response.data);
                    setOrderDetailsList(response.data)

                }

            } catch (error) {
                console.log({ error: (error as Error).message })
            } finally {

                setLoadingSkeleton(false)
            }
        }
        getOrderDetails()
    }, [])

    const statusColor = useCallback((color: String) => {
        return color == 'pending' ? "bg-amber-400" : color == "confirmed" ? "bg-green-500" : color == "shipping" ? 'bg-green' : color == "delivered" ? "bg-black" : color == "cancelled" ? "bg-red-500" : ''
    }, [])

    const bodyOverflowHandler = (isActive: boolean) => {
        if (isActive) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

    }


    return (
        <div className=''>
            <MenuSection name={'Orders'} />
            <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 lg:mb-50 mb-20">
                <div className='flex py-6 bg-green text-white gap-5 lg:text-base  sm:text-sm text-[0.5rem]'>
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
                                const date = new Date(order?.createdAt)
                                return (
                                    <div key={index} className='flex py-5 border-b border-gray-200  items-center gap-5 lg:text-sm sm:text-xs text-[0.5rem] hover:bg-gray-50 '>
                                        <p className='w-3/12 lg:text-start lg:ps-5 text-center'>{order?._id}</p>
                                        <p className='w-2/12 text-center'>{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</p>

                                        <div className='w-3/12  gap-2 flex justify-center'>
                                            <p className={`w-6/12 relative uppercase flex justify-center py-2 items-center text-white px-2 rounded-full ${statusColor(order?.orderStatus.toLowerCase())}`}>
                                                {order?.orderStatus}
                                            </p>
                                        </div>

                                        <p className='w-2/12 text-center'>₹{order?.totalPrice}</p>
                                        <div className='w-2/12 flex justify-center items-center'>
                                            <button onClick={() => {
                                                setID(order?._id)
                                                bodyOverflowHandler(true)
                                            }} className='bg-gray-500 text-white rounded-full px-3 py-2 max-w-max cursor-pointer'>View Details</button>
                                        </div>
                                    </div>

                                )
                            })}
                        </>
                    ) : (
                        <>
                            {loadingSkeleton ? (

                                <div className='flex flex-col gap-4 py-5'>
                                    {[...Array(6)].map((_, index) => {
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
            </section>

            {id && <OrderDetails setID={setID} id={id} OrderDetailsList={OrderDetailsList} bodyOverflowHandler={bodyOverflowHandler} />}
        </div>
    )
}

export default Orders