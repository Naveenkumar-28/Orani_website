"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { BusinessOverview, OrderSummaryChart, OverAllReviews, OverallSummmaryLoadingSkeleton, TopProducts } from './components';
import { getOverallSummary } from './redux';

function Dashboard() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading } = useSelector((state: RootState) => state.OverallSummary)

    useEffect(() => {
        if (data) return
        dispatch(getOverallSummary())
    }, [])


    return (
        <>
            {
                !loading ? (
                    <div className=' px-5 flex gap-5 flex-col'>
                        <div className='flex sm:gap-5 gap-2 mb-10 xl:flex-row flex-col'>
                            <div className='xl:w-8/12 flex flex-col sm:gap-5 gap-2 lg:max-h-full'>
                                <BusinessOverview />
                                <OrderSummaryChart />
                            </div>
                            <div className='xl:w-4/12 flex xl:flex-col md:flex-row flex-col sm:gap-5 gap-2 max-h-full justify-between'>
                                <TopProducts />
                                <OverAllReviews />
                            </div>
                        </div>

                    </div>
                ) : (
                    <OverallSummmaryLoadingSkeleton />
                )
            }
        </>

    )
}

export default Dashboard