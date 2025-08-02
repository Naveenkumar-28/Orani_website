"use client"
import React from 'react'
import { NotifyContainer } from './NotifyContainer'

export function Main({ children }: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div>
            <NotifyContainer />
            {children}
        </div>
    )
}
