import React from 'react'
import { BusinessOverviewSkeleton } from './BusinessOverviewSkeleton'
import { OrderSummaryChartSkeleton } from './OrderSummaryChartSkeleton'
import TopProductsSkeleton from './TopProductsSkeleton'
import { OverallReviewsSkeleton } from './OverallReviewsSkeleton'
import { RecentOrdersSkeleton } from './RecentOrdersSkeleton'

export function OverallSummmaryLoadingSkeleton() {
    return (
        <div className="px-5 flex sm:gap-5 gap-2 mb-10 flex-col animate-pulse">
            <div className="flex sm:gap-5 gap-2 xl:flex-row flex-col">

                {/* Left Section: BusinessOverview + OrderSummaryChart */}
                <div className="xl:w-8/12 flex flex-col sm:gap-5 gap-2 lg:max-h-full">
                    {/* BusinessOverview Skeleton */}
                    <BusinessOverviewSkeleton />

                    {/* OrderSummaryChart Skeleton */}
                    <OrderSummaryChartSkeleton />
                </div>

                {/* Right Section: TopProducts + OverAllReviews */}
                <div className="xl:w-4/12 flex xl:flex-col md:flex-row flex-col sm:gap-5 gap-2 justify-between">
                    {/* TopProducts Skeleton */}
                    <TopProductsSkeleton />

                    {/* OverAllReviews Skeleton */}
                    <OverallReviewsSkeleton />
                </div>
            </div>
            <RecentOrdersSkeleton />
        </div>

    )
}
