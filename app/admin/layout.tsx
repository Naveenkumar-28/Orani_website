"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BsInboxesFill } from 'react-icons/bs'
import { IoIosListBox } from 'react-icons/io'
import { MdSpaceDashboard } from 'react-icons/md'
import Link from 'next/link'
import { IoStatsChart } from 'react-icons/io5'
import { FiMenu } from 'react-icons/fi'
import { AdminSlider } from "./components";
import { PiSignOutBold } from 'react-icons/pi'
import { bodyOverflowHandler, createSendMessage } from '@/utils'
import { FullScreenLoader, LogoutConfirmation } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { authLogout, getUserdetails } from '../redux'
import { useUserData } from '@/hooks'


function adminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathName = usePathname()
    const [isShow, setShow] = useState(false)
    const [isOpenConfirmation, setOpenConfirmation] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const sendmessage = createSendMessage()

    const logoutConfirmationCloseHandler = useCallback(() => {
        setOpenConfirmation(false)
        bodyOverflowHandler(false)
    }, [bodyOverflowHandler])

    const { isLoading, user } = useUserData()

    useEffect(() => {
        const loadUser = async () => {
            if (!user) {
                await dispatch(getUserdetails()).unwrap();
            }
        };
        loadUser();
    }, []);


    // Logout handler
    const logoutHandler = useCallback(async () => {
        logoutConfirmationCloseHandler()
        try {
            await dispatch(authLogout()).unwrap()
            sendmessage.success("Logout successfully")
            router.replace('/auth/login')
        } catch (error) {
            sendmessage.error("Logout failed!")
        }
    }, [sendmessage, dispatch])



    return (
        <section className=' 2xl:container mx-auto min-h-screen' >
            <div className='flex px-5 lg:static justify-between items-center md:h-18 lg:h-20 h-16 border-b border-gray-300 sticky top-0 z-20 bg-white'>
                <div className='flex justify-center  gap-2'>
                    <IoStatsChart className='md:text-3xl text-2xl text-green' />
                    <h1 className='font-semibold md:text-3xl text-2xl'>Admin Panel</h1>
                </div>

                <button disabled={isLoading} onClick={() => setOpenConfirmation(true)} className={`${isLoading ? "bg-gray-500" : "bg-red-500 active:ring-2 hover:opacity-90 active:ring-red-500"}  items-center gap-3  duration-200 shadow-md lg:flex hidden cursor-pointer h-11 px-5 font-medium outline-none rounded-lg text-white`}>
                    <p >Sign Out</p>
                    <PiSignOutBold className='text-lg' />
                </button>

                <div onClick={() => {
                    setShow(true)
                }} className='md:text-3xl text-2xl cursor-pointer ring-2 active:ring-4 hover:text-white hover:bg-green text-green ring-green duration-200 lg:hidden p-1 rounded-sm shadow-md'>
                    <FiMenu />
                </div>
            </div>
            <div className='flex'>
                <div className='lg:w-3/12  sticky top-0 h-dvh py-5 hidden lg:block  border-r border-gray-300  px-5'>
                    <div className='flex flex-col gap-3 '>

                        <Link href='dashboard' className={`${pathName == "/admin/dashboard" ? "bg-green text-white" : "hover:bg-gray-100"} flex gap-2 cursor-pointer py-3 items-center px-5 rounded-md`}>
                            <MdSpaceDashboard className={`${pathName == "/admin/dashboard" ? "text-white" : "text-green"}`} />
                            <h1>Dashboard</h1>
                        </Link>
                        <Link href='products' className={`${pathName == "/admin/products" ? "bg-green text-white" : "hover:bg-gray-100"} flex gap-2 cursor-pointer py-3 items-center px-5 rounded-md`}>
                            <BsInboxesFill className={`${pathName == "/admin/products" ? "text-white" : "text-green"}`} />

                            <h1>Products</h1>
                        </Link>
                        <Link href='orders' className={`${pathName == "/admin/orders" ? "bg-green text-white" : "hover:bg-gray-100"} flex gap-2 cursor-pointer py-3 items-center px-5 rounded-md`}>
                            <IoIosListBox className={`${pathName == "/admin/orders" ? "text-white" : "text-green"}`} />
                            <h1>Orders</h1>
                        </Link>
                    </div>
                </div>
                <div className='lg:w-9/12 w-full h-full overflow-x-hidden pt-5'>
                    {children}
                </div>
            </div>
            {isShow && <AdminSlider setShow={setShow} setOpenConfirmation={setOpenConfirmation} />}
            {isOpenConfirmation && <LogoutConfirmation onDismiss={logoutConfirmationCloseHandler} logoutHandler={logoutHandler} />}
            <FullScreenLoader loadingState={isLoading} />
        </section>
    )
}

export default adminLayout