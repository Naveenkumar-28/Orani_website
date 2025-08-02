import { RootState } from '@/app/redux/store'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { CategoryListSkeleton } from './CategoryListSkeleton'

export const CategoryList = memo(() => {
    const { categoryList, loadingSkeleton } = useSelector((state: RootState) => state.BlogList)
    return (
        <>
            {categoryList && <div>
                <h4 className="text-xl font-normal mb-5">Categories</h4>
                <ul className="flex flex-col gap-4 text-sm">
                    {!loadingSkeleton ? (
                        <>
                            {categoryList?.map((category, index) => {
                                return (
                                    <li key={index} className="flex justify-between border-b border-gray-300 py-2">
                                        <h6>{category?.name}</h6>
                                        <p className="text-gray-400">({category?.count})</p>
                                    </li>
                                )
                            })}
                        </>
                    ) : (
                        <>
                            {Array.from({ length: 4 }).map((_, index) => (<CategoryListSkeleton key={index} />))}
                        </>
                    )}
                </ul>
            </div>}
        </>
    )
})
