"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { OrderDetailsModel } from "@/components";
import { OrderCardSkeleton, OrderList, OrderSearchAndFilters, OrderSummaryCards, OrderTableHeader } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDebounceEffect } from '@/hooks';
import { getOrders } from './redux/api';
import { OrderType } from '../../types';

type fetchOrdersType = {
    Page?: number;
    changePage?: boolean;
    filtering?: boolean;
}

function OrdersSection() {
    const [search, setSearch] = useState<string>('')
    const [isModelOpen, setIsModelOpen] = useState<OrderType | null>(null)
    const [limit, setLimit] = useState(9)
    const [statusFilter, setStatusFilter] = useState('all')
    const firstRunRef = useRef(true);
    const sentinelRef = useRef(null);

    const { orders, loadingSkeleton, isLoading, totalPage, page } = useSelector((state: RootState) => state.AdminOrders)


    const dispatch = useDispatch<AppDispatch>()

    // //Fetching the data order list
    const fetchOrders = useCallback(({ changePage = false, filtering = false, Page }: fetchOrdersType) => {
        dispatch(getOrders({ page: Page || 1, limit, search, status: statusFilter, changePage, filtering }))
    }, [limit, statusFilter, search, dispatch])

    //Every page change fach the orders list
    useEffect(() => {
        if (orders.length > 0) return
        dispatch(getOrders({ page: 1, limit, search, status: statusFilter, firstTimeLoad: true }))
    }, [])

    //Every 300ms after search or status change, set page to 1
    useDebounceEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
            return;
        }
        fetchOrders({ filtering: true, Page: 1 })
    }, [statusFilter, search], 300)


    //Load more orders when reaching the end of the list
    const loadMore = useCallback(() => {

        if (page < totalPage && !loadingSkeleton) {
            fetchOrders({ Page: page + 1, changePage: true });
        }
    }, [page, totalPage, loadingSkeleton, fetchOrders]);

    // Intersection observer to load more orders when reaching the end of the list
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {

                const [entry] = entries;
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            {
                root: null, // use viewport
                rootMargin: "0px",
                threshold: 1.0 // 100% visible
            }
        );

        const current = sentinelRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [loadMore, orders]);

    //Refresh handler to reset filters and fetch orders
    const refreshHandler = useCallback(() => {
        setSearch('')
        setStatusFilter('all')
        dispatch(getOrders({ firstTimeLoad: true, page: 1 }))
    }, [dispatch])

    return (
        <div className='mb-5  min-h-dvh'>
            <div className=" overflow-y-auto px-5 min-h-dvh">
                <div className='xl:w-full lg:min-w-[700px] min-w-[800px]'>

                    <OrderSummaryCards />

                    <OrderSearchAndFilters
                        isLoading={loadingSkeleton}
                        setStatusFilter={setStatusFilter}
                        statusFilter={statusFilter}
                        refreshHandler={refreshHandler}
                        search={search}
                        setSearch={setSearch} />

                    <OrderTableHeader />

                    <div className='flex gap-2 flex-col'>
                        <>
                            {!loadingSkeleton ? (
                                <OrderList setIsModel={setIsModelOpen} sentinelRef={sentinelRef} />

                            ) : (

                                <div className='flex flex-col gap-4'>
                                    {Array.from({ length: limit }).map((_, index) => {
                                        return (
                                            <OrderCardSkeleton key={index} />
                                        )
                                    })}
                                </div>
                            )}

                        </>
                    </div>
                </div>
            </div>
            {isModelOpen && <OrderDetailsModel loading={isLoading} order={isModelOpen} editMode={true} closerHandler={setIsModelOpen} />}
        </div>
    )
}

export default OrdersSection