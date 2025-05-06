import { addBlogList } from '@/app/redux/slices/BlogSlice'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { IoCalendar } from 'react-icons/io5'
import { TbMessage } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'

function BlogSection() {
    const [page, setpage] = useState(1)
    const [limit, setLimit] = useState(3)
    const [loadingSkeleton, setLoadingSkeleton] = useState(false)

    const blogList = useSelector((state) => state.BlogList) || []
    const dispatch = useDispatch()


    //Get blog list from API
    const getBlogList = useCallback(async () => {
        setLoadingSkeleton(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&limit=${limit}`)
            if (response.data.success) {
                const { blogs } = response.data
                dispatch(addBlogList(blogs))
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoadingSkeleton(false)
        }
    }, [page, limit])

    useEffect(() => {
        getBlogList()
    }, [])

    return (
        <section id="blog"
            className=" container lg:px-20 mx-auto sm:px-5 md:px-20 2xl:px-52 relative select-none lg:mb-40 mb-30 pt-20 ">
            <div className="flex justify-center flex-col w-full items-center mb-10 mt-10">
                <h1 className="text-center font-extrabold lg:text-4xl text-3xl mb-4">From The Blog</h1>
                <div className="w-25 h-1 bg-[#7fad39]"></div>
            </div>
            <div className="grid gap-8 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 place-items-center">
                {!loadingSkeleton ? (
                    <>
                        {blogList.map((blog, index) => {

                            return <div key={index}
                                className=" bg-gray-50 w-[350px] rounded-sm overflow-hidden md:w-full pb-3 duration-500 hover:shadow-2xl hover:scale-105 ">
                                <div className="w-full h-62 overflow-hidden">
                                    <img src={blog?.imageUrl} className="w-full h-full object-cover" alt={blog?.name} />
                                </div>
                                <div className="w-full h-4/12 px-5 py-2 overflow-hidden">
                                    <div className="flex gap-5 items-center text-gray-400 mb-2">
                                        <div className="flex gap-1 items-center text-xs">
                                            <IoCalendar />
                                            <p>{blog?.createdAt} </p>
                                        </div>
                                        <div className="flex gap-1 justify-center items-center">
                                            <TbMessage className='text-sm' />
                                            <p className=' text-xs'>{blog?.comments}</p>
                                        </div>
                                    </div>
                                    <h1 className="font-medium mb-2 line-clamp-2">{blog?.name}</h1>
                                    <p className="text-sm text-gray-500 line-clamp-3">{blog?.description}</p>
                                </div>
                            </div>
                        })}
                    </>

                ) : (
                    <>
                        {[...Array(limit)].map((_, index) => {
                            return <div key={index}
                                className=" bg-gray-200 lg:w-full w-[350px] h-[350px] rounded-sm  animate-pulse"></div>
                        })}
                    </>
                )}
            </div>
        </section>
    )
}

export default BlogSection