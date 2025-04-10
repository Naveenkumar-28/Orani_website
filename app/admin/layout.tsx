"use client"
import React, { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import { BsInboxesFill } from 'react-icons/bs'
import { IoIosListBox } from 'react-icons/io'
import { MdSpaceDashboard } from 'react-icons/md'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
import { IoStatsChart } from 'react-icons/io5'
import { FiMenu } from 'react-icons/fi'
import AdminSlider from "../../components/AdminPage/AdminSlider";

function adminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathName = usePathname()
    const [isShow, setShow] = useState(false)

    return (
        <section className=' 2xl:container min-h-screen' >
            <div className='flex px-5 justify-between items-center border-b border-gray-300'>
                <div className='flex justify-center items-center py-5 gap-2'>
                    <IoStatsChart className='text-2xl' />
                    <h1 className='font-semibold text-3xl'>Admin Panel</h1>
                </div>
                <SignOutButton  >
                    <button className='bg-red-500 shadow-md lg:flex hidden cursor-pointer h-max px-5 py-2 font-medium outline-none rounded-lg text-white'>
                        Sign Out
                    </button>
                </SignOutButton>
                <div onClick={() => {
                    setShow(true)
                }} className='text-3xl cursor-pointer lg:hidden bg-green text-white p-1 rounded-md shadow-md'>
                    <FiMenu />
                </div>
            </div>
            <div className='flex'>
                <div className='lg:w-3/12 sticky top-0 h-screen py-5 hidden lg:block  border-r border-gray-300  px-5'>
                    <div className='flex flex-col gap-2 '>

                        <Link href='dashboard' className={`${pathName == "/admin/dashboard" && "bg-green text-white"} flex gap-2 cursor-pointer py-2 items-center px-2 rounded-sm`}>
                            <MdSpaceDashboard />
                            <h1>Dashboard</h1>
                        </Link>
                        <Link href='products' className={`${pathName == "/admin/products" && "bg-green text-white"} flex gap-2 cursor-pointer py-2 items-center px-2 rounded-sm`}>
                            <BsInboxesFill />

                            <h1>Products</h1>
                        </Link>
                        <Link href='orders' className={`${pathName == "/admin/orders" && "bg-green text-white"} flex gap-2 cursor-pointer py-2 items-center px-2 rounded-sm`}>
                            <IoIosListBox />
                            <h1>Orders</h1>
                        </Link>
                    </div>
                </div>
                <div className='lg:w-9/12 md:w-full min-w-[800px] px-5 bg-gray-50 max-h-full'>
                    {children}
                </div>
            </div>
            {isShow && <AdminSlider setShow={setShow} />}
        </section>
    )
}

export default adminLayout