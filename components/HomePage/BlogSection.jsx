import React from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { IoCalendar } from 'react-icons/io5'
import { TbMessage } from 'react-icons/tb'

function BlogSection() {
    return (
        <section id="blog"
            className=" container lg:px-20 mx-auto sm:px-5 md:px-20 2xl:px-52 relative select-none mb-30 pt-20 ">
            <div className="flex justify-center flex-col w-full items-center mb-10 mt-10">
                <h1 className="text-center font-extrabold lg:text-4xl text-3xl mb-4">From The Blog</h1>
                <div className="w-25 h-1 bg-[#7fad39]"></div>
            </div>
            <div className="grid gap-8 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 place-items-center">

                <div
                    className="h-[420px] bg-gray-50 w-[350px] rounded-sm overflow-hidden md:w-full pb-3 duration-500 hover:shadow-2xl hover:scale-105 ">
                    <div className="w-full h-8/12 overflow-hidden">
                        <img src="/blog/blog-1.jpg" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="w-full h-4/12 px-5 py-2 overflow-hidden">
                        <div className="flex gap-5 items-center text-gray-400 mb-2">
                            <div className="flex gap-1 items-center text-xs">
                                <IoCalendar />
                                <p>May 4,2019 </p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <TbMessage className='text-sm' />
                                <p className=' text-xs'>5</p>
                            </div>
                        </div>
                        <h1 className="font-medium mb-2">Cooking tips make cooking simple</h1>
                        <p className="text-sm text-gray-500 line-clamp-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quae earum totam facilis
                            iste quas maiores, deleniti quibusdam, ab voluptas voluptates mollitia dolorum, nam atque
                            ducimus molestiae! Placeat, recusandae iste?
                        </p>
                    </div>
                </div>
                <div
                    className="h-[420px] bg-gray-50 w-[350px] rounded-sm overflow-hidden md:w-full pb-3 duration-500 hover:shadow-2xl hover:scale-105 ">
                    <div className="w-full h-8/12 overflow-hidden">
                        <img src="/blog/blog-2.jpg" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="w-full h-4/12 px-5 py-2 overflow-hidden">
                        <div className="flex gap-5 items-center text-gray-400 mb-2">
                            <div className="flex gap-1 items-center text-xs">
                                <IoCalendar />
                                <p>May 4,2019 </p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <TbMessage className='text-sm' />
                                <p className=' text-xs'>5</p>
                            </div>
                        </div>
                        <h1 className="font-medium mb-2">Cooking tips make cooking simple</h1>
                        <p className="text-sm text-gray-500 line-clamp-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quae earum totam facilis
                            iste quas maiores, deleniti quibusdam, ab voluptas voluptates mollitia dolorum, nam atque
                            ducimus molestiae! Placeat, recusandae iste?
                        </p>
                    </div>
                </div>
                <div
                    className="h-[420px] bg-gray-50 w-[350px] rounded-sm overflow-hidden md:w-full pb-3 duration-500 hover:shadow-2xl hover:scale-105 ">
                    <div className="w-full h-8/12 overflow-hidden">
                        <img src="/blog/blog-3.jpg" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="w-full h-4/12 px-5 py-2 overflow-hidden">
                        <div className="flex gap-5 items-center text-gray-400 mb-2">
                            <div className="flex gap-1 items-center text-xs">
                                <IoCalendar />
                                <p>May 4,2019 </p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                                <TbMessage className='text-sm' />
                                <p className=' text-xs'>5</p>
                            </div>
                        </div>
                        <h1 className="font-medium mb-2">Cooking tips make cooking simple</h1>
                        <p className="text-sm text-gray-500 line-clamp-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quae earum totam facilis
                            iste quas maiores, deleniti quibusdam, ab voluptas voluptates mollitia dolorum, nam atque
                            ducimus molestiae! Placeat, recusandae iste?
                        </p>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default BlogSection