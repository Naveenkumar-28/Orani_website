import React, { useEffect, useState } from 'react'
import { RatingProgress } from './RatingProgress'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'

export function OverAllReviews() {
    const { data } = useSelector((state: RootState) => state.OverallSummary)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const total = data?.reviewBreakdown?.reduce((acc, value) => acc + value.count, 0) || 0
        setCount(total)
    }, [data])

    const breakdown = data?.reviewBreakdown?.length
        ? [...data.reviewBreakdown].sort((a, b) => b.rating - a.rating)
        : []

    return (
        <div className='w-full flex flex-col bg-white ring-1 shadow-md ring-gray-200 rounded-md px-5 py-8 gap-8 flex-1'>
            <div className='flex flex-col gap-1'>
                <h1 className='font-semibold sm:text-xl text-lg'>Reviews</h1>
                <p className='text-xs text-gray-500'>Overall reviews</p>
            </div>
            <div className='flex flex-col gap-5'>
                {breakdown.map((item) => (
                    <RatingProgress
                        key={item.rating}
                        stars={item.rating}
                        value={count > 0 ? (item.count / count) * 100 : 0}
                    />
                ))}
            </div>
        </div>
    )
}
