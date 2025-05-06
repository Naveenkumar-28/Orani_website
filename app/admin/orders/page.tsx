"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoIosCloseCircle, IoIosSearch } from 'react-icons/io'
import OrderDetails from "../../../components/OrderDetails";
import axios from 'axios';
import { TbRefresh } from 'react-icons/tb';
import OrderCard from '@/components/AdminPage/OrderCard';
import { OrderType } from '@/components/AdminPage/types';
import Dropdown from '@/components/Dropdown';
import { RiFilter3Line } from 'react-icons/ri';

function OrdersSection() {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [OrderDetailsList, setOrderDetailsList] = useState<{ total: number, orders: OrderType[] }>({ total: 0, orders: [] })
    const [id, setID] = useState<string>('')
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const [limit, setLimit] = useState(9)
    const [page, setPage] = useState(1)
    const scrollTimeout = useRef<NodeJS.Timeout>(null)
    const [statusFilter, setStatusFilter] = useState('all')
    const [loader, setLoader] = useState(false)
    const firstTimeLoaing = useRef(false)
    const loaderRef = useRef(false)


    //Fetching the data order list
    const getOrdersList = useCallback(async (isRefresh = false) => {
        if (isRefresh) {
            setSearch('')
            setStatusFilter('all')
            if (page > 1) setPage(1)
            return
        }
        if (firstTimeLoaing.current && !loaderRef.current) setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders?limit=${limit}&page=${page}&search=${search}&status=${statusFilter == 'all' ? '' : statusFilter}`)

            if (response.data.success) {
                console.log(response.data);
                const { total, orders } = response.data
                setOrderDetailsList((prev) => {
                    return {
                        ...prev,
                        total: Math.ceil(total / limit),
                        orders: page == 1 ? orders : [...prev.orders, ...orders]
                    }
                })
            }

        } catch (error) {
            console.log({ error: (error as Error).message })
        } finally {
            setLoadingSkeleton(false)
            setLoading(false)
            setLoader(false)
            firstTimeLoaing.current = true
            loaderRef.current = false
        }

    }, [limit, page, search, statusFilter])

    //Every page change fach the orders list
    useEffect(() => {
        getOrdersList()
    }, [page])

    //Every 300ms after search or status change, set page to 1
    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (page == 1) return getOrdersList()
            setPage(1)
        }, 300);
        return () => clearTimeout(timeOut)
    }, [statusFilter, search])

    //Scroll event for pagination
    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {

                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                    if (page < OrderDetailsList?.total) {
                        loaderRef.current = true
                        setLoader(true)
                        setPage(prev => prev + 1);
                    }
                }
            }, 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current); // Cleanup timeout
        };
    }, [page, OrderDetailsList.total]);

    return (
        <div className='mb-5 min-h-dvh'>
            <div className='flex justify-between items-center px-5'>
                <h1 className='py-5 font-semibold lg:text-2xl text-lg uppercase'>All Orders</h1>
                <div className='flex justify-center items-center lg:gap-5 gap-2'>
                    <Dropdown icon={<RiFilter3Line className='text-lg text-gray-500' />} dropdownInputPadding='py-2 px-5 text-gray-600' dropdownOuterWidth='w-42' dropdownPosition='top-12' className='' status={statusFilter} onClick={setStatusFilter} renderItems={["all", "pending", "confirmed", "shipping", "delivered", "cancelled"]} />

                    <button aria-label="Refresh Orders" onClick={() => getOrdersList(true)} className='bg-green group text-white p-2 rounded-sm cursor-pointer shadow-md active:shadow-none'>
                        <TbRefresh className={`text-2xl ${loadingSkeleton && "animate-spin"}`} />
                    </button>
                    <div className='flex  items-center  px-3 py-2 rounded-sm border-2 border-gray-400 text-xs sm:text-sm md:text-base  focus-within:border-green'>
                        <input aria-label="Search Orders" value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className='border-none outline-none text-gray-600' placeholder='Search Order' />
                        {!search ? <IoIosSearch className='text-xl ml-2 text-gray-400' /> : <IoIosCloseCircle onClick={() => setSearch('')} className='text-xl ml-2 cursor-pointer text-gray-400 hover:text-green' />}

                    </div>
                </div>
            </div>
            <div className="overflow-y-auto px-5">
                <div className='xl:w-full lg:min-w-[700px] min-w-[800px] '>
                    <div className='flex py-3 border-b-2 border-gray-300 text-gray-500 gap-5 mb-2 xl:text-base lg:text-[0.8em] text-sm '>
                        <p className='w-3/12 lg:text-start lg:ps-5 text-center '>Order ID</p>
                        <p className='w-2/12 text-center'>Order Date</p>
                        <p className='w-3/12 text-center'>Order Status</p>
                        <p className='w-2/12 text-center'>Order Price</p>
                        <p className='w-2/12 text-center'>Show Details</p>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <>
                            {!loadingSkeleton ? (
                                <>
                                    {loading ? (
                                        <div className='flex justify-center items-center h-80'>
                                            <div className='animate-spin size-10 border-b-3 border-r-3  border-green rounded-full'>
                                            </div>
                                        </div>
                                    ) : (

                                        <>
                                            {OrderDetailsList?.orders?.length > 0 ? (
                                                <>
                                                    {OrderDetailsList?.orders?.map((order, index) => {
                                                        return <OrderCard order={order} key={index} setID={setID} />

                                                    })}
                                                    {
                                                        <div className='h-20 flex justify-center items-center'>
                                                            {
                                                                loader && (
                                                                    <div className='animate-spin size-10 border-b-3 border-r-3 border-green rounded-full'>

                                                                    </div>

                                                                )
                                                            }
                                                        </div>
                                                    }
                                                </>
                                            ) : (<div className='flex justify-center items-center h-62'>
                                                <p className='text-center text-gray-400 text-xl font-medium'>No orders found</p>

                                            </div>)}
                                        </>
                                    )}
                                </>

                            ) : (

                                <div className='flex flex-col gap-4'>
                                    {[...Array(limit)].map((_, index) => {
                                        return (

                                            <div key={index} className='flex py-2  items-center gap-5 '>
                                                <p className='w-3/12 lg:text-start lg:ps-5 text-center bg-gray-200 animate-pulse h-6 rounded-sm'></p>
                                                <p className='w-2/12 text-center bg-gray-200 animate-pulse h-6 rounded-sm'></p>
                                                <p className='w-3/12 flex justify-center items-center  bg-gray-200 animate-pulse h-10 rounded-full'> </p>
                                                <p className='w-2/12 text-center bg-gray-200 animate-pulse h-6 rounded-sm'></p>
                                                <p className='w-2/12 flex justify-center items-center bg-gray-200 animate-pulse h-10 rounded-full'> </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                        </>
                    </div>
                </div>
            </div>
            {id && <OrderDetails OrderList={OrderDetailsList.orders} specificId={id} editMode={true} ResetHandler={getOrdersList} closerHandler={setID} />}
        </div>
    )
}

export default OrdersSection