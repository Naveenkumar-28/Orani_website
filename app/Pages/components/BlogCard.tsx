import { BlogType } from '@/app/types'
import React from 'react'
import { IoCalendar } from 'react-icons/io5'
import { TbMessage } from 'react-icons/tb'

export function BlogCard({ blog }: { blog: BlogType }) {
    return (
        <div
            className="sm:max-w-fit border-gray-100 rounded-md overflow-hidden md:w-full pb-3 duration-200 border-2 md:hover:border-green active:scale-95 md:hover:shadow-lg">
            <div className="w-full xl:h-62 sm:h-44 h-36 overflow-hidden">
                <img src={blog?.imageUrl} className="w-full h-full object-cover" alt={blog?.title} />
            </div>
            <div className="w-full px-5 py-2 overflow-hidden">
                <div className="flex gap-5 items-center text-gray-400 mb-2">
                    <div className="flex gap-1 items-center sm:text-xs text-[0.6rem]">
                        <IoCalendar />
                        <p>{blog?.formattedDate} </p>
                    </div>

                    {blog?.commentsCount > 0 && (
                        <div className="flex gap-1 justify-center items-center sm:text-xs text-[0.6rem]">
                            <TbMessage className='' />
                            <p className=''>{blog?.commentsCount}</p>
                        </div>
                    )}

                </div>
                <h1 className="font-medium mb-2 line-clamp-2 text-xs md:text-sm">{blog?.title}</h1>
                <p className=" text-gray-500 line-clamp-3 sm:text-xs text-[0.6rem] font-light text-wrap">{blog?.description}</p>
            </div>
        </div>
    )
}
