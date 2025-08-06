import { AppDispatch, RootState } from '@/app/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../(public_pages)/blog/redux'
import { BlogCard } from './BlogCard'
import { BlogCardSkeleton } from './BlogCardSkeleton'

export function BlogSection() {
    const [limit, setLimit] = useState(3)
    const { blogs, loadingSkeleton } = useSelector((state: RootState) => state.BlogList) || []
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchBlogs({ limit }))
    }, [])

    return (
        <section
            className=" mediaQuary relative select-none lg:mb-40 mb-30 lg:pt-20 pt-10 ">
            <div className="flex justify-center flex-col w-full items-center lg:mb-15 mb-10 lg:mt-10 gap-2 md:gap-5">
                <h1 className="text-center font-extrabold lg:text-4xl md:text-3xl text-3xl mb-1 text-gray-700">Our <span className='text-green'>Blogs</span></h1>
                <div className='sm:text-sm text-xs font-light text-gray-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque quae id, quisquam distinctio</div>
            </div>
            <div className="grid lg:gap-5 sm:gap-5 gap-3 min-[480px]:grid-cols-2 grid-cols-1 lg:grid-cols-3 ">
                {!loadingSkeleton ? (
                    <>
                        {blogs.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))}
                    </>

                ) : (
                    <>
                        {[...Array(limit)].map((_, index) => (<BlogCardSkeleton key={index} />))}
                    </>
                )}
            </div>
        </section>
    )
}