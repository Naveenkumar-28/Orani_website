"use client"
import { RemoveNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import React, { Fragment, useEffect, useState } from 'react'
import { IoIosCheckmarkCircleOutline, IoMdClose } from 'react-icons/io'
import { PiWarningCircle } from 'react-icons/pi'
import { useDispatch } from 'react-redux'

type NotifyMessageProps = {
    Message: string;
    id: Date;
    type?: string;
}
function NotifyMessage({ Message, id, type = 'success' }: NotifyMessageProps) {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        // Delay to allow transition
        let enterTimeout = setTimeout(() => {
            setIsActive(true);
        }, 50)
        // Remove the notification after the duration
        let removeTimeout = setTimeout(() => {
            setIsActive(false)
            setTimeout(() => {
                dispatch(RemoveNotifyMessage(id))
            }, 500)
        }, 5000)
        return () => {
            clearTimeout(enterTimeout);
            clearTimeout(removeTimeout);
        };
    }, [id, dispatch])

    const getColor = (type: string) => {
        switch (type) {
            case "success":
                return 'bg-green'
            case "error":
                return 'bg-red-400'
            case "info":
                return 'bg-sky-400'
            case "warning":
                return 'bg-amber-500'
            default:
                return ''
        }
    }
    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return <IoIosCheckmarkCircleOutline />
            case "error":
                return <PiWarningCircle />
            case "info":
                return <PiWarningCircle />
            case "warning":
                return <PiWarningCircle />
            default:
                return ''
        }
    }

    return (
        <div className={` transform transition-all duration-500 ease-in-out ${isActive ? '-translate-x-5 opacity-100' : 'translate-x-full opacity-0'}  ${getColor(type)} duration-500 ease-in shadow-md  rounded-sm md:text-base text-[0.7rem] text-white`} >
            <div className='flex items-center gap-3 px-2 py-2'>
                <div className='flex items-center gap-2'>
                    <div className='text-2xl'>
                        {getIcon(type)}
                    </div>
                    <p className='font-light'>{Message}</p>
                </div>
                <button onClick={() => {
                    setIsActive(false)
                    setTimeout(() => {
                        dispatch(RemoveNotifyMessage(id))
                    }, 500)
                }} className='text-xl cursor-pointer '>
                    <IoMdClose />
                </button>
            </div>
        </div>
    )
}


export default NotifyMessage