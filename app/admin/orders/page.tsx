"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { IoIosCloseCircle, IoIosSearch } from 'react-icons/io'
import OrderDetails from "../../../components/AdminPage/OrderDetails";
import axios from 'axios';
import { TbRefresh } from 'react-icons/tb';
import OrderCard from '@/components/AdminPage/OrderCard';
import { OrderType } from '@/components/AdminPage/types';

function OrdersSection() {
    const [search, setSearch] = useState<string>('')
    const [OrderDetailsList, setOrderDetailsList] = useState<{ total: number, orders: OrderType[] }>({ total: 0, orders: [] })
    const [id, setID] = useState('')
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const [limit, setLimit] = useState(9)
    const [page, setPage] = useState(1)
    const [searchOrderList, setSearchOrderList] = useState<OrderType[]>([])



    const getOrdersList = useCallback(async () => {
        setLoadingSkeleton(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders?limit=${limit}&page=${page}`)

            if (response.data.success) {
                console.log(response.data);
                setOrderDetailsList((prev) => {
                    return { ...prev, total: Math.ceil(response.data.total / limit), orders: [...prev.orders, ...response.data.orders] }
                })
            }

        } catch (error) {
            console.log({ error: (error as Error).message })
        } finally {

            setLoadingSkeleton(false)
        }
    }, [limit, page])

    const getSearch = useCallback(async () => {
        if (search) {

            setLoadingSkeleton(true)
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders?search=${search && search}`)

                if (response.data.success) {
                    console.log({ "SearchOrder": response.data });

                    setSearchOrderList(response.data.orders)
                }

            } catch (error) {
                console.log({ error: (error as Error).message })
            } finally {

                setLoadingSkeleton(false)
            }
        }
    }, [search])

    useEffect(() => {
        getOrdersList()
    }, [page])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            getSearch()
        }, 300);
        return () => clearTimeout(timeOut)
    }, [search])

    const statusColor = useCallback((color: String) => {
        return color == 'pending' ? "bg-amber-400" : color == "confirmed" ? "bg-green-500" : color == "shipping" ? 'bg-green' : color == "delivered" ? "bg-black" : color == "cancelled" ? "bg-red-500" : ''
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {

                if (page < OrderDetailsList?.total) {
                    setPage(prev => prev + 1)
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Properly remove listener
    }, [page, OrderDetailsList.total]);

    console.log(OrderDetailsList.orders);
    console.log(searchOrderList);

    return (
        <div className='mb-20'>

            <div className='flex justify-between items-center '>

                <h1 className='py-5 font-semibold lg:text-2xl text-lg uppercase'>All Orders</h1>
                <div className='flex justify-center items-center lg:gap-5 gap-2'>

                    <button onClick={getOrdersList} className='bg-green group text-white p-2 rounded-sm cursor-pointer shadow-md active:shadow-none'>
                        <TbRefresh className={`text-2xl ${loadingSkeleton && "animate-spin"}`} />
                    </button>
                    <div className='flex items-center px-3 py-2 rounded-sm border-2 border-gray-400 text-xs sm:text-sm md:text-base  focus-within:border-green'>
                        <input value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className='border-none outline-none' placeholder='Search Order' />
                        {!search ? <IoIosSearch className='text-xl ml-2 text-gray-400' /> : <IoIosCloseCircle onClick={() => setSearch('')} className='text-xl ml-2 cursor-pointer text-gray-400 hover:text-green' />}

                    </div>
                </div>
            </div>
            <div className='flex py-3 border-b-2 border-gray-300 text-gray-500 gap-5 mb-2 lg:text-base  sm:text-sm text-[0.5rem]'>
                <p className='w-3/12 lg:text-start lg:ps-5 text-center '>Order ID</p>
                <p className='w-2/12 text-center'>Order Date</p>
                <p className='w-3/12 text-center'>Order Status</p>
                <p className='w-2/12 text-center'>Order Price</p>
                <p className='w-2/12 text-center'>Show Details</p>
            </div>
            <div className='flex gap-2 flex-col'>

                {search ? (
                    <>
                        {searchOrderList?.length > 0 ? (
                            <>
                                {searchOrderList?.map((order, index) => {
                                    return <OrderCard order={order} key={index} setID={setID} statusColor={statusColor} />
                                })}
                            </>

                        ) : (
                            <div className='flex justify-center items-center h-62'>
                                <div className='text-2xl font-semibold text-gray-300'>{search} not found</div>
                            </div>
                        )}
                    </>

                ) : (
                    <>
                        {OrderDetailsList?.orders?.length > 0 ? (
                            <>
                                {OrderDetailsList?.orders?.map((order, index) => {
                                    return <OrderCard order={order} key={index} setID={setID} statusColor={statusColor} />

                                })}
                            </>
                        ) : (
                            <>
                                {loadingSkeleton ? (

                                    <div className='flex flex-col gap-4'>
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
                                        <div className='text-2xl font-semibold text-gray-300'>Order not found</div>
                                    </div>
                                )}
                            </>

                        )}
                    </>
                )}
            </div>

            {id && <OrderDetails setPage={setPage} setID={setID} id={id} statusColor={statusColor} limit={limit} />}
        </div>
    )
}

export default OrdersSection