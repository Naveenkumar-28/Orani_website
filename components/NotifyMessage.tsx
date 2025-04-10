"use client"
import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type NotifyMessageProps = {
    Message: string;
    bgColor?: string;
}
function NotifyMessage({ Message, bgColor }: NotifyMessageProps) {
    const [classNameAdded, setClassNameAdd] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {

        const setTimeOutRef = setTimeout(() => {
            setClassNameAdd(false)
            dispatch(AddNotifyMessage(''))
        }, 5000)
        return () => clearTimeout(setTimeOutRef)
    }, [Message])
    return (
        <>
            {Message && <div className={`${classNameAdded ? 'notify-show' : ''} ${bgColor ? bgColor : 'bg-black'} px-5  -translate-x-[50%] left-[50%] rounded-sm text-sm shadow-2xl  py-2 fixed -bottom-10 z-[101] text-white`}>{Message}</div>}

        </>
    )
}

export default NotifyMessage