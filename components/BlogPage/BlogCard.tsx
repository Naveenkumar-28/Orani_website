import { BlogType } from '@/app/types';
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoCalendar, IoChatboxEllipses } from 'react-icons/io5'

type blogPropsType = {
    blog: BlogType;
}

function BlogCard({ blog }: blogPropsType) {
    return (
        <div className="flex flex-col md:flex-row md:h-64 xl:h-[17rem] gap-5">
            <div className="lg:h-full xl:w-5/12 h-64 md:w-5/12 md:h-full sm:h-80 lg:w-6/12 w-full overflow-hidden">
                <img className="h-full w-full object-cover" src={blog.imageUrl} alt="blogImg" />
            </div>
            <div className="flex xl:7/12 lg:w-6/12 md:w-7/12 flex-col xl:gap-8 gap-5">
                <div className="flex gap-5 items-center text-gray-400 font-normal text-sm">
                    <div className='flex justify-center items-center gap-1'>
                        <IoCalendar className='text-xs' />
                        <p>{blog?.createdAt}</p>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <FaUser className='text-xs' />
                        <p>Admin</p>
                    </div>
                    {blog.comments > 0 && <div className="flex justify-center items-center gap-1">
                        <IoChatboxEllipses />
                        {blog?.comments}
                    </div>}

                </div>
                <div className="flex flex-col gap-5 xl:gap-6">
                    <h3 className="font-normal line-clamp-2 text-xl cursor-pointer hover:text-green">
                        {blog.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">{blog.description}</p>
                    <button
                        className="bg-green shadow-2xl hover:text-green hover:bg-white border-2 duration-300 border-transparent hover:border-green cursor-pointer text-white w-max px-4 py-2 rounded-full">Read
                        More</button>
                </div>

            </div>

        </div>
    )
}

export default BlogCard