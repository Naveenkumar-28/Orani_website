"use client"
import React from 'react'
import NotifyMessage from './NotifyMessage'
import { useSelector } from 'react-redux'

function Main({ children }: Readonly<{
    children: React.ReactNode
}>) {
    const Message = useSelector((state: any) => state.NotifyMessage)
    return (
        <div>
            {/* Nofity message display to UI  */}
            {Message && <NotifyMessage Message={Message} />}
            {children}
        </div>
    )
}

export default Main