"use client"
import { bodyOverflowHandler } from '@/utils'
import React, { useEffect } from 'react'

type Props = {
    onDismiss: () => void;
    logoutHandler: () => void;
}

export const LogoutConfirmation: React.FC<Props> = ({ onDismiss, logoutHandler }) => {

    useEffect(() => {
        bodyOverflowHandler(true)
    }, [bodyOverflowHandler])

    return (
        <div className='z-[100] fixed top-0 left-0 w-full h-dvh grid place-items-center'>
            <div className="flex flex-col gap-8 sm:max-w-[35rem] xl:w-4/12 lg:w-6/12 md:w-7/12 sm:w-8/12 w-11/12 bg-white rounded-md py-5">
                <div className='flex flex-col gap-1 justify-between items-center h-2/12 px-5'>
                    <h2 className=' capitalize mb-2 text-wrap md:text-xl text-lg font-medium py-2'>Logout Confirmation</h2>
                    <h5 className="flex text-gray-400 font-light text-sm md:text-base text-wrap mb-5">Are you sure you want to logout</h5>
                    <div className='flex gap-3 justify-end w-full'>
                        <button onClick={onDismiss} className='px-3 hover:shadow-sm text-base py-2 active:scale-95 duration-200 text-green rounded-md ring ring-green cursor-pointer'>No</button>
                        <button onClick={logoutHandler} className='px-3 hover:shadow-sm py-2 active:scale-95 duration-200 text-base text-white rounded-md ring ring-green cursor-pointer bg-green'>Yes , logout</button>
                    </div>
                </div>
            </div>
            <div onClick={onDismiss} className='bg-black/50 -z-1 absolute top-0 left-0 h-full w-full'></div>
        </div>
    )
}
