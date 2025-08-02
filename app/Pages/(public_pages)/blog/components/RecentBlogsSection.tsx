import React, { memo } from 'react'
import { RecentBlog } from './RecentBlog'
import { RootState } from '@/app/redux/store'
import { useSelector } from 'react-redux'
import { RecentBlogSkeleton } from './RecentBlogSkeleton'

export const RecentBlogsSection = memo(() => {
    const { recentBlogs, loadingSkeleton } = useSelector((state: RootState) => state.BlogList)
    return (
        <div className="flex flex-col">
            <h4 className="text-xl font-normal mb-8">Recent Blog</h4>
            <div className="flex flex-col gap-10">
                {!loadingSkeleton ? (
                    <>
                        {
                            recentBlogs?.map((blog, index) => {
                                return (
                                    <RecentBlog key={index} blog={blog} />
                                )
                            })
                        }
                    </>
                ) : (
                    <>
                        {Array.from({ length: 3 }).map((_, index) => (<RecentBlogSkeleton key={index} />))}
                    </>
                )}
            </div>
        </div>
    )
})
