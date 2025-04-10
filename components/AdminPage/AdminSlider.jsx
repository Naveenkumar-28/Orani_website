import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsInboxesFill } from 'react-icons/bs'
import { IoIosListBox } from 'react-icons/io'
import { IoClose, IoStatsChart } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'

function AdminSlider({ setShow }) {
    const pathName = usePathname()
    const [isvisible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                // Auto-close when screen size is lg or bigger
                setVisible(false)
                setTimeout(() => {
                    setShow(false)
                }, 500)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [setShow])


    const handleClose = useCallback(() => {
        setVisible(false)
        setTimeout(() => {
            setShow(false)
        }, 500);
    }, [])

    return (
        <div className='fixed top-0 left-0 h-full w-full z-50 lg:hidden '>
            <div className={`${isvisible ? "-translate-x-0" : "-translate-x-full"} duration-500 lg:w-3/12 h-screen py-5  w-10/12 sm:w-8/12 md:w-6/12 bg-white z-10 lg:hidden  border-r border-gray-300  px-5`}>
                <div className='flex justify-between mb-5'>
                    <div className='flex items-center gap-2'>
                        <IoStatsChart className='text-xl' />
                        <h1 className='font-semibold text-3xl'>Admin Panel</h1>
                    </div>
                    <button onClick={handleClose} className='text-3xl cursor-pointer hover:text-red-500'>
                        <IoClose />
                    </button>
                </div>
                <div className='flex flex-col gap-2 '>

                    <Link onClick={handleClose} href='dashboard' className={`${pathName == "/admin/dashboard" && "bg-green text-white"} flex gap-2 cursor-pointer py-2 items-center px-2 rounded-sm`}>
                        <MdSpaceDashboard />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link onClick={handleClose} href='products' className={`${pathName == "/admin/products" && "bg-green text-white"} flex gap-2 cursor-pointer py-2 items-center px-2 rounded-sm`}>
                        <BsInboxesFill />

                        <h1>Products</h1>
                    </Link>
                    <Link onClick={handleClose} href='orders' className={`${pathName == "/admin/orders" && "bg-green text-white"} flex gap-2 cursor-pointer py-2 items-center px-2 rounded-sm`}>
                        <IoIosListBox />
                        <h1>Orders</h1>
                    </Link>
                </div>
            </div>
            <div onClick={handleClose} className='bg-black absolute top-0 left-0 h-full w-full opacity-30 -z-1'>

            </div>
        </div>
    )
}

export default AdminSlider