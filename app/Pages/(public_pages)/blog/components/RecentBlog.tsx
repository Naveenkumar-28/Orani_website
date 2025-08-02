import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoCalendar, IoChatboxEllipses } from 'react-icons/io5'
import { RecendBlogPropsType } from '../types'

export function RecentBlog({ blog }: RecendBlogPropsType) {
    return (
        <div className="w-full flex ">
            <div className="w-3/12 lg:h-20 sm:h-26 h-20">
                <img className="h-full w-full object-cover" src={blog?.imageUrl} alt="blog_Img" />
            </div>
            <div className="w-9/12 flex flex-col gap-2 lg:ml-3 xl:ml-5 ml-5">
                <h1 className=" text-sm line-clamp-3 hover:text-green duration-200 cursor-pointer">
                    {blog?.title}</h1>
                <h6 className=" line-clamp-2 text-xs font-light text-gray-400">
                    {blog?.description}</h6>
                <div className="flex text-xs gap-2 text-gray-500 flex-wrap">
                    <div className="flex items-center justify-center gap-1">
                        <IoCalendar className='text-xs' />
                        <span>{blog?.formattedDate}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <FaUser className=' text-[0.6rem]' />
                        <span>Admin</span>
                    </div>
                    {blog?.commentsCount > 0 && (
                        <div className="flex items-center justify-center gap-1">
                            <IoChatboxEllipses className='text-xs' />
                            <span className=''>{blog?.commentsCount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}