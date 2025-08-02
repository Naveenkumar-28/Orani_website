import { Pagination } from '@/app/pages/components'
import { RootState } from '@/app/redux/store'
import { LoadingIndicator } from '@/components'
import React, { SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { BlogCard } from './BlogCard'
import { BlogSearchInput } from './BlogSearchInput'
import { BlogCardSkeleton } from './BlogCardSkeleton'

type BlogLeftSectionPropsType = {
    search: string,
    setSearch: React.Dispatch<SetStateAction<string>>
    getBlogs: (value?: number) => void,
    limit: number
}

export function BlogLeftSection({ search, setSearch, getBlogs, limit }: BlogLeftSectionPropsType) {

    const { blogs, isLoading, page, totalPage, loadingSkeleton } = useSelector((state: RootState) => state.BlogList)

    return (
        <section className="xl:w-9/12 lg:w-8/12 w-full h-full flex flex-col gap-10">

            {/* <!--Small device Search  --> */}
            <BlogSearchInput search={search} setSearch={setSearch} className='lg:hidden flex' />

            {!isLoading ? (
                <>
                    {blogs.length > 0 ? (
                        <div className='flex flex-col gap-20'>
                            {!loadingSkeleton ? (
                                <>
                                    {blogs.map((blog, index) => {
                                        return (
                                            <BlogCard key={index} blog={blog} />
                                        )
                                    })}
                                    {page > 1 && (
                                        <div className='mb-10 lg:hidden'>
                                            <Pagination page={page} length={totalPage} callback={getBlogs} />
                                        </div>
                                    )}
                                </>

                            ) : (
                                <>
                                    {Array.from({ length: limit }).map((_, index) => {
                                        return <BlogCardSkeleton key={index} />
                                    })}
                                </>
                            )}

                        </div>
                    ) : (
                        <div className='flex justify-center items-center h-62'>
                            <p className='text-xl font-medium text-gray-400'>No blog found</p>
                        </div>
                    )}
                </>
            ) : (
                <div className='flex justify-center items-center h-62'>
                    <LoadingIndicator borderWidth='border-b-3 border-r-2' size='size-10' />
                </div>
            )}

        </section>
    )
}
