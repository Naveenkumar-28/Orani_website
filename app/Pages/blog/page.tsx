"use client"
import React, { useEffect, useState } from 'react'
import MenuSection from '@/components/MenuSection'
import { IoCalendar, IoChatboxEllipses, IoClose, IoSearchOutline } from 'react-icons/io5'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addBlogList } from '@/app/redux/slices/BlogSlice'
import { FaUser } from 'react-icons/fa'

type BlogType = {
    _id: string,
    name: string,
    description: string,
    imageUrl: string,
    category: string,
    comments: [{
        name: string,
        imageUrl: string,
        message: string,
        createdAt: number,
        _id: string
    }],
    createdAt: number,
    __v?: number
}

function Blog() {
    const [searchCategory, setSearchCategory] = useState('')
    const [categoryCount, setCategoryCount] = useState<{ category: string, count: number }[]>([])

    const dispatch = useDispatch()
    const GetBlogList = async () => {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogList`)
            if (response.status < 300) {
                console.log({ BlogList: response.data });

                dispatch(addBlogList(response.data))
            }

        } catch (error) {
            console.log((error as Error).message);

        }
    }

    const BlogList: BlogType[] = useSelector((state: any) => state.BlogList) || []

    useEffect(() => {
        GetBlogList()

    }, [])
    useEffect(() => {
        const newMap = new Map()
        BlogList.map((blog) => {
            let categoryName = blog.category
            if (!newMap.has(categoryName)) {
                newMap.set(categoryName, 1)
            } else {
                newMap.set(categoryName, newMap.get(categoryName) + 1)

            }

        })
        let newList: { category: string, count: number }[] = []
        newMap.forEach((count, category) => newList.push({ category, count } as { category: string, count: number }))
        setCategoryCount(newList)
        console.log(newMap);
    }, [BlogList])

    const filterData = BlogList.filter((blog, index) => blog.category.toLowerCase().includes(searchCategory.toLowerCase()))

    return (
        <>
            <MenuSection name={'Blog'} />

            <section className="container lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-50 ">
                <div className="flex lg:flex-row flex-col lg:gap-10 gap-20 h-full">

                    {/* <!-- Blog Left Section  --> */}
                    <div className="xl:w-9/12 lg:w-8/12 w-full h-full flex flex-col gap-20">
                        {BlogList.length > 0 ? (
                            <>
                                {filterData.length > 0 ? (filterData.map((blog, index) => {
                                    const newdate = new Date(blog.createdAt)
                                    const currentdate = newdate.toDateString().split(' ').splice(1).join(' ')

                                    return (
                                        <div key={index} className="flex flex-col md:flex-row md:h-64 xl:h-[17rem] gap-5">
                                            <div className="lg:h-full xl:w-5/12 h-64 md:w-5/12 md:h-full sm:h-80 lg:w-6/12 w-full overflow-hidden">
                                                <img className="h-full w-full object-cover" src={blog.imageUrl} alt="blogImg" />
                                            </div>
                                            <div className="flex xl:7/12 lg:w-6/12 md:w-7/12 flex-col xl:gap-8 gap-5">
                                                <div className="flex gap-5 items-center text-gray-400 font-normal text-sm">
                                                    <div className='flex justify-center items-center gap-1'>
                                                        <IoCalendar className='text-xs' />
                                                        <p>{currentdate}</p>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-1'>
                                                        <FaUser className='text-xs' />
                                                        <p>Admin</p>
                                                    </div>
                                                    {blog.comments.length > 0 && <div className="flex justify-center items-center gap-1">
                                                        <IoChatboxEllipses />
                                                        {blog.comments.length}
                                                    </div>}

                                                </div>
                                                <div className="flex flex-col gap-5 xl:gap-6">
                                                    <h3 className="font-normal line-clamp-2 text-xl cursor-pointer hover:text-(--color-green)">
                                                        {blog.name}
                                                    </h3>
                                                    <p className="text-gray-600 line-clamp-3">{blog.description}</p>
                                                    <button
                                                        className="bg-(--color-green) shadow-2xl hover:text-(--color-green) hover:bg-white border-2 duration-300 hover:border-(--color-green) cursor-pointer text-white w-max px-4 py-2 rounded-full">Read
                                                        More</button>
                                                </div>

                                            </div>

                                        </div>
                                    )
                                })) : (
                                    <div className='flex justify-center items-center h-32'>

                                        <div className='text-gray-400 text-2xl '><span className='text-neutral-500'>{searchCategory} </span> this blog not found</div>
                                    </div>
                                )
                                }
                            </>

                        ) : (
                            <div className='flex justify-center items-center h-32'>

                                <div className='text-gray-400 text-2xl '>Loading . . .</div>
                            </div>
                        )}


                    </div>
                    {/* <!-- Blog Right section --> */}
                    <div className="lg:w-4/12   w-full h-full gap-20 flex flex-col">

                        {/* <!-- Search  --> */}
                        <div className="border border-gray-400 focus-within:border-green flex rounded-sm h-12 items-center">
                            <input value={searchCategory || ''} onChange={(e) => setSearchCategory(e.target.value)} type="text" className="w-10/12 ps-3 h-full outline-none placeholder:italic text-gray-500"
                                placeholder="Search" />
                            <div className="w-2/12 text-xl flex justify-center cursor-pointer hover:text-green" >
                                {searchCategory ? <IoClose className='text-gray-500' onClick={() => setSearchCategory('')} /> : <IoSearchOutline className='text-gray-500' />}
                            </div>

                        </div>

                        {/* <!-- Categorie  --> */}
                        <div>
                            <h4 className="text-xl font-normal mb-5">Categories</h4>
                            <ul className="flex flex-col gap-4 text-sm">
                                {categoryCount.map((list, index) => {
                                    return (

                                        <li key={index} className="flex justify-between border-b border-gray-300 py-2">
                                            <h6>{list.category}</h6>
                                            <p className="text-gray-400">({list.count})</p>
                                        </li>
                                    )
                                })}
                                {/* <li className="flex justify-between border-b border-gray-300 py-2">
                                    <h6>Fruits</h6>
                                    <p className="text-gray-400">(35)</p>
                                </li>
                                <li className="flex justify-between border-b border-gray-300 py-2">
                                    <h6>Juice</h6>
                                    <p className="text-gray-400">(18)</p>
                                </li>
                                <li className="flex justify-between border-b border-gray-300 py-2">
                                    <h6>Dries</h6>
                                    <p className="text-gray-400">(22)</p>
                                </li> */}
                            </ul>
                        </div>
                        {/* <!-- Recent Blog --> */}
                        <div className="flex flex-col">
                            <h4 className="text-xl font-normal mb-8">Recent Blog</h4>
                            <div className="flex flex-col gap-10">
                                {
                                    BlogList.map((blog, index) => {
                                        const newdate = new Date(blog.createdAt)

                                        const currentdate = newdate.toDateString().split(' ').splice(1).join(' ')
                                        return (
                                            <div key={index} className="w-full flex ">
                                                <div className="w-3/12 h-20">
                                                    <img className="h-full w-full object-cover" src={blog.imageUrl} alt="blog_Img" />
                                                </div>
                                                <div className="w-9/12 flex flex-col gap-5 ml-5">
                                                    <h5 className="text-base line-clamp-3 hover:text-green duration-200 cursor-pointer">
                                                        {blog.name}</h5>
                                                    <div className="flex text-xs gap-2 text-gray-400 flex-wrap">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <IoCalendar className='text-xs' />
                                                            {currentdate}
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1">
                                                            <FaUser className='text-xs' />
                                                            Admin
                                                        </div>
                                                        {blog.comments.length > 0 && (
                                                            <div className="flex items-center justify-center gap-1">
                                                                <IoChatboxEllipses className='text-xs' />
                                                                {blog.comments.length}
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blog