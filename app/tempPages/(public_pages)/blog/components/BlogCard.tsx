import { BlogType } from '@/app/types';
import { Button } from '@/components';
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoCalendar, IoChatboxEllipses } from 'react-icons/io5'

type blogPropsType = {
    blog: BlogType;
}

export function BlogCard({ blog }: blogPropsType) {

    return (
        <div className="flex flex-col md:flex-row md:h-64 xl:h-[17rem] gap-5">
            <div className="lg:h-full xl:w-5/12 h-64 md:w-5/12 md:h-full sm:h-80 lg:w-6/12 w-full overflow-hidden">
                <img className="h-full w-full object-cover" src={blog.imageUrl} alt="blog_img" />
            </div>
            <div className="flex xl:7/12 lg:w-6/12 md:w-7/12 flex-col xl:gap-6 lg:gap-5 md:gap-7 gap-5">
                <div className="flex gap-5 items-center text-gray-400 font-normal text-sm">
                    <div className='flex justify-center items-center gap-1'>
                        <IoCalendar className='text-xs' />
                        <p>{blog?.formattedDate}</p>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <FaUser className='text-xs' />
                        <p>Admin</p>
                    </div>
                    {blog.commentsCount > 0 && <div className="flex justify-center items-center gap-1">
                        <IoChatboxEllipses />
                        {blog?.commentsCount}
                    </div>}

                </div>
                <div className="flex flex-col gap-3 xl:gap-6">
                    <h3 className="font-normal line-clamp-2 lg:text-xl md:text-lg cursor-pointer hover:text-green text-base">
                        {blog.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 font-light lg:text-base text-sm">{blog.description}</p>
                </div>
                <Button title='Read More' className='w-fit text-xs md:text-sm lg:text-base' />
            </div>

        </div>
    )
}
