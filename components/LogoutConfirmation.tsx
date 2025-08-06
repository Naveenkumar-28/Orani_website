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
            <div className="flex flex-col gap-8 sm:max-w-[35rem] w-11/12 bg-white rounded-sm py-5">
                <div className='flex flex-col justify-between items-center h-2/12 px-5 gap-3'>
                    <h2 className=' text-xl  font-medium bg-green text-white w-full text-center py-2 rounded-sm'>Logout Confirmation</h2>
                    <h5 className="lg:text-lg font-light text-gray-500 capitalize mb-2 sm:text-base text-wrap text-sm">Are you sure you want to logout</h5>
                    <div className='flex gap-3'>
                        <button onClick={onDismiss} className='px-3 hover:shadow-sm text-base py-1.5 active:scale-95 duration-200 text-green rounded-md ring ring-green cursor-pointer'>No</button>
                        <button onClick={logoutHandler} className='px-3 hover:shadow-sm py-1.5 active:scale-95 duration-200 text-base text-white rounded-md ring ring-green cursor-pointer bg-green'>Yes , logout</button>
                    </div>
                </div>

            </div>
            <div onClick={onDismiss} className='bg-black/50 -z-1 absolute top-0 left-0 h-full w-full'></div>
        </div>
    )
}
