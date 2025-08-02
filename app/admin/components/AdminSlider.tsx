import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { BsInboxesFill } from 'react-icons/bs'
import { IoIosListBox } from 'react-icons/io'
import { IoClose, IoStatsChart } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'
import { PiSignOutBold } from 'react-icons/pi'
import { bodyOverflowHandler } from '@/utils'
import { useSignoutHandler } from '../hooks'

export function AdminSlider({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
    const pathName = usePathname()
    const [isvisible, setVisible] = useState(false)
    const { isLoading, signOutHandler } = useSignoutHandler();

    useEffect(() => {
        setVisible(true)
        bodyOverflowHandler(true)
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                // Auto-close when screen size is lg or bigger
                handleClose()
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [setShow])


    const handleClose = useCallback(() => {
        setVisible(false)
        bodyOverflowHandler(false)
        setTimeout(() => {
            setShow(false)
        }, 500);
    }, [])

    return (
        <div className='fixed top-0 left-0 h-full w-full z-50 lg:hidden '>
            <div className={`${isvisible ? "-translate-x-0" : "-translate-x-full"} sm:py-2 duration-500 lg:w-3/12 h-full w-12/12 max-w-[360px] md:max-w-[400px] bg-white z-10 lg:hidden border-r border-gray-300  px-5`}>
                <div className='flex h-16 justify-between border-b border-gray-300 items-center '>
                    <div className='flex gap-2 items-center'>
                        <IoStatsChart className='md:text-2xl text-xl text-green' />
                        <h1 className='font-semibold text-2xl'>Admin Panel</h1>
                    </div>
                    <button onClick={handleClose} className='text-2xl text-gray-400 cursor-pointer hover:text-red-500'>
                        <IoClose />
                    </button>
                </div>
                <div className='h-[calc(100%-4rem)] flex flex-col justify-between sm:pt-8 pt-5 pb-8'>
                    <div className='flex flex-col sm:gap-5 gap-3 '>
                        <Link onClick={handleClose} href='dashboard' className={`${pathName == "/admin/dashboard" ? "bg-green text-white" : "hover:bg-gray-100"} flex gap-2 cursor-pointer py-2 sm:py-3 items-center px-3 sm:px-5 rounded-lg`}>
                            <MdSpaceDashboard className={`text-lg ${pathName != "/admin/dashboard" && "text-green"}`} />
                            <h1>Dashboard</h1>
                        </Link>
                        <Link onClick={handleClose} href='products' className={`${pathName == "/admin/products" ? "bg-green text-white" : "hover:bg-gray-100"} flex gap-2 cursor-pointer py-2 sm:py-3 items-center px-3 sm:px-5 rounded-lg`}>
                            <BsInboxesFill className={`text-md ${pathName != "/admin/products" && "text-green"}`} />

                            <h1>Products</h1>
                        </Link>
                        <Link onClick={handleClose} href='orders' className={`${pathName == "/admin/orders" ? "bg-green text-white" : "hover:bg-gray-100"} flex gap-2 cursor-pointer py-2 sm:py-3 items-center px-3 sm:px-5 rounded-lg`}>
                            <IoIosListBox className={`text-md ${pathName != "/admin/orders" && "text-green"}`} />
                            <h1>Orders</h1>
                        </Link>
                    </div>
                    <button disabled={isLoading} onClick={signOutHandler} className={`${isLoading ? "bg-gray-500" : "bg-red-500 active:ring-2 hover:opacity-90 active:ring-red-500"}  items-center gap-3  duration-200 shadow-md flex cursor-pointer sm:h-12 h-11 px-5 font-medium outline-none rounded-lg text-white justify-between`}>
                        <p >Sign Out</p>
                        {isLoading ? <div className='animate-spin border-3 border-b-transparent size-5 rounded-full'></div> : <PiSignOutBold className='text-lg' />}
                    </button>

                </div>
            </div>
            <div onClick={handleClose} className='bg-black absolute top-0 left-0 h-full w-full opacity-30 -z-1'>

            </div>
        </div>
    )
}