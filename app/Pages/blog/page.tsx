"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MenuSection from '@/components/MenuSection'
import { IoCalendar, IoChatboxEllipses, IoClose, IoSearchOutline } from 'react-icons/io5'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addBlogList } from '@/app/redux/slices/BlogSlice'
import { FaUser } from 'react-icons/fa'
import { BlogType } from '@/app/types'
import BlogSkeleton from "@/components/loadingSkeletons/BlogSkeleton";
import BlogCard from "@/components/BlogPage/BlogCard";
import { useDebounceEffect } from '@/hooks/useDebounceEffect'
import Pagination from '@/components/Pagination'
import { IoIosCloseCircle } from 'react-icons/io'


function Blog() {
    const [search, setSearch] = useState('')
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [loading, setLoading] = useState(false)
    const recentBlogRef = useRef<BlogType[]>([])
    const blogLengthRef = useRef<number>(0)
    const categoryListRef = useRef<{ name: string, count: number }[]>([])

    const dispatch = useDispatch()
    const BlogList: BlogType[] = useSelector((state: any) => state.BlogList) || []

    //Get blog list from API
    const getBlogList = useCallback(async (Page: number) => {
        if (search) setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog?page=${Page}&limit=${limit}&search=${search}`)
            if (response.data.success) {
                console.log(response.data)
                if (!search) {
                    const { blogs, total, category, recentBlog } = response.data
                    recentBlogRef.current = recentBlog
                    blogLengthRef.current = Math.ceil(total / limit)
                    categoryListRef.current = category
                    dispatch(addBlogList(blogs))
                } else {
                    const { blogs, total } = response.data

                    blogLengthRef.current = Math.ceil(total / limit)
                    dispatch(addBlogList(blogs))
                }
            }
        } catch (error) {
            console.log((error as Error).message);
        } finally {
            setLoadingSkeleton(false)
            setLoading(false)
        }
    }, [limit, search])


    useEffect(() => {
        getBlogList(1)
    }, [])

    useDebounceEffect(() => {
        setPage(1)
        getBlogList(1)
    }, [search], 500)


    return (
        <>
            {!loadingSkeleton ? (
                <>
                    <MenuSection name={'Blog'} />

                    <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-50 ">
                        <div className="flex lg:flex-row flex-col lg:gap-10 gap-20 h-full mb-20">

                            {/* <!-- Blog Left Section  --> */}
                            <section className="xl:w-9/12 lg:w-8/12 w-full h-full flex flex-col gap-20">
                                {/* <!--Small device Search  --> */}
                                <div className="lg:hidden border-2 border-gray-400 focus-within:shadow-2xl focus-within:border-green flex rounded-sm h-12 items-center">
                                    <input value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className="w-10/12 ps-3 h-full outline-none placeholder:italic text-gray-500"
                                        placeholder="Search" />
                                    <div className="w-2/12 text-xl flex justify-center cursor-pointer hover:text-green" >
                                        {search ? <IoIosCloseCircle className='text-gray-400 hover:bg-green  hover:text-white' onClick={() => setSearch('')} /> : <IoSearchOutline className='text-gray-500' />}
                                    </div>

                                </div>
                                {!loading ? (
                                    <>
                                        {BlogList.length > 0 ? (
                                            <>
                                                {BlogList.map((blog, index) => {

                                                    return (
                                                        <BlogCard key={index} blog={blog} />
                                                    )
                                                })}
                                                <div className='mb-10 lg:hidden'>
                                                    <Pagination page={page} length={blogLengthRef.current} callback={getBlogList} setPage={setPage} />
                                                </div>

                                            </>
                                        ) : (
                                            <div className='flex justify-center items-center h-62'>
                                                <p className='text-xl font-medium text-gray-400'>No blog found</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className='flex justify-center items-center h-62'>
                                        <div className='border-b-3 border-green border-r-2 rounded-full size-10 animate-spin'></div>
                                    </div>
                                )}

                            </section>
                            {/* <!-- Blog Right section --> */}
                            <section className="lg:w-4/12   w-full h-full gap-20 flex flex-col">

                                {/* <!--Large device Search  --> */}
                                <div className="border-2 hidden lg:flex border-gray-400 focus-within:shadow-2xl focus-within:border-green rounded-sm h-12 items-center">
                                    <input value={search || ''} onChange={(e) => setSearch(e.target.value)} type="text" className="w-10/12 ps-3 h-full outline-none placeholder:italic text-gray-500"
                                        placeholder="Search" />
                                    <div className="w-2/12 text-xl flex justify-center cursor-pointer hover:text-green" >
                                        {search ? <IoClose className='text-gray-400 hover:bg-green p-[1px] rounded-full hover:  hover:text-white' onClick={() => setSearch('')} /> : <IoSearchOutline className='text-gray-500' />}
                                    </div>

                                </div>

                                {/* <!-- Categorie  --> */}
                                <div>
                                    <h4 className="text-xl font-normal mb-5">Categories</h4>
                                    <ul className="flex flex-col gap-4 text-sm">
                                        {categoryListRef.current?.map((category, index) => {
                                            return (

                                                <li key={index} className="flex justify-between border-b border-gray-300 py-2">
                                                    <h6>{category?.name}</h6>
                                                    <p className="text-gray-400">({category?.count})</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                {/* <!-- Recent Blog --> */}
                                <div className="flex flex-col">
                                    <h4 className="text-xl font-normal mb-8">Recent Blog</h4>
                                    <div className="flex flex-col gap-10">
                                        {
                                            recentBlogRef?.current?.map((blog, index) => {
                                                return (
                                                    <div key={index} className="w-full flex ">
                                                        <div className="w-3/12 h-20">
                                                            <img className="h-full w-full object-cover" src={blog?.imageUrl} alt="blog_Img" />
                                                        </div>
                                                        <div className="w-9/12 flex flex-col gap-5 ml-5">
                                                            <h5 className="text-base line-clamp-3 hover:text-green duration-200 cursor-pointer">
                                                                {blog?.name}</h5>
                                                            <div className="flex text-xs gap-2 text-gray-400 flex-wrap">
                                                                <div className="flex items-center justify-center gap-1">
                                                                    <IoCalendar className='text-xs' />
                                                                    {blog?.createdAt}
                                                                </div>
                                                                <div className="flex items-center justify-center gap-1">
                                                                    <FaUser className='text-xs' />
                                                                    Admin
                                                                </div>
                                                                {blog?.comments > 0 && (
                                                                    <div className="flex items-center justify-center gap-1">
                                                                        <IoChatboxEllipses className='text-xs' />
                                                                        {blog?.comments}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {/* <!-- Tag Cloud  --> */}
                                <div>
                                    <h1 className="font-normal text-xl mb-6">Tag Cloud</h1>
                                    <ul className="flex flex-wrap gap-2 text-xs text-gray-600 uppercase">
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Fruits
                                        </li>
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Tomatoe
                                        </li>
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Mango</li>
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Apple</li>
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Carrots
                                        </li>
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Orange
                                        </li>
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Pepper
                                        </li>
                                        <li
                                            className="border w-max py-1 px-2 rounded-sm border-gray-500 cursor-pointer hover:bg-green hover:text-white duration-200 hover:border-transparent">
                                            Eggplant
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- Paragraph  --> */}
                                <div>
                                    <h1 className="font-normal text-xl mb-6">Paragraph</h1>
                                    <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit fuga autem
                                        sit vero qui molestiae
                                        amet nobis sunt minus. Numquam vitae natus, neque sint maiores velit rem nulla harum voluptas?
                                    </p>
                                </div>
                            </section>
                        </div>
                        <div className='mb-30 hidden lg:block'>
                            <Pagination page={page} length={blogLengthRef.current} callback={getBlogList} setPage={setPage} />
                        </div>
                    </section>
                </>
            ) : (
                <BlogSkeleton limit={limit} />
            )}
        </>
    )
}

export default Blog