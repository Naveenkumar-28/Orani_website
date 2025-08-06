"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MenuSection } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounceEffect } from '@/hooks/useDebounceEffect'
import { Pagination } from '@/app/tempPages/components/Pagination'
import { AppDispatch, RootState } from '@/app/redux/store'
import { fetchBlogs } from './redux'
import { BlogLeftSection, BlogRightSection } from './components'

function Blog() {
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(4)
    const dispatch = useDispatch<AppDispatch>()
    const firstTimeRender = useRef(true)

    const { page, totalPage, loadingSkeleton } = useSelector((state: RootState) => state.BlogList)

    //Get blogs from API
    const getBlogs = useCallback((Page?: number) => {
        dispatch(fetchBlogs({ page: Page || 1, search, limit }))
    }, [search, limit])

    useEffect(() => {
        dispatch(fetchBlogs({ page, limit, firstTimeLoding: true }))
    }, [])

    useDebounceEffect(() => {
        if (!firstTimeRender.current) {
            !loadingSkeleton ? getBlogs(1) : null
        } else {
            firstTimeRender.current = false
        }
    }, [search], 500)


    return (
        <>
            <MenuSection name={'Blog'} />
            <section className="mediaQuary mb-50 mt-10 lg:mt-15 xl:mt-20 ">
                <div className="flex lg:flex-row flex-col lg:gap-10 gap-20 h-full mb-20">

                    {/* <!-- Blog Left Section  --> */}
                    <BlogLeftSection search={search} limit={limit} setSearch={setSearch} getBlogs={getBlogs} />

                    {/* <!-- Blog Right section --> */}
                    <BlogRightSection search={search} setSearch={setSearch} />
                </div>
                {!loadingSkeleton && (

                    <div className='mb-30 hidden lg:block'>
                        <Pagination page={page} length={totalPage} callback={getBlogs} />
                    </div>
                )}
            </section>
        </>
    )
}

export default Blog